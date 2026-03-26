"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@/hooks/useChat";
import Message from "./message";

export default function ChatBox() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, loading } = useChat();
  const messagesEndRef : any = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input) return;
    await sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e : any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div>
      <div className="chat-box">
        {messages.map((msg : any, i : any) => (
          <Message key={i} message={msg} />
        ))}
        {loading && <p className="thinking">Thinking...</p>}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-row">
        {/* <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about the code..."
          onKeyDown={handleKeyDown}
        /> */}

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about the code..."
          // rows={3}
          // className="input-row"
          disabled={loading}
        />
        <button onClick={handleSend} > {loading ? "..." : "Send"}</button>
      </div>
    </div>
  );
}