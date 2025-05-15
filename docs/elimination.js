let enable = false;
let elim = document.getElementById("elim");
function enableelim(){
    buttonclicksound();
    if (enable===false){
        enable = true;
        elim.style.backgroundColor = "orange";
    }
    else{
        enable = false;
        elim.style.backgroundColor = "";
    }
}


function returnadjacentsides(num){
    let adjacentsides = [];
    for (let i = 0; i < adjacency.length; i++) {
        if (adjacency[num][i] === 1) {
            adjacentsides.push(i);
        }
    }
    return adjacentsides;
}

/*function checkfordeath(item,enemy){
    let neighbouring = returnadjacentsides(item);
        let allOpposite = neighbouring.every(index => occupiedby[index] === enemy);
        if(allOpposite){
            let layer = getLayer(item);
            if (layer==="outer"){outer-=1;}
            if(layer==="middle"){middle-=1;}
            if(layer==="inner"){inner-=1;}
            document.getElementById(`circle${String(item)}`).style.backgroundColor = "";
            enemy==="red"?movehistory.push([item,null,"blue",outer,middle,inner,middleunlocked,innerunlocked,item]):movehistory.push([item,null,"red",outer,middle,inner,middleunlocked,innerunlocked,true]);
            updatehistory();
            occupied[item] = false;
            console.log("hi");
            occupiedby[item] = null; 
            return true;
}   
    return false
}

function checkforelimination(num2,enemy){
    //let a = (enemy==="red")?"blue":"red";
    //let dead = checkfordeath(num2,a);
    if(enable){
    let adjacentsides = returnadjacentsides(num2);
    adjacentsides.forEach((item)=>{
        checkfordeath(item,enemy);
    });
    console.log(occupiedby);
}
    else{
        return;
    }
}*/
function checkfordeath(index, enemy,metadata) {
    let neighbors = returnadjacentsides(index);
    let allOpposite = neighbors.every(i => occupiedby[i] === enemy);

    if (allOpposite) {
        let layer = getLayer(index);
        if (layer === "outer") outer--;
        if (layer === "middle") middle--;
        if (layer === "inner") inner--;

        document.getElementById(`circle${index}`).style.backgroundColor = "";
        occupied[index] = false;
        occupiedby[index] = null;

        if (metadata==="self"){
        movehistory.push([index, null,enemy === "red" ? "blue" : "red",outer, middle, inner,middleunlocked, innerunlocked,"self"]);
        updatehistory();   
        console.log("self elimination");
        }
        else{
        movehistory.push([index, null,enemy,outer, middle, inner,middleunlocked, innerunlocked,"other"]);
        updatehistory();   
        console.log("other elimination");
        }

        return true;
    }
    return false;
}

function checkforelimination(currentIndex, currentColor) {
    if (!enable) return;

    let eliminated = [];
    let enemyColor = currentColor === "red" ? "blue" : "red";

    let currentSurrounded = checkfordeath(currentIndex, enemyColor,"self");
    if (currentSurrounded) {
        eliminated.push(currentIndex);
    }

    let neighbors = returnadjacentsides(currentIndex);


    neighbors.forEach(index => {
        if (occupiedby[index] === enemyColor) {
            let eliminatedEnemy = checkfordeath(index, currentColor,"other");
            if (eliminatedEnemy) {
                eliminated.push(index);
            }
        }
    });

    return eliminated;
}
