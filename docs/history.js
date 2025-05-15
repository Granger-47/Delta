function updatehistory(){
    const box = document.getElementById("commands");
    let [initial,final,player,outer,middle,inner,middleunlocked,innerunlocked,metadata] = movehistory[movehistory.length-1];
    let enemy;
    if (player === "red"){enemy = "blue"}
    else{enemy = "red";}
    if (initial === null){
        box.insertAdjacentHTML("afterbegin",`<div class="element">
            <div class="${player}box"></div>
            <div class="data">Placed titan at node ${final}</div>
        </div>`);
    }
    else if(final === null && metadata==="self"){
        box.insertAdjacentHTML(`afterbegin`,`<div class="element">
            <div class="undoredo">${player} titan has been eliminated</div>
        </div>`);
    }
    else if(final === null && metadata==="other"){
        box.insertAdjacentHTML(`afterbegin`,`<div class="element">
            <div class="undoredo">${enemy} titan has been eliminated</div>
        </div>`);
    }
    else{
        box.insertAdjacentHTML(`afterbegin`,`<div class="element">
            <div class="${player}box"></div>
            <div class="data">Moved titan from node ${initial} to node ${final}</div>
        </div>`);
    }
}
