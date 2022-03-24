// Ant Simulator

class Model {
    constructor() {
        this.base = 3;
        this.family = 25;
        this.numFood = 25;
        this.numRock = 25;
        this.numBlock = 25;

        this.listColony = [];
        this.listFood = [];
        this.listRock = [];
        this.listBlock = [];

        for (let i = 0; i < this.base; i++) {
            let colony = new Colony(this.family);
            this.listColony.push(colony);
        }

        for (let i = 0; i < this.numFood; i++) {
            let food = new Food();
            this.listFood.push(food);
        }
    
        for (let i = 0; i < this.numRock; i++) {
            let rock = new Rock();
            this.listRock.push(rock);
        }

        for (let i = 0; i < this.numBlock; i++) {
            let block = new Block();
            this.listBlock.push(block);
        }
    }

    update() {
        for (let colony of this.listColony) {
            for (let ant of colony.listAnt) {
                ant.update();
            }
        }
    }
}