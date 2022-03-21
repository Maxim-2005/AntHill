// Ant Simulator

class Model {
    constructor() {
        this.base = 5;
        this.family = 20;
        this.listColony = [];
        for (let i = 0; i < this.base; i++) {
            let colony = new Colony(this.family);
            this.listColony.push(colony);
        }
    }
}