// globals.js
let craftingSystem = new CraftingSystem();

// master game object
let game = {
  actions: {},
  locations: {},
  currentLocation: null,
  items: {},
  craftingSystem: craftingSystem
};

let player = { inventory: [] };

// helper function
function addItem(item) {
  game.items[item.name] = item;
}