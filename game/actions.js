// actions.js


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
shaftKey
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