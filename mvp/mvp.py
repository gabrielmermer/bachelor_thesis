import httpx
import json

url = "http://100.126.176.4:8080/completion"
payload = {
    "prompt": "Is learning polish hard?",
    "n_predict": 50 # the ammount of tokens we're predicting  
}

llm_response = httpx.post(url, json=payload, timeout=120.0)



print("Status Code:", llm_response.status_code)
print(llm_response.text)

response_json = json.loads(llm_response.text)
print(type(response_json))
print(response_json["content"])