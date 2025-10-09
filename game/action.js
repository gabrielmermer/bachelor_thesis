class Action {
    constructor(name, description, effect, itemsNeeded, effectText) {
        this.name = name;
        this.description = description;
        this.effect = effect;
        this.itemsNeeded = itemsNeeded;
    }

    execute(player) {
        this.effect(player);
    }
}