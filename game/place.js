class Place {
    constructor(name, description, connections = [], actions = []) {
        this.name = name;
        this.description = description;
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
        "Travel to " + neighbor.description,
        (player) => {
            currentLocation = neighbor;
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

