from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
import uuid
from datetime import datetime

app = FastAPI()

# Where uploaded files actually get saved on disk.
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# In-memory list of uploaded documents' metadata. This resets every time
# the server restarts — fine for now, a database comes later.
documents_db = []

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

@app.post("/documents")
async def upload_document(file: UploadFile = File(...)):
    # Give the saved file a unique name so two uploads with the same
    # original filename don't overwrite each other on disk.
    doc_id = str(uuid.uuid4())
    file_ext = os.path.splitext(file.filename)[1]
    saved_path = os.path.join(UPLOAD_DIR, f"{doc_id}{file_ext}")

    # Read the uploaded file's bytes and write them to disk.
    contents = await file.read()
    with open(saved_path, "wb") as f:
        f.write(contents)

    # Build the metadata object — this shape matches what DocumentCard
    # already expects: { id, name, type, uploadedAt, status }
    doc = {
        "id": doc_id,
        "name": file.filename,
        "type": file_ext.replace(".", "").upper(),
        "uploadedAt": datetime.now().strftime("%b %#d, %Y"),
        "status": "ready",
    }
    documents_db.append(doc)
    return doc


@app.get("/documents")
async def list_documents():
    return documents_db

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