class Place {
    constructor(name, description, connections, actions = []) {
        this.name = name;
        this.description = description;
        this.connections = connections;
        this.actions = actions;
    }
}