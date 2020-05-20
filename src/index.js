const electron = require('electron');
const fs = require('fs')
const {ipcRenderer} = electron;

document.addEventListener('DOMContentLoaded', () => {
    createBlankBoard();

    const clearLinesButton = document.getElementById('clear-lines-btn');
    clearLinesButton.addEventListener('click', (e) => handleClearFullRows(e));
    const rerollRNGButton = document.getElementById('reroll-btn');
    rerollRNGButton.addEventListener('click', (e) => handleReroll());
    handleReroll()
});


const flipBlockColor = (e) => {
    e.preventDefault();
    e.target.className = e.target.className === "block" ? "block filled-block" : "block";
}

const flipRowColor = (e) => {
    e.preventDefault();
    const className = e.target.className === "block" ? "block filled-block" : "block";
    items = Array.from(e.target.parentElement.children);
    items.forEach(element => {
        element.className = className;
    });
}

const createBlankRow = () => {
    const row = document.createElement("DIV");
    row.className = "row";
    for(let j = 0; j < 10; j++) {
        const block = document.createElement("DIV");
        block.className = "block";
        block.addEventListener('click', (e) => flipBlockColor(e));
        block.addEventListener('contextmenu', (e) => flipRowColor(e));
        row.appendChild(block);
    }
    return row;
}

const createBlankBoard = () => {
    const board = document.getElementById('board');
    board.className = "board";
    for(let i = 0; i < 20; i++) {
        const row = createBlankRow();
        board.appendChild(row);
    }
    return board;
}

const handleClearFullRows = () => {
    console.log('clearing full rows')

    const board = document.getElementById('board');
    Array.from(board.children).forEach(row => {
        let rowIsFilled = true;
        Array.from(row.children).forEach(block => {
            if(!block.className.includes('filled-block')) {
                rowIsFilled = false;
            }
        });
        if(rowIsFilled) {
            board.removeChild(row);
            board.insertBefore(createBlankRow(), board.children[0]);

        }
    });
    return
}

const handleReroll = () => {
    console.log('generating random piece');
    const nextBox = document.getElementById('next-box');
    const currentPiece = nextBox.children[1];
    const pieceNumber = Math.floor(Math.random()*7);
    console.log(pieceNumber);
    const nextPiece = getNewPiece(pieceNumber);
    nextPiece.className += ' next-piece';
    
    nextBox.replaceChild(nextPiece, currentPiece);
}

const startPlay = (level) => {
    console.log('lol good luck on that one chief');
}

const getNewPiece = (pieceNum) => {
    const piece = document.createElement('DIV');
    const grid = [];
    let color = 0;

    if(pieceNum === 0){
        piece.className = 't-piece';
        grid.push([1,1,1]);
        grid.push([0,1,0]);
        color = 1;
    }
    else if(pieceNum === 1){
        piece.className = 'j-piece';
        grid.push([1,1,1]);
        grid.push([0,0,1]);
        color = 3;
    }
    else if(pieceNum === 2){
        piece.className = 'z-piece';
        grid.push([1,1,0]);
        grid.push([0,1,1]);
        color = 2;
    }
    else if(pieceNum === 3){
        piece.className = 'o-piece';
        grid.push([1,1]);
        grid.push([1,1]);
        color = 1;
    }
    else if(pieceNum === 4){
        piece.className = 's-piece';
        grid.push([0,1,1]);
        grid.push([1,1,0]);
        color = 3;
    }
    else if(pieceNum === 5){
        piece.className = 'l-piece';
        grid.push([1,1,1]);
        grid.push([1,0,0]);
        color = 2;
    }
    else if(pieceNum === 6){
        piece.className = 'i-piece';
        grid.push([1,1,1,1]);
        color = 1;
    }
    piece.innerHTML = arrayToGrid(grid, color).innerHTML;
    return piece;
}

const arrayToGrid = (arr, color) => {
    if(!arr) {
        return
    }
    let array = Array.from(arr);
    const piece = document.createElement('DIV');
    const height = array.length;
    const width = array[0].length;

    for(let i = 0; i < height; i++) {
        const row = document.createElement('DIV');
        for(let j = 0; j < width; j++){
            const block = document.createElement('DIV');
            block.className = array[i][j] ? `block filled-block color-${color}` : 'block no-border';
            row.appendChild(block);
        }
        piece.appendChild(row);
    }
    return piece;
}