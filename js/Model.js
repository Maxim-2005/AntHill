// Ant Simulator

class Model {
    constructor() {
        this.size = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        this.base = 7;
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
            let radius = Math.min(this.size.width, this.size.height);
            radius = (radius - radius / this.base) / 2;
            let angel = 2 * Math.PI * i / this.base;
            angel += -Math.PI / 2 + Math.PI / this.base * ((this.base + 1) % 2); 
            let pos = {
                x: this.size.width / 2 + radius * Math.cos(angel),
                y: this.size.height / 2 + radius * Math.sin(angel)
            }
            pos = this.intPos(pos);
            let colony = new Colony(this.food, this.rndPos(pos), i);
            this.listColony.push(colony);
            this.map[colony.pos.x][colony.pos.y] = colony;
        }

        for (let i = 0; i < this.numFood; i++) {
            if (i >= this.numFood / 2) {
                this.newFood(this.rndPos({x: this.size.width / 2, y: this.size.height / 2}, 100));
            } else
                this.newFood(this.rndPos());
        }
    
        for (let i = 0; i < this.numRock; i++) {
            let rock = new Rock(this.rndPos());
            this.listRock.push(rock);
            this.map[rock.pos.x][rock.pos.y] = rock;
        }

        for (let i = 0; i < this.numBlock; i++) {
            let block = new Block(this.rndPos());
            this.listBlock.push(block);
            this.map[block.pos.x][block.pos.y] = block;
        }
    }

    newFood(pos, weight = Math.round(Math.random() * 100 + 100)) {
        let food = new Food(pos, weight);
        this.listFood.push(food);
        this.map[food.pos.x][food.pos.y] = food;
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

    }

    rndPos(pos = {x: this.size.width / 2, y: this.size.height / 2}, range = Math.max(this.size.width, this.size.height)) {
        pos = this.intPos(pos);
        this.sector = this.getSector(pos, range);
        while (this.map[pos.x][pos.y] != false){
            pos = {
                x: Math.random() * (this.sector.right - this.sector.left) + this.sector.left,
                y: Math.random() * (this.sector.bottom - this.sector.top) + this.sector.top
            };
            pos = this.intPos(pos);
        }
        return pos;
    }

    newLabel(color, pos) {
        if (this.air[pos.x][pos.y]) {
            if (this.air[pos.x][pos.y].color == color)
                this.air[pos.x][pos.y].weight = Math.min(this.air[pos.x][pos.y].weight + 1024, 8196);
            else {
                if (this.air[pos.x][pos.y].weight < 1024) {
                    this.air[pos.x][pos.y].color = color;
                    this.air[pos.x][pos.y].weight = 1024;
                } else {
                    if (this.air[pos.x][pos.y].weight > 1024)
                        this.air[pos.x][pos.y].weight -= 1;
                }
            }
        } else {
            let label = new Label(color, pos);
            this.listLabel.push(label);
            this.air[label.pos.x][label.pos.y] = label;
        }
    }

    getSector(pos, range) {
        return {
            left : Math.max(pos.x - range, 5),
            right : Math.min(pos.x + range, this.size.width - 5),
            top : Math.max(pos.y - range, 5),
            bottom : Math.min(pos.y + range, this.size.height - 5)}
    }

    delta(pos, target) {
        return Math.sqrt((target.pos.x - pos.x)**2 + (target.pos.y - pos.y)**2);
    }

    intPos(pos) {
        return {
            x: Math.round(pos.x),
            y: Math.round(pos.y)
        };
    }
}