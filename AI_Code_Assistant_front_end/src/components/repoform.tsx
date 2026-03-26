// "use client";

// import { useState } from "react";
// import { ingestRepo } from "@/lib/api";

// export default function RepoForm() {
//   const [repoUrl, setRepoUrl] = useState("");
//   const [status, setStatus] = useState("");

//   const handleSubmit = async () => {
//     setStatus("Processing...");
//     await ingestRepo(repoUrl);
//     setStatus("Done!");
//   };

//   return (
//     <div className="repo-form">
//       <h2>Ingest GitHub Repo</h2>

//       <input
//         placeholder="Enter repo URL"
//         value={repoUrl}
//         onChange={(e) => setRepoUrl(e.target.value)}
//       />

//       <button onClick={handleSubmit}>
//         Ingest
//       </button>

//       <p>{status}</p>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import styles from "../styles/ingest.module.css"
export default function Ingest() {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [repos, setRepos] = useState([]);

  // Load repos from localStorage
  useEffect(() => {
    const data = localStorage.getItem("repos");
    const stored = data ? JSON.parse(data) : [];
    setRepos(stored);
  }, []);

  const handleIngest = async () => {
    if (!repoUrl) return;

    setLoading(true);
    setStatus("Cloning repository...");

    try {
      // Step simulation (you can replace with real API timing)
      setTimeout(() => setStatus("Processing files..."), 1000);
      setTimeout(() => setStatus("Generating embeddings..."), 2000);

      const res = await fetch("http://localhost:8000/ingest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repo_url: repoUrl }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Repo ingested successfully!");

        // Save repo name
        const repoName = repoUrl.split("/").pop();
        const updatedRepos : any = [...repos, repoName];

        localStorage.setItem("repos", JSON.stringify(updatedRepos));
        setRepos(updatedRepos);

        setRepoUrl("");
      } else {
        setStatus("❌ Failed to ingest repo");
      }
    } catch (err) {
      setStatus("❌ Error occurred");
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>📥 Ingest GitHub Repository</h2>

        <input
          type="text"
          placeholder="Enter GitHub repo URL..."
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className={styles.input}
        />

        <button
          onClick={handleIngest}
          className={styles.button}
          disabled={loading}
        >
          {loading ? "Processing..." : "Ingest"}
        </button>

        {/* STATUS */}
        {status && <p className={styles.status}>{status}</p>}
      </div>

      {/* REPO LIST */}
      <div className={styles.repoSection}>
        <h3>📁 Your Repositories</h3>

        {repos.length === 0 ? (
          <p style={{ color: "#777" }}>No repos added yet</p>
        ) : (
          <ul className={styles.repoList}>
            {repos.map((repo, index) => (
              <li key={index} className={styles.repoItem}>
                {repo}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
