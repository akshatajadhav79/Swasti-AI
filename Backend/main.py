from email import message
from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import ollama
from pydantic import BaseModel
import uvicorn

app = FastAPI(debug=True)

origins = [
    "http://localhost:5173",
    "https://swasti-ai-alpha.vercel.app/"
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

@app.post("/chat",response_model = ChatResponse)
def generate(prompt:ChatRequest):
    que = prompt.message
    response = ollama.chat(model = "llama3.2",messages=[{"role":"user","content":que}])
    ans = response["message"]["content"]
    memory_DB["info"]= ans
    return ChatResponse(reply=ans)


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