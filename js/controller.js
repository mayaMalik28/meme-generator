'use strict'

var gCanvas;
var gCtx;

function onInit() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    // console.log(gCtx);
    // not sure why I need this ??
    gCtx.fillStyle = 'white'
    gCtx.strokeStyle = 'black'
    drawImg();
}

function drawImg() {
    const img = getImgById(1);
    var elImg = new Image();
    elImg.src = img.url;
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
        drawTxt();
    }

}

function onAddTxt(ev) {
    ev.preventDefault();
    const txt = document.querySelector('input[name=txt-input]').value
    addTxt(txt);
    drawImg();
}

function drawTxt() {
    console.log('drawing txt...');
    const txt = getTxt();
    console.log(txt);
    gCtx.lineWidth = '2'
    gCtx.font = '48px Impact'
    gCtx.textAlign = 'start'
    gCtx.fillText(txt, 200, 200)
    gCtx.strokeText(txt, 200, 200)
        //prooblem wiyh position 0,0 - can't see it!!

}