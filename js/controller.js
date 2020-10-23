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

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    const canvasSize = (elContainer.offsetWidth > elContainer.offsetHeight) ? elContainer.offsetHeight * 0.9 : elContainer.offsetWidth * 0.9;
    gCanvas.width = canvasSize; // show width & height in CSS
    gCanvas.height = canvasSize;
    console.log(canvasSize);
    setCanvasSize(canvasSize);
    // drawImg();
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
    document.querySelector('.img-gallery').classList.add('hide');
    document.querySelector('.meme-editor-container').classList.remove('hide');
    document.querySelector('.gallery-container').classList.add('editor');
    document.querySelector('.gallery-container').classList.remove('gallery');
    createMeme();
    setMemeImg(id);
    resizeCanvas();
    drawImg();
}

function onGalleryClicked() {
    document.querySelector('.img-gallery').classList.remove('hide');
    document.querySelector('.meme-editor-container').classList.add('hide');
    document.querySelector('.gallery-container').classList.remove('editor');
    document.querySelector('.gallery-container').classList.add('gallery');
}


// function getCanvasXCenter() {
//     // console.log(gCanvas.width);
//     return (gCanvas.width / 2);
// }

function renderShare(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').classList.remove('hide');
        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>
        <a class="btn" onclick="closeModal()">close</a>`
    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    console.log(formData);
    console.log(elForm);
    fetch('http://ca-upload.com/here/upload.php', {
            method: 'POST',
            body: formData
        })
        .then(function(res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function(err) {
            console.error(err)
        })
}

function closeModal() {
    console.log('closing');
    console.log(document.querySelector('.share-container'));
    document.querySelector('.share-container').classList.add('hide');
}


function toggleNav() {
    document.querySelector('nav ul').classList.toggle('open-nav');
    const elBtns = document.querySelectorAll('.btn-hamburger img');
    console.log(elBtns);
    elBtns.forEach(btn => btn.classList.toggle('hide'));
}