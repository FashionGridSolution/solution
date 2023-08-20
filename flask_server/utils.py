from common_utils import *

class Img_embedder:
  def __init__(self):
    vit_model_id = "google/vit-base-patch16-224"
    self.vit_processor = ViTImageProcessor.from_pretrained(vit_model_id)
    self.vit_extractor = AutoFeatureExtractor.from_pretrained(vit_model_id)
    self.vit_model = AutoModel.from_pretrained(vit_model_id)

  def __call__(self, image):
    self.vit_inputs = self.vit_processor(images=image, return_tensors="pt")
    with torch.no_grad():
      vit_outputs = self.vit_model(**self.vit_inputs).last_hidden_state[:, 0].cpu().detach().numpy()
    return vit_outputs

class SparseModel:
  def __init__(self):
    self.model = AutoModelForMaskedLM.from_pretrained("naver/splade-cocondenser-selfdistil")
  def __call__(self, input_ids):
    logits = self.model(**input_ids).logits
    vec = torch.max(
        torch.log(
            1+torch.relu(logits)
        )*input_ids.attention_mask.unsqueeze(-1),
    dim=1)[0].squeeze();
    return vec
  

def resize_image_with_aspect_ratio(img, new_width):
    # Calculate the new height while maintaining the aspect ratio
    original_width, original_height = img.size
    aspect_ratio = original_width / original_height
    new_height = int(new_width / aspect_ratio)

    # Resize the image
    resized_img = img.resize((new_width, new_height), Image.LANCZOS)

    return resized_img
    
def filter_cells_by_radius(binary_array, r=5):
    rows = len(binary_array)
    cols = len(binary_array[0])
    filtered_array = [[binary_array[row][col] for col in range(cols)] for row in range(rows)]

    for row in range(rows):
        for col in range(cols):
            if binary_array[row][col] == 1:
                for dr in range(-r, r+1):
                    for dc in range(-r, r+1):
                        if dr == 0 and dc == 0:
                            continue
                        if 0 <= row + dr < rows and 0 <= col + dc < cols and \
                           binary_array[row + dr][col + dc] != 1:
                            filtered_array[row][col] = 0
                            break

    return filtered_array


def fill_inner_region(binary_array, top_left, bottom_right):
    min_row, min_col = top_left
    max_row, max_col = bottom_right

    for row in range(min_row + 1, max_row):
        for col in range(min_col + 1, max_col):
            binary_array[row][col] = 1

    return binary_array


def find_boundary_box(binary_array):
    rows = len(binary_array)
    cols = len(binary_array[0])

    # Initialize variables to store the coordinates of the boundary box
    min_row = rows
    max_row = 0
    min_col = cols
    max_col = 0

    for row in range(rows):
        for col in range(cols):
            if binary_array[row][col] == 1:
                # Update the boundary coordinates
                min_row = min(min_row, row)
                max_row = max(max_row, row)
                min_col = min(min_col, col)
                max_col = max(max_col, col)

    # Generate the coordinates of the boundary box
    top_left = (min_row, min_col)
    top_right = (min_row, max_col)
    bottom_left = (max_row, min_col)
    bottom_right = (max_row, max_col)

    return fill_inner_region(binary_array, top_left, bottom_right), top_left,top_right,bottom_left,bottom_right


