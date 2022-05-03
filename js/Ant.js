// Ant Simulator

class Ant {
    constructor(colony) {
        this.color = colony.color;
        this.pos = {
            x: colony.pos.x,
            y: colony.pos.y
        };
        this.range = 30;
        this.target = {pos: model.rndPos(this.pos, this.range)};
        this.pose = false;
        this.ai = colony.ai;
        this.goal = constructor;
        this.speed = 2;
        this.life = 100;
        this.angle = this.getAngle(this.pos, this.target);
        this.action = Action.wait;
        this.timer = 0;
        this.load = false;
        this.walk = false;
    }

    update() {
        this.timer--;
        if (this.timer < 0) {
            if (this.life <= 0)
                this.action = Action.dead;
            else {
                this.pos = {
                    x: Math.round(this.pos.x),
                    y: Math.round(this.pos.y)
                }
                model.vision(this);
                this.ai.select(this);
                this.action(this);
            }
        }
        if (this.walk) {
            this.goStep()
        }
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
        ctx.moveTo(x-fw.size23, y-fw.size2);
        ctx.lineTo(x-fw.size32, y-fw.size8);
        ctx.lineTo(x-fw.size36, y-fw.size20);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(x-fw.size18, y-fw.size2);
        ctx.lineTo(x-fw.size8, y-fw.size8);
        ctx.lineTo(x-fw.size4, y-fw.size20);
        ctx.stroke();
        ctx.closePath();

        //Центральные
        ctx.beginPath();
        ctx.moveTo(x-fw.size24, y+fw.size6);
        ctx.lineTo(x-fw.size36, y+fw.size2);
        ctx.lineTo(x-fw.size44, y+fw.size8);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(x-fw.size18, y+fw.size6);
        ctx.lineTo(x-fw.size4, y+fw.size2);
        ctx.lineTo(x+fw.size4, y+fw.size8);
        ctx.stroke();
        ctx.closePath();

        //Задние
        ctx.beginPath();
        ctx.moveTo(x-fw.size24, y+fw.size10);
        ctx.lineTo(x-fw.size38, y+fw.size24);
        ctx.lineTo(x-fw.size34, y+fw.size40);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(x-fw.size18, y+fw.size10);
        ctx.lineTo(x-fw.size2, y+fw.size24);
        ctx.lineTo(x-fw.size6, y+fw.size40);
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

        ctx.fillStyle = this.color;
        ctx.font = "15pt VAG World";
        ctx.fillText(this.action.name + " " + this.target.name + " " + this.timer, x-16, y - 12);
    }

    //Расчет угла
    getAngle(pos, target) {
        return Math.atan2(target.pos.y - pos.y, target.pos.x - pos.x) + Math.PI / 2;
    }

    goStep() {
        this.pose = !this.pose;
        let angle = this.angle - Math.PI / 2;
        this.pos.x += this.speed * Math.cos(angle);
        this.pos.y += this.speed * Math.sin(angle);
    }
}

class Flyweight {
    constructor() {
         //Основа
        this.size = 0.3;
        this.size2 = this.size*2;
        this.size4 = this.size*4;
        this.size5 = this.size*5;
        this.size6 = this.size*6;
        this.size8 = this.size*8;
        this.size10 = this.size*10;
        this.size12 = this.size*12;
        this.size14 = this.size*14;
        this.size18 = this.size*18;
        this.size20 = this.size*20;
        this.size23 = this.size*23;
        this.size24 = this.size*24;
        this.size26 = this.size*26;
        this.size28 = this.size*28;
        this.size30 = this.size*30;
        this.size32 = this.size*32;
        this.size34 = this.size*34;
        this.size36 = this.size*36;
        this.size38 = this.size*38;
        this.size40 = this.size*40;
        this.size44 = this.size*44;
    }
}