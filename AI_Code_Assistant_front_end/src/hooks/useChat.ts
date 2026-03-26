// "use client";

// import { useState } from "react";
// import { askQuestion } from "@/lib/api";

// export const useChat = () => {
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async (text: string) => {
//     setLoading(true);

//     setMessages((prev) => [
//       ...prev,
//       { role: "user", content: text },
//     ]);

//     const res = await askQuestion(text);

//     setMessages((prev) => [
//       ...prev,
//       {
//         role: "assistant",
//         content: res.answer,
//         sources: res.sources,
//       },
//     ]);

//     setLoading(false);
//   };

//   return { messages, sendMessage, loading };
// };

"use client";

import { useState } from "react";
import { askQuestion } from "@/lib/api";

export const useChat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const simulateTyping = async (text: string, callback: any) => {
    let current = "";

    for (let i = 0; i < text.length; i++) {
      console.log("current----------",current)
      console.log("text----------",text,text.length)
      current += text[i];
      callback(current);
      await new Promise((res) => setTimeout(res, 15)); // speed
    }
  };

  const sendMessage = async (text: string) => {
    const data = localStorage.getItem("selectedRepo");
    const storedRepo = data ? JSON.parse(data) : [];
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
      { role: "assistant", content: "" }, // placeholder
    ]);

    const res = await askQuestion(text,storedRepo);

    let index = messages.length + 1;

    await simulateTyping(res.answer, (partial: string) => {
      setMessages((prev) => {
        const updated = [...prev];
        console.log("updated------------",updated,partial)
        updated[index] = {
          ...updated[index],
          content: partial,
          sources: res.sources,
        };
        return updated;
      });
    });

    setLoading(false);
  };

  return { messages, sendMessage, loading };
};