class Segment_images_into_parts:
  def __init__(self):
    self.processor = SegformerImageProcessor.from_pretrained("mattmdjaga/segformer_b2_clothes")
    self.fashion_model = AutoModelForSemanticSegmentation.from_pretrained("mattmdjaga/segformer_b2_clothes")
    self.cat_mapping = {
        1: "Clothing",
        4: "Clothing",
        5: "Clothing",
        6: "Clothing",
        7: "Clothing",
        17: "Clothing",
        8: "BagsWalletsBelts",
        16: "BagsWalletsBelts",
        9: "Footwear",
        10: "Footwear"
    }

  def __call__(self, image):
    inputs = self.processor(images=image, return_tensors="pt")
    image = resize_image_with_aspect_ratio(image, 224)
    image = remove(image)
    outputs = self.fashion_model(**inputs)
    logits = outputs.logits.cpu()
    upsampled_logits = nn.functional.interpolate(logits,size=image.size[::-1],mode="bilinear",align_corners=False)

    pred_seg = upsampled_logits.argmax(dim=1)[0].cpu().detach().numpy()

    cat_to_img = defaultdict(list)
    majority_class = [None,0]

    for k in self.cat_mapping.keys():
      pred_seg_class = (pred_seg==k).astype(int)
      presence_class_fraction = np.sum(pred_seg_class)/pred_seg_class.size
      filt_pred =  filter_cells_by_radius(pred_seg_class,r=2)
      bound_pred,top_left,top_right,bottom_left,bottom_right = find_boundary_box(filt_pred)
      only_class = (np.array(image)*np.expand_dims(np.array(bound_pred),axis=-1))[top_left[0]:bottom_right[0], top_left[1]:bottom_right[1]]
      pil_class = Image.fromarray(only_class.astype('uint8'))
      if presence_class_fraction>0.001:
        cat_to_img[self.cat_mapping[k]].append(pil_class);

      if presence_class_fraction>majority_class[1]:
        majority_class = [pil_class,presence_class_fraction]

    # set absent classes
    # for k in ['Clothing','BagsWalletsBelts','Footwear','Jewellery']:
    #   if k not in cat_to_img.keys():
    #       cat_to_img[k].append(majority_class[0])

    return cat_to_img
  


class Imagepart_similarity_search:
  def __init__(self, embs, enc_fun,df, k=4):
    self.kb = embs
    self.k = k
    self.id_to_cat = {row['uniq_id']:row['MainCategory'].replace(" ","").replace("&","").replace(",","")  for i,row in df.iterrows()}
    self.cat_mapping = {
            1: "Clothing",
            4: "Clothing",
            5: "Clothing",
            6: "Clothing",
            7: "Clothing",
            17: "Clothing",
            8: "BagsWalletsBelts",
            16: "BagsWalletsBelts",
            9: "Footwear",
            10: "Footwear"
        }
    self.encoder_fun = enc_fun

  def __call__(self,query_img,cat):
    q_dense_vec =  self.encoder_fun(query_img.convert('RGB'))
    sim_scrores = []
    for element in self.kb:
      id, dense_values = element['id'],element['dense_values']
      if self.id_to_cat[id]!=(cat.replace(" ","").replace("&","").replace(",","")):
        sim_scrores.append(1000)
        continue;
      d_sim = distance.cosine(np.squeeze(np.array(q_dense_vec)),np.array(dense_values))
      sim_scrores.append(d_sim)

    return [item[0] for item in sorted(list(zip(self.kb, sim_scrores)), key=lambda x: x[1])][:self.k]
  


class ProdIds_from_image:
  def __init__(self, embs, k_per_part_prod, enc_fun,df):
    self.img_segmenter = Segment_images_into_parts()
    self.segmente_searcher = Imagepart_similarity_search(embs, enc_fun,df, k_per_part_prod)

  def __call__(self, query_img,custom_vit=False):
    suggested_prods = defaultdict(list)
    part_images = self.img_segmenter(query_img)
    for cat in ['Clothing','BagsWalletsBelts','Footwear','Jewellery']:
      if cat in part_images.keys():
        for x in part_images[cat]:
          suggested_prods[cat].extend(self.segmente_searcher(x,cat));
        
    suggested_prods["body"].extend(self.segmente_searcher(remove(query_img),'Clothing'));
    return suggested_prods;



def encode(text: str, dense_clip_model, sparse_model, sparse_tokenizer,device):
    # create dense vec
    dense_vec = dense_clip_model.encode(text).tolist()
    # create sparse vec
    input_ids = sparse_tokenizer(text, return_tensors='pt')
    with torch.no_grad():
        sparse_vec = sparse_model(
            input_ids.to(device)
        )
    # convert to dictionary format
    indices = sparse_vec.nonzero().squeeze().cpu().tolist()
    values = sparse_vec[indices].cpu().tolist()
    sparse_dict = {"indices": indices, "values": values}
    # return vecs
    return dense_vec, sparse_dict



