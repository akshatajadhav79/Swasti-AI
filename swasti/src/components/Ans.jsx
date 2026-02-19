import React, { useState, useEffect, useRef } from "react";
import Prompt from "../components/Prompt";
import api from "../api";
import ReactMarkdown from "react-markdown";

const Ans = () => {
  const [ans, setAns] = useState("Hi 👋 I’m Swasti. How can I help you today?");
  const [hereque, setQ] = useState("");
  const bottomRef = useRef(null);

  // Auto scroll when answer changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ans]);

  const askQue = async (que) => {
    try {
      setQ(que);
      const response = await api.post("/chat", { message: que });
      setAns(response.data.reply);
    } catch (error) {
      console.error("error adding while asking Quetion", error);
    }
  };

  return (
    <div>
      <div className="flex justify-end m-1">
        <div className="bg-gray-300 px-4 py-2 text-gray-900 rounded-lg max-w-xl">
          {hereque}
        </div>
      </div>
      <div className="flex justify-start py-3">
        <div className="bg-gray-300 px-1 py-2 rounded-lg max-w-3xl border border-gray-300 text-gray-900 prose prose-invert">
          <ReactMarkdown>{ans}</ReactMarkdown>
        </div>
      </div>

      <div ref={bottomRef}></div>
      <Prompt askQue={askQue} />
    </div>
  );
};

export default Ans;
