from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx

app = FastAPI()

# Allow the Vite dev server to call this API from the browser.
# Without this, the browser blocks the request entirely (CORS error).
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Shape of the incoming request body — matches what handleSendMessage sends.
class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(request: ChatRequest):
    # Call Ollama's local API with the user's message.
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "qwen",
                "prompt": request.message,
                "stream": False,
            },
            timeout=60.0,
        )
    data = response.json()

    # Ollama returns the generated text under "response".
    # We reshape it to match what the frontend expects: { reply: "..." }
    return {"reply": data["response"]}