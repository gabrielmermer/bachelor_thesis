let mic, recorder, soundFile;
let initialise_audio = false;
// current voice command


let statusText;




// block refresh 
window.addEventListener("keydown", function(e) {
  // prevent default for keys you use in p5
  if (['Space', 'KeyR', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
    e.preventDefault();
  }
});


// player inventory
let player = { inventory: [] };

// master game object
let game = {
  actions: {},
  locations: {},
  currentLocation: null
};


// let currentLocation = location_0F_entrance_ground;
// let currentLocation;


// getAllActionsAsJSON();

// images
let image_0F_entrance;

function preload() {
  image_0F_entrance = loadImage('assets/img/entrance.png');
  image_0F_clothes_shop = loadImage('assets/img/0F_clothes_store.png');
  fontFira = loadFont('assets/font/fira-light.ttf');
  fontFiraRegular = loadFont('assets/font/fira-regular.ttf');
}


function setup() {


  initialiseLocations();
  game.currentLocation = game.locations.location_0F_entrance_ground
  

  noStroke();
  let sceneCanvas = createCanvas(windowWidth, windowHeight);

  



  mic = new p5.AudioIn();

  mic.start();
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  soundFile = new p5.SoundFile();

  // class testing
  
  console.log(game.currentLocation);
  console.log(game.locations.location_0F_food_court.floor);
  
  

}

function draw() {

  let main_box_offset = 375;

  // rendering
  background(220);

  // background image
  
  // image(image_0F_entrance,0,0, windowWidth,400,0,0,0,0,COVER);
  image(game.currentLocation.picture,0,0, windowWidth,400,0,0,0,0,COVER);


  // background card
  fill("#FAF9F7");
  rect(0, 340, windowWidth, 630, 20);

  fill("#27241D");

  textStyle(NORMAL);

  textFont('DIN Offc');

  
  // main location text
  textSize(48);
  text(game.currentLocation.name, 40, main_box_offset + 30);
  main_box_offset += 30;


  // floor number 
  textFont(fontFira);
  textSize(24)
  text(game.currentLocation.floor, 40, main_box_offset + 30);
  main_box_offset += 40;

  // Description text
  textFont(fontFiraRegular);
  textSize(12)

  text(game.currentLocation.description, 40, main_box_offset + 30, 900, 800);
  main_box_offset += 140;

  // Possible actions header

  textFont("DIN Offc");
  textSize(24)
  text("Select action", 40, main_box_offset + 40);
  main_box_offset += 46;

  // all of the possible actions text

  textFont(fontFiraRegular);
  textSize(12)

  let availableActions = game.currentLocation.getAllActions();

  for (let i = 1; i < availableActions.length +1; i++) {
    let actionString = i + ") " + availableActions[i -1].name;
    text(actionString, 40, main_box_offset + i * 20);
  }

  

  // status text 
  textStyle(ITALIC);
  textFont(fontFiraRegular);
  text(statusText, 40, 800)


  // inventory text
  textStyle(NORMAL);
  textFont("DIN Offc");
  textSize(24)
  text("Inventory", 1100, 375 + 10)
  


  
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
  if (key === "f") {
    let fs = fullscreen();
    fullscreen(!fs);
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

function runCommand(commandArray) {
  console.log("beginning to run command: ", commandArray);
  let [commandName, paramString] = commandArray;

  let params = {};
  if (paramString) {
    try {
      params = JSON.parse(paramString);
    } catch (e) {
      console.error("Invalid param JSON: ", paramString);
    }
  }

  // mapping voice commmands
  const commandMap = {
    "PickUpKey": () => pickUpKey.execute(player),
    "LookAround": () => lookAround.execute(player),
    "OpenTheSafe": () => openTheSafe.execute(player),
    "Travel": () => {
      const destinationName = params.destination;
      // find the connected location by name
      const destination = game.currentLocation.connections.find(loc => loc.name.toLowerCase() === destinationName);
      if (destination) {
        game.currentLocation = destination;
        console.log("You travel to " + destination.name);
        statusText = "";
      } else {
        console.log("Cannot travel to " + destinationName + " from here.");
      }
    }
  };

  if (commandMap[commandName]) {
    commandMap[commandName]();
  } else {
    console.log("unknown command: ", commandName, " ", params);
  }
}


function executeAction(i) {
  print("1")
  let availableActions = game.currentLocation.getAllActions();
  const action = availableActions[i - 1];
  if (!action) return;
  action.execute(player);
}

// function getAllActionsAsJSON() {
//   console.log(JSON.stringify(location_house.getAllActions()));
//   console.log(JSON.stringify(location_bunker.getAllActions()));
// }


window.onresize = function() {
  // assigns new values for width and height variables
  resizeCanvas(windowWidth, windowHeight + 30);
}

function initialiseLocations() {
  // bunker actions

  let pickUpKey  = new Action(
    "Pick up key",
    "A rusty key lies on the floor",
    ( player ) => {
      player.inventory.push("key")
      console.log("You picked up the key!");
      statusText = "You picked up the key!"
      location_bunker.removeAction(pickUpKey);
    }
  )
  let lookAround  = new Action(
    "Look around yourself",
    "This place needs a better look doesn't it?",
    ( player ) => {
      // player.inventory.push("key")
      console.log("You looked around");
      statusText = "You looked around, there's nothing interesting";
    }
  )


  // location Ground Entrance 
  game.locations.location_0F_entrance_ground = new Place(
    "Ground Entrance",
    "The Elysian Deep is a buried city-state, its central atrium plunging fifty stories deep under the glow of a colossal sunlamp. This artificial star illuminates terraced gardens and living quarters carved directly from the rock. A constant, low hum from the geothermal core vibrates through the ferro-concrete floors, a metallic heartbeat for this subterranean world. The meticulously recycled air carries the scent of sterile ozone and cultivated soil, a stark reminder that behind immense blast doors, this grim fortress is the only universe its weary people know.The Elysian Deep is a buried city-state, its central atrium plunging fifty stories deep under the glow of a colossal sunlamp. This artificial star illuminates terraced gardens and living quarters carved directly from the rock",
    "0F",
    image_0F_entrance) 

  // location Entrance Shed
  game.locations.location__0F_entrance_shed = new Place(
    "Storage Shed",
    "Small room with a few brooms, and shelves with cleaning supplies",
    "0F") 

  // location Entrance Shed
  game.locations.location_0F_clothes_store = new Place(
    "Clothes Store",
    "Big clothing store with a bunch of clothes all around on the floor",
    "0F",
    image_0F_clothes_shop) 

  // location 0F corridor
  game.locations.location_0F_corridor = new Place(
    "Small Corridor",
    "The link between stores linking food court with stores on ground floor",
    "0F") 

  // location food court
  game.locations.location_0F_food_court = new Place(
    "Food court",
    "Big hall dedicated to eating food from the nearby restaurants",
    "0F") 

  // location living space
  game.locations.location_0F_living_space = new Place(
    "Fishing Store",
    "Small dark space turned into a living quarters for someone",
    "0F") 

  // location elevator 0F
  game.locations.location_0F_elevator = new Place(
    "Elevator",
    "Open entrance to an elevaror shaft going both up and down. The cabin is missing",
    "0F") 

  // connections

  game.locations.location_0F_entrance_ground.connections = [game.locations.location__0F_entrance_shed, game.locations.location_0F_clothes_store];
  game.locations.location__0F_entrance_shed.connections = [game.locations.location_0F_entrance_ground];
  game.locations.location_0F_clothes_store.connections = [game.locations.location_0F_entrance_ground, game.locations.location_0F_corridor];
  game.locations.location_0F_corridor.connections = [game.locations.location_0F_food_court, game.locations.location_0F_living_space, game.locations.location_0F_clothes_store]
  game.locations.location_0F_living_space.connections = [game.locations.location_0F_corridor]
  game.locations.location_0F_food_court.connections = [game.locations.location_0F_corridor, game.locations.location_0F_elevator]
  game.locations.location_0F_elevator.connections = [game.locations.location_0F_food_court]





  // demo
  // location_house.connections = [location_bunker];
  // location_bunker.connections = [location_house];


  // location_bunker.actions = [pickUpKey, lookAround];
  // location_house.actions = [openTheSafe];
}