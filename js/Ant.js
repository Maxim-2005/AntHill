// Ant Simulator

class Ant {
    constructor(colony) {
        this.colony = colony;
        this.color = colony.color;
        this.pos = model.rndPos(colony.pos, 4);
        this.range = 50;
        this.target = {pos: model.rndPos(this.pos, this.range)};
        this.pose = false;
        this.ai = colony.ai;
        this.speed = 2;
        this.life = 100;
        this.angle = this.getAngle(this.pos, this.target);
        this.action = Action.wait;
        this.timer = 0;
        this.load = false;
        this.walk = false;
        this.step = 4;
        this.score = 0;
        this.listTarget = this.vision;
        if (this.ai instanceof AI) {
            this.nn = {
                w_1 : [],
                w_2 : [],
                w_3 : []
            };
            this.ai.init(this);
        };
    }

    update() {
        this.timer--;
        this.life -= 0.01;
        if (this.timer < 0) {
            this.pos = model.intPos(this.pos);
            this.vision();
            this.ai.select(this);
            this.action(this);
        }
        if (this.walk)
            this.goStep();
    }

    draw(ctx, fw) {
        let x = this.pos.x;
        let y = this.pos.y;
        let angle = this.angle;

        //Поворот
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.translate(-x, -y);

        // Груз
        if (this.load) {
            this.load.pos = {
                x: x-fw.size20,
                y: y-fw.size30
            }
            this.load.draw(ctx);
        }

        ctx.fillStyle=this.color;
        ctx.strokeStyle="#black";
        ctx.lineWidth=1;

        //Ножки
        //Передние
        ctx.beginPath();
        ctx.moveTo(x-fw.size23, y-fw.size2 + this.pose * fw.size10);
        ctx.lineTo(x-fw.size32, y-fw.size8);
        ctx.lineTo(x-fw.size36, y-fw.size20 + this.pose * fw.size10);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(x-fw.size18, y-fw.size2 + !this.pose * fw.size10);
        ctx.lineTo(x-fw.size8, y-fw.size8);
        ctx.lineTo(x-fw.size4, y-fw.size20 + !this.pose * fw.size10);
        ctx.stroke();
        ctx.closePath();

        //Центральные
        ctx.beginPath();
        ctx.moveTo(x-fw.size24, y+fw.size6 + this.pose * fw.size10);
        ctx.lineTo(x-fw.size36, y+fw.size2);
        ctx.lineTo(x-fw.size44, y+fw.size8 + this.pose * fw.size10);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(x-fw.size18, y+fw.size6 + !this.pose * fw.size10);
        ctx.lineTo(x-fw.size4, y+fw.size2);
        ctx.lineTo(x+fw.size4, y+fw.size8 + !this.pose * fw.size10);
        ctx.stroke();
        ctx.closePath();

        //Задние
        ctx.beginPath();
        ctx.moveTo(x-fw.size18, y+fw.size10);
        ctx.lineTo(x-fw.size2, y+fw.size24 + this.pose * fw.size10);
        ctx.lineTo(x-fw.size6, y+fw.size40 + this.pose * fw.size10);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(x-fw.size24, y+fw.size10);
        ctx.lineTo(x-fw.size38, y+fw.size24 + !this.pose * fw.size10);
        ctx.lineTo(x-fw.size34, y+fw.size40 + !this.pose * fw.size10);
        ctx.stroke();
        ctx.closePath();

        //Грудь
        ctx.beginPath();
        ctx.ellipse(x-fw.size20, y+fw.size5, fw.size4, fw.size10, 0, 0, Math.PI*2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        //Голова
        ctx.beginPath();
        ctx.ellipse(x-fw.size20, y-fw.size10, fw.size6, fw.size6, 0, 0, Math.PI*2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        //Усики
        ctx.beginPath();
        ctx.moveTo(x-fw.size23, y-fw.size14);
        ctx.lineTo(x-fw.size28, y-fw.size24);
        ctx.lineTo(x-fw.size24, y-fw.size30);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(x-fw.size18, y-fw.size14);
        ctx.lineTo(x-fw.size12, y-fw.size24);
        ctx.lineTo(x-fw.size18, y-fw.size30);
        ctx.stroke();
        ctx.closePath();

        //Брюхо
        ctx.beginPath();
        ctx.ellipse(x-fw.size20, y+fw.size26, fw.size8, fw.size14, 0, 0, Math.PI*2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        ctx.restore();

        if (control.info) {
            ctx.fillStyle = this.color;
            ctx.font = "16pt VAG World";
            ctx.fillText(this.action.name + ' ' + this.timer, x-17, y - 12);
            ctx.fillStyle = 'White';
            ctx.fillText('+', this.target.pos.x, this.target.pos.y);
        }
    }

    vision() {
        this.listTarget = {
            colony: false,
            ally: false,
            alian: false,
            food: false,
            rock: false,
            labFood: false,
            labAnt: false,
            random: false
        };

        if (!this.load){
            this.listTarget.random = {pos: model.rndPos(this.pos, this.range)};
        } else{
            let dCol = model.delta(this.pos, this.colony);
            let dRnd = dCol;
            let limit = 3;

            while (dCol >= dRnd && limit >= 0){
                this.listTarget.random = {pos: model.rndPos(this.pos, this.range)};
                dRnd = model.delta(this.listTarget.random, this.colony);
                limit--;
            }
        }

        this.pos = model.intPos(this.pos);
        for (let i = 1; i <= this.range; i++){
            let sector = model.getSector(this.pos, i);
            for (let j = sector.left; j <= sector.right; j++){
                this.memori(model.map[j][sector.top], model.air[i][sector.top]);
                this.memori(model.map[j][sector.bottom], model.air[j][sector.bottom]);
            }
            for (let j = sector.top - 1; j <= sector.bottom + 1; j++){
                this.memori(model.map[sector.left][j], model.air[sector.left][j]);
                this.memori(model.map[sector.right][j], model.air[sector.right][j]);
            }
        }
        return this.listTarget;
    }

    //Запоминание обьектов
    memori(point, smell) {
        if (point instanceof Colony && point.color == this.color)
            this.listTarget.colony = point;
        else if (point instanceof Ant && point.color == this.color)
            this.listTarget.ally = point;
        else if (point instanceof Ant && point.color != this.color && point.load instanceof Food)
            this.listTarget.alian = point;
        else if (point instanceof Food && !this.listTarget.food)
            this.listTarget.food = point;
        else if (point instanceof Rock)
            this.listTarget.rock = point;
        if (smell instanceof Label && smell.color == Food.color && smell.weight < this.listTarget.labFood.weight)
            this.listTarget.labFood = smell;
        else if (smell instanceof Label && smell.color == this.color && smell.weight > this.listTarget.labAnt.weight)
            this.listTarget.labAnt = smell;
    }

    //Расчет угла
    getAngle(pos, target) {
        return Math.atan2(target.pos.y - pos.y, target.pos.x - pos.x) + Math.PI / 2;
    }

    goStep() {
        let pos = model.intPos(this.pos);
        model.map[pos.x][pos.y] = false;
        this.step--;
        if (this.step < 0) {
            this.pose = !this.pose;
            this.step = 4;
            if (this.pose)
                model.newLabel(this.color, pos);
            else if (this.load)
                model.newLabel(this.load.color, pos);
        }
        let angle = this.angle - Math.PI / 2;
        this.pos.x += this.speed * Math.cos(angle);
        this.pos.y += this.speed * Math.sin(angle);
        pos = model.rndPos({
            x : this.pos.x,
            y : this.pos.y
        }, 2);
        pos = model.intPos(pos);
        model.map[pos.x][pos.y] = this;
    }
}
