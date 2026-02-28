let mic, recorder, soundFile;
let initialise_audio = false;
// current voice command


let statusText = "";

// text or voice
let renderingMode = "voice";
let scene = "splash"
let isRecordingAudio = false;


// TODO add a win screen
// TODO add start screen
let isGameWon = false;




// block refresh 
window.addEventListener("keydown", function(e) {
  // prevent default for keys you use in p5
  if (['Space', 'KeyR', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
    e.preventDefault();
  }
});








// let currentLocation = location_0F_entrance_ground;
// let currentLocation;


// getAllActionsAsJSON();

// images
let image_0F_entrance;
let image_0F_clothes_shop;
let image_0F_storage;
let image_PLACEHOLDER;

// current menu action - NORMAL, TRAVEL, CRAFTING, COMBAT
let menu_mode = "NORMAL";

// crafting vars
let crafting_attempt_index = 0;
// varaible for knowing how many items are selected atm 
let crafting_items_selected = 0;
// empty item slots
let item1;
let item2;

// gloval actions always visible
let action_travel  = new Action(
    "Travel",
    "Travel to a new place, list all of the travel possibilites",
    ( player ) => {
      menu_mode = "TRAVEL";
    }
  )

let action_gobacktonormal  = new Action(
    "Go back to main list",
    "Go back to the main list of actions",
    ( player ) => {
      menu_mode = "NORMAL";

      // reset crafting 
      item1 = {}
      item2 = {}
      crafting_attempt_index = 0;
      crafting_items_selected = 0;
    }
  )

let action_crafting  = new Action(
    "Crafting",
    "Combine your items into some other new ones",
    ( player ) => {
      menu_mode = "CRAFTING";
      crafting_attempt_index = 0;
    }
  )

let action_use_item  = new Action(
    "Use item",
    "Try to use any items that you have",
    ( player ) => {
      menu_mode = "USE_ITEM";
    }
  )

// used to check if the brother can walk
let can_brother_walk = false;
// is the brother following the player
let is_brother_following = false;

  

function preload() {

  // images
  image_0F_entrance = loadImage('assets/img/0F_entrance.png');
  image_0F_clothes_shop = loadImage('assets/img/0F_clothes_store.png');
  image_0F_storage = loadImage('assets/img/0F_storage.png');
  image_PLACEHOLDER = loadImage('assets/img/placeholder.jpg')

  // fonts
  fontFira = loadFont('assets/font/fira-light.ttf');
  fontFiraRegular = loadFont('assets/font/fira-regular.ttf');
}


function setup() {
  console.log("1 - setup started");
  initialiseLocations();
  console.log("2 - locations done");
  setupRecipes();
  console.log("3 - recipes done");
  
  game.currentLocation = game.locations.location_2F_rooftop;
  console.log("4 - current location set");

  noStroke();
  let sceneCanvas = createCanvas(windowWidth, windowHeight);
  console.log("5 - canvas created");

  mic = new p5.AudioIn();
  mic.start();
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  soundFile = new p5.SoundFile();
  console.log("6 - audio done");
}

function draw() {

  let main_box_offset = 375;

  // rendering
  background("#FAF9F7");

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
  main_box_offset += 200;

  // Possible actions header

  if (renderingMode == "text") {

    textFont("DIN Offc");
    textSize(24)

    if (menu_mode === "NORMAL") {
      text("Select action", 40, main_box_offset + 40);
    }
    if (menu_mode === "TRAVEL") {
      text("Select destination", 40, main_box_offset + 40);
    }

  if (menu_mode === "USE_ITEM") {
      text("Select the item you want to use on the right", 40, main_box_offset + 40);
    }

    if (menu_mode === "CRAFTING") {
      text("Select 2 items on the right", 40, main_box_offset + 40);
    }
    
    main_box_offset += 46;

  }

  if (renderingMode == "voice") {
    if (isRecordingAudio == false) {
      text("Press R and say your command", 40, main_box_offset + 40);
    }
    if (isRecordingAudio) {
       text("Listening...", 40, main_box_offset + 40);
    }
    
  }



  // all of the possible actions text

  textFont(fontFiraRegular);
  textSize(12);

  let availableActions = [];

  if (menu_mode == "NORMAL") {
    availableActions.push(action_travel);
    availableActions.push(action_crafting);
    availableActions.push(action_use_item);

    // console.log(game.currentLocation.actions);
    availableActions.push(...game.currentLocation.actions)
    // availableActions.push( game.currentLocation.getNormalActions());
    // console.log(availableActions);

  }

  if (menu_mode == "TRAVEL") {

    availableActions.push(action_gobacktonormal);

    // let availableActions = game.currentLocation.generateTravelActions();
    availableActions.push(...game.currentLocation.generateTravelActions())


  }

  if (menu_mode === "USE_ITEM") {
    availableActions.push(action_gobacktonormal);

        // inventory text rendering
    textStyle(NORMAL);
    textFont("DIN Offc");
    textSize(24)

    
    text("Inventory", 1100, 375 + 10)

    textFont(fontFira);
    textSize(12)

  
  for (let i = 1; i < player.inventory.length +1; i++) {
    let itemString = player.inventory[i -1].name;

    // showing the selected item in grey
    if (player.inventory[i -1]== item1) {
      // console.log("MATCH");
      textFont(fontFiraRegular);
      fill("GREY");
    }
    else {
      fill("BLACK");
      textFont(fontFira);
    }

    // if this is the item at the cursour
    if(i -1 == crafting_attempt_index){
      textFont(fontFiraRegular);
      text(">", 1090, 390 + i * 20);
      text(itemString, 1100, 390 + i * 20);
    } else {
       textFont(fontFira);
       text(itemString, 1100, 390 + i * 20);
    }
   
  }
}



  if (menu_mode == "CRAFTING") {
     availableActions.push(action_gobacktonormal);

     // draw selection for the first item
     // draw selection for the second item
       // status text 
    textStyle(ITALIC);
    textFont(fontFiraRegular);
    text(statusText, 40, 800)


    // inventory text rendering
    textStyle(NORMAL);
    textFont("DIN Offc");
    textSize(24)

    
    text("Inventory", 1100, 375 + 10)

    textFont(fontFira);
    textSize(12)

  
  for (let i = 1; i < player.inventory.length +1; i++) {
    let itemString = player.inventory[i -1].name;

    if (player.inventory[i -1]== item1) {
      // console.log("MATCH");
      textFont(fontFiraRegular);
      fill("GREY");
    }
    else {
      fill("BLACK");
      textFont(fontFira);
    }

    // if this is the item at the cursour
    if(i -1 == crafting_attempt_index){
      textFont(fontFiraRegular);
      text(">", 1090, 390 + i * 20);
      text(itemString, 1100, 390 + i * 20);
    } else {
       textFont(fontFira);
       text(itemString, 1100, 390 + i * 20);
    }

   
    
  }


  } else {

    // status text 
    textStyle(ITALIC);
    textFont(fontFiraRegular);
    text(statusText, 40, 800)


    // inventory text rendering
    textStyle(NORMAL);
    textFont("DIN Offc");
    textSize(24)
    text("Inventory", 1100, 375 + 10)

    textFont(fontFira);
    textSize(12)

    
    for (let i = 1; i < player.inventory.length +1; i++) {
      let itemString = player.inventory[i -1].name;
      // console.log(itemString);
      text(itemString, 1100, 390 + i * 20);
      
    }

  }

  // let availableActions = game.currentLocation.getAllActions();




  // default acitons rendering mode agnostic
  textFont(fontFira);

  if (renderingMode == "text") {
    for (let i = 1; i < availableActions.length +1; i++) {
      let actionString = i + ") " + availableActions[i -1].name;
      text(actionString, 40, main_box_offset + i * 20);
  }

  }



 
  


  
}



// player input
function keyPressed() {

  console.log("key pressed:", key, keyCode);

  let num = parseInt(key);

  // only if 1 to 10
  if (!isNaN(num) && num >= 1 && num <= 10) {
    executeAction(num);
  }

  if (key === "r") {
    if (!initialise_audio) {
      initialiseAudio()
      isRecordingAudio = true;
      return false;
    }
    else {
      startRecording();
      isRecordingAudio = true;
      return false;
    }
  }
  if (key === "f") {
    let fs = fullscreen();
    fullscreen(!fs);
  }

  // rendering mode
  if (key === "p") {
    renderingMode = "text";
  }
  if (key === "l") {
    renderingMode = "voice";
  }

  // item selection for crafting
  if (keyCode === DOWN_ARROW && menu_mode === "CRAFTING") {
    if (crafting_attempt_index < player.inventory.length -1) {
      crafting_attempt_index +=1;
      console.log(crafting_attempt_index);

    }
    
    
  }
  if (keyCode === UP_ARROW && menu_mode === "CRAFTING") {
    if (crafting_attempt_index >= 1 ) {
      crafting_attempt_index -=1;
      console.log(crafting_attempt_index);
    }
  }

  

  // item 1
  if (keyCode === ENTER && menu_mode === "CRAFTING" && crafting_items_selected == 0) {
  
    crafting_items_selected = 1;
    item1 = player.inventory[crafting_attempt_index];
    // console.log(item1);
    return false
  }

  // item 2
  if (keyCode === ENTER && menu_mode === "CRAFTING" && crafting_items_selected == 1) {
  
    console.log("second item");
    crafting_items_selected = 2;
    item2 = player.inventory[crafting_attempt_index];
    // console.log(item2);
    const craftSuccess = game.craftingSystem.attemptCraft(item1,item2, player);
    console.log(craftSuccess.success);
    if (craftSuccess.success) {
      statusText = "Crafting successful! You've made " + craftSuccess.result;
      item1 = {};
      item2 = {};
      crafting_attempt_index = 0;
      crafting_items_selected = 0;
      menu_mode = "NORMAL";  

    } else {
      statusText = "These items can't be combined...  ";
      item1 = {};
      item2 = {};
      crafting_attempt_index = 0;
      crafting_items_selected = 0;
      

    }

  }

    // item selection for item use
  if (keyCode === DOWN_ARROW && menu_mode === "USE_ITEM") {
    if (crafting_attempt_index < player.inventory.length -1) {
      crafting_attempt_index +=1;
      console.log(crafting_attempt_index);

    }
    
    
  }
  if (keyCode === UP_ARROW && menu_mode === "USE_ITEM") {
    if (crafting_attempt_index >= 1 ) {
      crafting_attempt_index -=1;
      console.log(crafting_attempt_index);
    }
  }

  if (keyCode === ENTER && menu_mode === "USE_ITEM") {
    tryUseItemInPlace(player.inventory[crafting_attempt_index])
  }



}



function keyReleased() {
  if (key === "r") {
    stopRecording();
    // runCommand(voice_command);
    isRecordingAudio = false;
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
// sending the sound to the server
async function sendSound() {
  console.log("sending sound to server");
  let soundBlob = soundFile.getBlob(); // p5.SoundFile blob

  let formData = new FormData();
  formData.append('audio_file', soundBlob, 'recording.wav'); // name must match FastAPI

  // TODO pass inventory and possible locations
  print(getContext())
  let myContext = getContext();

  // api_string = "http://127.0.0.1:8000/process_audio?user_context=" + myContext

  // TODO FIX THE LOCALHOST
  
  // api running on the MacBook
  api_string = "http://100.82.236.65:8000/process_audio?user_context=" + myContext

  try {
    const response = await fetch(api_string, {
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

  // Helper function to find item in inventory by name (case-insensitive)
  const findItemInInventory = (itemName) => {
    return player.inventory.find(item => 
      item.name.toLowerCase() === itemName.toLowerCase()
    );
  };

  // Helper function to find action by partial name match
  const findActionByName = (actionName) => {
    return game.currentLocation.actions.find(action =>
      action.name.toLowerCase().includes(actionName.toLowerCase())
    );
  };

  // mapping voice commands
  const commandMap = {
    "Travel": () => {
      const destinationName = params.destination.toLowerCase();
      // Find the connected location by name (case-insensitive)
      const destination = game.currentLocation.connections.find(loc => 
        loc.name.toLowerCase().includes(destinationName) ||
        destinationName.includes(loc.name.toLowerCase())
      );
      
      if (destination) {
        game.currentLocation = destination;
        console.log("You travel to " + destination.name);
        statusText = "You traveled to " + destination.name;
        menu_mode = "NORMAL";
      } else {
        console.log("Cannot travel to " + destinationName + " from here.");
        statusText = "Cannot travel to " + params.destination + " from here.";
      }
    },

    "CraftItems": () => {
      const item1Name = params.item1;
      const item2Name = params.item2;
      
      // Find items in inventory
      const craftItem1 = findItemInInventory(item1Name);
      const craftItem2 = findItemInInventory(item2Name);
      
      if (!craftItem1) {
        statusText = "You don't have " + item1Name + " in your inventory.";
        console.log(statusText);
        return;
      }
      
      if (!craftItem2) {
        statusText = "You don't have " + item2Name + " in your inventory.";
        console.log(statusText);
        return;
      }
      
      // Attempt crafting
      const craftSuccess = game.craftingSystem.attemptCraft(craftItem1, craftItem2, player);
      
      if (craftSuccess.success) {
        statusText = "Crafting successful! You've made " + craftSuccess.result;
        console.log(statusText);
      } else {
        statusText = "These items can't be combined: " + item1Name + " and " + item2Name;
        console.log(statusText);
      }
    },

    "UseItem": () => {
      const itemName = params.itemName;
      const item = findItemInInventory(itemName);
      
      if (!item) {
        statusText = "You don't have " + itemName + " in your inventory.";
        console.log(statusText);
        return;
      }
      
      // Try to use the item at current location
      const success = tryUseItemInPlace(item);
      
      if (success) {
        console.log("Successfully used " + itemName);
      } else {
        console.log("Cannot use " + itemName + " here.");
      }
    },

    "PickUpItem": () => {
      const itemName = params.itemName.toLowerCase();
      
      // Find matching action (e.g., "Pick up key" for "key")
      const pickupAction = game.currentLocation.actions.find(action =>
        action.name.toLowerCase().includes("pick up") &&
        action.name.toLowerCase().includes(itemName)
      );
      
      if (pickupAction) {
        pickupAction.execute(player);
        console.log("Picked up " + itemName);
      } else {
        statusText = "Cannot find " + itemName + " to pick up here.";
        console.log(statusText);
      }
    },

    // "LookAround": () => {
    //   const lookAction = findActionByName("look around");
    //   if (lookAction) {
    //     lookAction.execute(player);
    //   } else {
    //     statusText = "You look around. " + game.currentLocation.description;
    //     console.log(statusText);
    //   }
    // },

    // "CheckInventory": () => {
    //   if (player.inventory.length === 0) {
    //     statusText = "Your inventory is empty.";
    //   } else {
    //     const itemNames = player.inventory.map(item => item.name).join(", ");
    //     statusText = "You have: " + itemNames;
    //   }
    //   console.log(statusText);
    // }
  };

  if (commandMap[commandName]) {
    commandMap[commandName]();
  } else {
    console.log("Unknown command: " + commandName);
    statusText = "I didn't understand that command.";
  }
}


function executeAction(i) {
  let availableActions = [];

  if (menu_mode === "NORMAL") {
    availableActions.push(action_travel);
    availableActions.push(action_crafting);
    availableActions.push(action_use_item);
    availableActions.push(...game.currentLocation.actions);
  } else if (menu_mode === "TRAVEL") {
    availableActions.push(action_gobacktonormal);
    availableActions.push(...game.currentLocation.generateTravelActions());
  } else if (menu_mode === "USE_ITEM") {
    availableActions.push(action_gobacktonormal)
  }
  
  else if (menu_mode === "CRAFTING") {
    availableActions.push(action_gobacktonormal);
  }

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




function tryUseItemInPlace(item){
  // try to do all the item Actions in the current place

  console.log(game.currentLocation.itemActions.length)
  for (let i = 0; i < game.currentLocation.itemActions.length ; i++) {

    // loop each action and check if the item in requirements

    let currentItemAction = game.currentLocation.itemActions[i];

    console.log("Checking action:", currentItemAction.name);
    console.log("Required item:", currentItemAction.requiredItem);
    console.log("Current item:", item);


    if (currentItemAction.itemsNeeded === item) {

      console.log("ITEM MATCH")
      console.log(currentItemAction);

      currentItemAction.execute(player);
      menu_mode = "NORMAL";
      crafting_attempt_index = 0;
      
      return true;
      
    }
  }
  statusText = "You can't use " + item.name + " here.";
  menu_mode = "NORMAL";
  return false
 }


 function getContext() {
  var player_context = {};
  player_context.possibleLocations = game.currentLocation.connections.map(loc => loc.name);
  player_context.inventory = player.inventory.map(item => item.name);
  print(player_context);
  return JSON.stringify(player_context);
 }



 // text rendering

 function drawTextUI() {
  
 }