class Similarity_search:
  def __init__(self, embs, df, dense_clip_model, sparse_model, sparse_tokenizer,device, k=4):
    self.kb = embs
    self.k = k
    self.id_to_cat = {row['uniq_id']:row['MainCategory'].replace(" ","").replace("&","").replace(",","")  for i,row in df.iterrows()}
    self.id_to_price = {row['uniq_id']:float(row['retail_price'])  for i,row in df.iterrows()}
    self.dense_clip_model, self.sparse_model, self.sparse_tokenizer = dense_clip_model, sparse_model, sparse_tokenizer
    self.device = device

  def __call__(self,query_txt,cat,lower,upper,alpha=0.2):
    q_dense_vec, q_sparse_dict = encode(query_txt,self.dense_clip_model, self.sparse_model, self.sparse_tokenizer,self.device)
    sim_scrores = []
    for element in self.kb:
      id, dense_values, sparse_values, metadata = element['id'],element['dense_values'],element['sparse_values'],element['metadata']

      if (cat=='Accessories' and (self.id_to_cat[id]=='Clothing' or self.id_to_cat[id]=='Footwear')):
        sim_scrores.append(1000)
        continue; 

      if self.id_to_cat[id]!=(cat.replace(" ","").replace("&","").replace(",","")) and cat!='Accessories':
        sim_scrores.append(1000)
        continue;

      if self.id_to_price[id]<lower or self.id_to_price[id]>upper:
        sim_scrores.append(1000)
        continue;
            
      d_sim = distance.cosine(alpha*np.array(q_dense_vec),alpha*np.array(dense_values))
      a = np.zeros((30522))
      b = np.zeros((30522))
      a[q_sparse_dict['indices']] = q_sparse_dict['values']
      b[sparse_values['indices']] = sparse_values['values']
      s_sim = distance.cosine((1-alpha)*np.array(a),(1-alpha)*np.array(b))

      sim_scrores.append(alpha*d_sim + (1-alpha)*s_sim)

    return [item[0] for item in sorted(list(zip(self.kb, sim_scrores)), key=lambda x: x[1])][:self.k]



def celeb_trigger(qry, names):
  qry = qry.lower()
  for name in names:
    for k in name.lower().split(' '):
      for wq in qry.split(' '):
        sim_score = SequenceMatcher(None, k, wq).ratio()
        if sim_score>0.8:
          return name,sim_score
  return None,None


class Similarity_search_in_cleb:
  def __init__(self, embs, celebs_to_products, df, dense_clip_model, sparse_model, sparse_tokenizer,device, k=4):
    self.kb = embs
    self.k = k
    self.id_to_cat = {row['uniq_id']:row['MainCategory'].replace(" ","").replace("&","").replace(",","")  for i,row in df.iterrows()}
    self.celebs_to_products = celebs_to_products
    self.celebs_name = celebs_to_products.keys()
    self.dense_clip_model, self.sparse_model, self.sparse_tokenizer = dense_clip_model, sparse_model, sparse_tokenizer
    self.device = device

  def __call__(self,query_txt,cat,alpha=0.2):
    name,sim_score = celeb_trigger(query_txt,self.celebs_name)
    if name is None:
      return None
    try:
      serach_id_space = self.celebs_to_products[name]['MergedCombinations'][cat]
    except:
      serach_id_space=self.celebs_to_products[name]['MergedCombinations']['body']
    if cat=='Clothing':
      serach_id_space=serach_id_space+self.celebs_to_products[name]['MergedCombinations']['body']
    
    if cat not in self.celebs_to_products[name]['MergedCombinations'].keys():
      return []
    # print(name)
    # print(serach_id_space)
    # assert(0)
    q_dense_vec, q_sparse_dict = encode(query_txt,self.dense_clip_model, self.sparse_model, self.sparse_tokenizer,self.device)
    sim_scrores = []
    for element in self.kb:
      id, dense_values, sparse_values, metadata = element['id'],element['dense_values'],element['sparse_values'],element['metadata']

      if (cat=='Acc' and (self.id_to_cat[id]=='Clothing' or self.id_to_cat[id]=='Footwear')):
        sim_scrores.append(1000)
        continue; 

      if self.id_to_cat[id]!=(cat.replace(" ","").replace("&","").replace(",","")) and cat!='Acc':
        sim_scrores.append(1000)
        continue;

      if id not in serach_id_space:
        sim_scrores.append(1000)
        continue;
      
    
      d_sim = distance.cosine(alpha*np.array(q_dense_vec),alpha*np.array(dense_values))
      a = np.zeros((30522))
      b = np.zeros((30522))
      a[q_sparse_dict['indices']] = q_sparse_dict['values']
      b[sparse_values['indices']] = sparse_values['values']
      s_sim = distance.cosine((1-alpha)*np.array(a),(1-alpha)*np.array(b))

      sim_scrores.append(alpha*d_sim + (1-alpha)*s_sim)

    return [item[0] for item in sorted(list(zip(self.kb, sim_scrores)), key=lambda x: x[1])][:self.k]
  



