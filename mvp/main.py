# local API endpoint
from fastapi import FastAPI, UploadFile
from fastapi.staticfiles import StaticFiles
# for cors
from fastapi.middleware.cors import CORSMiddleware
# for the request body
from pydantic import BaseModel

from fastapi.routing import APIRoute

import asyncio


# llama.cpp backend request
import httpx

import json

# temp audio file integration
import shutil
import tempfile
# running local cli subprocesses for ffmpeg
import subprocess

# for restarting 
import time

# tools file
# tools_file = "tools-text.json"
tools_file = "tools.json"


app = FastAPI()




origins = ["*"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Prompt(BaseModel):
    prompt: str

class VoicePrompt(BaseModel):
    prompt: object
    



# using the openAI chat API cause it's what llamacpp tool calling supports
url = "http://100.126.176.4:8080/v1/chat/completions"
url_whisper = "http://100.76.132.20:8008/inference"
url_restart = "http://100.76.132.20:8000/restart_backend"

# loading the JSON tool file
# with open('tools.json', 'r') as tools_json_file:
with open(tools_file, 'r') as tools_json_file:
    tools = json.load(tools_json_file)



def llm_process(prompt: str, context: dict = None):

     # Parse context if it's a JSON string
    if isinstance(context, str):
        try:
            context = json.loads(context)
        except:
            context = {}
    
    if context is None:
        context = {}

    inventory_str = ", ".join(context.get("inventory", [])) if context.get("inventory") else "empty"
    locations_str = ", ".join(context.get("possibleLocations", [])) if context.get("possibleLocations") else "none available"
    current_location = context.get("currentLocation", "unknown")
    
    # Create a better system message for the LLM
    system_message = f"""
    You are a game command parser. The user will speak commands to control their character in a text adventure game.

    CURRENT GAME STATE:
    - Current Location: {current_location}
    - Available Locations to Travel: {locations_str}
    - Player Inventory: {inventory_str}

    Your job is to identify the user's intent and call the appropriate function with the correct parameters.
    When the user mentions items or locations, match them to the available options above, even if they use:
    - Partial names (e.g., "storage" matches "Storage Shed")
    - Synonyms (e.g., "go" for travel, "grab" for pick up)
    - Informal references (e.g., "the gun" matches "Pistol")
    - Abbreviations or casual speech

    IMPORTANT MATCHING RULES:
    - For travel commands: Match the destination to one of the Available Locations (case-insensitive, partial matches OK)
    - For item commands: Match items to the Player Inventory (case-insensitive, partial matches OK)
    - If multiple matches are possible, choose the closest/most logical match
    - If the user says something vague like "go there" or "use it", try to infer from context

    Common commands:
    - Travel: "go to [location]", "travel to [location]", "move to [location]", "head to [location]"
    - UseItem: "use [item]", "use the [item]", "equip [item]"
    - CraftItems: "craft [item1] and [item2]", "combine [item1] with [item2]", "make [item1] with [item2]"
    - PickUpItem: "pick up [item]", "take [item]", "grab [item]", "get [item]"
    - LookAround: "look around", "examine area", "what's here"
    - CheckInventory: "check inventory", "what do I have", "show items"

    ALWAYS call a function - do not respond with text only.
    Use the exact item/location names from the game state above in your function parameters.
    """

    payload = {
        "model": "gpt-3.5-turbo",
        "tools": tools,
        "messages": [
            {
                "role": "system",
                "content": system_message
            },
            {
                "role": "user",
                "content": f"User said: {prompt}"
            }
        ],
        "tool_choice": "auto"  # Force the model to use tools when appropriate
    }
    
    try:
        llm_response = httpx.post(url, json=payload, timeout=200.0)
        response_json = json.loads(llm_response.text)
        
        # Debug print
        print("\n=== LLM Response ===")
        print(json.dumps(response_json, indent=2))
        print("===================\n")

        # JSON tool call extraction
        try:
            llm_function_call_name = response_json["choices"][0]["message"]["tool_calls"][0]["function"]["name"]
            llm_function_call_param = response_json["choices"][0]["message"]["tool_calls"][0]["function"]["arguments"]
            print(f"Tool called: {llm_function_call_name}")
            print(f"Parameters: {llm_function_call_param}")
            return llm_function_call_name, llm_function_call_param
        except (ValueError, KeyError, TypeError, IndexError) as e:
            print(f"No tool call detected. Error: {e}")
            # Check if there's a text response
            try:
                text_response = response_json["choices"][0]["message"]["content"]
                print(f"LLM text response: {text_response}")
            except:
                pass
            return None, None
            
    except Exception as e:
        print(f"Error in LLM request: {e}")
        return None, None


# healthcheck
@app.get("/")
async def root():
    return {"status": "ok"}


# dead funciton?
@app.post("/process_prompt")
async def process_prompt(prompt: Prompt):
    return llm_process(prompt.prompt)



# processing the audio to text
@app.post("/process_audio")
async def process_audio(audio_file: UploadFile, user_context: str = ""):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp:
        shutil.copyfileobj(audio_file.file, tmp)
        tmp_path = tmp.name

        # Process audio
        processed_audio_file = subprocess.run([
            "ffmpeg", "-y",
            "-i", tmp_path,
            "-ar", "16000",
            "-ac", "1",
            "-c:a", "pcm_s16le",
            "output.wav"
        ])
        
        files = {'file': open('output.wav', 'rb')}

        # Restart audio backend
        await _restart_audio_backend()
        await asyncio.sleep(5)

        transcription_string = httpx.post(url_whisper, files=files, timeout=120.0)
        transcription_JSON = json.loads(transcription_string.text)

        print(json.dumps(transcription_JSON, indent=2))
        transcription_clean = transcription_JSON['text'].strip()
        
     
        print(f"\n=== Transcription ===")
        print(f"User said: {transcription_clean}")
        print("====================\n")

        print(f"\n=== User context ===")
        print(f"User said: {user_context}")
        print("====================\n")

        context = None
        if user_context:
            try:
                context = json.loads(user_context)
            except:
                print("Failed to parse context JSON")
                context = {}

        # Send to LLM (don't JSON stringify it - send as plain string)

        # TODO test passing more data to LLM here in the pipeline

        transcription_plus_context = transcription_clean + "and the user context is:" + user_context

        print(f"\n=== Transcription + context ===")
        print(f"User said: {transcription_plus_context}")
        print("====================\n")

        # result = llm_process(transcription_clean)
        result = llm_process(transcription_clean, context)
        
        if result[0] is None:
            # Fallback to a generic interact command
            print("Returning fallback Interact command")
            return ["Interact", "{}"]
        
        return result
    


async def _restart_audio_backend():
    response = httpx.post(url_restart, timeout=10)
    return response.text

@app.post("/restart_audio")
async def restart_audio_backend():
    async with httpx.AsyncClient() as client:
        response = await client.post(url_restart, timeout=10)
        return response.text


# Serve frontend
app.mount("/", StaticFiles(directory="../game", html=True), name="frontend")


print("\n=== ROUTES ===")
for route in app.routes:
    if isinstance(route, APIRoute):
        print(route.path, route.methods)
print("================\n")