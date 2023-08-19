from common_utils import *
from utils import *


device =  'cuda' if torch.cuda.is_available() else 'cpu'
dense_clip_model_id = 'sentence-transformers/clip-ViT-B-32'
sparse_model_id = 'naver/splade-cocondenser-selfdistil'
vit_model_id = "google/vit-base-patch16-224" ##"nateraw/vit-base-beans"
recom_model_path = "../stored_result/export"


dense_clip_model = SentenceTransformer(dense_clip_model_id,device=device)
vit_model = Img_embedder()
sparse_model = SparseModel()
sparse_tokenizer = AutoTokenizer.from_pretrained(sparse_model_id)
recom_model = tf.saved_model.load(recom_model_path)

def get_all_stored():
  hyb_json_file_path = '/content/drive/MyDrive/grid/all_encodings_3000.json'
  vit_json_file_path = '/content/drive/MyDrive/grid/all_img_encodings_3000.json'
  celeb_photo_json_path = '/content/drive/MyDrive/grid/all_cleb_pic_links.json'
  celeb_pid_json_path = '/content/drive/MyDrive/grid/all_cleb_to_pid.json'

  all_data_path = '/content/drive/MyDrive/grid/SummarizedData3000.csv'
  usr_emb_path = '/content/drive/MyDrive/grid/User_embed.json'
  item_emb_path = '/content/drive/MyDrive/grid/Item_embed.json'

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
f = FullPipeline(hyb_emb_list,celebs_to_products,user_df,item_df,df, dense_clip_model, sparse_model, sparse_tokenizer,recom_model)


app = Flask(__name__)
CORS(app)
@app.route('/getans', methods=['POST'])
def capitalize_text():
    try:
        data = request.json
        input_text = data['text']
        query_type = data['query_type']
        # answer = chat_model(input_text)
        # answer = input_text.upper()
        if query_type == 'text':
            final_ans = f("Suggest me Interview outfit for men","Male",1)
        else:
            # TODO: Add image processing
            final_ans = f.search_from_img(Image.open(urllib.request.urlopen(input_text)))

        return jsonify(final_ans), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__=="__main__":
    print("Starting Flask Server")
    app.run(debug=True, port=5000)