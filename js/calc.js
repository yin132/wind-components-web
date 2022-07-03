
const headWindElem = document.getElementById("headWind");
const crossWindElem = document.getElementById("crossWind");
const runwayNumElem = document.getElementById("runwayNum");
const windDirElem = document.getElementById("windDir");
const windStrElem = document.getElementById("windStr");
const inputWarning = document.getElementById("inputWarning");

let hwind = 0;
let xwind = 0;
let runway;
let windDir;
let windStr;

init();

function init() {
    $('#runwayNum').keyup(function(e) {
        readWind();
    });

    $('#windDir').keyup(function(e) {
        readWind();
    });

    $('#windStr').keyup(function(e) {
        readWind();
    });
}

function readWind() {
    // read the inputs and displays the wind

    // read inputs
    try {
        runway = parseInt(runwayNumElem.value) * 10 / 180 * Math.PI;
        windDir = parseInt(windDirElem.value) / 180 * Math.PI;
        windStr = parseFloat(windStrElem.value);

        // check for errors TODO

        // calculate
        hwind = windStr * Math.cos(runway - windDir);
        xwind = Math.abs(windStr * Math.sin(runway - windDir));
        hwind = Math.round(hwind * 10) / 10;
        xwind = Math.round(xwind * 10) / 10;

        // if (isNan(hwind) || isNan(xwind)) {throw Error}
    } catch (err) {
        inputWarning.style = "color: #ff0000; visibility: visible";
        return;
    } 

    // display
    headWindElem.innerHTML = hwind;
    crossWindElem.innerHTML = xwind;
    inputWarning.style = "color: #ff0000; visibility: hidden";

    if (hwind > 25 || hwind < -5) {
        headWindElem.style = "border: 2px; border-style: solid; border-color: red;";
    } else {
        headWindElem.style = "";
    }

    if (xwind > 8) {
        crossWindElem.style = "border: 2px; border-style: solid; border-color: red;";
    } else {
        crossWindElem.style = "";
    }
}
