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

    static wait(ant) { // GOTOVO
        ant.timer = 20;
        ant.walk = false;
    }

    static find(ant) { 
        ant.goal = Food;
        ant.walk = true;
        ant.target = {pos: model.rndPos(ant.pos, ant.range)};
        ant.timer = Math.round(model.delta(ant.pos, ant.target) / ant.speed);
        ant.angle = ant.getAngle(ant.pos, ant.target);
    }

    static back(ant) {
        ant.goal = Colony;
        ant.walk = true;
        ant.target = {pos: model.rndPos(ant.pos, ant.range)};
        ant.timer = Math.round(model.delta(ant.pos, ant.target) / ant.speed);
        ant.angle = ant.getAngle(ant.pos, ant.target);
        // ВОЗВРАЩАЕТСЯ В МУРАВЕЙНИК
    }
    
    static move(ant) {
        ant.timer = Math.round(model.delta(ant.pos, ant.target) / ant.speed) - 10;
        ant.angle = ant.getAngle(ant.pos, ant.target);
        ant.walk = true;
    }

    static grab(ant) {
        ant.walk = false;
        ant.goal = Colony;
        ant.timer = 20;
        let food = Math.min(50, ant.target.weight)
        ant.target.weight -= food;
        ant.load = new Food();
        ant.load.weight = food;
        ant.speed = 1.5;
        if (ant.target.weight < 1) {
            model.map[ant.target.pos.x][ant.target.pos.y] = false;
        }
        //УДАЛИТЬ КОРМ С КАРТЫ ЕСЛИ 0
    }

    static kick(ant) {
        ant.timer = 20;
        ant.walk = false;
        // НАНОСИТ УРОН
    }

    static dead(ant) {
        ant.walk = false;
        ant.color = "black";
        ant.target = false;
        ant.timer = 20;
        if (ant.load) {
            ant.Action = Action.drop;
        }
        // УМИРАЕТ
    }

    static drop(ant) {
        ant.walk = false;
        ant.goal = constructor;
        ant.timer = 20;
        ant.target.food += ant.load.weight;
        ant.load = false;
        ant.speed = 2;
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