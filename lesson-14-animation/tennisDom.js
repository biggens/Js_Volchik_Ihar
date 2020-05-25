"use strict";

var wrap = document.getElementById('wrapper'),
    widthOfWrap = "700px",
    heightOfWrap = "400px",
    buttonStart = document.createElement("input"),
    scoreBoard = document.createElement("div"),
    score1 = 0,
    score2 = 0,
    racquet1 = document.createElement("div"),
    racquet2 = document.createElement("div"),
    racquetH,
    racquetAreaH,
    ball = document.createElement("div"),
    ballH,
    areaH,
    settimeout,
    messageGoal = document.createElement("div"),
    messageGoalText = "Гол!";

messageGoal.classList.add("messageGoal");
messageGoal = wrap.appendChild(messageGoal);

wrap.style.width = widthOfWrap;
wrap.style.height = heightOfWrap;

requestAnimationFrame(tick);

buttonStart.type = "button";
buttonStart.value = "старт!";
buttonStart.classList.add('buttonStart');
buttonStart = document.body.insertBefore(buttonStart, document.body.children[0]);
buttonStart.onclick = start;

scoreBoard.classList.add('scoreBoard');
scoreBoardInnerHTML();
scoreBoard = document.body.insertBefore(scoreBoard, document.body.children[1]);

racquet1.classList.add('racquet1');
racquet2.classList.add('racquet2');

racquet1 = wrap.appendChild(racquet1);
racquet2 = wrap.appendChild(racquet2);

racquetH = {

    racquet1PosX: wrap.getBoundingClientRect().left,
    racquet1PosY: wrap.getBoundingClientRect().top + wrap.getBoundingClientRect().height / 2 - racquet1.getBoundingClientRect().height / 2,
    racquet1Speed: 0,

    racquet2PosX: wrap.getBoundingClientRect().left + wrap.getBoundingClientRect().width - racquet2.getBoundingClientRect().width,
    racquet2PosY: wrap.getBoundingClientRect().top + wrap.getBoundingClientRect().height / 2 - racquet1.getBoundingClientRect().height / 2,
    racquet2Speed: 0,
    width: 10,
    height: 120,

    update: function () {
        var racquet1Obj = racquet1,
            racquet2Obj = racquet2;

        racquet1Obj.style.left = this.racquet1PosX + "px";
        racquet1Obj.style.top = this.racquet1PosY + "px";

        racquet2Obj.style.left = this.racquet2PosX + "px";
        racquet2Obj.style.top = this.racquet2PosY + "px";
    }
};

racquetAreaH = {
    width: 10,
    height: wrap.getBoundingClientRect().height
};

racquetH.update();

ball.classList.add('ball');
ball = wrap.appendChild(ball);

ballH = {
    posX: wrap.getBoundingClientRect().left + wrap.getBoundingClientRect().width / 2 - ball.getBoundingClientRect().width / 2,
    posY: wrap.getBoundingClientRect().top + wrap.getBoundingClientRect().height / 2 - ball.getBoundingClientRect().height / 2,
    speedX: 0,
    speedY: 0,
    width: 30,
    height: 30,

    update: function () {
        var ballObj = ball;
        ballObj.style.left = this.posX + "px";
        ballObj.style.top = this.posY + "px";
    }
};

areaH = {
    width: wrap.getBoundingClientRect().width,
    height: wrap.getBoundingClientRect().height
};

ballH.update();

window.addEventListener("keydown", function (EO) {
    EO = EO || window.event;
    EO.preventDefault();

    if (EO.keyCode === 17) {
        racquetH.racquet1Speed = 5;
    }

    if (EO.keyCode === 16) {
        racquetH.racquet1Speed = -5;
    }

    if (EO.keyCode === 40) {
        racquetH.racquet2Speed = 5;
    }

    if (EO.keyCode === 38) {
        racquetH.racquet2Speed = -5;
    }
});

window.addEventListener("keyup", function (EO) {
    EO = EO || window.event;
    EO.preventDefault();

    if (EO.keyCode === 17) {
        racquetH.racquet1Speed = 0;
    }

    if (EO.keyCode === 16) {
        racquetH.racquet1Speed = 0;
    }

    if (EO.keyCode === 40) {
        racquetH.racquet2Speed = 0;
    }

    if (EO.keyCode === 38) {
        racquetH.racquet2Speed = 0;
    }
});

