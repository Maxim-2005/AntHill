// Ant Simulator
class Items {
    constructor(pos) {
        this.pos = {
            x: pos.x,
            y: pos.y
        }
        this.color = "white";
        this.Pi2 = Math.PI*2;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 2, 0, this.Pi2);
        ctx.fill();
        ctx.closePath();
    }
}

class Food extends Items{
    constructor(pos, weight) {
        super(pos);
        this.weight = weight;
        this.color = "SandyBrown";
    }

    draw(ctx) {
        super.draw(ctx);
        if (control.info) {
            ctx.fillStyle = this.color;
            ctx.font = "10pt VAG World"
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
        ctx.fillRect(this.pos.x, this.pos.y, 2, 2);
        ctx.fill();
        ctx.closePath();
    }
}