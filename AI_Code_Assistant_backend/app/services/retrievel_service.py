import faiss
import numpy as np

dimension = 384

index = faiss.IndexFlatL2(dimension)

documents = []


def add_embedding(embedding, content, file_path, repo_name):
    vector = np.array([embedding]).astype("float32")
    index.add(vector)

    documents.append({
        "content": content,
        "file_path": file_path,
        "repo_name" : repo_name
    })
    print("Stored documents:", len(documents))

def search(query_embedding, query_text, repo_name,  k=5):
    print("Searching...",repo_name)
    
    print("Documents available:", len(documents))
    
    vector = np.array([query_embedding]).astype("float32")
    distances, indices = index.search(vector, k * 5)
    print("Raw indices:", indices)
    results = []
    # remove useless words
    stop_words = {"is", "the", "a", "an", "where", "what", "how"}
    keywords = [w for w in query_text.lower().split() if w not in stop_words]

    # for i in indices[0]:
    #     if i < 0 or i >= len(documents):
    #         print(f"Skipping invalid index: {i}")
    #         continue

    # #     results.append(documents[i])
    # # print("Results found:", len(results))
    # # return results

    #     doc = documents[i]
    #     if any(word in doc["content"].lower() for word in query_text.lower().split()):
    #         results.insert(0, doc)
    #     else:
    #         results.append(doc)
    # print("Results found:", len(results))
    # return results[:k]

    for idx, i in enumerate(indices[0]):
        if i < 0 or i >= len(documents):
            continue

        doc = documents[i]
        print("Doc repo:", doc.get("repo_name"))
        # ✅ FILTER BY REPO (MOST IMPORTANT)
        if doc.get("repo_name") != repo_name:
            continue

        score = distances[0][idx]

        content = doc["content"].lower()

        # ✅ keyword boost
        keyword_match = any(word in content for word in keywords)

        results.append({
            "doc": doc,
            "score": score,
            "boost": 1 if keyword_match else 0
        })

    # ✅ SORT: keyword first, then similarity
    results.sort(key=lambda x: (x["boost"], -x["score"]), reverse=True)

    final_results = [r["doc"] for r in results[:k]]

    print("Results found:", len(final_results))
    return final_results