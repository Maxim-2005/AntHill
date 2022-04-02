// Ant Simulator

class Ant {
    constructor(colony) {
        this.color = colony.color;
        this.pos = {
            x: colony.pos.x,
            y: colony.pos.y
        };
        this.pose = false;
        this.speed = 3;
        this.target = {
            x: Math.round(window.innerWidth / 2),
            y: Math.round(window.innerHeight / 2)
        }
        this.ang = this.getAngle(this.pos, this.target);
        this.action = () => Action.wait(this);
        this.timer = 20;
    }

    update() {
        this.action();
        this.timer--;
        if (this.timer < 0) {
            if (this.action == Action.find) {
                this.action = () => Action.find(this);
                this.timer = 20;
            }
        }
    }

    draw(ctx, fw) {
        let x = this.pos.x;
        let y = this.pos.y;
        let ang = this.ang;

        this.pose = !this.pose
        ctx.fillStyle=this.color;
        ctx.strokeStyle="#black";
        ctx.lineWidth=2;

        //Поворот
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(ang)
        ctx.translate(-x, -y)

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

        //Брюхо
        ctx.beginPath();
        ctx.ellipse(x-fw.size20, y+fw.size26, fw.size8, fw.size14, 0, 0, Math.PI*2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        ctx.restore();
    }

    //Расчет угла
    getAngle(pos, target) {
        return Math.atan2(target.y - pos.y, target.x - pos.x) + Math.PI / 2;
    }
}

class Flyweight {
    constructor() {
         //Основа
        this.size = 0.5;
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