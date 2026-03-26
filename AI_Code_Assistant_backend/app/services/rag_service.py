# from openai import OpenAI
from groq import Groq
from app.core.config import GROQ_API_KEY
from app.services.embedding_service import get_embedding
from app.services.retrievel_service import search

# client = OpenAI()
client = Groq(api_key=GROQ_API_KEY)

def contextual_answer(question, context, chunks):
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "system",
                "content": """
                    You are a codebase assistant.

                    Rules:
                    - Answer using the provided context
                    - Be specific and technical
                    - Mention file names
                    - If partial info exists, explain it
                    - Only say "Not found in codebase" if NOTHING is relevant
                    """
            },
            {
                "role": "user",
                "content": f"Context:\n{context}\n\nQuestion: {question}"
            }
        ]
    )

    return {
        "answer": response.choices[0].message.content,
        "sources": chunks
    }

def general_llm_answer(question):
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "system",
                "content":  """You are a senior software engineer analyzing a codebase.

                                Rules:
                                - Answer based on provided context
                                - Mention file names when possible
                                - Be specific (not generic)
                                - If partial info, say "Based on available code..."
                                - If not found, say "Not found in codebase"
                            """
            },
            {
                "role": "user",
                "content": question
            }
        ]
    )

    return {
        "answer": response.choices[0].message.content,
        "sources": []
    }

def answer_query(question: str , repo_name : str):
    query_embedding = get_embedding(question)
    print("query_embedding--------",query_embedding[:10])

    chunks = search(query_embedding,question,repo_name)
    print("chunks--------",chunks)

    if not chunks:
        return general_llm_answer(question)

    filtered_chunks = [
        c for c in chunks
        if len(c["content"].strip()) > 30
    ]
    # context = "\n\n".join([c["content"] for c in chunks])
    context = "\n\n---\n\n".join([
        f"File: {c.get('file_path')}\n\n{c['content']}"
        for c in filtered_chunks
    ])

    return contextual_answer(question, context, chunks)

# def answer_query(question: str):
#     query_embedding = get_embedding(question)
#     print("query_embedding--------",query_embedding)

#     chunks = search(query_embedding)
#     print("chunks--------",chunks)

#     context = "\n\n".join([c["content"] for c in chunks])

#     response = client.chat.completions.create(
#         model="llama-3.1-8b-instant",
#         messages=[
#             {"role": "system", "content": "Answer only from conteYou are a code assistant. Answer ONLY from the given context. If not found, say 'Not found in codebase'."},
#             {"role": "user", "content": f"{context}\n\nQ: {question}"}
#         ]
#     )

#     return {
#         "answer": response.choices[0].message.content,
#         "sources": chunks
#     }