// Ant Simulator

class Model {
    constructor() {
        this.size = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        this.base = 2;
        this.food = 256;
        this.numFood = 100;
        this.numRock = 50;
        this.numBlock = 50;
        
        this.map = [];
        this.air = [];
        this.listColony = [];
        this.listFood = [];
        this.listRock = [];
        this.listBlock = [];
        this.listLabel = [];

        this.sector = {
            left : 0,
            right : 0,
            top : 0,
            bottom : 0
        };
        this.init();
    }

    init() {
        for (let x = 0; x < this.size.width; x++) {
            this.map[x] = [];
            this.air[x] = [];
            for (let y = 0; y < this.size.height; y++) {
                this.map[x][y] = false;
                this.air[x][y] = false;
            }
        }

        for (let i = 0; i < this.base; i++) {
            let colony = new Colony(this.food);
            this.listColony.push(colony);
            this.map[colony.pos.x][colony.pos.y] = colony;
        }

        for (let i = 0; i < this.numFood; i++) {
            let food = new Food();
            this.listFood.push(food);
            this.map[food.pos.x][food.pos.y] = food;
        }
    
        for (let i = 0; i < this.numRock; i++) {
            let rock = new Rock();
            this.listRock.push(rock);
            this.map[rock.pos.x][rock.pos.y] = rock;
        }

        for (let i = 0; i < this.numBlock; i++) {
            let block = new Block();
            this.listBlock.push(block);
            this.map[block.pos.x][block.pos.y] = block;
        }
    }

    update() {
        for (let colony of this.listColony) {
            colony.update();
        }

        let listLabel = [];
        for (let label of this.listLabel) {
            label.update();
            if (label.weight <= 0) {
                delete this.air[label.pos.x][label.pos.y];
                this.air[label.pos.x][label.pos.y] = false;
            } else
                listLabel.push(label);
        }
        this.listLabel = listLabel;

        let listFood = [];
        for (let food of this.listFood) {
            if (food.weight <= 0) {
                delete this.map[food.pos.x][food.pos.y];
                this.map[food.pos.x][food.pos.y] = false;
            } else
                listFood.push(food);
        }
        this.listFood = listFood;
    }

    rndPos(pos = {x: 0, y: 0}, range = 4) {
        this.sector = this.getSector(pos, range);
        while (this.map[pos.x][pos.y] != false){
            console.log(this.map[pos.x][pos.y]); /////////////////////////
            pos = {
                x: Math.round(Math.random() * (this.sector.right - this.sector.left) + this.sector.left),
                y: Math.round(Math.random() * (this.sector.bottom - this.sector.top) + this.sector.top)
            };
        }
        return pos
    }

    vision(ant) {
        this.sector = this.getSector(ant.pos, ant.range);
        for (let x = this.sector.left; x < this.sector.right; x++) {
            for (let y = this.sector.top; y < this.sector.bottom; y++) {
                if (this.map[x][y] instanceof ant.goal){
                    ant.target = this.map[x][y];
                    //console.log(this.map[x][y]);
                    break;
                } 
            }
        }
    }

    newLabel(color, pos) {
        let label = new Label(color, pos);
        this.listLabel.push(label);
        this.air[label.pos.x][label.pos.y] = label;
    }

    getSector(pos, range) {
        return {
            left : Math.max(pos.x - range, 0),
            right : Math.min(pos.x + range, this.size.width - 3),
            top : Math.max(pos.y - range, 0),
            bottom : Math.min(pos.y + range, this.size.height - 3)}
    }

    delta(pos, target) {
        return Math.sqrt((target.pos.x - pos.x)**2 + (target.pos.y - pos.y)**2);
    }
}