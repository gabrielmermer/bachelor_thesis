let mic, recorder, soundFile;
let initialise_audio = false;
// current voice command





// block refresh 
window.addEventListener("keydown", function(e) {
  // prevent default for keys you use in p5
  if (['Space', 'KeyR', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
    e.preventDefault();
  }
});


let img;

function preload() {
  img = loadImage('assets/poland.png');
}


function setup() {

  noStroke();
  createCanvas(800, 500);



  mic = new p5.AudioIn();

  mic.start();
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  soundFile = new p5.SoundFile();

  // class testing
  

  
  

}

function draw() {
  // rendering
  background(220);

  image(img, 200, 100, 400, 200);



  
}




function keyPressed() {


  if (key === "r") {
    if (!initialise_audio) {
      initialiseAudio()
      return false;
    }
    else {
      startRecording();
      return false;
    }
  }
}

function keyReleased() {
  if (key === "r") {
    stopRecording();
    // runCommand(voice_command);
    return false;
  }
}

function findObject(type){
  // print(type); 
  for(let y = 0; y < 10; y++) {
    for(let x = 0; x < 10; x++) {
      if(grid[y][x] == type) {
        print("MATCH");
        return [y, x];
    }
  }
  
  } 
return "not found";
}

function initialiseAudio() {
  userStartAudio();
  initialise_audio = true;
}

function startRecording() {
  // refreshing the buffer
  soundFile = new p5.SoundFile()
  print("recording")
  recorder.record(soundFile);
}

async function stopRecording() {
  recorder.stop();

  // simple timer for the buffer 
  await new Promise(resolve => setTimeout(resolve, 200));

  // debug
  soundFile.play();


  const voice_command = await sendSound();
  if (voice_command) {
    runCommand(voice_command);
  }

  // this is to prevent reload?
  return false; 
}
async function sendSound() {
  console.log("sending sound to server");
  let soundBlob = soundFile.getBlob(); // p5.SoundFile blob

  let formData = new FormData();
  formData.append('audio_file', soundBlob, 'recording.wav'); // name must match FastAPI

  try {
    const response = await fetch('http://127.0.0.1:8000/process_audio', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Server response:", data);
    return data;

  } catch (err) {
    console.error("Error sending audio:", err);
  }
}

function runCommand(commandArray){
  print("beginning to run command: ", commandArray)
  let [commandName, paramString] = commandArray;

  const commandMap = {
    "MoveLeft": (params) => moveLeft(params.x),
    "MoveRight": (params) => moveRight(params.x),
    "MoveUp": (params) => moveUp(params.x),
    "MoveDown": (params) => moveDown(params.x)
  }

  let params = {};
  if (paramString) {
    try {
      params = JSON.parse(paramString);
    } catch(e) {
      console.error("Invalid param JSON: ", paramString)
    }
  }

  // checking if command exists in the commandMap
  if (commandMap[commandName]) {
    commandMap[commandName](params);
  } else {
    console.log("unknown command: ", commandName," ", params);
  }

}

