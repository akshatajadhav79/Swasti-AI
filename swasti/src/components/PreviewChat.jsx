import React,{useState,useEffect ,useRef} from 'react'
import api from "../api"

import ReactMarkdown from "react-markdown";

export const PreviewChat = () => {

  const[data , setData] = useState([]);
  const bottomRef = useRef(null);

  useEffect(()=>{
      const fetchChatHistory = async()=>{
        try{
          const response = await api.get("/chat/history");
          
          // reverse so latest message is at bottom
          const sortedChats = response.data.reverse();
          setData(sortedChats);
        }catch(error){
          console.error("Error fetching chat History:",error);
        }
      };
      fetchChatHistory();
  },[]);

  // Auto scroll to bottom whenever data updetes
  useEffect(()=>{
    bottomRef.current?.scrollIntoView({behavior:"smooth"});
  },[data]);

  return (
    <div style={styles.container}>
      {/* <h2>Chat History</h2> */}

      {data.length === 0 ? (
        <p>No messages yet...</p>
      ) : (
        data.map((item, index) => (
          <div key={index} style={styles.chatBox}>
            <div style={styles.user}>
              <strong>You:</strong> {item.user_message}
            </div>
            <div style={styles.bot}>
              <strong style={{ color: "black" }}>Swasti:</strong> <ReactMarkdown>{item.ai_response}</ReactMarkdown>
            </div>
          </div>
        ))
      )}
    </div>
  )
};

const styles = {
  container: {
    width: "100%",
    margin: "1px auto",
    padding: "10px",
  },
  chatBox: {
    marginBottom: "15px",
    padding: "10px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
  },
  user: {
    marginBottom: "5px",
    color: "#333",
  },
  bot: {
    color: "#007bff",
  },
};
