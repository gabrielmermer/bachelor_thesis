from fastapi import FastAPI, Request, Response
import httpx
import os

app = FastAPI()

TARGET_URL = os.getenv("TARGET_URL", "100.82.236.65:8000")

@app.api_route("/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH"])
async def proxy(path: str, request: Request):
    url = f"{TARGET_URL}/{path}"
    method = request.method
    headers = dict(request.headers)
    body = await request.body()

    try:
        async with httpx.AsyncClient(follow_redirects=True) as client:
            resp = await client.request(method, url, headers=headers, content=body)
        return Response(
            content=resp.content,
            status_code=resp.status_code,
            headers={k: v for k, v in resp.headers.items() if k.lower() not in ["content-encoding", "transfer-encoding", "connection"]},
        )
    except Exception as e:
        return Response(f"Proxy error: {e}", status_code=500)
