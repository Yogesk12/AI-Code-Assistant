from fastapi import APIRouter, Request
from app.services.rag_service import answer_query
from app.services.github_service import ingest_repo

router = APIRouter()


@router.post("/ask")
async def ask(req: Request):
    body = await req.json()
    print("body-0---------",body)
    # print("body-0-----answer_query----",answer_query(body["question"]))
    return answer_query(body["question"],body["repo_name"])


@router.post("/ingest")
async def ingest(req: Request):
    body = await req.json()
    print("body-0---------",body)
    ingest_repo(body["repo_url"])
    return {"status": "done"}