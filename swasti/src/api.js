import axios from 'axios'

const api = axios.create({
    baseURL:
    // "https://swasti-ai-2z2w-hiyp7594d-akshata-jadhav-s-projects.vercel.app/",    
    "http://127.0.0.1:8000",
    headers:{
        "Content-Type":"application/json",
    },
});
export default api;