// "use client"

// import { useState } from "react";
// import ChatBox from "../../components/chatbox";

// export default function ChatPage() {
//   const data = localStorage.getItem("repos");
//   const storedRepo = data ? JSON.parse(data) : [];  
//   // const [selected, setSelected] = useState("choose the repo");
//   const setRepo = (data : any) => {
//     const updatedRepos : any = data;
//     console.log("updatedRepos---------",updatedRepos)
//     localStorage.setItem("selectedRepo", JSON.stringify(updatedRepos));
//   }

//   console.log("st---------",storedRepo)
//   // console.log("st-------selected--",selected)
//   return (
//     <div>
//       <h2 style={{display : "flex",justifyContent: "center" }} >Chat</h2>
//       <select
//         // value={selected}
//         onChange={(e) => setRepo(e.target.value)}
//       >
//         {storedRepo.map((data : any) => {
//           console.log("data----",data)
//           return(
//           <option value={data}>{data}</option>)
//         })}
//       </select>
//       <ChatBox />
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import ChatBox from "../../components/chatbox";
import styles from "../../styles/chat.module.css"

export default function ChatPage() {
  const [repos, setRepos] = useState<string[]>([]);
  const [selectedRepo, setSelectedRepo] = useState("");

  // Load repos safely
  useEffect(() => {
    const data = localStorage.getItem("repos");
    const stored = data ? JSON.parse(data) : [];
    setRepos(stored);
  }, []);

  // Handle select change
  const handleChange = (value: string) => {
    setSelectedRepo(value);
    localStorage.setItem("selectedRepo", JSON.stringify(value));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Chat</h2>

      {/* 🔥 Styled Select Card */}
      <div className={styles.selectCard}>
        <label className={styles.label}>Choose Repository</label>

        <select
          className={styles.select}
          value={selectedRepo}
          onChange={(e) => handleChange(e.target.value)}
        >
          <option value="">Select a repo</option>

          {repos.map((repo, index) => (
            <option key={index} value={repo}>
              {repo}
            </option>
          ))}
        </select>
      </div>

      <ChatBox  />
    </div>
  );
}