'use strict'

var gCanvas;
var gCtx;

function onInit() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    gCtx.fillStyle = 'white'
    gCtx.strokeStyle = 'black'
    renderImgs();
}




function onAddLine() {
    document.querySelector('input[name=txt-input]').value = ''
    addLine();
    drawImg();
}

function onRemoveLine() {
    document.querySelector('input[name=txt-input]').value = ''
    removeLine();
    drawImg();
}

function onChangeLinePos(num) {
    changeLinePos(num);
    drawImg()
}

function onChangeFocusedLine() {
    changeFocusedLine();
    const line = getFocusedLine();
    document.querySelector('input[name=txt-input]').value = line.txt;
}

function onAddTxt(ev) {
    const txt = document.querySelector('input[name=txt-input]').value
    addTxt(txt);
    drawImg();
}

function onChangeStrokeColor(elColor) {
    changeStrokeColor(elColor.value);
    drawImg();
    // TODO: chack if I can do those func together
}

function onChangeFillColor(elColor) {
    changeFillColor(elColor.value);
    drawImg();
}

function onChangeFontSize(num) {
    changeFontSize(num);
    drawImg()
}

function onChangeFontFamily(elSelect) {
    changeFontFamily(elSelect.value);
    drawImg();
}

function onChangeTxtAlign(align) {
    changeTxtAlign(align);
    drawImg();
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

function drawTxt() {
    const lines = getLines();
    lines.forEach(function(line) {
        gCtx.font = `${line.font.size}px ${line.font.family}`;
        gCtx.lineWidth = line.features.lineWidth
        gCtx.textAlign = line.features.textAlign
        gCtx.textBaseline = line.features.textBaseline;
        gCtx.strokeStyle = line.features.strokeColor
        gCtx.fillStyle = line.features.fillColor
        gCtx.fillText(line.txt, line.pos.x, line.pos.y)
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
    });
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

function renderImgs() {
    const imgs = getImgs();
    var strHTML = imgs.reduce(function(str, img) {
        return str + `<img src="${img.url}" onclick="imgClicked(${img.id})" alt="">`
    }, '')
    document.querySelector('.img-container').innerHTML = strHTML;

}

function imgClicked(id) {
    createMeme();
    setMemeImg(id);
    drawImg();
}


// function getCanvasXCenter() {
//     // console.log(gCanvas.width);
//     return (gCanvas.width / 2);
// }