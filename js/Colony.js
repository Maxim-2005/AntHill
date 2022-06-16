class Colony {
    palette = ['red', 'orange', 'yellow', 'green', 'blue', 'cyan', 'purple'];

    constructor(food, pos, i) {
        this.color = this.getColor(i);
        this.pos = {
            x: pos.x,
            y: pos.y
        }
        this.listAnt = [];
        this.food = food;
        this.timer = 100;
        this.ai = new RI();
        this.delay = Math.round(this.timer / 4);
    }

    update() {
        if (this.food > 100) {
            this.delay--;
            if (this.delay < 0) {
                let ant = new Ant(this);
                this.listAnt.push(ant);
                this.food -= 100;
                this.delay = this.timer;
            }
        }

        if (this.listAnt.length <= 0 && this.food < 100 && this.food > 0){
            this.color = 'rgba(0, 0, 0, 0.5)';
            model.newFood(model.rndPos(this.pos, 4), this.food);
            this.food = 0;
        }

        let listAnt = [];
        for (let ant of this.listAnt){
            ant.update();
            if (ant.life < -727) {
                //delete this.map[ant.pos.x][ant.pos.y];
                model.map[ant.pos.x][ant.pos.y] = false;
                model.newFood(model.rndPos(ant.pos, 4), 100);
            } else
                listAnt.push(ant);
        }
        this.listAnt = listAnt;
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
        if (control.info) {
            ctx.fillStyle = "white";
            ctx.font = "16pt VAG World"
            ctx.fillText(this.listAnt.length, this.pos.x-7, this.pos.y+7);
        }
    }

    getColor(i) {
        if (i < this.palette.length) {
            return this.palette[i];
        } else
            return  '#' + Math.floor(Math.random()*16777216).toString(16).padStart(6, '0');
    }
}