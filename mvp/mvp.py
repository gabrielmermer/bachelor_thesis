import httpx
import json

# using the openAI chat API cause it's what llamacpp tool calling supports
url = "http://100.126.176.4:8080/v1/chat/completions"


tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get current temperature for a given location.",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "City and country e.g. Bogotá, Colombia"
                    }
                },
                "required": ["location"]
            }
        }
    }
]

payload = {
    "model": "gpt-3.5-turbo",
    "tools": tools,
    "messages": [
        {
            "role": "user",
            "content": "What is the weather in Seoul?"
        }
    ]
}

llm_response = httpx.post(url, json=payload, timeout=120.0)



print("Status Code:", llm_response.status_code)
# print(llm_response.text)

response_json = json.loads(llm_response.text)
# print(type(response_json))

# only for debug
data_string_json = json.dumps(response_json, indent=4, sort_keys=True)

# only for debug
#print(data_string_json)


# JSON tool call extraction
print(response_json["choices"][0]["message"]["tool_calls"][0]["function"]["name"])
print(response_json["choices"][0]["message"]["tool_calls"][0]["function"]["arguments"])