// Ant Simulator

class View {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "center";
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.fw = new Flyweight();
    }

    draw() {
        this.ctx.fillStyle = 'darkgreen';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);


        for (let block of model.listBlock) {
            block.draw(this.ctx);
        }

        for (let rock of model.listRock) {
            rock.draw(this.ctx);
        }

        for (let food of model.listFood) {
            food.draw(this.ctx);
        }

        if (control.label){
            for (let label of model.listLabel) {
                label.draw(this.ctx);
            }
        } 

        for (let colony of model.listColony){
            for (let ant of colony.listAnt) {
                ant.draw(this.ctx, this.fw);
            }
        }

        for (let colony of model.listColony){
            colony.draw(this.ctx);
        }
    }
}