class Recommender:
  def __init__(self, user_df, item_df, model):
    self.user_df = user_df
    self.item_df = item_df
    self.model = model
  def topk(self, user_id, prod_id_list, k=4):
    user_id = int(user_id)
    user_emb = self.user_df[self.user_df['userID'] == user_id]['embeddings'].tolist()
    prod_emb = self.item_df[self.item_df['uniq_id'].isin(prod_id_list)]['embeddings'].tolist()
    user_emb = user_emb * len(prod_emb)
    scores = self.model((tf.convert_to_tensor(user_emb), tf.convert_to_tensor(prod_emb)))
    result = scores*4+1
    filtered_indices = [idx for idx, val in enumerate(result) if val > 3]
    top_indices = sorted(filtered_indices, key=lambda idx: result[idx], reverse=True)[:k]
    top_items = [prod_id_list[idx] for idx in top_indices]
    return top_items
  


class ChatModel:
  def __init__(self):
    self.OPENAI_API_KEY = "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" #getpass()
    self.llm = OpenAI(
              temperature=0.5,
              openai_api_key=self.OPENAI_API_KEY,
              model_name='text-davinci-003'  # can be used with llms like 'gpt-3.5-turbo'
          )
    
    self.template = """
              You are a AI Fashion outfit recommender that gives short crisp replies, and has no bias or discrimination towards gender, race, religion
              Provide outfit recommendations for different occasions based on user queries that suit the specified event or scenario.
              Ensure the recommendations are trendy, suitable for the occasion, and consider factors such as weather, formality,
              and personal style preferences. Always recommend 1 topwear, 1 bottomwear, 1 footwear and 1 accessory to go along with the rest. Also predict the gender for which the user
              wants the outfit, if no gender is mentioned never hallucinate and predict "No Gender" in that case. You should also predict the budget range the user wants,
              distinguish between the upper and lower budget limits, never hallucinate and predict "No Limit" for that limit for whichever of the 2 limits is not present.
              Always answers in 4 points in this format-
              0. Gender: Product description along with color, pattern etc.
              1. Topwear: Product description along with color, pattern etc.
              2. Bottomwear: Product description along with color, pattern etc.
              3. Footwear: Product description along with color, pattern etc.
              4. Accessory: Product description along with color, pattern etc.
              5. Budget lower limit:
              6. Budget upper limit:

              Previous conversation:
              {chat_history}

              New human question:
              Question: {question}
              Answer:
              """

    
    self.prompt = PromptTemplate(input_variables=["chat_history", "question"], template=self.template)
    self.memory = ConversationSummaryMemory(llm=self.llm, memory_key="chat_history")
    self.conversation_sum = LLMChain(
                llm=self.llm,
                memory= self.memory,
                prompt = self.prompt
            )
    
  def parse(self,text):
    data = {}

    pattern = re.compile(r'^(.*?):\s(.*)$')
    lines = text.strip().split('\n')

    for line in lines:
        match = pattern.match(line)
        if match:
            category = match.group(1).strip()
            value = match.group(2)
            if 'Budget lower limit' in category or 'Budget upper limit' in category:
              try:
                value = re.search(r'\d+', value).group()
                data[category] = float(value)
              except:
                data[category] = 1e7 if 'Budget upper limit' in category else 0
            else:
              data[category] = value.strip()


    # json_data = json.dumps(data, indent=4)
    # print(json_data)
    return data

  def __call__(self,qry_text):
    ans = self.conversation_sum.run(qry_text)
    return self.parse(ans)
  



