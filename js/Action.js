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
        ant.target = model.rndPos(ant.pos);
        ant.angle = ant.getAngle(ant.pos, ant.target);
    }

    static back(ant) {
        ant.timer = 20;
        ant.walk = true;
        ant.food = 1;
        // ВОЗВРАЩАЕТСЯ В МУРАВЕЙНИК
    }
    
    static move(ant) {
        ant.timer = 20;
        ant.pose = !ant.pose;
        ant.walk = true;
    }

    static grab(ant) {
        ant.timer = 20;
        ant.run = true;
        ant.food = 1;
    }

    static kick(ant) {
        ant.timer = 20;
        ant.run = false;
        // НАНОСИТ УРОН
    }

    static dead(ant) {
        ant.timer = 20;
        ant.run = false;
        // УМИРАЕТ
    }

    static drop(ant) {
        ant.timer = 20;
        ant.run = false;
        ant.food = 0;
    }

    static info(ant) {
        ant.timer = 20;
        ant.run = false;
        // ПЕРЕДАЕТ ИНФОРМАЦИЮ
    }

    static flex(ant){
        ant.timer = 20;
        ant.run = false;
        // ТАНЦУЕТ
    }
}

//wait, find, back, move, grab, kick, dead, quit