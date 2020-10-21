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
        // drawImg();
    renderImgs();
}

function renderImgs() {
    const imgs = getImgs();
    var strHTML = imgs.reduce(function(str, img) {
        return str + `<img src="${img.url}" onclick="imgClicked(${img.id})" alt="">`
    }, '')
    document.querySelector('.img-container').innerHTML = strHTML;

}

function imgClicked(id) {
    console.log('I clicked on this Img...');
    setMemeImg(id);
    drawImg();
}

function drawImg() {
    const img = getCurrImg();
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
    gCtx.textAlign = 'center'
    gCtx.textBaseline = "top";
    gCtx.fillText(txt, gCanvas.width / 2, 0)
    gCtx.strokeText(txt, gCanvas.width / 2, 0)
}

function canvasClicked(ev) {
    console.log(ev);
}