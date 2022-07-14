// Ant Simulator

class PI {
    select (ant) {
        if (ant.life <= 0)
            ant.action = Action.dead;
        else if (ant.target && model.delta(ant.pos, ant.target) > 10)
            ant.action = Action.move;
        else if (ant.load && ant.target instanceof Colony && model.delta(ant.pos, ant.target) < 10)
            ant.action = Action.drop;
        else if (ant.taget instanceof Ant && ant.target.color != ant.color)
            ant.action = Action.kick;
        else if (!ant.load && ant.target instanceof Food)
            ant.action = Action.grab;
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
    count1 = 7;
    count2 = 5;
    countOut = 9;

    constructor(ant) {
        //Входящая нота
        this.inputNodes = this.fillNodes(this.countIn);
        //Промежточные
        this.hiddenNodes1 = this.fillNodes(this.count1);
        this.hiddenNodes2 = this.fillNodes(this.count2);
        //Исходящие данные
        this.outputNodes = this.fillNodes(this.countOut);
    }

    // Создает синапсы
    init(ant) {
        ant.nn.w_1 = this.rndSynapse(this.countIn, this.count1);
        ant.nn.w_2 = this.rndSynapse(this.count1, this.count2);
        ant.nn.w_3 = this.rndSynapse(this.count2, this.countOut);
    }

    //Выбор действия
    select (ant) {
        if (ant.life <= 0) {
            ant.action = Action.dead;
        } else{
            this.inputNodes = this.normInput(ant);
            this.hiddenNodes1 = this.synapse(this.inputNodes, ant.nn.w_1, this.hiddenNodes1);
            this.hiddenNodes1 = this.norm(this.hiddenNodes1);
            this.hiddenNodes2 = this.synapse(this.hiddenNodes1, ant.nn.w_2, this.hiddenNodes2);
            this.hiddenNodes2 = this.norm(this.hiddenNodes2);
            this.outputNodes = this.synapse(this.hiddenNodes2, ant.nn.w_3, this.outputNodes);
            this.outputNodes = this.norm(this.outputNodes);
            let maxi = Math.max(...this.outputNodes);
            let index = this.outputNodes.indexOf(maxi);
            ant.action = Action.listAction[index];
        }
    }

    //Заполнить ноду
    fillNodes (count) {
        let node = [];
        for (let i = 0; i < count; i++){
            node[i] = 0.0;
        }
        return node;
    }

    //Нормировка входяших данных
    normInput (ant) {
        let node = [
            ant.life /= 100,
            !!ant.target,
            ant.load instanceof Food,
            ant.load instanceof Rock,
            !!ant.listTarget.colony,
            !!ant.listTarget.ally,
            !!ant.listTarget.alian,
            !!ant.listTarget.food,
            !!ant.listTarget.rock,
            !!ant.listTarget.labFood,
            !!ant.listTarget.labAnt
        ];
        return node;
    }

    //формировка
    norm (node) {
        let maximum = Math.max(...node);
        for (let i = 0; i < node.length; i++){
            node[i] /= maximum;
        }
        return node;
    }

    //Расчет данных нейрона
    synapse (start, weight, finish) {
        //console.log(start);
        for (let i = 0; i < start.length; i++){
            for (let j = 0; j < finish.length; j++){
                finish[j] += start[i] * weight[i][j];
            }
        }
        return finish;
    }
 
    //Случайные веса
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