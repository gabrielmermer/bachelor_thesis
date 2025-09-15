import httpx

url = "http://100.76.132.20:8000/restart_backend"

r = httpx.post(url)  # ✅ POST matches FastAPI route
print(r.status_code, r.text)
