let rsc = 0;
let bsc = 0;
let rtime = 120;
let btime = 120;
let rtimer = setInterval(rclock,1000);
let btimer = null;


function toggle(){
    if (turn === "red"){
        clearInterval(rtimer);
        rtimer = null;
        if (btimer === null){
            btimer = setInterval(bclock,1000);
        }
        finish();
    }
    if (turn === "blue"){
        clearInterval(btimer);
        btimer = null;
        if (rtimer===null){
            rtimer = setInterval(rclock,1000);
        }
        finish();   
    }
}

function rclock(){
    console.log("rclock tick");
    let mins = Math.floor(rtime/60);
    let secs = rtime % 60;
    document.getElementById("redt").textContent = `${mins}:${secs.toString().padStart(2,'0')}`;
    if (rtime===0||btime===0){
        clearInterval(rtimer);
        rtimer=null;
        console.log(rsc);
        console.log(bsc);
        if(rsc>bsc){
            window.alert("Red wins");
        }
        else if(bsc>rsc){
            window.alert("Blue wins");
        }
        else{
            window.alert("Draw");
        }
    }
    rtime-=1;
}

function bclock(){
    console.log("bclock tick");
    let mins = Math.floor(btime/60);
    let secs = btime % 60;
    document.getElementById("bluet").textContent = `${mins}:${secs.toString().padStart(2,'0')}`;
    if(rtime===0||btime===0){
        clearInterval(btimer);
        btimer=null;
        console.log(rsc);
        console.log(bsc);
        if(rsc>bsc){
            window.alert("Red wins");
        }
        else if (bsc>rsc){
            window.alert("Blue wins");
        }
        else{
            window.alert("Draw");
        }
    }
    btime-=1;
}


function pause(){
    if (!paused){
    if (turn === "red"){
        clearInterval(rtimer);
        rtimer = null;
    }
    if (turn === "blue"){
        clearInterval(btimer);
        btimer = null;
    }
    paused = true;
}
}
function resume(){
    if (paused){
    if (turn === "blue"){
        if (btimer === null){
            btimer = setInterval(bclock,1000);
        }
    }
    if (turn === "red"){
        if (rtimer===null){
            rtimer = setInterval(rclock,1000);
        }
    }
    paused = false;
}
}

function reset(){
    location.reload();
}