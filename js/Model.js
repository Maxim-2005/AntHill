// Ant Simulator

class Model {
    constructor() {
        this.family = 20;
        this.listAnt = [];
        for (let i = 0; i < this.family; i++) {
            let ant = new Ant();
            this.listAnt.push(ant);
        }
    }
}