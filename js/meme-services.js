'use strict'

// var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gImgs;
var gMeme;
createImgs();

function changeFontFamily(font) {
    getFocusedLine().family = font;
}

function changeFontSize(num) {
    getFocusedLine().size += num;
}

function changeStrokeColor(color) {
    getFocusedLine().strokeColor = color;
}

function changeFillColor(color) {
    getFocusedLine().fillColor = color;
}

function changeTxtAlign(align) {
    getFocusedLine().textAlign = align;
}

function changeLinePos(num) {
    getFocusedLine().pos.y += -num;
}

function getLines() {
    return gMeme.lines;
}

function changeFocusedLine() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx < gMeme.lines.length - 1) ? gMeme.selectedLineIdx + 1 : 0
        // TODO: get a marker in the current line
}

function getFocusedLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function addLine() {
    if (gMeme.lines[gMeme.selectedLineIdx].txt === '') return;
    _createLine();
    changeFocusedLine();
    if (gMeme.selectedLineIdx < 2) {
        gMeme.lines[gMeme.selectedLineIdx].pos.y = gMeme.canvasSize;
        gMeme.lines[gMeme.selectedLineIdx].textBaseline = 'bottom'
        return;
    }
    gMeme.lines[gMeme.selectedLineIdx].pos.y = gMeme.canvasSize / 2;
    gMeme.lines[gMeme.selectedLineIdx].textBaseline = 'center'
        // TODO - think if thןs function can be more efficient
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    changeFocusedLine();
}

function addTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function getCurrImg() {
    var img = gImgs.find(function(img) {
        return (img.id === gMeme.selectedImgId);
    })
    return img;
}

function createMeme(canvasSize = 500, selectedImgId = 1) {
    const meme = {
        canvasSize,
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
        size: gMeme.canvasSize * 0.15,
        family: 'Impact',
        textAlign: 'center',
        textBaseline: 'top',
        lineWidth: gMeme.canvasSize * 0.008,
        strokeColor: 'black',
        fillColor: 'white',
        pos: {
            x: gMeme.canvasSize / 2,
            y: 0,
        },

    }
    gMeme.lines.push(line)
}

function getImgs() {
    return gImgs;
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