class Place {
    constructor(name, description, floor, picture, connections = [], actions = []) {
        this.name = name;
        this.description = description;
        this.floor = floor;
        this.picture = picture;
        this.connections = connections;
        this.actions = actions;
        
    }

    removeAction(action) {
        this.actions = this.actions.filter(a => a !== action);
    }

    generateTravelActions() {
    return this.connections.map(neighbor =>
        new Action(
        "Go to " + neighbor.name,
        "Travel to " + neighbor.name,
        (player) => {
            // set the global game location, not an undefined `currentLocation`
            game.currentLocation = neighbor;
            console.log("You travel to " + neighbor.name);
            statusText = "";
        }
        )
    );
    }


    getAllActions() {
        return [
            // spread ... syntax (?) 
            ...this.actions,
            ...this.generateTravelActions()
        ];
    }
}

