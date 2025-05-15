let undohistory = [];

function undo(){
    let layer;
    if(!paused){
    if(movehistory.length === 0){return null;}
    let [initial,final,player,out,mid,inn,midunlocked,innunlocked,metadata] = movehistory[movehistory.length-1];
    undohistory.push([initial,final,player,outer,middle,inner,middleunlocked,innerunlocked,metadata]);
    outer = out;
    middle = mid;
    inner = inn;
    middleunlocked = midunlocked;
    innerunlocked = innunlocked;
    buttonclicksound();
    enemy = (player==="red")?"blue":"red";

    if (final === null && metadata !== undefined) {
        if(metadata==="self"){
        document.getElementById(`circle${initial}`).style.backgroundColor = player;
        }
        else{
            document.getElementById(`circle${initial}`).style.backgroundColor = enemy;
        }
        occupied[initial] = true;
        occupiedby[initial] = player;
        let layer = getLayer(initial);
        if (layer === "outer") { outer += 1; }
        if (layer === "middle") { middle += 1; }
        if (layer === "inner") { inner += 1; }
        movehistory.pop();
        undo();
    }
    
    if(initial === null){
        document.getElementById(`circle${String(final)}`).style.backgroundColor = null;
        toggle();
        turn = player;
        occupied[final] = false;
        player === "red"? reds+=1: blues +=1;
        layer = getLayer(final);
        layer==="outer"?outer -=1:middle-=1;
        if(outer!==6 && midunlocked){middleunlocked = false;}
        if(inner!==6 && innunlocked){innerunlocked = false;}
        document.getElementById("player").textContent = turn.charAt(0).toUpperCase() + turn.slice(1);
        document.getElementById("player").style.color = turn;
    }
    else{
        document.getElementById(`circle${String(final)}`).style.backgroundColor = null;
        document.getElementById(`circle${String(initial)}`).style.backgroundColor = player;
        toggle();
        turn = player;
        active = null;
        occupied[final] = false;
        occupied[initial] = true;
        document.getElementById("player").textContent = turn.charAt(0).toUpperCase() + turn.slice(1);
        document.getElementById("player").style.color = turn;
    }
    console.log(undohistory);
    movehistory.pop();
    document.getElementById("commands").insertAdjacentHTML(`afterbegin`,`<div class="element">
        <div class="undoredo">Undo</div>
    </div>`);
    }
}

function redo() {
    if (!paused) {
        if (undohistory.length === 0) { return null; }
        let [initial, final, player, out, mid, inn, midunlocked, innunlocked, metadata] = undohistory[undohistory.length - 1];
        movehistory.push([initial, final, player, outer, middle, inner, middleunlocked, innerunlocked, metadata]);
        outer = out;
        middle = mid;
        inner = inn;
        middleunlocked = midunlocked;
        innerunlocked = innunlocked;
        buttonclicksound();

        if (final === null && metadata !== undefined) {
            document.getElementById(`circle${initial}`).style.backgroundColor = null;
            occupied[initial] = false;
            occupiedby[initial] = null;
            let layer = getLayer(initial);
        if (layer === "outer") { outer -= 1; }
        if (layer === "middle") { middle -= 1; }
        if (layer === "inner") { inner -= 1; }
            undohistory.pop();
        }
        
        if (initial === null) {
            document.getElementById(`circle${String(final)}`).style.backgroundColor = player;
            toggle();
            turn = (player === "red") ? "blue" : "red";
            occupied[final] = true;
            occupiedby[final] = player;
            player === "red" ? reds -= 1 : blues -= 1;
            layer = getLayer(final);
            if (outer === 6) { middleunlocked = true; }
            if (inner === 6) { innerunlocked = true; }
            document.getElementById("player").textContent = turn.charAt(0).toUpperCase() + turn.slice(1);
            document.getElementById("player").style.color = turn;
        }
        else {
            document.getElementById(`circle${String(initial)}`).style.backgroundColor = null;
            document.getElementById(`circle${String(final)}`).style.backgroundColor = player;
            toggle();
            turn = (player === "red") ? "blue" : "red";
            active = null;
            occupied[initial] = false;
            occupied[final] = true;
            occupiedby[final] = player;
            document.getElementById("player").textContent = turn.charAt(0).toUpperCase() + turn.slice(1);
            document.getElementById("player").style.color = turn;
        }

        console.log(movehistory);
        undohistory.pop();
        document.getElementById("commands").insertAdjacentHTML(`afterbegin`, `<div class="element">
            <div class="undoredo">Redo</div>
        </div>`);
    }
}
