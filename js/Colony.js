class Colony {
    constructor(food) {
        this.color = '#' + Math.floor(Math.random()*16777216).toString(16).padStart(6, '0');
        this.pos = {
            x: Math.round(Math.random()*window.innerWidth),
            y: Math.round(Math.random()*window.innerHeight)
        }
        this.listAnt = [];
        this.food = food;
        this.delay = 25;
    }

    update() {
        if (this.food > 0 && this.delay >= 75){
            let ant = new Ant(this.color, this.pos);
            this.listAnt.push(ant);
            this.food--;
            this.delay = 0;
        }
        else
            Math.max(this.delay++, 75);
    }

    draw(ctx) {
        let grad = ctx.createRadialGradient(this.pos.x, this.pos.y, 8, this.pos.x, this.pos.y, 32);
        grad.addColorStop(0, this.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 32, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
}