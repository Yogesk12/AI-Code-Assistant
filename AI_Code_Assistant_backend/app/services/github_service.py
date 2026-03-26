from git import Repo
import os

from app.utils.file_loader import get_all_files
from app.utils.chunkings import chunk_text
from app.services.embedding_service import get_embedding
from app.services.retrievel_service import add_embedding


def ingest_repo(repo_url: str):
    repo_name = repo_url.split("/")[-1]
    path = "./repos/project"

    if not os.path.exists(path):
        Repo.clone_from(repo_url, path)

    files = get_all_files(path)
    print("Total files found:", len(files))
    for file in files:
        print("files---------",file)
        try:
            with open(file, "r", encoding="utf-8") as f:
                text = f.read()

            chunks = chunk_text(text)
            print("chunks---------",chunks)
            for chunk in chunks:
                emb = get_embedding(chunk)
                print("emb---------",emb)
                add_embedding(emb, chunk, file, repo_name)

        except Exception as e:
            print("ERROR in file:", file)
            print(e)