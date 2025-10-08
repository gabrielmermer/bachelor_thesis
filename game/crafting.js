class CraftingSystem{
    constructor() {
        this.recipes = []
    }

    addRecipe(item1, item2, result) {
        this.recipes.push({
            item1: item1,
            item2: item2,
            makes: result
        });
    }

    attemptCraft(item1, item2, player){
        // console.log("attempting to craft");
        for( let i = 0; this.recipes.length; i++ ) {
            let recipe = this.recipes[i];
              

            let match = false;
            console.log(item1);
            if(item1 == recipe.item1 && item2 == recipe.item2) {
               
                match = true;
            }
            if(item1 == recipe.item2 && item2 == recipe.item1) {
                
                match = true;
            }
            console.log(match);
            if (match) {
                this.removeItem(item1, player);
                this.removeItem(item2, player);

                // add the result item
                player.inventory.push(recipe.makes);
                return {success: true, result: recipe.makes.name}

            }
            return {success: false}
        }


    }

    removeItem(item, player){
        // finding the item in the inventory
        for (let i = 0; player.inventory.length; i++) {
            if(player.inventory[i] == item) {
                /// ??
                player.inventory.splice(i,1);
                break;
            }
        }
    }
}