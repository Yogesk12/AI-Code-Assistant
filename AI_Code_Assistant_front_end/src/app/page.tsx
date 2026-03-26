'use client';
import { useRouter } from 'next/navigation';
import styles from "../styles/home.module.css"

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      
      {/* HERO SECTION */}
      <div className={styles.hero}>
        <h1 className={styles.title}>🚀 AI Code Assistant</h1>
        <p className={styles.subtitle}>
          Analyze any GitHub repository using AI-powered RAG.
        </p>

        <div className={styles.buttonGroup}>
          <button className={styles.primaryBtn} onClick={() => router.push("/ingest")}>
            Ingest Repo
          </button>
          <button className={styles.secondaryBtn} onClick={() => router.push("/chat")}>
            Start Chat
          </button>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className={styles.features}>
        <h2>✨ Features</h2>

        <div className={styles.featureGrid}>
          <div className={styles.card}>
            <h3>💬 Ask Anything</h3>
            <p>Ask questions about any codebase and get instant answers.</p>
          </div>

          <div className={styles.card}>
            <h3>📁 Source Aware</h3>
            <p>Get answers with exact file references and code snippets.</p>
          </div>

          <div className={styles.card}>
            <h3>⚡ Fast Search</h3>
            <p>Powered by vector search for lightning-fast results.</p>
          </div>

          <div className={styles.card}>
            <h3>🧠 Smart Insights</h3>
            <p>Understand project structure and logic easily.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
