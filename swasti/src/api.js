import axios from 'axios'

const api = axios.create({
    baseURL:"https://swasti-ai-alpha.vercel.app/",    
    // "http://127.0.0.1:8000"
    headers:{
        "Content-Type":"application/json",
    },
});
export default api;