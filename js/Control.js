// Ant Simulator

class Control {
    constructor() {
        this.fps = 40;
        this.play = true;
        this.focus = false;
        this.info = false;
        this.label = true;

        this.btnPlay = document.getElementById("play");
        this.btnClear = document.getElementById("clear");
        this.btnSave = document.getElementById("save");
        this.btnPlay.addEventListener('click', this.game.bind(this));
        this.btnClear.addEventListener('click', this.clear.bind(this));
        this.btnSave.addEventListener('click', this.save.bind(this));

        setInterval(() => this.update(), this.fps);
        onclick = (e) => this.onClick(e);
        onkeydown = (e) => this.OnKeyDown(e);
    }

    update() {
        if (this.play)
            model.update();
        view.draw();
    }

    onClick(e) {
        if (!this.focus) {
            model.newFood(model.rndPos({x: e.clientX, y: e.clientY}));
        }
        this.focus = false;
    }

    OnKeyDown(e) {
        if (e.keyCode == 73) {
            this.info = !this.info
        }
        if (e.keyCode == 32) { 
            this.label = !this.label
        }
    }

    game() {
        this.focus = true;
        this.play = !this.play;
        this.btnName();
    }

    clear() {
        this.focus = true;
        this.btnName();
        model = new Model();
    }

    save() {}
    
    btnName(){
        if (this.play)
            this.btnPlay.innerHTML='<i class="fa fa-pause" aria-hidden="true"></i>';
        else
            this.btnPlay.innerHTML='<i class="fa fa-play" aria-hidden="true"></i>';
    }
}