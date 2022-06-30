// Ant Simulator

class View {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "center";
        this.canvas.width = model.size.width;
        this.canvas.height = model.size.height;
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

class Flyweight {
    static Pi2 = Math.PI*2;
    static Pi05 = Math.PI/2;
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