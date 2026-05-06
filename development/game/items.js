// items.js

// init all of the items
let shaftKey = new Item(
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

// findable items
addItem(shaftKey);
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





