import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

const Prompt = ({ askQue }) => {
  const [que, setQue] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (que.trim()) {
      askQue(que);
      setQue("");
    }
  };

  return (
    <div className="p-3 bg-[]">
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm"

      >
        {/* Plus Icon */}
         <button type="button" className="mr-3 text-gray-600 text-lg">
          <FaPlus />
        </button>

     
          {/* Input */}

          <input
            type="text"
            value={que}
            placeholder="Ask something..."
            onChange={(e) => setQue(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
          />

          {/* Green Send Button */}
          <button
            type="submit"
            className="ml-3 w-10 h-10 flex items-center justify-center rounded-full bg-gray-500 hover:bg-gray-700 transition"
          >
            <IoMdSend className="text-white text-lg" />
          </button>
    
      </form>
    </div>
  );
};

export default Prompt;