class FullPipeline:
  def __init__(self,hyb_emb_list,celebs_to_products,user_df,item_df,df,dense_clip_model, sparse_model, sparse_tokenizer,recom_model,vit_emb_list,vit_model,device):
    print("Loading models")
    print("Initializing similarity search")
    self.s = Similarity_search(hyb_emb_list,df, dense_clip_model, sparse_model, sparse_tokenizer,device,k=4)
    print("Initializing celeb similarity search")
    self.s_c = Similarity_search_in_cleb(hyb_emb_list,celebs_to_products,df, dense_clip_model, sparse_model, sparse_tokenizer,device,k=2)
    print("Initializing recommender")
    self.r = Recommender(user_df,item_df,recom_model)
    print("Initializing chat model")
    self.c = ChatModel()
    print("Initializing image search")
    self.p = ProdIds_from_image(vit_emb_list,1,vit_model,df)
  
  def __call__(self, q_text,user_id):
    final_ans = defaultdict(list)

    is_celeb = celeb_trigger(q_text,self.s_c.celebs_name)
    if is_celeb[0] is not None:
      for cat in ['Clothing','BagsWalletsBelts','Footwear']:
        cur_prods = self.s_c(q_text,cat)
        cur_prod_ids = [p['id'] for p in cur_prods]
        if cat == 'BagsWalletsBelts' or cat == 'Jewellery':
          final_ans['Accessories'].extend(cur_prod_ids)
        else:
          final_ans[cat].extend(cur_prod_ids)
      
      return {"Body": {
        "Accessory": "Closest matches are being shown",
        "Bottomwear": "Closest matches are being shown",
        "Budget lower limit": 0,
        "Budget upper limit": 10000000.0,
        "Footwear": "Closest matches are being shown",
        "Gender": "Closest matches are being shown",
        "Topwear": "Closest matches are being shown"
      }, 'Prods':final_ans}

    sugg = self.c(q_text)
    sugg_values = [x[1] for x in sugg.items()]
    upper = sugg_values[-1]
    lower = sugg_values[-2]
    sugg_values = sugg_values[:-2]
    temp = ["","Clothing","Clothing","Footwear","Accessories"]
    item_ind = 0
    gen = ""
    for sug_text in sugg_values:
      if item_ind == 0:
        item_ind+=1
        gen = sug_text;
        print("-->",gen)
        continue;
      lev1 = self.s("For "+gen+". "+sug_text,temp[item_ind],lower,upper)
      ids_lev1 = [p['id'] for p in lev1]
      print(user_id,ids_lev1)
      lev2 = self.r.topk(user_id,ids_lev1)
      final_ans[temp[item_ind]].extend(lev2)
      item_ind+=1

    return {'Body':sugg, 'Prods':final_ans}

  def search_from_img(self, img):
    prods = self.p(img.convert('RGB'))

    final_ans = {
    'Clothing':[],
    'Footwear':[],
    'Accessories':[]
    }
    print(prods.keys())
    for k in prods.keys():
      if k=='Clothing' or 'body':
        final_ans['Clothing'].extend([x['id'] for x in prods[k]])
      elif k=='Footwear':
        final_ans['Footwear'].extend([x['id'] for x in prods[k]])
      else:
        final_ans['Accessories'].extend([x['id'] for x in prods[k]])

    for k in final_ans.keys():
      final_ans[k] = list(set(final_ans[k]))

    return {"Body": {
        "Accessory": "Closest matches are being shown",
        "Bottomwear": "Closest matches are being shown",
        "Budget lower limit": 0,
        "Budget upper limit": 10000000.0,
        "Footwear": "Closest matches are being shown",
        "Gender": "Closest matches are being shown",
        "Topwear": "Closest matches are being shown"
    }, 'Prods':final_ans}