// 'constant'
var MAX_BOARD_SIZE = 20;


// generate alphabet array A to Z
function getAlphabetArr() {
    var arr = [];
    var firstcode = 'A'.charCodeAt(0); // UTF-16 code
    var lastcode = 'Z'.charCodeAt(0);

    for (var curcode = firstcode; curcode <= lastcode; curcode++) { //++c
        arr.push(String.fromCharCode(curcode));
    }

    return arr;
}


// generates a 2d array of checkerboard cell objects
function genChessArray(rows, cols) {
    var arr = [];
    var color; // current cell color
    var startcolor; // color which a new checkerboard line starts with

    var alphabet = getAlphabetArr(); // alphabet array

    if (rows < 2 || rows > MAX_BOARD_SIZE || cols < 2 || cols > MAX_BOARD_SIZE) {
        alert ('Error: invalid chessboard size params!');
        return null;
    }

    color = 'black';
    for (var i = 0; i < rows; i++) {
        arr[i] = [];
        startcolor =  (startcolor == 'black') ? 'white' : 'black';
        color = startcolor;
        for (var j = 0; j < cols; j++) {
            arr[i][j] = {};
            arr[i][j].color = color;
            arr[i][j].caption = alphabet[j] + (i + 1);
            color =  (color == 'black') ? 'white' : 'black';
        }
    }

    return arr;
}


// draw a [size x size] chess board in the given parent element
// sidenote: the simplest would probably be to create a table
// making it with divs.
function drawChessboard (divId, size, sizepix) {
    var wrapElem = document.getElementById(divId);
    var curCellElem, cellTagElem;
    var vStripElem, hStripElem, borderTagElem;

    var chessArr = genChessArray(size, size) ;
    var cellWidth = 100.0/size + '%'; //should be a better way to (re)size the cells
    var boardMargin = 40;

    var boardElem = document.createElement('div');
    var fullboardElem = document.createElement('div');
    var centerFlexElem;

    var alphabet = getAlphabetArr(); 

    wrapElem.innerHTML = '';

    boardElem.classList.add('checkerboard');

    //dirty fix (should be made and adaptive square)
    boardElem.style.height = (sizepix - 2*boardMargin) + 'px';
    boardElem.style.width = (sizepix - 2*boardMargin) + 'px';

    fullboardElem.style.height = sizepix + 'px';
    fullboardElem.style.width = sizepix + 'px';


    // create checkerboard itself
    // rows are being added top to bottom unlike to how they're stored in the array
    for (var i = size - 1; i >= 0; i--) {
        for (var j = 0; j < size; j++) { // left to right order is kept
            curCellElem = document.createElement('div');
            curCellElem.classList.add('chessboard-cell'); // unsupported in IE9-

            // inline styling. doesn't look nice, but works.
            // adding classes conditionally depending on the size like size2 size3 .... size20
            // creates too many classes
            // in create invisible cells with width=100% as a line break in flex
            // same problem would be with n-th child selector for floats
            // the simplest solution would be to create "rows" where you enforce new lines of cells
            // (table rows pr new flex for every line)
            curCellElem.style.width = cellWidth;
            curCellElem.style.height = cellWidth;

            if (chessArr[i][j].color == 'white') {
                curCellElem.classList.add('white-cell');
            }
            else {
                curCellElem.classList.add('black-cell');
            }

            cellTagElem = document.createElement('span');
            cellTagElem.classList.add('cell-tag');
            cellTagElem.textContent = chessArr[i][j].caption;

            curCellElem.appendChild(cellTagElem);
            boardElem.appendChild(curCellElem);
        }
    }

    // create vertical strip with numbers
    //create horizontal borders for the checkerboard
    vStripElem = document.createElement('div');
    vStripElem.classList.add('v-flex');
    vStripElem.style.height = boardElem.style.height;
    vStripElem.style.width = boardMargin + 'px';

    for (var i = 0; i < size; i++) {
        borderTagElem = document.createElement('span');
        borderTagElem.classList.add('border-tag');
        borderTagElem.textContent = '' + (i + 1);
        vStripElem.appendChild(borderTagElem);
    }

    // central horisontal band including two vertical strips and the checkerboard
    centerFlexElem = document.createElement('div')
    centerFlexElem.classList.add('h-flex');
    centerFlexElem.appendChild(vStripElem);
    centerFlexElem.appendChild(boardElem);

    vStripElem = vStripElem.cloneNode(true);
    vStripElem.classList.add('flip');
    centerFlexElem.appendChild(vStripElem);


    //create horizontal borders for the checkerboard
    hStripElem = document.createElement('div');
    hStripElem.classList.add('h-flex');
    hStripElem.classList.add('flip');
    hStripElem.style.height = boardMargin + 'px';
    hStripElem.style.width = boardElem.style.width;

    for (var i = 0; i < size; i++) {
        borderTagElem = document.createElement('span');
        borderTagElem.classList.add('border-tag');
        borderTagElem.textContent = alphabet[i];
        hStripElem.appendChild(borderTagElem);
    }

    fullboardElem.classList.add('fullboard');
    fullboardElem.appendChild(hStripElem);
    fullboardElem.appendChild(centerFlexElem);
    hStripElem = hStripElem.cloneNode(true);
    hStripElem.classList.remove('flip');
    fullboardElem.appendChild(hStripElem);

    wrapElem.appendChild(fullboardElem);
}


// draws a chessboard 800 x 800 px based on size designated by 
function drawChessboardParms() {
    var size = 8;
    var brdSizeElem = document.getElementById('chess_size');
    if (brdSizeElem !== null) {
        size = parseInt(brdSizeElem.value);
        if (size > 1 && size <= MAX_BOARD_SIZE ) {
            drawChessboard('chessboard', size, 800);
        }
        else {
            alert ('Error: the board size should be 2 to ' + MAX_BOARD_SIZE);
            return
        }
    }
}

//window.onload = drawChessboardParms;