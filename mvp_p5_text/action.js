class Action {
    constructor(name, description, effect) {
        this.name = name;
        this.description = description;
        this.effect = effect;
    }

    execute(player) {
        this.effect(player);
    }
}