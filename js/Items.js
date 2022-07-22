// Ant Simulator
class Items {
    constructor(pos) {
        this.pos = {
            x: pos.x,
            y: pos.y
        }
        this.color = "white";
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 2, 0, Flyweight.Pi2);
        ctx.fill();
        ctx.closePath();
    }
}

class Food extends Items{
    static color = "SandyBrown";
    
    constructor(pos, weight) {
        super(pos);
        this.weight = weight;
        this.color = Food.color;
    }

    draw(ctx) {
        super.draw(ctx);
        if (control.info) {
            ctx.fillStyle = "Black";
            ctx.font = "8pt VAG World"
            ctx.fillText(this.weight, this.pos.x - 12, this.pos.y - 5);
        }
    }
}

class Rock extends Items{
    constructor(pos) {
        super(pos);
        this.color = "grey";
    }
}

class Block extends Items{
    constructor(pos) {
        super(pos);
        this.color = "darkgrey";
    }
}

class Label {
    constructor(color, pos) {
        this.color = color;
        this.weight = 1024;
        this.pos = {
            x: pos.x,
            y: pos.y
        }
    }

    
    update() {
        this.weight--;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.fillRect(this.pos.x, this.pos.y, 1, 1);
        ctx.fill();
        ctx.closePath();
    }
}