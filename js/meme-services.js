'use strict'

// var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gImgs;
var gMeme;
createImgs();

function changeFontFamily(font) {
    // TODO: maybe use get focused line?
    const line = gMeme.lines[gMeme.selectedLineIdx];
    line.font.family = font;
    // for later
}

function changeFontSize(num) {
    // TODO: maybe use get focused line?
    const line = gMeme.lines[gMeme.selectedLineIdx];
    line.font.size += num;
}

function changeStrokeColor(color) {
    getFocusedLine().features.strokeColor = color;
}

function changeFillColor(color) {
    getFocusedLine().features.fillColor = color;
}

function changeTxtAlign(align) {
    getFocusedLine().features.textAlign = align;
}

function changeLinePos(num) {
    // TODO: maybe use get focused line?
    const line = gMeme.lines[gMeme.selectedLineIdx];
    line.pos.y += -num;
}

function changeFocusedLine() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx < gMeme.lines.length - 1) ? gMeme.selectedLineIdx + 1 : 0
        // TODO: get a marker in the current line
}

function getLines() {
    return gMeme.lines;
}

function getFocusedLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function addLine() {
    _createLine();
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    if (gMeme.selectedLineIdx < 2) {
        gMeme.lines[gMeme.selectedLineIdx].pos.y = gMeme.canvasSize;
        gMeme.lines[gMeme.selectedLineIdx].features.textBaseline = 'bottom'
        return;
    }
    gMeme.lines[gMeme.selectedLineIdx].pos.y = gMeme.canvasSize / 2;
    gMeme.lines[gMeme.selectedLineIdx].features.textBaseline = 'center'
        //TODO - get canvas size
        // TODO - think if thoos function can be more efficient
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    changeFocusedLine();
}

function getCurrImg() {
    console.log(gMeme.selectedImgId);
    return getImgById(gMeme.selectedImgId);
}

function setCanvasSize(size) {
    gMeme.canvasSize = size;
    gMeme.lines[0].pos.x = size / 2;
    // TODO: find better solution
}

function setMemeImg(id) {
    gMeme.selectedImgId = id
}

function addTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function getTxt() {
    const txt = gMeme.lines[gMeme.selectedLineIdx].txt;
    console.log(txt);
    return txt
}

function getImgs() {
    return gImgs;
}

function getImgById(ImgId) {
    var img = gImgs.find(function(img) {
        return (img.id === ImgId);
    })
    return img;
}

function createMeme(selectedImgId = 1) {
    const meme = {
        canvasSize: 450,
        selectedImgId,
        selectedLineIdx: 0,
        lines: []
    }
    gMeme = meme;
    _createLine();
}

function _createLine() {
    const line = {
        txt: '',
        font: {
            size: 48,
            family: 'Impact',
        },
        pos: {
            x: gMeme.canvasSize / 2,
            y: 0,
        },
        features: {
            textAlign: 'center',
            textBaseline: 'top',
            lineWidth: '2',
            strokeColor: 'black',
            fillColor: 'white'
        }
    }
    gMeme.lines.push(line)
}

function createImgs() {
    const imgs = [];
    for (let i = 0; i < 18; i++) {
        const img = _createImg(i + 1);
        imgs.push(img);
    }
    gImgs = imgs;
}

function _createImg(id) {
    const img = {
        id,
        url: `./meme-imgs/${id}.jpg`,
        keywords: []
    }
    return img;
}