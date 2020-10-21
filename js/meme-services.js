'use strict'

// var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gImgs;
var gMeme;
createImgs();

function changeFontFamily(font) {
    const line = gMeme.lines[gMeme.selectedLineIdx];
    line.font.family = font;
    // for later
}

function changeFontSize(num) {
    const line = gMeme.lines[gMeme.selectedLineIdx];
    line.font.size += num;
}

function changeLinePos(num) {
    const line = gMeme.lines[gMeme.selectedLineIdx];
    line.pos.y += -num;
}

function getLines() {
    return gMeme.lines;
}

function addLine() {
    _createLine();
    gMeme.selectedLineIdx++;
    if (gMeme.selectedLineIdx < 2) {
        gMeme.lines[gMeme.selectedLineIdx].pos.y = 450
        gMeme.lines[gMeme.selectedLineIdx].features.textBaseline = 'bottom'
        return;
    }
    gMeme.lines[gMeme.selectedLineIdx].pos.y = 225
    gMeme.lines[gMeme.selectedLineIdx].features.textBaseline = 'center'
        //TODO - get canvas size
}

function getCurrImg() {
    return getImgById(gMeme.selectedImgId);
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
            // x: getCanvasXCenter(),
            x: 225,
            y: 0,
        },
        features: {
            textAlign: 'center',
            textBaseline: 'top',
            lineWidth: '2',
            strookeColor: 'black',
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