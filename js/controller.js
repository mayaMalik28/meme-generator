'use strict'

var gCanvas;
var gCtx;
var gIsMouseDown = false;

function onInit() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    renderImgs();
    addDragAndDrop();
}

function onAddLine() {
    document.querySelector('input[name=txt-input]').value = ''
    addLine();
    drawCanvas();
}

function onRemoveLine() {
    document.querySelector('input[name=txt-input]').value = ''
    removeLine();
    drawCanvas();
}

function onChangeLinePos(num) {
    changeLinePos('y', num);
    drawCanvas()
}

function onChangeFocusedLine() {
    changeFocusedLine();
    const line = getFocusedLine();
    document.querySelector('input[name=txt-input]').value = line.txt;
}

function onAddTxt() {
    const txt = document.querySelector('input[name=txt-input]').value
    addTxt(txt);
    drawCanvas();
}

function onChangeStrokeColor(elColor) {
    changeStrokeColor(elColor.value);
    drawCanvas();
    // TODO: chack if I can do those func together
}

function onChangeFillColor(elColor) {
    changeFillColor(elColor.value);
    drawCanvas();
}

function onChangeFontSize(num) {
    changeFontSize(num);
    drawCanvas()
}

function onChangeFontFamily(elSelect) {
    changeFontFamily(elSelect.value);
    drawCanvas();
}

function onChangeTxtAlign(align) {
    changeTxtAlign(align);
    drawCanvas();
}

function drawTxt() {
    const lines = getLines();
    lines.forEach(function(line) {
        gCtx.font = `${line.size}px ${line.family}`;
        gCtx.lineWidth = line.lineWidth;
        gCtx.textAlign = line.textAlign;
        gCtx.textBaseline = line.textBaseline;
        gCtx.strokeStyle = line.strokeColor
        gCtx.fillStyle = line.fillColor
        gCtx.fillText(line.txt, line.pos.x, line.pos.y)
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
    });
}

function drawCanvas() {
    const img = getCurrImg();
    var elImg = new Image();
    elImg.src = img.url;
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
        drawTxt();
    }
}

function closeModal() {
    console.log('closing');
    console.log(document.querySelector('.share-container'));
    document.querySelector('.share-container').classList.add('hide');
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    const canvasSize = (elContainer.offsetWidth > elContainer.offsetHeight) ? (elContainer.offsetHeight) : (elContainer.offsetWidth);
    gCanvas.width = canvasSize;
    gCanvas.height = canvasSize;
}

function onImgClicked(id) {
    document.querySelector('input[name=txt-input]').value = ''
    document.querySelector('.img-gallery').classList.add('hide');
    document.querySelector('.meme-editor-container').classList.remove('hide');
    document.querySelector('.general-container').classList.add('screen-size');
    document.querySelector('.general-container').classList.remove('content-size');
    resizeCanvas();
    createMeme(gCanvas.width, id);
    drawCanvas();
}

function renderImgs() {
    const imgs = getImgs();
    var strHTML = imgs.reduce(function(str, img) {
        return str + `<img src="${img.url}" onclick="onImgClicked(${img.id})" alt="">`
    }, '')
    document.querySelector('.img-container').innerHTML = strHTML;

}

function toggleNav() {
    document.querySelector('nav ul').classList.toggle('open-nav');
    const elBtns = document.querySelectorAll('.btn-hamburger img');
    elBtns.forEach(btn => btn.classList.toggle('hide'));
}

function hideContainersExcept(page) {
    var elContainers = document.querySelectorAll('.page-container');
    elContainers.forEach(function(elContainer) {
        if (elContainer.classList.contains(page)) {
            elContainer.classList.remove('hide');
            showActive(page);
        } else {
            elContainer.classList.add('hide');
        }
        if (elContainer.classList.contains('gallery-container')) onGalleryClicked();
    });
}

function showActive(page) {
    var elLis = document.querySelectorAll('nav ul li');
    console.log(elLis);
    elLis.forEach(function(elLi) {
        if (elLi.classList.contains(`go-to-${page}`)) {
            elLi.classList.add('active');
        } else {
            elLi.classList.remove('active');
        }
    });
}

function onGalleryClicked() {
    document.querySelector('.img-gallery').classList.remove('hide');
    document.querySelector('.meme-editor-container').classList.add('hide');
    document.querySelector('.general-container').classList.remove('screen-size');
    document.querySelector('.general-container').classList.add('content-size');
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
}

function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').classList.remove('hide');
        document.querySelector('.share-container').innerHTML = `
        <a class="btn btn-share" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>
        <a class="btn btn-close-modal" onclick="closeModal()">close</a>`
    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
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

function addDragAndDrop() {
    var offsetX;
    var offsetY;
    var diffX;
    var diffY;
    var clientX;
    var clientY;

    gCanvas.addEventListener('mousedown', ev => {
        offsetX = ev.offsetX;
        offsetY = ev.offsetY;
        gIsMouseDown = true;
    });

    gCanvas.addEventListener('mousemove', ev => {
        if (gIsMouseDown) {
            diffX = ev.offsetX - offsetX;
            diffY = ev.offsetY - offsetY;
            changeLinePos('x', diffX);
            changeLinePos('y', diffY);
            offsetX = ev.offsetX;
            offsetY = ev.offsetY;
            drawCanvas();
        }
    });

    gCanvas.addEventListener('mouseup', ev => {
        if (gIsMouseDown === true) {
            gIsMouseDown = false;
        }
    });
    gCanvas.addEventListener('touchstart', ev => {
        clientX = ev.targetTouches[0].clientX;
        clientY = ev.targetTouches[0].clientY;
        gIsMouseDown = true;
    });

    gCanvas.addEventListener('touchmove', ev => {
        console.log(ev);
        ev.preventDefault();
        if (gIsMouseDown) {
            diffX = ev.targetTouches[0].clientX - clientX;
            diffY = ev.targetTouches[0].clientY - clientY;
            console.log('diffX', diffX);
            console.log('diffY', diffY);
            changeLinePos('x', diffX);
            changeLinePos('y', diffY);
            clientX = ev.targetTouches[0].clientX;
            clientY = ev.targetTouches[0].clientY;
            drawCanvas();
        }
    });

    gCanvas.addEventListener('touchend', ev => {
        if (gIsMouseDown === true) {
            gIsMouseDown = false;
        }
    });
}