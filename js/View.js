// Ant Simulator

class View {
    constructor(model) {
        this.model = model;
        console.log('VIEW START');
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ant = new Ant(this.ctx);

    }

    draw() {
        this.ant.draw();
    }
}