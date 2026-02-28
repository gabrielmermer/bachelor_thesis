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
  // game.currentLocation = game.locations.location_0F_entrance_ground
  game.currentLocation = game.locations.location_2F_rooftop;


  // debug
  // player.inventory.push(game.items.Pistol);
  player.inventory.push(game.items.Keycard);
  // player.inventory.push(game.items["Makeshift Bomb"]);
  player.inventory.push(game.items["Locked Gasoline Tank"]);
  player.inventory.push(game.items.Crowbar);
  player.inventory.push(game.items.Matchsticks);
  player.inventory.push(game.items["Empty pistol"]);
  player.inventory.push(game.items.Magazine);
  player.inventory.push(game.items.Rope);
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

  let pickUpMatchsticks = new Action(
    "Pick up Matchsticks",
    "A small pack of matchsticks on a shelf",
    ( player ) => {
        player.inventory.push(matchsticks)
        statusText = "You picked up the Matchsticks!"
        game.locations.location_1F_korean_store.removeAction(pickUpMatchsticks);
    }
)

  let getAwayInCar  = new Action(
    "Drive out of the mall",
    "Drive the car outside of the shopping mall",
    ( player ) => {
      // player.inventory.push("key")
      statusText = "Congratulations! You've won the game!";
    },
    
  )

  // let unlockShaftMinusOne  = new Action(
  //   "Unlock Shaft at Floor -1",
  //   "Drive the car outside of the shopping mall",
  //   ( player ) => {

  //     statusText = "You used the card to unlock the key shaft";
  //     // TODO open all shafts 
  //     game.locations.location_minus1F_elevator.removeAction(unlockShaftMinusOne);
  //   },
  //   keycard
  // )



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

  // broken atm
  let openShafts  = new Action(
    "Use the key to open the shaft door",
    "Use the metal key  to open the service stair door",
    ( player ) => {
      game.locations.location_0F_living_space.connections.push(game.locations.location_0F_service_stairs);
      game.locations.location_minus1F_parking.connections.push(game.locations.location_minus1F_service_stairs);
      statusText = "You opened all the doors in this shaft - you can now use the stairs";
    },
    key
  )

  let openElevators  = new Action(
    "Use the keycard to unlock the elevator",
    "Use the key card to open the elevator",
    ( player ) => {
      game.locations.location_0F_food_court.connections.push(game.locations.location_0F_elevator);
      game.locations.location_minus1F_parking.connections.push(game.locations.location_minus1F_elevator);
      game.locations.location_1F_lounge.connections.push(game.locations.location_1F_elevator);
      
      statusText = "You opened all the doors for the elevator - you can now use the building elevator";
    },
    keycard
  )

  let open2FDoor  = new Action(
    "Open the door on the top floor with armed gasoline tank",
    "Open the door on the top floor with armed gasoline tank",
    ( player ) => {
      game.locations.location_2F_service_stairs.connections.push(game.locations.location_2F_rooftop);      
      statusText = "You managed to blow up the doors to the roof!";
      game.craftingSystem.removeItem(makeshiftBomb, player);
    },
    makeshiftBomb
  )

  let open2FDoorGun  = new Action(
    "Open the door on the top floor with a gun",
    "Open the door on the top floor with an armed gun",
    ( player ) => {
      game.locations.location_2F_service_stairs.connections.push(game.locations.location_2F_rooftop);      
      statusText = "You managed to shoot through the locker to the roof!";
      game.craftingSystem.removeItem(makeshiftBomb, player);
    },
    armedPistol
  )

  let throwRope  = new Action(
    "Throw the rope off the rooftop",
    "Use the rope hung over to exit the building",
    ( player ) => {
     
      game.craftingSystem.removeItem(rope, player);
      statusText = "You managed to push the rope through the roof. It looks like it will hold.";
      game.locations.location_2F_exit.actions.push(ropeEscape);
      
      
    },
    rope
  )

  let ropeEscape  = new Action(
    "Use the rope to escape the building",
    "Use the rope hung over to exit the building",
    ( player ) => {
     
      if (is_brother_following == true) {
        game.currentLocation = game.locations.ropeEscape
        statusText = "You managed to push the rope through the roof. It looks like it will hold.";
        game.currentLocation = game.locations.location_2F_exit_win;
      } else {
        statusText = "Did you forget about your brother? You can't leave him behind";
      }

      
      
      
    },
    rope
  )

  let fuelCar  = new Action(
    "Use the canister to fuel the car and make it ready to go",
    "Use the rope hung over to exit the building",
    ( player ) => {
     
      statusText = "The car seems to be working. You can use it to drive now!";
      game.locations.location_minus1F_car_4x4.actions.push(carExit);
      game.craftingSystem.removeItem(openCanister, player);
      
    },
    openCanister
  )

  let carExit  = new Action(
    "Drive out of the building",
    "Use the car to drive out of the building",
    ( player ) => {
     
      if (is_brother_following == true) {
        statusText = "";
        isGameWon = true;
        game.currentLocation = game.locations.location_minus1F_exit_win;
      } else {
        statusText = "Did you forget about your brother? You can't leave him behind";
      }
      
      
    },
    
  )


  let helpBrother  = new Action(
    "Pick up your brother",
    "Pick up your brother from the floor",
    ( player ) => {

      if (can_brother_walk == true) {
        is_brother_following = true;
        statusText = "Your brother managed to stand up and is following you! You've also heard a an explosion downstairs..";
        // block main exit
        game.locations.location_0F_clothes_store.connections = [];
        game.locations.location_0F_clothes_store.description = "There's heaps of smoke here. Somehow the main entrance is just a pile of rubble now. You gotta find some other way out of the building now."
      }
      else {
        statusText = "Your brother can't stand on his own. He needs medical help with his leg.";

      }
      
    }
  )

    let fixBrotherLeg  = new Action(
    "Stabilise your brother leg",
    "Use the leg stabiliser to help out your brother be able to get up",
    ( player ) => {
      // player.inventory.push("key")
      game.locations.location_0F_corridor.connections.push(game.locations.location_0F_clothes_store)
      game.locations.location_0F_clothes_store.connections.push(game.locations.location_0F_corridor)
      statusText = "Your brother can stand on his own now! Your goal now is to somehow exit the building";
      
    },
    legStabiliser
  )
  


    // locations -1F 


  game.locations.location_minus1F_elevator = new Place(
    "Elevator -1F",
    "The elevator doors at this level have been pried open and wedged in place with a length of pipe that has since rusted into position. The shaft beyond them drops down into darkness below and climbs upward toward the floors above. The elevator cabin is somewhere up there — you can hear the faint creak of its cables when the air moves. Someone has been in this shaft before: crude footholds have been hammered into the concrete wall at regular intervals, and scorch marks near the base suggest a light source was used down here for a long time. The smell of rust and enclosed air rolls out of the opening. It's a climbable route to the ground floor if you're willing, or you can head back into the sprawl of the parking area. What's certain is that this shaft connects the floors — it's a route, even without the cabin.",
    "-1F",
    image_PLACEHOLDER)

  game.locations.location_minus1F_service_stairs = new Place(
    "Service stairs -1F",
    "A narrow stairwell sits behind a door marked with faded yellow safety tape, the kind of tape that has lost its adhesion on one side and hangs in a drooping flag across the frame. The door itself is heavy steel, hinged to swing outward, and the handle has been wrapped in grip tape by someone who used it often. Inside, the stairwell is plain — bare concrete walls, exposed conduit running up one side, a metal handrail bolted directly into the wall. The steps are solid underfoot, without the bounce or creak of the public stairways. This was built for function, not comfort. It connects up to the ground floor service corridor and down to the parking area below. On the wall, stencilled in block letters: AUTHORISED PERSONNEL ONLY. The letters are old and half-peeled, and whatever authority backed them is long gone",
    "-1F",
    image_PLACEHOLDER)

  game.locations.location_minus1F_parking = new Place(
    "Parking area",
    "A vast underground car park stretches out before you, the kind of space that was built to hold hundreds of vehicles but now feels like an abandoned cathedral. Most bays are empty, their painted lines fading into the grey concrete, each one a ghost of a car long since driven away. Oil stains spread across the floor in dark archipelagos, and the smell of old exhaust and damp stone hangs heavy in the recycled air. Concrete pillars march off in orderly rows under a ceiling fitted with strip lights, most of them dead, a few still flickering with a low, inconsistent hum that pulses every few seconds like a slow heartbeat. A dented security office sits in one corner, its reinforced glass window dark. Nearby, two cars remain — a battered sport car and a rugged 4x4 — both parked near the far wall as though their owners planned to return. The garage door leading outside is visible at the far end, a wall of corrugated metal separating this dead space from whatever waits beyond. On the wall near the parking entrance, a mounted panel catches your eye: it controls the building's elevator system. The casing is cracked, but the wiring behind it still looks intact. The right card might bring this whole thing back online.",
    "-1F",
    image_PLACEHOLDER)

  game.locations.location_minus1F_security_office = new Place(
    "Security Office",
    "A cramped room sits behind reinforced glass, the kind designed to make whoever's inside feel safer than they probably were. The monitors have been dead for a long time — their screens dull and coated in a thin film of dust that records every breath of air that has passed through here. A swivel chair lies tipped over beside the desk, one wheel still spinning faintly when disturbed, as though the person who knocked it over has only just left. Papers are scattered across the metal desk and the floor around it: shift rosters, incident logs, a half-completed crossword. Someone left in a real hurry. A coffee mug sits upright on the corner of the desk, its contents evaporated down to a dark ring of residue. The room smells of stale air and old electronics. A small shelf above the desk holds a defunct radio and a ring of spare keys to rooms that likely no longer matter. On the floor near the desk, half tucked under the bottom shelf as though it rolled or was kicked there during the exit rush, sits a gun magazine — full, heavy, and easy to miss if you weren't looking carefully. You were.",
    "-1F",
    image_PLACEHOLDER)

  game.locations.location_minus1F_entrance = new Place(
    "Garage door",
    "Garage door leading to the outside world MISSING",
    "-1F",
    image_PLACEHOLDER)
    
  game.locations.location_minus1F_car_sport = new Place(
    "Sport car",
    "A once-sleek sports car sits alone in its bay, the kind of vehicle that probably turned heads when it was new. Now the windows are smashed in on both sides, the glass spread across the seats and the concrete floor in a glittering mess that crunches under your feet even from a distance. The paint — some shade of deep red that the dust has almost entirely buried — is scratched along both flanks, and the driver's door hangs open at an odd angle, its hinge bent from force rather than age. The interior has been ransacked: the glove compartment hangs open and empty, the seat lining has been cut, and the centre console is ripped out entirely. Whatever was valuable has been taken. But the ransacking was hurried, and hurried people miss things. Wedged down beside the driver's seat, half hidden by the torn upholstery, is a rusty key — small, unremarkable, and intact. In the boot, pushed to the back as though stowed deliberately, sits a locked gasoline tank, its cap sealed so tightly that no amount of hand strength will open it. It's heavy — clearly full — and that makes it worth finding the right tool to crack it open.",
    "-1F",
    image_PLACEHOLDER)

  game.locations.location_minus1F_car_4x4 = new Place(
    "4x4 car",
    "A stocky off-road vehicle occupies a wide bay near the back of the parking level, its bulk somehow reassuring compared to the stripped-out wreckage of the car nearby. The bodywork is dented and scratched — road damage, not vandalism — and a thick coat of dried mud still clings to the wheel arches from some journey it made before all of this. The windows are intact. The tyres look like they have air in them. The keys are sitting in the ignition, dangling from a plain ring with no fob, as if the driver stepped out for just a moment. You check the dashboard: the fuel gauge needle sits well below empty. The engine won't turn over without something in the tank. A canister port near the fuel cap accepts a standard nozzle, and the filler neck is unobstructed. Get some fuel in here and this thing might just be your way out — not an elegant exit, but a functional one. Whatever is beyond that garage door, this car is built to handle it.",
    "-1F",
    image_PLACEHOLDER)

  // 0F locations


  // location Ground Entrance 
  game.locations.location_0F_entrance_ground = new Place(
    "Ground Entrance",
    "A narrow maintenance shed sits tucked just off the ground entrance, wedged between the outer wall of the mall and the loading bay that was once used for stock deliveries. The space is cramped and close, with metal shelving lining both long walls and cardboard boxes collapsed from years of moisture and neglect, their contents long since turned to mulch. The smell is immediate and thick — rust and damp concrete and something organically wrong underneath it all. A single utility light is mounted to the ceiling on a rusted bracket, its bulb flickering in an uneven rhythm that throws the far corners of the shed in and out of shadow. Old cleaning equipment lines the back wall: mop heads, squeegees, a broken floor polisher with its cord knotted around its own body. Metal carts with seized wheels sit in a row, going nowhere. Footprints in the dust suggest someone has been here recently — more than once, by the look of it. On the floor near a tipped crate, half-buried under a torn plastic sheet, lies a heavy crowbar. It's scratched and worn along the shaft but solid at both ends, the kind of tool that has seen real use and has more left to give.",
    "0F",
    image_0F_entrance) 

  // location Entrance Shed
  game.locations.location_0F_storage_shed = new Place(
    "Storage Shed",
    "sotrage shed that houses different boxes and the crowbar on the floor MISSING",
    "0F",
    image_0F_storage) 

  // location Clothes Store
  game.locations.location_0F_clothes_store = new Place(
    "Clothes Store",
    "You step into a clothes store that once occupied a prime corner of the ground floor, its broad shopfront now reduced to a bent shutter and dusty glass. Rows of empty clothing racks stretch across the floor in the formation they were left in, most of them stripped bare but a few still carrying single, abandoned garments — a coat on a wire hanger, a shirt still folded on a shelf above the fitting rooms. The lights are completely off, but dim daylight seeps in from the ground entrance nearby, bouncing off dusty floor-length mirrors that line the walls and giving the whole space a flat, washed-out quality. Torn price tags drift across the shelves, and piles of discarded hangers crunch underfoot like dead leaves. The air is stale, tinged with the faint chemical smell of old fabric and something softer beneath it — mildew, or just age. Changing rooms line the back wall, their curtains half torn and their doors slightly open, each one revealing a rectangle of deeper shadow. The corridor that links this store to the rest of the mall is blocked by a reinforced internal door — it's heavy, and the hinges are stiff, but a good crowbar worked into the frame should be enough to force it.",
    "0F",
    image_0F_clothes_shop) 

  // location 0F corridor
  game.locations.location_0F_corridor = new Place(
    "Small Corridor",
    "A functional connecting passage runs between the food court and the outer stores of the ground floor, its walls bare plaster and its floor worn smooth by years of foot traffic that has long since stopped. Strip lighting overhead — currently dead — leaves the corridor lit only by what bleeds through from either end. It's longer than it looks from the entrance, with a slight bend in the middle that hides one end from the other. The food court opens out on one side, its wider space visible past a pair of push-bar doors. On the other end, a narrow fishing store has been converted into makeshift living quarters — you can smell it before you see it: old food, dried sweat, the waxy scent of candles burned down to nothing. Set into the corridor wall partway along is a heavy service door fitted with a mechanical lock. It looks like the kind of lock that takes a metal key, the old-fashioned kind, the kind that fits a door that was meant to last. Get it open and the building's service shaft network becomes available — stairs that go where the public ones don't.",
    "0F",
    image_PLACEHOLDER) 

  // location food court
  game.locations.location_0F_food_court = new Place(
    "Food court",
    "A wide atrium opens up at the heart of the ground floor, designed to hold hundreds of people at once and now holding none. Shuttered fast-food counters line the perimeter, their rolling shutters pulled down and padlocked, their overhead menu boards still lit in a few places by emergency power — dead logos and illegible offers glowing faintly in the middle distance. Tables and chairs are overturned across the floor, some of them pushed into rough barricades along one wall, as though someone once thought it mattered where exactly things were stacked. Natural light pushes in through a pair of broken skylights above, rain stains spreading out across the floor beneath them in wide rings. Food wrappers and paper cups have drifted into corners and under the counters, and somewhere behind the nearest counter something has been leaking for a very long time — the tiles in front of it are warped and soft. Hallways branch off toward a Greek restaurant on one side and a bubble tea store on the other. Stairs at the far end climb to the first floor. Mounted to a support pillar in the centre of the atrium is a control panel for the building's elevator system, partially obscured by years of grime. A keycard reader is built into its face — the right card would unlock elevator access across all floors.",
    "0F",
    image_PLACEHOLDER ) 

  // location living space
  game.locations.location_0F_living_space = new Place(
    "Fishing Store",
    "A small shop that once sold fishing supplies — rods still hang on one wall, their lines cut and missing, hooks scattered across the floor like dropped punctuation. Someone turned this space into a hiding place. A sleeping bag is rolled into the corner near the back shelving unit, compressed flat and stained as though it was used for a long time before being discarded. Empty tins line a low shelf, their labels peeled and their lids bent open. A broken camp lantern sits beside the sleeping bag, its glass cracked and its fuel long spent. There's a quality to the arrangement that speaks of care — this wasn't a desperate squat but a deliberate setup, the kind of place someone planned to stay in. They didn't stay forever. In the back of the store, a heavy service door is fitted with a mechanical lock. It connects to the building's service stairwell — the kind of route that doesn't appear on the maps they gave to shoppers. The lock looks designed for a metal key, old-fashioned and stubborn, but functional. The corridor outside is the only other way in or out.",
    "0F",
    image_PLACEHOLDER ) 

  // location elevator 0F
  game.locations.location_0F_elevator = new Place(
    "Elevator 0F",
    "The elevator doors at ground level are wedged open with a length of pipe jammed horizontally across the frame, the metal deformed slightly under the strain of holding them for what must have been months or years. Beyond the doors, the shaft drops into darkness below and climbs upward through the building above. The elevator cabin is not here — it's up there somewhere, stationary, the cables hanging straight and still from the ceiling of the shaft in a way that suggests the brakes have locked. There are rungs bolted to the shaft wall at intervals, crudely added after the fact, suggesting someone used this as a climb route before the idea of an operational elevator became irrelevant. The shaft connects to the level below — underground parking — and to the floors above. The food court is accessible directly from this level. The smell from the shaft is cold and metallic, the kind that comes from enclosed dark spaces that haven't circulated air in a long time.",
    "0F",
    image_PLACEHOLDER)
    
  game.locations.location_0F_restaurant = new Place(
    "Greek Fast Food restaurant",
    "A fast-food counter runs the length of the back wall, its service hatches still open, its overhead menu board still showing laminated photographs of food that no longer exists anywhere in this building. The smell in here is complex and unpleasant — old grease baked into the walls, something gone wrong in the kitchen, and the sour sweetness of spilled drinks dried to a sticky film across the floor tiles. Stacked trays sit in a pile behind the counter, coated in the same grey dust that covers everything else. In the kitchen behind the hatch, you can see an overturned prep table and what looks like a fryer dragged out of position, its cable still trailing to a dead wall socket. Flies circle something in the back. Near the front counter, partly obscured by a fallen standing sign advertising a combo deal, a keycard lies flat on the tiles. It's a building worker's pass — plastic, chipped along one edge, but the magnetic strip looks intact. Nearby, wedged between the base of the counter and the wall, sits a locked gasoline tank. It's heavier than it looks. The cap is sealed solid — whoever last touched it made sure it wasn't coming off by hand.",
    "0F",
    image_PLACEHOLDER )
    
  game.locations.location_0F_bubble_tea = new Place(
    "Bubble Tea Store",
    "An airy corner kiosk, pastel-coloured and designed to feel cheerful, now completely gutted. The countertop dispensing machines have been smashed open, their internal mechanisms pulled out and left in a pile on the floor behind the counter, presumably by someone looking for parts or just looking to destroy something. Coloured syrup has dried on the counter surface in thick brown and purple streaks that run down the cabinet fronts and pool in the joins between the floor tiles. Hundreds of empty plastic cups crunch underfoot in every direction — they must have been knocked from a storage shelf at some point and never cleaned up. The branding on the walls — cheerful cartoon characters holding oversized drinks — has faded but not disappeared, the colour leaching slowly from the printed panels. There is nothing useful here. The store is a dead end, its only value being that it connects back to the food court and provides a brief detour from the weight of everything else. Sometimes a dead end is worth checking. This time, it isn't.",
    "0F",
    image_PLACEHOLDER )
    
  game.locations.location_0F_stairs = new Place(
    "Stairway going up",
    "A wide public staircase rises from the food court level toward the first floor above, its treads broad and shallow in the way that public-facing stairs always are — designed to carry crowds moving slowly with shopping bags, not people moving fast. The handrails are still solid, bolted through the wall on both sides without any significant play when you grip them. The steps themselves are mostly clear of debris, a few stray objects pushed to the edges by whoever came through here last. Faded arrows point upward on the wall above each landing, still directing shoppers to departments that no longer exist. The stairwell is enclosed on both sides by tiled walls, the acoustic effect making every footstep louder than it should be. Light filters down from a half-open fire door at the top. Below, the food court spreads out and the ways back to the rest of the ground floor are visible through the push-bar doors. It's a straightforward route — not hidden, not locked, just there, waiting to be used.",
    "0F",
    image_PLACEHOLDER ) 

  game.locations.location_0F_service_stairs = new Place(
  "Service stairs 0F",
  "A staff-only stairwell hides behind a door that doesn't announce itself — no signage visible from the main floor, just a grey fire door flush with the wall of the living space. Inside, the stairwell is purely functional: bare concrete walls, a single exposed conduit running vertically beside the stairs, light from a wire-caged bulb at each landing that somehow still works on whatever emergency circuit it was wired to. The air in here is still and cold in a way the rest of the building isn't, as if the shaft has been sealed for long enough to develop its own climate. The smell is damp and mineral. The route runs between three points: the living space conversion on the ground floor, the service level below connecting to the underground parking, and the first floor service corridor above. A door at each landing requires you to push hard — the frames have settled over time and nothing here fits properly anymore. This stairwell doesn't appear on the maps they gave to shoppers. That is precisely why it matters.",
  "0F",
  image_PLACEHOLDER)

  // 1F locations
  game.locations.location_1F_elevator = new Place(
    "Elevator 1F",
    "A broad open hallway runs along the spine of the first floor, designed to give shoppers room to breathe between stores. Padded chairs and low tables are pushed against both walls, most of them undisturbed, as though the floor's residents cleared the centre of the space deliberately for some purpose that is no longer obvious. The upholstery on the chairs has faded and some has split, the foam inside spilling out in yellowish handfuls. Tall potted plants stand at intervals along the hall, their dried stalks still held upright by the soil in their tubs, their leaves long since crumbled to dust on the floor around the bases. Weak light comes down from skylights that are intact but coated with grime, the daylight arriving thin and grey. The lounge branches off in several directions — the pharmacy and bathrooms are reachable from here, as are the Korean snack store and the food supermarket. Stairs at one end lead back down to the ground floor. There is also an elevator door set into one wall, sealed with a panel-mounted lock. The keycard reader beside it is dormant but functional. The right access card would unlock the elevator at every floor in the building simultaneously.",
    "1F",
    image_PLACEHOLDER)


  game.locations.location_1F_pharmacy = new Place(
    "Pharmacy",
    "Shelving units line three walls of this store from floor to ceiling, built to hold a dense inventory of boxed medication and health products. Most of the boxes are gone — pulled down and taken or simply knocked to the floor and left in piles that have since been kicked into corners. A few products remain on the higher shelves where nobody bothered to climb, their packaging swollen from humidity and their labels illegible. The glass dispensing counter at the back is shattered, its display case swept clean, whatever was inside long since removed. Behind the counter, the dispensing area has been gone through thoroughly — drawer units pulled open, their contents scattered, a pill counter knocked off a shelf and lying face-down on the floor. On the floor near the rear dispensing area, two items stand out against the debris: a leg stabiliser, the rigid medical kind with adjustable straps designed to hold a fractured or injured leg in alignment, and an empty pistol, old-model, the barrel scratched but the mechanism visibly intact. Neither of these belongs in a pharmacy, which means they were brought here and left here. The lounge is the only way out.",
    "1F",
    image_PLACEHOLDER)

  game.locations.location_1F_bathroom = new Place(
    "Bathroom",
    "The first floor bathrooms are the cleanest space in the building, and that's a low bar to clear, but it's noticeable. The tiled floor is intact — no warping, no subsidence, no water damage beyond a thin discolouration near the drain channels. The mirrors above the sink basin are unbroken, and whatever they're reflecting right now looks exactly as bad as you feel. The sinks are dry — the water stopped running a long time ago, and the taps turn without producing anything. Soap dispensers are empty. Paper dispensers are empty. Hand dryers are dead. The cubicles are intact, their doors lockable, their walls scrawled with the usual variety of messages that accumulate in tiled rooms over time — some banal, some philosophical, a few legible as recent additions written in a different medium from the older ones. There is nothing useful here. The bathrooms connect back to the lounge and nowhere else. But they are clean, and they are quiet, and sometimes those two things are worth more than the alternatives.",
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
    "Shelves of bright, busy packaging line every wall, the colours still vivid in a building that has grown steadily greyer everywhere else — foil chip bags, boxed snacks, dried seaweed in stacked cellophane envelopes. Most of it is expired and has bloated slightly from internal gas, the packaging distended in a way that looks wrong. The smell of stale seaweed and old sweetness drifts through the space, not unpleasant but definitely off. The floor near the central display is sticky underfoot from a spill that was never cleaned up, the substance having gone through several chemical stages since it was fresh. Near the back of the store, on a shelf that's been only partially disturbed, a small pack of matchsticks sits propped against a box of defunct instant noodles. Thirty-two matches, the packaging says. Most of them should still work. The store connects through a short passage to the gun store next door and opens out the other way into the lounge. Built into the wall near the entrance is a shaft lock mechanism — the kind that takes a metal key — connected to the building's service access system. It looks like it's been tried before: scratches around the keyhole, faint drag marks on the plate.",
    "1F",
    image_PLACEHOLDER)

  game.locations.location_1F_gun_store = new Place(
    "Gun store",
    "THERE IS A GUN HERE - LOOK AT THE GAME LOGIC",
    "1F",
    image_PLACEHOLDER)

  game.locations.location_1F_hidden_storage = new Place(
  "Hidden storage room",
  "A small room sits behind a section of panelling in the service corridor that doesn't quite match the rest — a slightly different shade, slightly newer screws. It takes a deliberate look to find it. Inside: bare shelving brackets bolted to the walls, a few cardboard boxes crushed flat in one corner, and the remains of an emergency supply cache that was looted some time ago — torn-open packaging, empty water containers, a first aid kit stripped down to its plastic shell. But on the floor, coiled carefully and tied with a length of its own loose end, is a thick rope. Long, heavy, the kind wound from multiple braided strands and designed to take real load without fraying. Someone put it here. Someone thought it might be needed. It connects to the first floor service stairs and nowhere else — the hidden panel is the only entrance.",
  "1F",
  image_PLACEHOLDER)

  game.locations.location_1F_food_market = new Place(
    "Food supermarket",
    "Despite the appocalypse there's still some products on the shelves",
    "1F",
    image_PLACEHOLDER)
  
  game.locations.location_1F_service_stairs = new Place(
    "Service stairs 1F",
    "The first floor section of the building's service stairwell continues the same aesthetic as below — concrete, conduit, wire-caged bulbs — but feels more used. Scuff marks on the walls at shoulder height suggest repeated passage. The handrail here has been gripped so many times that the paint is completely worn from the top surface, leaving bare metal that has gone slightly orange with shallow oxidation. The stairs run between three points: the hidden storage room, tucked behind a disguised panel just off the corridor; the floor below, continuing down to the ground level and the underground parking; and the stairs above, which climb toward the second floor service areas. A door at the Korean snack store level opens directly into that store, which is how the hidden room stays hidden — you'd have to know it was there to find it from the main corridor. The stairwell smells of cold concrete and effort.",
    "1F",
    image_PLACEHOLDER)

  


  // 2F locations

  game.locations.location_2F_service_stairs = new Place(
    "Service stairs 2F",
    "The service stairwell emerges at the top of the building into a short landing that ends at a heavy reinforced door. This door is the problem. It's not locked in the conventional sense — the locking mechanism has failed or been damaged, jamming the door shut from the frame side in a way that keys and handles can't resolve. The frame itself has deformed slightly, perhaps from heat, the metal bowed just enough to press the door into its housing with too much force to push through. Something explosive, applied at the right point, would force the frame apart and let the door swing. A makeshift bomb — gasoline and a fuse — would do it cleanly. An armed pistol, fired at the locking point, might do it less cleanly. Either way, the rooftop is on the other side of that door, and this stairwell is the only route up to it. The stairs below connect back to the first floor service stairs. The landing is bare: concrete floor, no windows, a single dead bulb in a wire cage above the door.",
    "2F",
    image_PLACEHOLDER)

  game.locations.location_2F_rooftop = new Place(
    "Rooftop",
    "You push through into open air and it hits you immediately — the first genuine outside you've experienced since entering the building. The roof is wide and flat, bordered by a low parapet wall with a rusted metal railing bolted along its top edge. The sky above is grey, or blue, or somewhere between the two, and the wind up here carries the smell of the city — exhaust, wet asphalt, something burning in the middle distance. It feels enormous after the corridors below. The roof surface is covered in the standard layered membrane of commercial flat roofing, cracked and blistered in places, with the joints between sections raised in low ridges that cross the space in parallel lines. Heat exchanger units and ventilation boxes are spaced across the roof in a grid, most of them dead and rusting, their casings pitted by weather. In the far corner, visible from the service stair entrance, a lone camping tent stands pitched between two ventilation boxes, its guy ropes tight and its entrance zipped shut. A short walk the other way leads to the edge of the roof and the railing overlooking the drop below. The service stairs are the only way back down — and currently the only way up.",
    "2F",
    image_PLACEHOLDER)

  game.locations.location_2F_tent = new Place(
    "Tent",
    "A small camping tent occupies a sheltered corner of the rooftop, positioned deliberately between two ventilation box housings where it would be partially obscured from anyone looking across the roof from the stair entrance. The fabric is a faded olive green, patched in two places with a different-coloured material and taped along one seam with duct tape that has mostly held. The guy ropes are staked into drilled holes in the roof surface — someone was here long enough to bring a drill. The zip is shut. Inside, the tent is inhabited by a corpse — long dead, seated against the back wall with the posture of someone who sat down to rest and didn't get up again. Whatever they had on them has mostly decayed along with them: some items still identifiable by shape, others reduced to ambiguous organic material. The tent smells as you'd expect. Whatever this person knew about survival, or about this building, or about what's happening out there, died with them. The rooftop is just outside through the open end.",
    "2F",
    image_PLACEHOLDER)

  game.locations.location_2F_exit = new Place(
    "Edge of the rooftop",
    "The edge of the building is marked by a low parapet wall topped with a metal railing, bolted at intervals and still solid despite the rust that has worked its way into every joint and fitting. Standing here, you can see down — a long way down. The street below is visible: cracked pavement, abandoned vehicles, the debris of the world as it was left. It's survivable with the right equipment. Without it, it isn't. The railing is the right height to loop a rope over and feed it down the exterior wall. The building's facade below this point is textured — windowsills, utility conduit, surface detail enough to manage the descent if the rope holds and you move carefully. If your rope is long enough and secured properly, it becomes a viable exit — not a comfortable one, but a real one. If your brother is with you, he can manage it, slowly. Without him beside you, there's no point going anywhere at all. The rooftop is accessible from here, back through the open expanse of the roof.",
    "2F",
    image_PLACEHOLDER)

  game.locations.location_2F_exit_win = new Place(
    "Epilogue",
    "You've made it off the roof together. Your brother somehow managed to get there with you too. You survived another day.",
    "",
    image_PLACEHOLDER)

  game.locations.location_minus1F_exit_win = new Place(
    "Epilogue",
    "You've made if off in a car together. You managed to survive another day.",
    "",
    image_PLACEHOLDER)






  // connections -1F 
  game.locations.location_minus1F_elevator.connections = [game.locations.location_minus1F_parking, game.locations.location_0F_elevator];

  game.locations.location_minus1F_service_stairs.connections = [game.locations.location_0F_service_stairs, game.locations.location_minus1F_parking];

  game.locations.location_minus1F_parking.connections = [game.locations.location_minus1F_car_sport, game.locations.location_minus1F_car_4x4, game.locations.location_minus1F_security_office, game.locations.location_minus1F_entrance];

  game.locations.location_minus1F_car_sport.connections = [game.locations.location_minus1F_parking];

  game.locations.location_minus1F_car_4x4.connections = [game.locations.location_minus1F_parking];

  game.locations.location_minus1F_security_office.connections = [game.locations.location_minus1F_parking];


  // connections 0F

  game.locations.location_0F_entrance_ground.connections = [game.locations.location_0F_storage_shed, game.locations.location_0F_clothes_store];

  game.locations.location_0F_storage_shed.connections = [game.locations.location_0F_entrance_ground];
  game.locations.location_0F_clothes_store.connections = [game.locations.location_0F_entrance_ground];

  game.locations.location_0F_corridor.connections = [game.locations.location_0F_food_court, game.locations.location_0F_living_space];

  game.locations.location_0F_living_space.connections = [game.locations.location_0F_corridor];

  game.locations.location_0F_food_court.connections = [game.locations.location_0F_corridor, game.locations.location_0F_restaurant, game.locations.location_0F_bubble_tea, game.locations.location_0F_stairs];

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

  game.locations.location_1F_korean_store.connections = [game.locations.location_1F_lounge, game.locations.location_1F_gun_store];

  game.locations.location_1F_gun_store.connections = [game.locations.location_1F_korean_store]; 

  game.locations.location_1F_food_market.connections = [game.locations.location_1F_lounge];

  game.locations.location_1F_stairs.connections = [game.locations.location_0F_stairs, game.locations.location_1F_lounge];

  game.locations.location_1F_service_stairs.connections = [game.locations.location_1F_hidden_storage, game.locations.location_0F_service_stairs, game.locations.location_1F_korean_store];

  game.locations.location_1F_hidden_storage.connections = [game.locations.location_1F_service_stairs];


  // connections 2F 
  game.locations.location_2F_service_stairs.connections = [game.locations.location_1F_service_stairs];

  game.locations.location_2F_rooftop.connections = [game.locations.location_2F_service_stairs, game.locations.location_2F_tent, game.locations.location_2F_exit];

  game.locations.location_2F_exit.connections = [game.locations.location_2F_rooftop];

  game.locations.location_2F_tent.connections = [game.locations.location_2F_rooftop];




  // -1F actions
  game.locations.location_minus1F_car_sport.actions = [pickUpKey, pickUpLockedGasolineTank];
  game.locations.location_minus1F_security_office.actions = [pickUpMagazine];


  // -1F item actions
  game.locations.location_minus1F_parking.itemActions = [openElevators];
  game.locations.location_minus1F_car_4x4.itemActions = [fuelCar];



  // 0F actions
  // game.locations.location_0F_entrance_ground.actions = [pickUpKey];
  game.locations.location_0F_storage_shed.actions = [pickUpCrowbar];

  game.locations.location_0F_clothes_store.itemActions = [openClothesDoor];

  game.locations.location_0F_restaurant.actions = [pickUpKeyCard];

  // 0F item actions
  game.locations.location_0F_living_space.itemActions = [openShafts];
  game.locations.location_0F_food_court.itemActions = [openElevators];


  // 1F actions
  game.locations.location_1F_pharmacy.actions = [pickUpLegStabiliser];
  game.locations.location_1F_hidden_storage.actions = [pickUpRope];
  game.locations.location_1F_gun_store.actions = [pickUpPistol];
  game.locations.location_1F_korean_store.actions = [pickUpMatchsticks];
  game.locations.location_1F_food_market.actions = [helpBrother];

  // 1F item actions
  game.locations.location_1F_korean_store.itemActions = [openShafts];
  game.locations.location_1F_food_market.itemActions = [fixBrotherLeg];

  // 2F actions

  // there is none atm

  // 2F item actions
 
  game.locations.location_2F_service_stairs.itemActions = [open2FDoor, open2FDoorGun];
  game.locations.location_2F_exit.itemActions = [throwRope];


  // todo rope exit



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
  
  game.craftingSystem.addRecipe(openCanister, matchsticks, makeshiftBomb);
  game.craftingSystem.addRecipe(pistol, magazine, armedPistol);
  game.craftingSystem.addRecipe(lockedGasolineTank, crowbar, openCanister);

  }
