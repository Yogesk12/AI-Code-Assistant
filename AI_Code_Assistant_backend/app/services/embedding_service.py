# from openai import OpenAI
# from app.core.config import OPENAI_API_KEY

# client = OpenAI(api_key=OPENAI_API_KEY)


# def get_embedding(text: str):
#     print("get_embedding text----------",text)
#     res = client.embeddings.create(
#         model="text-embedding-3-small",
#         input=text
#     )
#     return res.data[0].embedding
    

from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

def get_embedding(text: str):
    return model.encode(text).tolist()