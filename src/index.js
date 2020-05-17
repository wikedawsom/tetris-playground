const electron = require('electron');
const fs = require('fs')
const {ipcRenderer} = electron;

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

document.addEventListener('DOMContentLoaded', () => {
    const rootDiv = document.getElementById('root');
    const board = document.createElement("DIV");
    board.className = "board";

    for(let i = 0; i < 20; i++) {
        const row = document.createElement("DIV");
        row.className = "row";
        row.id = `${i}`;
        for(let j = 0; j < 10; j++) {
            const block = document.createElement("DIV");
            block.className = "block";
            block.id = `${i}-${j}`;
            block.addEventListener('click', (e) => flipBlockColor(e));
            block.addEventListener('contextmenu', (e) => flipRowColor(e));
            row.appendChild(block);
        }
        board.appendChild(row);
    }
    rootDiv.appendChild(board);
});
