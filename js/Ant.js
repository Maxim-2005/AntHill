// Ant Simulator

class Ant {
    constructor() {
        this.pose = false;
        this.size = 0.5;
    }

    draw(x, y, ang, col) {

        //Основа
        let size2 = this.size*2;
        let size4 = this.size*4;
        let size5 = this.size*5;
        let size6 = this.size*6;
        let size8 = this.size*8;
        let size10 = this.size*10;
        let size12 = this.size*12;
        let size14 = this.size*14;
        let size18 = this.size*18;
        let size20 = this.size*20;
        let size23 = this.size*23;
        let size24 = this.size*24;
        let size26 = this.size*26;
        let size28 = this.size*28;
        let size30 = this.size*30;
        let size32 = this.size*32;
        let size34 = this.size*34;
        let size36 = this.size*36;
        let size38 = this.size*38;
        let size40 = this.size*40;
        let size44 = this.size*44;

        let ctx = view.ctx;
        this.pose = !this.pose
        ctx.fillStyle=col;
        ctx.strokeStyle="#black";
        ctx.lineWidth=3;

        //Поворот
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(ang)
        ctx.translate(-x, -y)

        //Грудь
        ctx.beginPath();
        ctx.ellipse(x-size20, y+size5, size4, size10, 0, 0, Math.PI*2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        //Голова
        ctx.beginPath();
        ctx.ellipse(x-size20, y-size10, size6, size6, 0, 0, Math.PI*2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        //Усики
        ctx.beginPath();
        ctx.moveTo(x-size23, y-size14);
        ctx.lineTo(x-size28, y-size24);
        ctx.lineTo(x-size24, y-size30);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(x-size18, y-size14);
        ctx.lineTo(x-size12, y-size24);
        ctx.lineTo(x-size18, y-size30);
        ctx.stroke();
        ctx.closePath();

        //Ножки
        //Передние
        ctx.beginPath();
        ctx.moveTo(x-size23, y-size2);
        ctx.lineTo(x-size32, y-size8);
        ctx.lineTo(x-size36, y-size20);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(x-size18, y-size2);
        ctx.lineTo(x-size8, y-size8);
        ctx.lineTo(x-size4, y-size20);
        ctx.stroke();
        ctx.closePath();

        //Центральные
        ctx.beginPath();
        ctx.moveTo(x-size24, y+size6);
        ctx.lineTo(x-size36, y+size2);
        ctx.lineTo(x-size44, y+size8);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(x-size18, y+size6);
        ctx.lineTo(x-size4, y+size2);
        ctx.lineTo(x+size4, y+size8);
        ctx.stroke();
        ctx.closePath();

        //Задние
        ctx.beginPath();
        ctx.moveTo(x-size24, y+size10);
        ctx.lineTo(x-size38, y+size24);
        ctx.lineTo(x-size34, y+size40);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(x-size18, y+size10);
        ctx.lineTo(x-size2, y+size24);
        ctx.lineTo(x-size6, y+size40);
        ctx.stroke();
        ctx.closePath();

        //Брюхо
        ctx.beginPath();
        ctx.ellipse(x-size20, y+size26, size8, size14, 0, 0, Math.PI*2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        ctx.restore();
    }

}