'use strict'

// var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gImgs;
createImgs();
var gMeme = _createMeme();

function _createMeme(selectedImgId = 1, txt = 'hey') {
    const meme = {
        selectedImgId,
        selectedLineIdx: 0,
        lines: [{
            txt,
            size: 20,
            align: 'left',
            color: 'white'
        }]
    }
    return meme;
}

function addTxt(txt) {
    gMeme.lines[0].txt = txt;
}

function getTxt() {
    const txt = gMeme.lines[0].txt;
    console.log(txt);
    return txt
}

function getImgById(ImgId) {
    var img = gImgs.find(function(img) {
        return (img.id === ImgId);
    })
    return img;
}

function createImgs() {
    const imgs = [];
    for (let i = 0; i < 18; i++) {
        const img = _createImg(i);
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