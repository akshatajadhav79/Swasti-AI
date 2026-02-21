from email import message
from sys import exception
from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import ollama
from pydantic import BaseModel
from sentry_sdk import HttpTransport
import uvicorn
from pymongo import MongoClient
from datetime import datetime

client = MongoClient("mongodb+srv://akshata542003:Akshata05@cluster0.pe4etq7.mongodb.net/")
db = client["Swasti-AI"]
chat_collection = db["prompt"]

app = FastAPI(debug=True)

origins = [
    "http://localhost:5173",
    # "https://swasti-kvyh43984-akshata-jadhav-s-projects.vercel.app/"
    # Add more origins here
] 
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)


# making Models
class ChatRequest(BaseModel):
    message:str
    
class ChatResponse(BaseModel):
    reply:str
    
memory_DB = {"info":"hi"}

@app.get("/chat",response_model = ChatResponse)
def get_res():
    return ChatResponse(reply = memory_DB["info"])


@app.get("/chat/history")
def get_chat_history():
    chats = chat_collection.find().sort("created_at",1)
    result = []
    for chat in chats:
        result.append({
            "id":str(chat["_id"]),
            "user_message":chat["user_message"],
            "ai_response":chat["ai_response"]
        })
    return result
 
@app.post("/chat",response_model = ChatResponse)
async def generate(prompt:ChatRequest):
    try:
        que = prompt.message
    
        response = ollama.chat(
            model = "llama3.2",
            messages=[{"role":"user","content":que}]
            )
        
        ans = response.get("message",{}).get("content")
        
        if not ans:
            raise Exception("Empty response from model")
        
        # store data
        chat_data = {
            "user_message":que,
            "ai_response":ans,
            "created_at":datetime.now()
        }
        chat_collection.insert_one(chat_data)
        
        return ({"reply":ans})
    except Exception as e:
        print("ERROR:", str(e))
        raise HTTPException(status_code=500,detail=str(e))


# for Fruits
memory_DB = {"fruits":[]}
class Fruit(BaseModel):
    name:str
    
class Fruits(BaseModel):
    fruits:List[Fruit]

@app.get("/fruits",response_model = Fruits)
def get_fruits():
    print(memory_DB)
    return Fruits(fruits=memory_DB["fruits"])

@app.post("/fruits")
def add_fruits(fruit:Fruit):
    memory_DB["fruits"].append(fruit)
    return fruit


if __name__ =="__main__":
    uvicorn.run(app,host="127.0.0.1",port = 8000)