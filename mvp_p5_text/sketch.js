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


let player = { inventory: [] };

// bunker actions

let pickUpKey  = new Action(
  "Pick up key",
  "A rusty key lies on the floor",
  ( player ) => {
    player.inventory.push("key")
    console.log("You picked up the key!");
    location_bunker.removeAction(pickUpKey);
  }
)
let lookAround  = new Action(
  "Look around yourself",
  "This place needs a better look doesn't it?",
  ( player ) => {
    // player.inventory.push("key")
    console.log("You looked around");
  }
)

// house actions

let openTheSafe  = new Action(
  "Try to open the safe",
  "This is one hefty box isn't it?",
  ( player ) => {
    if ( player.inventory.includes("key")) {
      console.log("you opened the box")
    }
    // player.inventory.push("key")
    console.log("You looked around");
  }
)




let location_house = new Place("House", "An old falling apart house");
let location_bunker = new Place("Bunker", "This is an abandoned bunker");


location_house.connections = [location_bunker];
location_bunker.connections = [location_house];


location_bunker.actions = [pickUpKey, lookAround];
location_house.actions = [openTheSafe];

location_bunker.actions.push




console.log(location_bunker);


let currentLocation = location_bunker;

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


  textSize(30);
  text(currentLocation.name, 50, 50);

  textSize(15)
  text(currentLocation.description, 50, 90);

  text("Possible actions:", 50, 150);

  let availableActions = currentLocation.getAllActions();

  for (let i = 1; i < availableActions.length +1; i++) {
    let actionString = i + ") " + availableActions[i -1].name;
    text(actionString, 50, 150 + i * 30);
  }




  
}




function keyPressed() {

  let num = parseInt(key);

  // only if 1 to 10
  if (!isNaN(num) && num >= 1 && num <= 10) {
    executeAction(num);
  }

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

function executeAction(i) {
  print("1")
  let availableActions = currentLocation.getAllActions();
  const action = availableActions[i - 1];
  if (!action) return;
  action.execute(player);
}