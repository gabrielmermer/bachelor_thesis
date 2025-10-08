class CraftingSystem{
    constructor() {
        this.recipes = {}
    }

    addRecipe(item1, item2, result) {
        this.recipes.push({
            item1: ingredient1,
            item2: ingredient2,
            makes: result
        });
    }

    attemptCraft(item1, item2, player){
        for( let i = 0; this.recipes.length; i++ ) {
            let recipe = this.recipes[i];

            let match = false;
            if(item1.name == recipe.item1 && item2.name == recipe.item2) {
                match = true;
            }
            if(item1.name == recipe.item2 && item2.name == recipe.item1) {
                match = true;
            }

            if (match) {
                this.removeItem(item1, player);
                this.removeItem(item2, player);

                // add the result item
                player.inventory.push(game.items[recipe.makes]);
                return {success: true, result: recipe.makes}

            }
            return {success: false}
        }


    }

    removeItem(item, player){
        // finding the item in the inventory
        for (let i = 0; player.inventory.length; i++) {
            if(player.inventory[i] == item.name) {
                /// ??
                player.inventory.splice(i,1);
                break;
            }
        }
    }
}