// Ant Simulator

class Ant {
    constructor(ctx) {
        this.ctx = ctx
    }

    draw() {
        this.ctx.strokeStyle="gray";
        this.ctx.fillStyle="black";
        this.ctx.beginPath();
        this.ctx.lineTo(150, 400);
        this.ctx.arc(150, 100, 50, 0, 2*Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();

        console.log(123);
    }

}