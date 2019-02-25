var FIELD_SIZE = 15;
var CELL_SIZE = 20;//in px, the same as for .tiny-box class

var TS = 1.0; // time scale. intended use - to accelerate the game over time (not implemented atm)

var FOOD_INTERVAL = 8000;
var FOOD_LIFETIME = 6000; // !!! in this ver should always be less than the interval to aboid multiple timers set

var MOVE_INTERVAL = 400; 

var curDir = {x:0, y:-1}; 
var python = [];
var headPos = {
    x: 0, 
    y: 0,
    // adding coords pair object, wrapping the values to be within the margins
    addWrap: function(a, min, max) {
        this.x += a.x;
        this.y += a.y;
        if (this.x > max) this.x = min;
        if (this.y > max) this.y = min;
        if (this.x < min) this.x = max;
        if (this.y < min) this.y = max;
    }
};

var movePythonTimer;
var makeFoodTimer; // only 1 food piece and 1 food timer in this version
var foodLifeTimer;
var foodCoords = {};

var gameTime = 0;
var gameTimer;

var gameScore = 0;


// random integers from min to max (both included)
function getRandomInt( min, max ) {
    return min + Math.floor( (max - min + 1) * Math.random() ) ;
}

// padds the passed number to width characters with passed fillin or with '0's
function pad(num, width, fill) {
    fill = fill || '0';
    num = num + '';
    return (num.length >= width)? num : fill.repeat(width - num.length) + num;
}

// creates and returns a size x size game field table
function makeFieldTable(size) {
    var fieldTableEl = document.createElement('table');

    fieldTableEl.id = 'field-table';
    fieldTableEl.classList.add('field-table');
    function makeRow() {
        var rowEl = document.createElement('tr');

        for (var i = 0; i < size; i++) {
            var cellEl = document.createElement('td');
            cellEl.classList.add('cell');            
            rowEl.appendChild(cellEl);
        }
        return rowEl;
    }

    fieldTableEl.classList.add('field-table');
    for (var i = 0; i < size; i++) {
        fieldTableEl.appendChild(makeRow());
    }
    return fieldTableEl;
}

// create initial python position
function spawn() {
    var headEl, tailEl, fieldEl;
    python = [];

    headPos.x = Math.floor(FIELD_SIZE/2);
    headPos.y = Math.floor(FIELD_SIZE/2);

    curDir = {x:0, y:-1}; 

    fieldEl = document.getElementById('field-table');
    headEl = fieldEl.childNodes[headPos.y].childNodes[headPos.x];
    tailEl = fieldEl.childNodes[headPos.y+1].childNodes[headPos.x];
    headEl.classList.add('python-cell');
    tailEl.classList.add('python-cell');
    
    python.push(tailEl);
    python.push(headEl);
}

// creates a piece of food in random location and sets its' life span timer
function makeFood() {
    var foodX, foodY;
    var fieldEl, cellEl;
    var isFoodReady = false;
    
    fieldEl = document.getElementById('field-table');

    // generating new food positions while there's python in current food position
    while (!isFoodReady) {
        foodX = getRandomInt(0, FIELD_SIZE - 1);
        foodY = getRandomInt(0, FIELD_SIZE - 1);

        cellEl = fieldEl.children[foodY].children[foodX];

        if (!cellEl.classList.contains('python-cell')) isFoodReady = true;
    }

    cellEl.classList.add('food-cell');

    foodCoords.x = foodX;
    foodCoords.y = foodY;

    foodLifeTimer = setTimeout(killFood, FOOD_LIFETIME);
}

// spawns the python and sets the motion and food timers
// also sets the game zero time
function handleStartGameClick() {
    clearField(); // after gameOver it doesn't work properly (probably 'cause move executes 1 more time)
    spawn();
    updateGameScore(0);
    movePythonTimer = setInterval(move, MOVE_INTERVAL/TS);
    makeFoodTimer = setInterval(makeFood, FOOD_INTERVAL/TS);
    gameTimer = setInterval(showTimer, 1000);
    gameTime = new Date().getTime();
}

// clears all active timers and resets the field
function handleStopGameClick() {
    clearInterval(movePythonTimer);
    clearInterval(makeFoodTimer);
    clearTimeout(foodLifeTimer);
    clearTimeout(gameTimer);
    clearField();
}

// clears all extra classes for all game field cells
function clearField() {
    var fieldEl, tdEls;
    fieldEl = document.getElementById('field-table');
    tdEls = fieldEl.querySelectorAll ('td');
    for(var i = 0; i < tdEls.length; i++) {
        tdEls[i].classList.remove('python-cell');
        tdEls[i].classList.remove('food-cell');
        tdEls[i].classList.remove('poison-cell');
    }
}

// delete "food" from the field. only 1 piece is supported atm
function killFood() {
    var fieldEl, foodEl;
    //console.log('killed food at: ' + foodCoords.x + " : " + foodCoords.y)
    fieldEl = document.getElementById('field-table');
    foodEl = fieldEl.children[foodCoords.y].children[foodCoords.x].classList.remove('food-cell');
    if (foodEl) {
        foodEl.classList.remove('food-cell');
    }
    clearTimeout(foodLifeTimer);
}

// move the python 1 cell in current direction
function move() {
    var fieldEl, headEl;
    var isFood;

    headPos.addWrap(curDir, 0, FIELD_SIZE - 1);

    fieldEl = document.getElementById('field-table');

    headEl = fieldEl.childNodes[headPos.y].childNodes[headPos.x];
    if (headEl) {
        var isFood = headEl.classList.contains('food-cell');

        if (headEl.classList.contains('python-cell')) {
            gameOver();
        }
        
        headEl.classList.add('python-cell');
        python.push(headEl);

        if (isFood) {
            updateGameScore(gameScore+10);
            killFood();
        }
        else {
            // if there's no food in current python position, remove the tail cell
            (python.shift()).classList.remove('python-cell');
        }

    }
    else console.log('invalid element at coords: ' + JSON.serialize(head));
}

function gameOver() {
    alert('The python ate itself\nGame Over');
    handleStopGameClick();
}

function updateGameScore(newScore) {
    gameScore = newScore;
    document.getElementById('score').textContent = pad(gameScore, 4);
}

function handleKeyDown(e) {
    if (e.key !== undefined) {
        switch (e.key) {
            case 'ArrowUp':
                curDir.x = 0;
                curDir.y = -1;
            break;
            case 'ArrowDown':
                curDir.x = 0;
                curDir.y = 1;
            break;
            case 'ArrowLeft':
                curDir.x = -1;
                curDir.y = 0;
            break;
            case 'ArrowRight':
                curDir.x = 1;
                curDir.y = 0;
            break;            
            default:
        }  
    }
    else { // deprecated
        console.log(e.keyCode);
    }
}

function showTimer() {
    var dT = new Date() - gameTime;
    document.getElementById('time').textContent 
        = Math.floor(dT % (3600 * 1000) / 60000) + ':' + pad(Math.floor(dT % 60000/ 1000), 2);
}

function init() {
    var fieldWrapperEl;

    document.getElementById('the-field').style.width = FIELD_SIZE * CELL_SIZE + 20 + 'px';
    document.getElementById('start-game-btn').addEventListener('click', handleStartGameClick);
    document.getElementById('stop-game-btn').addEventListener('click', handleStopGameClick);
    window.addEventListener('keydown', handleKeyDown);

    fieldWrapperEl = document.getElementById('the-field');
    
    fieldWrapperEl.innerHTML = '';
    fieldWrapperEl.appendChild(makeFieldTable(FIELD_SIZE));
}

window.addEventListener('load', init);
