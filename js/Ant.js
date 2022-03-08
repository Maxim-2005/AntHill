// Ant Simulator

class Ant {
    constructor(ctx) {
        this.ctx = ctx
    }

    draw() {
        this.ctx.fillStyle="#293133";
        this.ctx.strokeStyle="#black";
        this.ctx.lineWidth=3

        //Грудь
        this.ctx.beginPath();
        this.ctx.ellipse(100, 235, 30, 60, 0, 0, Math.PI*2);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();

        //Усики
        this.ctx.beginPath();
        this.ctx.moveTo(85, 120)
        this.ctx.lineTo(60, 80)
        this.ctx.lineTo(80, 50)
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.moveTo(115, 120)
        this.ctx.lineTo(140, 80)
        this.ctx.lineTo(120, 50)
        this.ctx.stroke();
        this.ctx.closePath();

        //Голова
        this.ctx.beginPath();
        this.ctx.ellipse(100, 150, 30, 35, 0, 0, Math.PI*2);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();

        //Лапки
        //Передние
        this.ctx.beginPath();
        this.ctx.moveTo(80, 190)
        this.ctx.lineTo(40, 160)
        this.ctx.lineTo(20, 100)
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.moveTo(120, 190)
        this.ctx.lineTo(160, 160)
        this.ctx.lineTo(180, 100)
        this.ctx.stroke();
        this.ctx.closePath();

        //Центральные
        this.ctx.beginPath();
        this.ctx.moveTo(70, 230)
        this.ctx.lineTo(20, 210)
        this.ctx.lineTo(-20, 240)
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.moveTo(130, 230)
        this.ctx.lineTo(180, 210)
        this.ctx.lineTo(220, 240)
        this.ctx.stroke();
        this.ctx.closePath();

        //Нижние
        this.ctx.beginPath();
        this.ctx.moveTo(72, 260)
        this.ctx.lineTo(10, 320)
        this.ctx.lineTo(30, 400)
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.moveTo(128, 260)
        this.ctx.lineTo(190, 320)
        this.ctx.lineTo(170, 400)
        this.ctx.stroke();
        this.ctx.closePath();

        //Брюхо
        this.ctx.beginPath();
        this.ctx.ellipse(100, 330, 40, 50, 0, 0, Math.PI*2);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        

    }

}