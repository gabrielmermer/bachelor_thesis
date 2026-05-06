// recipes.js

function setupRecipes() {


    game.craftingSystem.addRecipe(pistol, silencer, silencedHandgun);
    game.craftingSystem.addRecipe(openCanister, matchsticks, makeshiftBomb);
    game.craftingSystem.addRecipe(pistol, magazine, armedPistol);
    game.craftingSystem.addRecipe(lockedGasolineTank, crowbar, openCanister);

}