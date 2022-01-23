let amount = 500;
let objects = [];
let time = 0;
const gConst = .01;

function getRanFloat(max){ //max = n or -n 
    var ran = Math.random();
    var num = (Math.random() * max);
    if (ran > .5){
        num *= -1;
    }
    return num;
}

function start(){
    for (var i = 0; i < amount;i++){
       objects[i] = [];
       var object = objects[i];
       object["x"] = Math.abs(getRanFloat(5000));
       object["y"] = Math.abs(getRanFloat(2000));
       object["velocity"] = [getRanFloat(0),getRanFloat(0)]; //Set initial random velocity
       object["size"] = Math.abs(Math.trunc(getRanFloat(60))) + 10;
       object["density"] = Math.abs(getRanFloat(10) + 10); // + 10 cuz if its 0 its gonna have a bad time
       var newEl = document.createElement("div");
       object["element"] = newEl;
       newEl.setAttribute("id",String(i));
       newEl.setAttribute("class", "planet");
       newEl.style.width = String(object["size"] + "px");
       newEl.style.height = String(object["size"] + "px");
       newEl.style.position = "absolute";
       newEl.style.backgroundColor = "rgb(" + String(Math.abs(Math.trunc(getRanFloat(255)))) + "," + String(Math.abs(Math.trunc(getRanFloat(255)))) + "," + String(Math.abs(Math.trunc(getRanFloat(255)))) + ")";
       document.body.appendChild(newEl);
    }
    update();
}

function update(){ //Updates every millisecond, Updates position based on velocity
    applyForces(); //Update velocities
    for (var i = 0; i < amount;i++){
        var object = objects[i];
        var velocity = object["velocity"];
        var vX = velocity[0]; //Velocity X
        var vY = velocity[1]; //Velocity Y
        object["x"] += vX;
        object["y"] += vY;

        //Update Element Position
        object["element"].style.left = String(object["x"] + "px");
        object["element"].style.top = String(object["y"] + "px");
        object["element"].style.transform = "45deg";
        time++;
     }

    setTimeout(function(){
        update();
    },1)
}

function getDistance(index1,index2){
    return Math.sqrt( Math.pow((objects[index1]["x"] - objects[index2]["x"]),2) + Math.pow((objects[index1]["y"] - objects[index2]["y"]),2) ); //DISTANCE FORMULA
}

function applyForces(){ //Applies force to the velocity
    for (var i = 0;i < amount;i++){
        let mass1 = objects[i]["size"];
        for (var e = 0;e < amount;e++){
            if (e != i){ //GRAVITY FORMULA (GOOGLE IT, ITS THE FIRST THING THAT POPS UP)
                let mass2 = objects[e]["size"];
                let distance = Math.pow(getDistance(i,e),2) + 0;

                let force = gConst * (mass1 * mass2)/distance;
                var newX = (objects[e]["x"] - objects[i]["x"]) * force * objects[i]["density"];
                var newY = (objects[e]["y"] - objects[i]["y"]) * force * objects[i]["density"];
                objects[e]["velocity"][0] -= newX/(objects[e]["size"] * objects[e]["density"]);
                objects[e]["velocity"][1] -= newY/(objects[e]["size"] * objects[e]["density"]);
            }
        }
    }
}