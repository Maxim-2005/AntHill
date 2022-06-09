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

class RI {
    select (ant) {
        if (ant.life <= 0)
            ant.action = Action.dead;
        else
            ant.action = Action.listAction[Math.floor(Math.random()*Action.listAction.length)];
    }
}

class AI {
    countIn = 11; // Life target load target food rock
    count1 = 7
    count2 = 5;
    countOut = 9;

    constructor(ant) {
        //Входящие данные
        this.inputNodes = [
            //ant.life /= 100,
            //!!ant.target,
            //ant.load instanceof Food,
            //ant.load instanceof Rock,
            //!!ant.listTarget.colony,
            //!!ant.listTarget.ally,
            //!!ant.listTarget.alian,
            //!!ant.listTarget.food,
            //!!ant.listTarget.rock,
            //!!ant.listTarget.labFood,
            //!!ant.listTarget.labAnt
        ]

        this.hiddenNodes1 = new Array(7);
        this.hiddenNodes1 = new Array(5);

        //Исходящие данные
        this.outputNodes = [
            Action.wait,
            Action.find,
            Action.back,
            Action.move,
            Action.grab,
            Action.kick,
            Action.drop,
            Action.info,
            Action.flex
        ];
    }

    
    init(Ant) {
        Ant.nn.w_1 = this.rndSynapse(this.countIn, this.count1);
        Ant.nn.w_2 = this.rndSynapse(this.count1, this.count2);
        Ant.nn.w_3 = this.rndSynapse(this.count2, this.countOut);
    }

    select (ant) {
        ant.action = Action.listAction[Math.floor(Math.random()*Action.listAction.length)];
    }
 
    rndSynapse (start, finish) {
        let node = [];
        for (let i = 0; i < start; i++){
            node[i] = [];
            for (let j = 0; j < finish; j++){
                node[i][j] = Math.random();
            };
        };
        return node;
    };
}