# local API endpoint
from fastapi import FastAPI, Request, File, UploadFile
# for the request body
from pydantic import BaseModel
# llama.cpp backend request
import httpx

import json

# temp audio file integration
import shutil
# running local cli subprocesses
import subprocess
# temp file 
import tempfile


app = FastAPI()


class Prompt(BaseModel):
    prompt: str

class VoicePrompt(BaseModel):
    prompt: object
    



# using the openAI chat API cause it's what llamacpp tool calling supports
url = "http://100.126.176.4:8080/v1/chat/completions"
url_whisper = "http://dabro-workstation:8080/inference"

# loading the JSON tool file
with open('tools.json', 'r') as tools_json_file:
    tools = json.load(tools_json_file)


@app.get("/")
async def root():
    return {"message": "Hello World"}


def llm_process(prompt: str):
    payload = {
    "model": "gpt-3.5-turbo",
    "tools": tools,
    "messages": [
        {
            "role": "user",
            "content": prompt
        }
        ]
    }
    llm_response = httpx.post(url, json=payload, timeout=120.0)
    response_json = json.loads(llm_response.text)
    # print(type(response_json))

    # only for debug
    #data_string_json = json.dumps(response_json, indent=4, sort_keys=True)

    # only for debug
    #print(data_string_json)


    # JSON tool call extraction
    try:
        llm_function_call_name = response_json["choices"][0]["message"]["tool_calls"][0]["function"]["name"]
        llm_function_call_param = response_json["choices"][0]["message"]["tool_calls"][0]["function"]["arguments"]
        return llm_function_call_name, llm_function_call_param
    except ValueError:
        print("no tool call detected")
    except KeyError:
        print("no tool call detected")

@app.post("/process_prompt")
async def process_prompt(prompt: Prompt):
    return llm_process(prompt.prompt)

@app.post("/process_audio")
async def process_audio(audio_file: UploadFile):
    # print(type(audio_file))
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp:
        shutil.copyfileobj(audio_file.file, tmp)
        tmp_path = tmp.name
        # print(tmp_path)

        # the needed file conversion for whisper.cpp transcription
        # ffmpeg -i input.mp3 -ar 16000 -ac 1 -c:a pcm_s16le output.wav
        # I know this looks like a mess but it's needed
        # the processed_audio_file is ready to be passed to whisper.cpp server
        processed_audio_file = subprocess.run([
            "ffmpeg", "-y",
            "-i", tmp_path,
            "-ar",
            "16000",
            "-ac",
            "1",
            "-c:a",
            "pcm_s16le",
            "output.wav"])
        
        # print(type(processed_audio_file))
        # Send the file to the whisper cpp request
        
        files = {'file': open('output.wav', 'rb')}
        # data = {"audio_filee": file}


        # TODO Start Whisper Server

        # Whisper request
        transcription_string= httpx.post(url_whisper, files=files, timeout=120.0)
        print(type(transcription_string.text))
        transcription_JSON = json.loads(transcription_string.text)
        print(transcription_JSON)
        print(transcription_JSON['text'])
        transcription_clean = transcription_JSON['text']
        transcription_clean = json.dumps(transcription_clean)

        # TODO kill Whisper Server
        # TODO start LLM server
        # TODO send the transcript to the LLM
        # TODO kill LLM server

        # send the transcript to the LLM

        return llm_process(transcription_clean)
    