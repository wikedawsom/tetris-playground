document.addEventListener('DOMContentLoaded', () => {
    createBlankBoard();

    const clearLinesButton = document.getElementById('clear-lines-btn');
    clearLinesButton.addEventListener('click', (e) => handleClearFullRows(e));
    const rerollRNGButton = document.getElementById('reroll-btn');
    rerollRNGButton.addEventListener('click', (e) => handleReroll(e));
    handleReroll()
});


const flipBlockColor = (e) => {
    e.preventDefault();
    const empty = "block";
    const currentBox = document.getElementById('current-box');
    const currentPieceDiv = currentBox.children[1];
    filled = currentPieceDiv.childNodes[0] && currentPieceDiv.childNodes[0].childNodes[1] ? currentPieceDiv.childNodes[0].childNodes[1].className : "block filled-block"
    e.target.className = e.target.className === empty ? filled : empty;
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

const mouseMoveCursorFollow = ((e) => {
    let piece = document.getElementById('current-box').children[1];
    piece.style.left = e.pageX + 'px';
    piece.style.top = e.pageY + 'px';
});

const handleFollowCursor = ((e) => {
    e.preventDefault;
    let piece = document.getElementById('current-box').children[1];
    
    piece.removeEventListener('click', handleFollowCursor)
    piece.style.position = "absolute";
    piece.style.transform = "translate(-50%,-50%)";
    document.addEventListener('mousemove', mouseMoveCursorFollow)
    piece.addEventListener('click', (e) => {
        document.removeEventListener('mousemove', mouseMoveCursorFollow)
    })
})

const handleReroll = () => {
    //console.log('generating random piece');
    const nextBox = document.getElementById('next-box');
    const currentBox = document.getElementById('current-box');
    const currentPieceDiv = currentBox.children[1];
    const nextPieceDiv = nextBox.children[1];
    const pieceNumber = Math.floor(Math.random()*7);
    //console.log(pieceNumber);
    const nextPiece = getNewPiece(pieceNumber);
    nextPiece.className += ' preview-piece';

    if(nextPieceDiv && currentPieceDiv) {
        const currentPiece = nextPieceDiv.cloneNode(true)
        currentBox.replaceChild(currentPiece, currentPieceDiv);
        currentPiece.addEventListener('click', handleFollowCursor)
    }
    nextBox.replaceChild(nextPiece, nextPieceDiv);
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

// for finding the name of the piece given it's index
const indexToLetter = [
    't','j','z','o','s','l','i'
]

// convery 2-d array into tetris grid
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
            block.className = array[i][j] ? `block filled-block color-${color}` : 'block transparent-block';
            row.appendChild(block);
        }
        piece.appendChild(row);
    }
    return piece;
}