// Ant Simulator
class Items {
    constructor() {
        this.pos = {
            x: Math.round(Math.random()*window.innerWidth),
            y: Math.round(Math.random()*window.innerHeight)
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
    constructor() {
        super();
        this.color = "SandyBrown";
        this.weight = Math.round(Math.random() * 100 + 100);
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
    constructor() {
        super();
        this.color = "grey";
    }
}

class Block extends Items{
    constructor() {
        super();
        this.color = "darkgrey"
    }
}