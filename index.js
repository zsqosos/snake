/**
 * Created by MEMEME on 2016/12/13.
 */
window.onload=function (){
    init();
    initBoard();
    food();
    snakeUpDataView(snake);
    start();
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
var snake = null;
var prevSnakeTail = [];
var nowDirection = '';
var timer = null;
var foodx = 0;
var foody = 0;
function init(){
    snake = [[10,6],[10,5],[10,4],[10,3],[10,2]];
    foodx = 0;
    foody = 0;
    nowDirection = 'right';

}
function food(){
        foodx = Math.floor(Math.random() * 20);
        foody = Math.floor(Math.random() * 20);
    for( var i = 0; i < snake.length; i++){
        if(snake[i][0]==foodx && snake[i][1]==foody){
            food();
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
function start(){
    document.querySelector('#input1').addEventListener('click',function(){
        timer = setInterval(function(){console.log(1);snakeMove('right');},200);
    });
}

document.addEventListener('keydown',function(e){
    switch (e.keyCode){
        case 37:
            if(nowDirection=='top' || nowDirection == 'down') {
                clearInterval(timer);
                if(snakeMove('left')) {
                    timer = setInterval(function () {
                        console.log('left');
                        snakeMove('left')
                    }, 200);
                }
            }
            break;
        case 38:
            if(nowDirection=='left' || nowDirection == 'right') {
                clearInterval(timer);
                if(snakeMove('top')) {
                    timer = setInterval(function () {
                        console.log('top');
                        snakeMove('top')
                    }, 200);
                }
            }
            break;
        case 39:
            if(nowDirection=='top' || nowDirection == 'down') {
                clearInterval(timer);
                if(snakeMove('right')) {
                    timer = setInterval(function () {
                        console.log('right');
                        snakeMove('right')
                    }, 200);
                }
            }
            break;
        case 40:
            if(nowDirection=='left' || nowDirection == 'right') {
                clearInterval(timer);
                if(snakeMove('down')){
                    timer = setInterval(function () {
                        console.log('down');
                        snakeMove('down')
                    }, 200);
                }
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
    prevSnakeTail=[snake[snake.length-1][0],snake[snake.length-1][1]];
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
    if(notGameOver()) {
        eat();
        return true;
    }
    return false;
}
function eat() {
    if(snake[0][0]==foodx && snake[0][1] == foody){
        snake.push([prevSnakeTail[0],prevSnakeTail[1]]);
        food();
    }
    snakeUpDataView(snake);
}
function notGameOver(){
    if(snake[0][0] < 0 || snake[0][0] > 19 || snake[0][1] < 0 || snake[0][1] > 19){
        clearInterval(timer);
        alert('GAMEOVER');
        init();
        food();
        snakeUpDataView(snake);
        return false;
    }else{
        for(var i = 4; i < snake.length; i++){
            if(snake[0][0] == snake[i][0] && snake[0][1] == snake[i][1]){
                clearInterval(timer);
                alert('GAMEOVER');
                init();
                food();
                snakeUpDataView(snake);
                return false;
            }
        }
    }
    return true;
}