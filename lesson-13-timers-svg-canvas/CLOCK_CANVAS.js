"use strict";

var canvaS = document.getElementById('wrapper'),
    context = canvaS.getContext("2d"),
    canvaSCenterX = canvaS.offsetWidth / 2,
    canvaSCenterY = canvaS.offsetHeight / 2,
    radius = 120,
    angleValue = 0,
    distanceOfDigits = 30,
    digitalWatch,
    digitalWatchText,
    digitalWatchWidth = 90,
    digitalWatchHeight = 25,
    radiusForDigitalWatch = 70,
    elemForArrowHours,
    elemForArrowHoursHeight = 50,
    elemForArrowHoursWidth = 9,
    elemForArrowMinutes,
    elemForArrowMinutesHeight = 110,
    elemForArrowMinutesWidth = 5,
    elemForArrowSeconds,
    elemForArrowSecondsHeight = 135,
    elemForArrowSecondsWidth = 2,
    hoursDeg,
    minutesDeg,
    secondsDeg,
    hourDigits = 12;

function bigWatch() {
    context.fillStyle = "#FCCA66";
    context.beginPath();
    context.arc(canvaSCenterX, canvaSCenterY, 150, 0, Math.PI * 2, false);
    context.fill();

    for (var i = 1; i <= hourDigits; i++) {
        var smallCircleCX,
            smallCircleCY,
            smallCircleRadius = 20,
            smallCircleColor = "#48B382",
            angle;

        angleValue += distanceOfDigits;
        angle = angleValue / 180 * Math.PI;

        smallCircleCX = Math.round(canvaSCenterX + radius * Math.sin(angle));
        smallCircleCY = Math.round(canvaSCenterY - radius * Math.cos(angle));

        context.beginPath();
        context.fillStyle = smallCircleColor;
        context.arc(smallCircleCX, smallCircleCY, smallCircleRadius, 0, Math.PI * 2, false);
        context.fill();

        context.fillStyle = 'black';
        context.font = "normal normal 20px 'Times New Roman'";
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(i, smallCircleCX, smallCircleCY);
    }
}

function digitalWatch() {
    var time = new Date();
    context.globalCompositeOperation = "source-over";
    context.fillStyle = "#FCCA66";
    context.beginPath();
    context.fillRect(canvaSCenterX - digitalWatchWidth / 2, canvaSCenterY - radiusForDigitalWatch - digitalWatchHeight / 2, 100, 25);
    context.fill();
    context.fillStyle = "black";
    digitalWatchText = time.toLocaleTimeString();
    context.font = "normal normal 25px 'Times New Roman'";
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(digitalWatchText, canvaSCenterX, canvaSCenterY - radiusForDigitalWatch);
    context.fill();
}

function hoursArrow() {
    var time = new Date();
    hoursDeg = 30 * (time.getHours() + (1 / 60) * time.getMinutes());
    context.strokeStyle = "black";
    context.lineWidth = elemForArrowHoursWidth;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(canvaSCenterX, canvaSCenterY);
    context.lineTo(canvaSCenterX + elemForArrowHoursHeight * Math.sin(hoursDeg / 180 * Math.PI), canvaSCenterY - elemForArrowHoursHeight * Math.cos(hoursDeg / 180 * Math.PI));
    context.stroke();
}

function minutesArrow() {
    var time = new Date();
    minutesDeg = 6 * (time.getMinutes() + (1 / 60) * time.getSeconds());
    context.strokeStyle = "black";
    context.lineWidth = elemForArrowMinutesWidth;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(canvaSCenterX, canvaSCenterY);
    context.lineTo(canvaSCenterX + elemForArrowMinutesHeight * Math.sin(minutesDeg / 180 * Math.PI), canvaSCenterY - elemForArrowMinutesHeight * Math.cos(minutesDeg / 180 * Math.PI));
    context.stroke();
}

function secondsArrow() {
    var time = new Date();
    secondsDeg = 6 * time.getSeconds();
    context.strokeStyle = "red";
    context.lineWidth = elemForArrowSecondsWidth;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(canvaSCenterX, canvaSCenterY);
    context.lineTo(canvaSCenterX + elemForArrowSecondsHeight * Math.sin(secondsDeg / 180 * Math.PI), canvaSCenterY - elemForArrowSecondsHeight * Math.cos(secondsDeg / 180 * Math.PI));
    context.stroke();
}

function arrows() {
    bigWatch();
    digitalWatch();
    hoursArrow();
    minutesArrow();
    secondsArrow();
}

window.onload = arrows();
window.setInterval(arrows, 1000);