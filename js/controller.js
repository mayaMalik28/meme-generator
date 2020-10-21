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
    createMeme();
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

function onAddLine() {
    document.querySelector('input[name=txt-input]').value = ''
    addLine();
    drawImg();
}

function onAddTxt(ev) {
    const txt = document.querySelector('input[name=txt-input]').value
    addTxt(txt);
    drawImg();
}

function drawTxt() {
    console.log('drawing txt...');
    const lines = getLines();
    console.log(lines);
    lines.forEach(function(line) {
        gCtx.font = `${line.font.size}px ${line.font.family}`;
        gCtx.lineWidth = line.features.lineWidth
        gCtx.textAlign = line.features.textAlign
        gCtx.textBaseline = line.features.textBaseline;
        gCtx.fillText(line.txt, line.pos.x, line.pos.y)
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
    });
}

function onChangeFontSize(num) {
    changeFontSize(num);
    drawImg()
}

function onChangeLinePos(num) {
    changeLinePos(num);
    drawImg()
}

function canvasClicked(ev) {
    console.log('canvas clicked event', ev);
    // for me
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
}

function ShareCanvas(el) {
    console.log('sharing');
    // TODO: add share option
}

// function getCanvasXCenter() {
//     // console.log(gCanvas.width);
//     return (gCanvas.width / 2);
// }