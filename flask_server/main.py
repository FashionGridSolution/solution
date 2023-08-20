from common_utils import *
from utils import *


device =  'cuda' if torch.cuda.is_available() else 'cpu'
dense_clip_model_id = 'sentence-transformers/clip-ViT-B-32'
sparse_model_id = 'naver/splade-cocondenser-selfdistil'
vit_model_id = "google/vit-base-patch16-224" ##"nateraw/vit-base-beans"
recom_model_path = "../stored_result/export"

print("Loading models...")
print("Loading dense clip model...")
dense_clip_model = SentenceTransformer(dense_clip_model_id,device=device)
print("Loading sparse model...")
vit_model = Img_embedder()
print("Loading SparseModel...")
sparse_model = SparseModel()
sparse_tokenizer = AutoTokenizer.from_pretrained(sparse_model_id)
print("Loading recom model...")
recom_model = tf.saved_model.load(recom_model_path)

def get_all_stored():
  hyb_json_file_path = '../stored_result/all_encodings_3000.json'
  vit_json_file_path = '../stored_result/all_img_encodings_3000.json'
  celeb_photo_json_path = '../stored_result/all_cleb_pic_links.json'
  celeb_pid_json_path = '../stored_result/all_cleb_to_pid.json'

  all_data_path = '../stored_result/SummarizedData3000.csv'
  usr_emb_path = '../stored_result/User_embed.json'
  item_emb_path = '../stored_result/Item_embed.json'

  with open(hyb_json_file_path, 'r') as json_file:
      hyb_emb_list = json.load(json_file)

  with open(vit_json_file_path, 'r') as json_file:
      vit_emb_list = json.load(json_file)

  with open(celeb_photo_json_path, 'r') as json_file:
      cleb_pics = json.load(json_file)

  with open(celeb_pid_json_path, 'r') as json_file:
      celebs_to_products = json.load(json_file)

  df = pd.read_csv(all_data_path)
  user_df = pd.read_json(usr_emb_path, orient='records')
  item_df = pd.read_json(item_emb_path, orient='records')

  return hyb_emb_list,vit_emb_list,cleb_pics,celebs_to_products,df,user_df,item_df

hyb_emb_list,vit_emb_list,cleb_pics,celebs_to_products,df,user_df,item_df = get_all_stored()

# f = FullPipeline(hyb_emb_list,celebs_to_products,user_df,item_df,df, dense_clip_model, sparse_model, sparse_tokenizer,recom_model,vit_emb_list,vit_model,device)
full_pipeline_sessions = {}

sample = {
    "Body": {
        "Accessory": "Closest matches are being shown",
        "Bottomwear": "Closest matches are being shown",
        "Budget lower limit": 0,
        "Budget upper limit": 10000000.0,
        "Footwear": "Closest matches are being shown",
        "Gender": "Closest matches are being shown",
        "Topwear": "Closest matches are being shown"
    },
    "Prods": {
        "Accessories": [
            604,
            116,
            307,
            121
        ],
        "Clothing": [
            661,
            1506,
            2198,
            2929
        ],
        "Footwear": [
            618,
            1985
        ]
    }
}

app = Flask(__name__)
CORS(app)
@app.route('/getans', methods=['POST'])
def capitalize_text():
    try:
        data = request.json
        input_text = data['text']
        query_type = data['query_type']
        user_id = int(data['user_id'])

        print("--------------------")
        print("Input text: ", input_text)
        print("Query type: ", query_type)
        print("User id: ", user_id)

        if user_id not in full_pipeline_sessions:
            print("Creating new session for user: ", user_id)
            full_pipeline_sessions[user_id] = FullPipeline(hyb_emb_list,celebs_to_products,user_df,item_df,df, dense_clip_model, sparse_model, sparse_tokenizer,recom_model,vit_emb_list,vit_model,device)

        # answer = chat_model(input_text)
        # answer = input_text.upper()

        f = full_pipeline_sessions[user_id]
        if query_type == 'text':
            final_ans = f(input_text,user_id)
        else:
            final_ans = f.search_from_img(Image.open(urllib.request.urlopen(input_text)))
        
        # final_ans = sample

        final_ans['Body'] = {key: value for key, value in final_ans['Body'].items() if 'Gender' not in key and 'Budget lower limit' not in key and 'Budget upper limit' not in key}
        print("---------------------")
        print("Final answer: ", final_ans)
        print("---------------------")
        return jsonify(final_ans), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__=="__main__":
    print("Starting Flask Server")
    app.run(debug=False, port=5000)
    # final_ans = f("Diwali outfit for man",1)
    # print(final_ans)
    # print("Done")
    # print("Staring pipeline. ...") 
    # suggestion = f("Suggest me Interview outfit for men","Male",1)
    # print(suggestion)