function scoreBoardInnerHTML() {
    scoreBoard.innerHTML = score1 + ":" + score2;
}

function start() {
    ballH.speedX = 8;//4
    ballH.speedY = 3;//2
}

function tick() {

    racquetH.update();
    racquetH.racquet1PosY += racquetH.racquet1Speed;

    if (racquetH.racquet1PosY + racquetH.height > (wrap.getBoundingClientRect().top + racquetAreaH.height)) {
        racquetH.racquet1PosY = wrap.getBoundingClientRect().top + racquetAreaH.height - racquetH.height;
    }

    if (racquetH.racquet1PosY < wrap.getBoundingClientRect().top) {
        racquetH.racquet1PosY = wrap.getBoundingClientRect().top;
    }

    racquetH.racquet2PosY += racquetH.racquet2Speed;
    if (racquetH.racquet2PosY + racquetH.height > (wrap.getBoundingClientRect().top + racquetAreaH.height)) {
        racquetH.racquet2PosY = wrap.getBoundingClientRect().top + racquetAreaH.height - racquetH.height;
    }

    if (racquetH.racquet2PosY < wrap.getBoundingClientRect().top) {
        racquetH.racquet2PosY = wrap.getBoundingClientRect().top;
    }

    ballH.posX -= ballH.speedX;
    if ((ballH.posY + ballH.height < racquetH.racquet2PosY || ballH.posY > (racquetH.racquet2PosY + racquetH.height)) && ballH.posX + ballH.width >= (wrap.getBoundingClientRect().left + wrap.getBoundingClientRect().width)) {

        score1 += 1;
        scoreBoardInnerHTML();
        ballH.speedX = 0;
        ballH.speedY = 0;
        messageGoal.innerHTML = messageGoalText;

        ballH.posX = wrap.getBoundingClientRect().left + wrap.getBoundingClientRect().width - ballH.width - 1;

        settimeout = window.setTimeout(function () {
            messageGoal.innerHTML = "";
            ballH.posX = wrap.getBoundingClientRect().left + racquetH.width;
            ballH.posY = racquetH.racquet1PosY + racquetH.height / 2;
            start();
        }, 2000);

    } else if (!(ballH.posY + ballH.height < racquetH.racquet2PosY || ballH.posY > (racquetH.racquet2PosY + racquetH.height)) && ballH.posX + ballH.width > (racquetH.racquet2PosX)) {
        ballH.speedX = -ballH.speedX;
        ballH.posX = wrap.getBoundingClientRect().left + wrap.getBoundingClientRect().width - racquetH.width - ballH.width;
    }

    if ((ballH.posY + ballH.height < racquetH.racquet1PosY || ballH.posY > (racquetH.racquet1PosY + racquetH.height)) && ballH.posX <= (wrap.getBoundingClientRect().left)) {

        score2 += 1;
        scoreBoardInnerHTML();
        ballH.speedX = 0;
        ballH.speedY = 0;
        messageGoal.innerHTML = messageGoalText;

        ballH.posX = wrap.getBoundingClientRect().left + 1;

        settimeout = window.setTimeout(function () {
            messageGoal.innerHTML = "";
            ballH.posX = wrap.getBoundingClientRect().left + wrap.getBoundingClientRect().width - racquetH.width;
            ballH.posY = racquetH.racquet2PosY + racquetH.height / 2;
            start();
        }, 2000);

    } else if (!(ballH.posY + ballH.height < racquetH.racquet1PosY || ballH.posY > (racquetH.racquet1PosY + racquetH.height)) && ballH.posX < (racquetH.width + racquetH.racquet1PosX)) {
        ballH.speedX = -ballH.speedX;
        ballH.posX = wrap.getBoundingClientRect().left + racquetH.width;
    }

    ballH.posY -= ballH.speedY;
    if (ballH.posY + ballH.height > (wrap.getBoundingClientRect().top + areaH.height)) {
        ballH.speedY = -ballH.speedY;
        ballH.posY = wrap.getBoundingClientRect().top + areaH.height - ballH.height;
    }

    if (ballH.posY < wrap.getBoundingClientRect().top) {
        ballH.speedY = -ballH.speedY;
        ballH.posY = wrap.getBoundingClientRect().top;
    }

    ballH.update();

    requestAnimationFrame(tick);
}