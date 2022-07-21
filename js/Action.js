class Action {
    static listAction = [
        Action.wait,
        Action.find,
        Action.back,
        Action.move,
        Action.grab,
        Action.kick,
        Action.drop,
        Action.info,
        Action.flex,
        Action.dead
    ];
    //ЖДЕТ
    static wait(ant) {
        ant.timer = 20;
        ant.walk = false;
    }
    //ИЩЕТ ЦЕЛЬ
    static find(ant) { 
        if (ant.listTarget.food){
            ant.target = ant.listTarget.food;
        } else if (ant.listTarget.alian)
            ant.target = ant.listTarget.alian;
        else if (ant.listTarget.labFood)
            ant.target = ant.listTarget.labFood;
        else {
            ant.target = ant.listTarget.random;
        }
        ant.walk = true;
        ant.timer = Math.round(model.delta(ant.pos, ant.target) / ant.speed) - 10;
        ant.angle = ant.getAngle(ant.pos, ant.target);
        ant.score += 1;
    }
    //ИЩЕТ МУРАВЕЙНИК
    static back(ant) {
        if (ant.listTarget.colony){
            ant.target = ant.listTarget.colony;
        } else {
            ant.target = ant.listTarget.random;
        }
        ant.walk = true;
        ant.timer = Math.round(model.delta(ant.pos, ant.target) / ant.speed) - 10;
        ant.angle = ant.getAngle(ant.pos, ant.target);
        ant.score += 2;
        // ВОЗВРАЩАЕТСЯ В МУРАВЕЙНИК
    }
    //ПРИБЛИЖАЕТСЯ К ЦЕЛИ
    static move(ant) {
        if (ant.target){
            ant.angle = ant.getAngle(ant.pos, ant.target);
            ant.walk = true;
            ant.score += 2;
            ant.timer = Math.round(model.delta(ant.pos, ant.target) / ant.speed) - 10;
        }
    }
    // ПОДНИМАЕТ ЕДУ
    static grab(ant) {
        if (ant.target instanceof Food){
            let food = Math.min(50, ant.target.weight)
            ant.target.weight -= food;
            ant.load = new Food(ant.pos, food);
            ant.speed = 1;
            ant.timer = 20;
            ant.score += 10; 
            if (ant.target.weight < 1) {
                model.map[ant.target.pos.x][ant.target.pos.y] = false;
            }
        }
        ant.walk = false;

        //УДАЛИТЬ КОРМ С КАРТЫ ЕСЛИ 0
        let listFood = [];
        for (let food of model.listFood) {
            if (food.weight <= 0) {
                delete model.map[food.pos.x][food.pos.y];
                model.map[food.pos.x][food.pos.y] = false;
            } else
                listFood.push(food);
        }
        model.listFood = listFood;
    }
    // БЬЕТ ДРУГОГО МУРАВЬЯ 
    static kick(ant) {
        if (ant.target instanceof Ant && ant.target.color != ant.color) {
            ant.target.life -= 20;
            ant.score += 25;
            ant.angle = ant.getAngle(ant.pos, ant.target);
            ant.target.target = ant;
        }
        if (ant.target.life <= 0){
            ant.frags += 1;
            ant.colony.frags += 1;
        }
        ant.timer = 10;
        ant.walk = false;
        ant.target = false;
        console.log("KICK");
    }
    //УМИРАЕТ
    static dead(ant) {
        ant.walk = false;
        ant.color = 'rgba(0, 0, 0, 0.25)';
        ant.target = false;
        ant.timer = 20;
        if (ant.load) {
            ant.Action = Action.drop;
        }
        // УМИРАЕТ
    }
    //СБРАСЫВАЕТ КОРМ
    static drop(ant) {
        if (ant.load){
            ant.target.food += ant.load.weight;
            ant.load = false;
            ant.speed = 2;
            ant.score += 15;
        }
        ant.walk = false;
        ant.timer = 20;
    }
    // ПЕРЕДАЕТ ИНФОРМАЦИЮ
    static info(ant) {
        ant.timer = 20;
        ant.walk = false;
        ant.score += 10;
        // ПЕРЕДАЕТ ИНФОРМАЦИЮ
    }
    // ТАНЦУЕТ
    static flex(ant){
        ant.timer = 20;
        ant.walk = false;
        // ТАНЦУЕТ
    }
}

//wait, find, back, move, grab, kick, dead, quit