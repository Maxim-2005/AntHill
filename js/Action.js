class Action {
    static listAction = [
        Action.wait,
        Action.find,
        Action.back,
        Action.move,
        Action.grab,
        Action.kick,
        Action.dead,
        Action.drop,
        Action.info,
        Action.flex
    ];

    static wait(ant) {
        ant.timer = 20;
        ant.walk = false;
    }

    static find(ant) {
        ant.goal = Food;
        ant.timer = 20;
        ant.walk = true;
        ant.target = {pos: model.rndPos(ant.pos, ant.range)};
        ant.angle = ant.getAngle(ant.pos, ant.target);
    }

    static back(ant) {
        ant.goal = Colony;
        ant.target = {pos: model.rndPos(ant.pos, ant.range)};
        ant.angle = ant.getAngle(ant.pos, ant.target);
        ant.timer = 20;
        ant.walk = true;
        // ВОЗВРАЩАЕТСЯ В МУРАВЕЙНИК
    }
    
    static move(ant) {
        ant.timer = Math.round(model.delta(ant.pos, ant.target) / ant.speed) - 10;
        ant.angle = ant.getAngle(ant.pos, ant.target);
        ant.walk = true;
    }

    static grab(ant) {
        ant.goal = Colony;
        ant.timer = 20;
        ant.walk = false;
        ant.load = new Food();
    }

    static kick(ant) {
        ant.timer = 20;
        ant.walk = false;
        // НАНОСИТ УРОН
    }

    static dead(ant) {
        ant.timer = 20;
        ant.walk = false;
        // УМИРАЕТ
    }

    static drop(ant) {
        ant.timer = 20;
        ant.walk = false;
        ant.food = 0;
    }

    static info(ant) {
        ant.timer = 20;
        ant.walk = false;
        // ПЕРЕДАЕТ ИНФОРМАЦИЮ
    }

    static flex(ant){
        ant.timer = 20;
        ant.walk = false;
        // ТАНЦУЕТ
    }
}

//wait, find, back, move, grab, kick, dead, quit