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
    const nextPieceDiv = document.getElementById('next-piece');
    const pieceNumber = Math.round(Math.random())
    const piece = getNewPiece(pieceNumber);
    piece.className = 'next-piece';
    
    nextPieceDiv.innerHTML = piece.innerHTML;
}

const startPlay = (level) => {
    console.log('lol good luck on that one chief');
}

const getNewPiece = (pieceNum) => {
    const piece = document.createElement('DIV');
    for(let i = 0; i < 4; i++) {
        const block = document.createElement('DIV');
        block.className = ('block');
        piece.appendChild(block);
    }
    return piece;
}