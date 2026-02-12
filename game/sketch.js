let mic, recorder, soundFile;
let initialise_audio = false;
// current voice command


let statusText = "";

// text or voice
let renderingMode = "voice";
let scene = "splash"
let isRecordingAudio = false;




// block refresh 
window.addEventListener("keydown", function(e) {
  // prevent default for keys you use in p5
  if (['Space', 'KeyR', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
    e.preventDefault();
  }
});


// player inventory
let player = { inventory: [] };

let craftingSystem = new CraftingSystem();


// master game object
let game = {
  actions: {},
  locations: {},
  currentLocation: null,
  items: {},
  craftingSystem: craftingSystem
};


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


  initialiseLocations();
  game.currentLocation = game.locations.location_0F_entrance_ground

  // debug
  // player.inventory.push(game.items.Pistol);
  // player.inventory.push(game.items.Silencer);

  console.log(player.inventory);
  

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
  main_box_offset += 140;

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

    "LookAround": () => {
      const lookAction = findActionByName("look around");
      if (lookAction) {
        lookAction.execute(player);
      } else {
        statusText = "You look around. " + game.currentLocation.description;
        console.log(statusText);
      }
    },

    "CheckInventory": () => {
      if (player.inventory.length === 0) {
        statusText = "Your inventory is empty.";
      } else {
        const itemNames = player.inventory.map(item => item.name).join(", ");
        statusText = "You have: " + itemNames;
      }
      console.log(statusText);
    }
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


// helper function for adding items
function addItem(item) {
  game.items[item.name] = item;
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

function initialiseLocations() {
  
  // init all of the items
  let key = new Item(
    "Key",
    "Rusty key",
  )

  let pistol = new Item(
    "Empty pistol",
    "Old trusted pistol with no magazine inside",
    "Gun Parts"
  )

  let silencer = new Item(
    "Silencer",
    "Makes the gun silent",
    "Gun Parts"
  )

  let silencedHandgun = new Item(
    "Silenced Handgun",
    "Makes the gun silent",
    "Gun Parts"
  )
  
  let crowbar = new Item(
    "Crowbar",
    "Sturdy crowbar",
    "Metal scrap"
  )

  let magazine = new Item(
    "Magazine",
    "Gun magazine full of bullets",
    "Bullets and magazine"
  )

  let keycard = new Item(
    "Keycard",
    "Key card for the building workers",
    "Plastic"
  )

  let rope = new Item(
    "Rope",
    "Long piece of thick rope",
    "Strands"
  )

  let legStabiliser = new Item(
    "Leg Stabiliser",
    "Medical device that allows to hold the leg in place",
    "Strands"
  )

  let lockedGasolineTank = new Item(
    "Locked Gasoline Tank",
    "A full gasoline tank with a cap that's too hard to open by hand",
    "Gasoline"
  )

  let matchsticks = new Item(
    "Matchsticks",
    "Small pack of 32 matchsticks",
    "wood"
  )

  // crafting items
  let makeshiftBomb = new Item(
    "Makeshift Bomb",
    "Gasoline tank with a fuse that can blow up any obstacle",
    "Gasoline"
  )
  
  let armedPistol = new Item(
    "Armed pistol",
    "Gasoline tank with a fuse that can blow up any obstacle",
    "magazine"
  )
  
  let openCanister = new Item(
    "Open Gasoline Tank",
    "Gasoline tank with a functional car opening ",
    "Gasoline"
  )
  




  // -1F actions

  let pickUpMagazine  = new Action(
    "Pick up magazine",
    "Pick up the Magazine laying on the floor",
    ( player ) => {
      player.inventory.push(magazine)
      statusText = "You picked up the Magazine!"
      game.locations.location_minus1F_security_office.removeAction(pickUpMagazine);
    
    }
  )

  let pickUpLockedGasolineTank  = new Action(
    "Pick up Locked Gasoline Tank",
    "Pick up the Locked Gasoline Tank laying on the floor",
    ( player ) => {
      player.inventory.push(lockedGasolineTank)
      statusText = "You picked up the Locked Gasoline Tank!"
      game.locations.location_0F_restaurant.removeAction(pickUpLockedGasolineTank);
    
    }
  )

  let pickUpKey  = new Action(
    "Pick up key",
    "A rusty key lies on the floor",
    ( player ) => {
      player.inventory.push(key)
      console.log("You picked up the key!");
      statusText = "You picked up the key!"
      game.locations.location_minus1F_car_sport.removeAction(pickUpKey);

    }
  )



  // 0F actions

  let pickUpCrowbar  = new Action(
    "Pick up crowbar",
    "Pick up the crowbar on the floor",
    ( player ) => {
      player.inventory.push(crowbar)
      statusText = "You picked up the crowbar!"
      game.locations.location_0F_storage_shed.removeAction(pickUpCrowbar);
    
    }
  )

  let pickUpKeyCard  = new Action(
    "Pick up Key Card",
    "Pick up the Key Card on the floor",
    ( player ) => {
      player.inventory.push(keycard)
      statusText = "You picked up the Key Card!"
      game.locations.location_0F_restaurant.removeAction(pickUpKeyCard);
    
    }
  )

  // 1F actions
  let pickUpLegStabiliser  = new Action(
    "Pick up Leg Stabiliser",
    "Pick up the Leg Stabiliser on the floor",
    ( player ) => {
      player.inventory.push(legStabiliser)
      statusText = "You picked up the Leg Stabiliser!"
      game.locations.location_1F_pharmacy.removeAction(pickUpLegStabiliser);
    
    }
  )

  let pickUpPistol  = new Action(
    "Pick up the Pistol",
    "Pick up the Pistol that's on the floor",
    ( player ) => {
      player.inventory.push(pistol)
      statusText = "You picked up the Pistol!"
      game.locations.location_1F_pharmacy.removeAction(pickUpPistol);
    
    }
  )

  let pickUpRope  = new Action(
    "Pick up the Rope",
    "Pick up the Rope that's on the floor",
    ( player ) => {
      player.inventory.push(rope)
      statusText = "You picked up the Rope!"
      game.locations.location_1F_hidden_storage.removeAction(pickUpRope);
    
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

  let openClothesDoor  = new Action(
    "Open the door to the clothes store",
    "Use the crowbar to open the doors to the store",
    ( player ) => {
      // player.inventory.push("key")
      game.locations.location_0F_corridor.connections.push(game.locations.location_0F_clothes_store)
      game.locations.location_0F_clothes_store.connections.push(game.locations.location_0F_corridor)
      statusText = "You managed to unlock the doors to the corridor";
    },
    crowbar
  )

  let helpBrother  = new Action(
    "Pick up your brother",
    "Pick up your brother from the floor",
    ( player ) => {

      if (can_brother_walk == true) {
        is_brother_following = true;
        statusText = "Your brother managed to stand up and is following you!";
      }
      else {
        statusText = "Your brother can't stand on his own. He needs help with his leg";

      }
      
    }
  )


  // 0F locations


  // location Ground Entrance 
  game.locations.location_0F_entrance_ground = new Place(
    "Ground Entrance",
    "You stand at the ground entrance of an abandoned shopping mall, where cracked tiles lead to wide glass doors stuck half open. The air smells of dust and old plastic, and faint light filters through dirty skylights above the empty atrium. Faded posters hang crooked on the walls, advertising sales that ended years ago, while escalators sit frozen in place. To one side, a dark clothes store waits behind a bent metal shutter, and nearby a narrow path leads toward a small storage shed used long ago for deliveries. Wind pushes litter across the floor. Near the entrance, a single key lies on the ground, dull but intact, as if dropped in a hurry during the mall's final chaotic days.",
    "0F",
    image_0F_entrance) 

  // location Entrance Shed
  game.locations.location_0F_storage_shed = new Place(
    "Storage Shed",
    "You step into a storage shed tucked behind the abandoned shopping mall, once used for deliveries and maintenance. The space is narrow and cluttered, with metal shelves lining the walls and cardboard boxes collapsed from moisture and age. Dust hangs in the air, and the smell of rust and damp concrete is strong. A flickering utility light casts uneven shadows across old cleaning equipment and broken carts. The ground entrance of the mall is just outside, reachable through a dented door that no longer closes properly. Footprints are visible in the dirt, suggesting recent movement. On the floor near a tipped crate lies a heavy crowbar, scratched and worn, but still solid enough to be useful in this silent space.",
    "0F",
    image_0F_storage) 

  // location Clothes Store
  game.locations.location_0F_clothes_store = new Place(
    "Clothes Store",
    "You step into a clothes store inside the abandoned shopping mall, where rows of empty racks stretch across the floor. The lights are off, but dim daylight seeps in from the ground entrance just outside, reflecting off dusty mirrors along the walls. Torn price tags still hang from shelves, and piles of discarded hangers crunch underfoot. The air feels stale, mixed with the faint smell of old fabric and mold. Changing rooms line the back wall, their curtains half torn and doors slightly open, revealing nothing but darkness inside. The store feels oddly untouched compared to the rest of the mall, yet clearly stripped of anything useful. From here, the ground entrance remains the only clear way back out.",
    "0F",
    image_0F_clothes_shop) 

  // location 0F corridor
  game.locations.location_0F_corridor = new Place(
    "Small Corridor",
    "The link between stores linking food court with stores on ground floor",
    "0F",
    image_PLACEHOLDER) 

  // location food court
  game.locations.location_0F_food_court = new Place(
    "Food court",
    "Big hall dedicated to eating food from the nearby restaurants",
    "0F",
    image_PLACEHOLDER ) 

  // location living space
  game.locations.location_0F_living_space = new Place(
    "Fishing Store",
    "Small dark space turned into a living quarters for someone",
    "0F",
    image_PLACEHOLDER ) 

  // location elevator 0F
  game.locations.location_0F_elevator = new Place(
    "Elevator",
    "Open entrance to an elevaror shaft going both up and down. The cabin is missing",
    "0F",
    image_PLACEHOLDER)
    
  game.locations.location_0F_restaurant = new Place(
    "Greek Fast Food restaurant",
    "This is an fast food restaurant nothing special here outside of food on the floor",
    "0F",
    image_PLACEHOLDER )
    
  game.locations.location_0F_bubble_tea = new Place(
    "Bubble Tea Store",
    "There's nothing here outside of empty cups on the floor",
    "0F",
    image_PLACEHOLDER )
    
  game.locations.location_0F_stairs = new Place(
    "Stairway going up",
    "Just stairs going up one floor",
    "0F",
    image_PLACEHOLDER ) 

  game.locations.location_0F_service_stairs = new Place(
  "Service stairs 0F",
  "These seem to be only for workers of the building",
  "0F",
  image_PLACEHOLDER)

  // 1F locations
  game.locations.location_1F_elevator = new Place(
    "Elevator",
    "Open entrance to an elevaror shaft going both up and down. The cabin is missing",
    "1F",
    image_PLACEHOLDER)


  game.locations.location_1F_pharmacy = new Place(
    "Electronics store",
    "Store holding up a lot fo electronic equipment",
    "1F",
    image_PLACEHOLDER)

  game.locations.location_1F_bathroom = new Place(
    "Bathroom",
    "Big bathroom place with ample room, seems like the cleanest place in the whole building",
    "1F",
    image_PLACEHOLDER)

  game.locations.location_1F_lounge = new Place(
    "Lounge",
    "Big empty hallway with ample space and relaxing chairs connecting multiple stores",
    "1F",
    image_PLACEHOLDER)

  game.locations.location_1F_stairs = new Place(
    "Stairway going down",
    "Musty stairs going down one floor",
    "1F",
    image_PLACEHOLDER)

  game.locations.location_1F_korean_store = new Place(
    "Korean snack store",
    "Plenty of korean food all around",
    "1F",
    image_PLACEHOLDER)

  game.locations.location_1F_gun_store = new Place(
    "Gun store",
    "There used to be guns here, it seems like they're all gone",
    "1F",
    image_PLACEHOLDER)

  game.locations.location_1F_hidden_storage = new Place(
  "Hidden storage room",
  "Special equipment inside",
  "1F",
  image_PLACEHOLDER)

  game.locations.location_1F_food_market = new Place(
    "Food supermarket",
    "Despite the appocalypse there's still some products on the shelves",
    "1F",
    image_PLACEHOLDER)
  
  game.locations.location_1F_service_stairs = new Place(
    "Service stairs 1F",
    "These seem to be only for workers of the building",
    "1F",
    image_PLACEHOLDER)

  


  // 2F locations

  game.locations.location_2F_service_stairs = new Place(
    "Service stairs",
    "These seem to be only for workers of the building",
    "2F",
    image_PLACEHOLDER)

  game.locations.location_2F_rooftop = new Place(
    "Rooftop",
    "Empty roof with a lonely tent in the distance",
    "2F",
    image_PLACEHOLDER)

  game.locations.location_2F_tent = new Place(
    "Tent",
    "Small camping tent with a corpse inside",
    "2F",
    image_PLACEHOLDER)


  // locations -1F 


  game.locations.location_minus1F_elevator = new Place(
    "Elevator",
    "Open entrance to an elevaror shaft going going up",
    "-1F",
    image_PLACEHOLDER)

  game.locations.location_minus1F_service_stairs = new Place(
    "Service stairs",
    "These seem to be only for workers of the building",
    "-1F",
    image_PLACEHOLDER)

  game.locations.location_minus1F_parking = new Place(
    "Parking area",
    "There's very little around here, most cars are gone",
    "-1F",
    image_PLACEHOLDER)

  game.locations.location_minus1F_security_office = new Place(
    "Security Office",
    "Empty security office, there's no one inside",
    "-1F",
    image_PLACEHOLDER)

  game.locations.location_minus1F_entrance = new Place(
    "Garage door",
    "Garage door, seems to be locked",
    "-1F",
    image_PLACEHOLDER)
    
  game.locations.location_minus1F_car_sport = new Place(
    "Sport car",
    "The windows are broken",
    "-1F",
    image_PLACEHOLDER)

  game.locations.location_minus1F_car_4x4 = new Place(
    "4x4 car",
    "This one seems to be not in the worst condition",
    "-1F",
    image_PLACEHOLDER)





  // connections 0F

  game.locations.location_0F_entrance_ground.connections = [game.locations.location_0F_storage_shed, game.locations.location_0F_clothes_store];

  game.locations.location_0F_storage_shed.connections = [game.locations.location_0F_entrance_ground];
  game.locations.location_0F_clothes_store.connections = [game.locations.location_0F_entrance_ground];

  game.locations.location_0F_corridor.connections = [game.locations.location_0F_food_court, game.locations.location_0F_living_space];

  game.locations.location_0F_living_space.connections = [game.locations.location_0F_corridor, game.locations.location_0F_service_stairs];

  game.locations.location_0F_food_court.connections = [game.locations.location_0F_corridor, game.locations.location_0F_elevator, game.locations.location_0F_restaurant, game.locations.location_0F_bubble_tea, game.locations.location_0F_stairs];

  game.locations.location_0F_elevator.connections = [game.locations.location_0F_food_court];

  game.locations.location_0F_restaurant.connections = [game.locations.location_0F_food_court];

  game.locations.location_0F_bubble_tea.connections = [game.locations.location_0F_food_court];

  game.locations.location_0F_stairs.connections = [game.locations.location_1F_stairs, game.locations.location_0F_food_court]

  game.locations.location_0F_service_stairs.connections = [game.locations.location_0F_living_space, game.locations.location_1F_service_stairs, game.locations.location_minus1F_service_stairs]



    // connections 1F

  game.locations.location_1F_elevator.connections = [game.locations.location_0F_elevator, game.locations.location_1F_lounge];

  game.locations.location_1F_lounge.connections = [game.locations.location_1F_pharmacy, game.locations.location_1F_bathroom, game.locations.location_1F_stairs, game.locations.location_1F_korean_store, game.locations.location_1F_food_market];

  game.locations.location_1F_pharmacy.connections = [game.locations.location_1F_lounge];

  game.locations.location_1F_bathroom.connections = [game.locations.location_1F_lounge];

  game.locations.location_1F_korean_store.connections = [game.locations.location_1F_lounge, game.locations.location_1F_gun_store, game.locations.location_1F_service_stairs];

  game.locations.location_1F_gun_store.connections = [game.locations.location_1F_korean_store]; 

  game.locations.location_1F_food_market.connections = [game.locations.location_1F_lounge];

  game.locations.location_1F_stairs.connections = [game.locations.location_0F_stairs, game.locations.location_1F_lounge];

  game.locations.location_1F_service_stairs.connections = [game.locations.location_1F_hidden_storage, game.locations.location_0F_service_stairs, game.locations.location_1F_korean_store];

  game.locations.location_1F_hidden_storage.connections = [game.locations.location_1F_service_stairs];


  // connections 2F 
  game.locations.location_2F_service_stairs.connections = [game.locations.location_2F_rooftop];

  game.locations.location_2F_rooftop.connections = [game.locations.location_2F_service_stairs, game.locations.location_2F_tent];

  game.locations.location_2F_tent.connections = [game.locations.location_2F_rooftop];

  // connections -1F 
  game.locations.location_minus1F_elevator.connections = [game.locations.location_minus1F_parking, game.locations.location_0F_elevator];

  game.locations.location_minus1F_service_stairs.connections = [game.locations.location_0F_service_stairs, game.locations.location_minus1F_parking];

  game.locations.location_minus1F_parking.connections = [game.locations.location_minus1F_elevator, game.locations.location_minus1F_service_stairs, game.locations.location_minus1F_car_sport, game.locations.location_minus1F_car_4x4, game.locations.location_minus1F_security_office, game.locations.location_minus1F_entrance];

  game.locations.location_minus1F_car_sport.connections = [game.locations.location_minus1F_parking];

  game.locations.location_minus1F_car_4x4.connections = [game.locations.location_minus1F_parking];

  game.locations.location_minus1F_security_office.connections = [game.locations.location_minus1F_parking];


  // -1F actions
  game.locations.location_minus1F_car_sport.actions = [pickUpKey, pickUpLockedGasolineTank];
  game.locations.location_minus1F_security_office.actions = [pickUpMagazine];

  // 0F actions
  // game.locations.location_0F_entrance_ground.actions = [pickUpKey];
  game.locations.location_0F_storage_shed.actions = [pickUpCrowbar];

  game.locations.location_0F_clothes_store.itemActions = [openClothesDoor];

  game.locations.location_0F_restaurant.actions = [pickUpKeyCard];


  // 1F actions
  game.locations.location_1F_pharmacy.actions = [pickUpLegStabiliser];
  game.locations.location_1F_hidden_storage.actions = [pickUpRope];
  game.locations.location_1F_gun_store.actions = [pickUpPistol];
  game.locations.location_1F_food_market.actions = [helpBrother];

  // findable items
  addItem(key);
  addItem(pistol);
  addItem(silencer);
  addItem(silencedHandgun);
  addItem(crowbar);
  addItem(magazine);
  addItem(keycard);
  addItem(rope);
  addItem(legStabiliser);
  addItem(lockedGasolineTank);
  addItem(matchsticks);

  // crafting items
  addItem(makeshiftBomb);
  addItem(armedPistol);
  addItem(openCanister);





  // crafting recipes
  game.craftingSystem.addRecipe(pistol, silencer, silencedHandgun);
  
  game.craftingSystem.addRecipe(lockedGasolineTank, matchsticks, makeshiftBomb);
  game.craftingSystem.addRecipe(pistol, magazine, armedPistol);
  game.craftingSystem.addRecipe(lockedGasolineTank, crowbar, openCanister);

  }
