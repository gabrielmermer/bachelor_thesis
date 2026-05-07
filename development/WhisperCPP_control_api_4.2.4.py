from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import subprocess

app = FastAPI()

# CORS setup
origins = [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "http://100.82.236.65",
    "http://100.126.176.4:8000",
    "http://100.126.176.4",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "ok"}

@app.post("/restart_backend")
async def restart_backend():
    result = subprocess.run(
        ["systemctl", "--user", "restart", "whisper"],
        capture_output=True,
        text=True
    )
    return {"status": "restarted", "output": result.stdout.strip() or result.stderr.strip()}