// Ant Simulator

class PI {
    select (ant) {
        if (ant.pose) {
            ant.action = Action.wait;
            ant.timer = 20;
        } else {
            ant.action = Action.find;
            ant.target = {
                x: Math.round(Math.random()*600 - 300 + ant.pos.x),
                y: Math.round(Math.random()*600 - 300 + ant.pos.y)
            }
            ant.angle = ant.getAngle(ant.pos, ant.target);
            ant.timer = 30;
        }
        ant.pose = !ant.pose;
    }
}

class AI {
    select (ant) {
        ant.action = Action.listAction[Math.floor(Math.random()*Action.listAction.length)];
    }
}