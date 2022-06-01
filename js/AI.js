// Ant Simulator

class PI {
    select (ant) {
        if (ant.life <= 0)
            ant.action = Action.dead;
        else if (ant.load && ant.target instanceof Colony && model.delta(ant.pos, ant.target) < 10)
            ant.action = Action.drop;
        else if (false)
            ant.action = Action.kick;
        else if (!ant.load && model.delta(ant.pos, ant.target) <= 10 && ant.target instanceof Food)
            ant.action = Action.grab;
        else if (ant.target && model.delta(ant.pos, ant.target) > 10)
            ant.action = Action.move;
        else if (ant.load)
            ant.action = Action.back;
        else if (!ant.load)
            ant.action = Action.find;
        else if (false)
            ant.action = Action.flex;
        else if (false)
            ant.action = Action.info;
        else
            ant.action = Action.wait;
    }
}

class AI {
    select (ant) {
        ant.action = Action.listAction[Math.floor(Math.random()*Action.listAction.length)];
    }
}