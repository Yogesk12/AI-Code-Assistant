const BASE_URL = "http://localhost:8000";

export const askQuestion = async (question: string , repo_name : string) => {
  console.log("a---------",JSON.stringify({ question,repo_name }),)
  const res = await fetch(`${BASE_URL}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question,repo_name }),
  });

  return res.json();
};

export const ingestRepo = async (repoUrl: string) => {
  const res = await fetch(`${BASE_URL}/ingest`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ repo_url: repoUrl }),
  });

  return res.json();
};