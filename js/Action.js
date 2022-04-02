class Action {
    static wait(ant) {
        console.log("Муравей думает");
        ant.target = {
            x: Math.round(Math.random()*600 - 300 + ant.pos.x),
            y: Math.round(Math.random()*600 - 300 + ant.pos.y)
        }
    }

    static find(ant) {
        console.log("Муравей потерялся");
        let ang = ant.ang - Math.PI / 2;
        ant.pos.x = Math.round(ant.pos.x + ant.speed * Math.cos(ang));
        ant.pos.y = Math.round(ant.pos.y + ant.speed * Math.sin(ang));
    }

    static back() {
        console.log("Муравей уходит");
    }
    
    static move() {
        console.log("Муравей куда то идет");
    }

    static grab() {
        console.log("Муравей чо то несет");
    }

    static kick() {
        console.log("Муравей сражается");
    }

    static dead() {
        console.log("Муравей сдох");
    }

    static quit() {
        console.log("Муравей чо то сбросил");
    }
}

//wait, find, back, move, grab, kick, dead, quit