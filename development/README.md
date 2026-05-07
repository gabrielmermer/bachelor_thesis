# ARKADA

ARKADA is a voice-controlled game interaction system developed as part of a bachelor thesis exploring LLM-based voice interfaces in video games.

The project consists of:
- a browser-based frontend
- multiple gameplay prototypes
- a routing API responsible for request orchestration
- a Whisper.cpp control API

## Project Structure

```text
ARKADA/
│
├── game/
│   └── Main frontend application
│       Entry point: index.html
│
├── mvp*/
│   └── Experimental gameplay prototypes
│       Each prototype can be launched through its own index.html
│
├── routing_api_4.2.2/
│   └── Main routing API built with FastAPI
│
└── WhisperCPP_control_api_4.2.4.py
    └── Whisper.cpp integration and speech recognition API
```

## Requirements

- Python 3.10+
- FastAPI
- Uvicorn
- Whisper.cpp

## Running the Project

### 1. Start the Routing API

Navigate to:

```bash
cd routing_api_4.2.2
```

Run:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

---

### 2. Start the Whisper.cpp Control API

Run:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```


---

### 3. Launch the Frontend

Open:

```text
game/index.html
```

in a browser.

Prototype builds can be accessed through the `mvp*` folders.

## Networking Notes

During development and testing, communication between hosts was handled using Tailscale.

Some API addresses are hardcoded to Tailscale network IPs.

## Notes

- This repository contains research prototypes and experimental implementations.
- Both WhisperCPP and LlamaCPP need to be ran separately from the provided files.
- This is not production-ready code.