// Ant Simulator

class Ant {
    constructor() {
        this.pos = {x: 250, y: 250};
    }

    draw(ctx) {
        let x = this.pos.x;
        let y = this.pos.y;
        ctx.fillStyle="#293133";
        ctx.strokeStyle="#black";
        ctx.lineWidth=3;

        //Грудь
        ctx.beginPath();
        ctx.ellipse(x-100, y+25, 20, 50, 0, 0, Math.PI*2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        //Голова
        ctx.beginPath();
        ctx.ellipse(x-100, y-50, 30, 35, 0, 0, Math.PI*2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        //Усики
        ctx.beginPath();
        ctx.moveTo(x-115, y-70);
        ctx.lineTo(x-140, y-120);
        ctx.lineTo(x-120, y-150);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(x-85, y-70);
        ctx.lineTo(x-60, y-120);
        ctx.lineTo(x-80, y-150);
        ctx.stroke();
        ctx.closePath();

        //Ножки
        //Передние
        ctx.beginPath();
        ctx.moveTo(x-115, y-10);
        ctx.lineTo(x-160, y-40);
        ctx.lineTo(x-180, y-100);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(x-85, y-10);
        ctx.lineTo(x-40, y-40);
        ctx.lineTo(x-20, y-100);
        ctx.stroke();
        ctx.closePath();

        //Центральные
        ctx.beginPath();
        ctx.moveTo(x-120, y+30);
        ctx.lineTo(x-180, y+10);
        ctx.lineTo(x-220, y+40);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(x-80, y+30);
        ctx.lineTo(x-20, y+10);
        ctx.lineTo(x+20, y+40);
        ctx.stroke();
        ctx.closePath();

        //Задние
        ctx.beginPath();
        ctx.moveTo(x-118, y+50);
        ctx.lineTo(x-190, y+120);
        ctx.lineTo(x-170, y+200);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(x-82, y+50);
        ctx.lineTo(x-10, y+120);
        ctx.lineTo(x-30, y+200);
        ctx.stroke();
        ctx.closePath();

        //Брюхо
        ctx.beginPath();
        ctx.ellipse(x-100, y+130, 40, 70, 0, 0, Math.PI*2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

}