"use strict"
Array.prototype.shuffle = function(){
    if(this.length == 1) return this;
    for(var j, x, i = this.length; i; j = Math.floor(Math.random()*i), x= this[--i], 
    this[i] = this[j], this[j] = x);
    return this;
};

var colorsArr = ["red", "yellow","green","blue","aqua","lime","orange","blueviolet","red", 
"yellow","green","blue","aqua","lime","orange","blueviolet"];
var blackArr = ["black", "black","black","black","black","black","black","black","black", 
"black","black","black","black","black","black","black"];
var randomColorArr = colorsArr.shuffle(),
    twoColors = [],
    twoId = [], 
    numberId = 0,
    clickCounter = 0,
    step = 0,
    guessed = 0;

var button = document.getElementById("start");
var allDivs = document.getElementsByClassName("box");

window.onload = function(){
    button.addEventListener("click", createNewDivCollection);
};

function createNewDivCollection(){
    for(var i=0; i<allDivs.length; i++){
        allDivs[i].addEventListener("click", identificationId)
    };
    toColor();
    setTimeout(toBlack, 2500);
    button.disabled = "disabled";
};

function identificationId(){
    var x = (this);
    numberId = x.id.slice(3);
    Number(numberId);
    clickCounter++;
    howManyClicks();
};

function moveStep(){
    step++;
    document.getElementById("steps").innerHTML = step;
};

function checkWin(){
     if(guessed == 8){
        alert("Поздравляю, ты прошел игру за "+step+" шагов. Возьми пирожок и 10$ с полки");
    }
};

function howManyClicks(){
    if(clickCounter <= 2){
        addColorsAndId();
        showColorDiv();
        checkColor();
    }else{
        toBlack();
        resetClickCounterAndColorsAndId()
        moveStep()
    }
}

 function showColorDiv(){
     allDivs[twoId[clickCounter-1]].style.backgroundColor = randomColorArr[twoId[clickCounter-1]]
 }

function addColorsAndId(){
    twoColors.push(randomColorArr[numberId]);
    twoId.push(numberId);
}

function checkColor(){
    if(twoColors.length == 2){
        if(twoColors[0] == twoColors[1] && twoId[0] != twoId[1]){
            blackArr[twoId[0]] = twoColors[0];
            blackArr[twoId[1]] = twoColors[1];
            moveStep();
            guessed++;
            checkWin();
            resetClickCounterAndColorsAndId()
        } else {
            setTimeout(toBlack, 300);
            resetClickCounterAndColorsAndId()
            moveStep()
        }
    } 
}

function resetClickCounterAndColorsAndId(){
    clickCounter = 0;
    twoColors.length = 0;
    twoId.length = 0;
};

function reLoad(){
    location.reload(true)
};

function toBlack(){
    for(var i = 0; i < allDivs.length; i++){
        allDivs[i].style.backgroundColor = blackArr[i]
    }
};

function toColor(){
    for(var i = 0; i < allDivs.length; i++){
        allDivs[i].style.backgroundColor = randomColorArr[i]
    }
;}
