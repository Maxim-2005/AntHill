class Colony {
    constructor(food) {
        this.color = '#' + Math.floor(Math.random()*16777216).toString(16).padStart(6, '0');
        this.pos = {
            x: Math.round(Math.random()*window.innerWidth),
            y: Math.round(Math.random()*window.innerHeight)
        }
        this.listAnt = [];
        this.food = food;
        this.timer = 100;
        this.ai = new PI();
        this.delay = Math.round(this.timer / 4);
    }

    update() {
        if (this.food > 0) {
            this.delay--;
            if (this.delay < 0) {
                let ant = new Ant(this);
                this.listAnt.push(ant);
                this.food--;
                this.delay = this.timer;
            }
        }
    }

    draw(ctx) {
        let grad = ctx.createRadialGradient(this.pos.x, this.pos.y, 8, this.pos.x, this.pos.y, 32);
        grad.addColorStop(0, this.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 16, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
}