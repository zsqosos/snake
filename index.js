/**
 * Created by MEMEME on 2016/12/13.
 */
window.onload=function (){
    initBoard();
    food();
    initSnake();
    document.querySelector('#input1').onclick=function(){snakeMove('left')};
    document.querySelector('#input2').onclick=function(){snakeMove('right')};
    document.querySelector('#input3').onclick=function(){snakeMove('top')};
    document.querySelector('#input4').onclick=function(){snakeMove('down')};
};

function initBoard(){
    var container = document.querySelector('.container');
    for( var i = 0; i < 20; i++  ){
        for( var j = 0; j < 20; j++ ){
            var oDiv = document.createElement('div');
            oDiv.id = 'board-cell-'+i+'-'+j;
            oDiv.className = 'board-cell';
            container.appendChild(oDiv);
            oDiv.style.top = i*15+'px';
            oDiv.style.left = j*15+'px';
        }
    }
}

var snake = [[10,6],[10,5],[10,4],[10,3],[10,2]];
var prevSnakeTail = [];
var nowDirection = '';
var timer = null;
var foodx = 0;
var foody = 0;
function initSnake(){
    snakeUpDataView(snake);
    nowDirection = 'right';
    timer=setInterval(function(){snakeMove('right')},500);
}
function food(){
        foodx = Math.floor(Math.random() * 20);
        foody = Math.floor(Math.random() * 20);
    for( var i = 0; i < snake.length; i++){
        if(snake[i][0]==foodx && snake[i][1]==foody){
            foodx = Math.floor(Math.random() * 20);
            foody = Math.floor(Math.random() * 20);
        }
    }
}
function snakeUpDataView(snakeArr){
    var board = document.querySelectorAll('.board-cell');
    for( var j = 0; j < board.length; j++ ) {
        board[j].style.background = '#fff';
    }
    document.querySelector("#board-cell-"+foodx+'-'+foody).style.background = 'green';
    for( var i = 0; i < snakeArr.length; i++) {
        var snakeDom = document.querySelector('#board-cell-'+snakeArr[i][0]+'-'+snakeArr[i][1]);
        snakeDom.style.background = '#ccc';
    }
}

document.addEventListener('keydown',function(e){
    switch (e.keyCode){
        case 37:
            if(nowDirection=='top' || nowDirection == 'down') {
                clearInterval(timer);
                snakeMove('left');
                timer = setInterval(function () {
                    snakeMove('left')
                }, 500);
            }
            break;
        case 38:
            if(nowDirection=='left' || nowDirection == 'right') {
                clearInterval(timer);
                snakeMove('top');
                timer = setInterval(function () {
                    snakeMove('top')
                }, 500);
            }
            break;
        case 39:
            if(nowDirection=='top' || nowDirection == 'down') {
                clearInterval(timer);
                snakeMove('right');
                timer = setInterval(function () {
                    snakeMove('right')
                }, 500);
            }
            break;
        case 40:
            if(nowDirection=='left' || nowDirection == 'right') {
                clearInterval(timer);
                snakeMove('down');
                timer = setInterval(function () {
                    snakeMove('down')
                }, 500);
            }
            break;
        case 32:
            if(timer){
                clearInterval(timer);
            }else{
                setInterval(function(){
                    snakeMove(nowDirection);
                },500)
            }
    }
});

function snakeMove(direction) {
    prevSnakeTail=[snake[snake.length-1][0],snake[snake.length-1][1]]
    for (var i = snake.length - 1; i > 0; i--) {
        snake[i] = snake[i - 1];
    }
    snake.shift();
    var snakeHeadX = snake[0][0];
    var snakeHeadY = snake[0][1];
    switch (direction) {
        case 'left':
            snake.unshift([snakeHeadX, snakeHeadY - 1]);
            nowDirection = 'left';
            break;
        case 'right':
            snake.unshift([snakeHeadX, snakeHeadY + 1]);
            nowDirection = 'right';
            break;
        case 'top':
            snake.unshift([snakeHeadX - 1, snakeHeadY]);
            nowDirection = 'top';
            break;
        case 'down':
            snake.unshift([snakeHeadX + 1, snakeHeadY]);
            nowDirection = 'down';
            break;
    }
    console.log(snake);
    console.log(prevSnakeTail);
    eat();
}
function getOppositeDir(direction){
    switch(direction){
        case 'left':
            return 'right';
        case 'right':
            return 'left';
        case 'top':
            return 'down';
        case 'down':
            return 'top';
        default :
            break;
    }
}
function eat() {
    if(snake[0][0]==foodx && snake[0][1] == foody){
        snake.push([prevSnakeTail[0],prevSnakeTail[1]]);
        food();
    }
    snakeUpDataView(snake);
}












