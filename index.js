/**
 * Created by MEMEME on 2016/12/13.
 */
 window.onload = function(){
    controller.initStatus();
    board.initBoard();
    food.createFood();
    board.upDataViewBoard(snake.snakeModle);
    controller.start();
}
// 棋盘格对象
var board = {
    // 初始化棋盘格
    initBoard : function(){
        var container = document.querySelector('.container');
        var button = document.querySelector('.start');
        for( var i = 0; i < 20; i++  ){
            for( var j = 0; j < 20; j++ ){
                var oDiv = document.createElement('div');
                oDiv.id = 'board-cell-'+i+'-'+j;
                oDiv.className = 'board-cell';
                container.insertBefore(oDiv,button);
                oDiv.style.top = i*15+'px';
                oDiv.style.left = j*15+'px';
            }
        }
    },
    // 数据发生变化后更新棋盘格
    upDataViewBoard : function (snakeArr){
        var board = document.querySelectorAll('.board-cell');
        for( var j = 0; j < board.length; j++ ) {
            board[j].style.background = '#fff';
        }
        document.querySelector("#board-cell-"+food.foodx+'-'+food.foody).style.background = 'green';
        for( var i = 0; i < snakeArr.length; i++) {
            var snakeDom = document.querySelector('#board-cell-'+snakeArr[i][0]+'-'+snakeArr[i][1]);
            snakeDom.style.background = '#ccc';
        }
    }
}
// 蛇对象
var snake = {
    snakeModle : [],
    prevSnakeTail : [],
    nowDirection : '',
    snakeMove : function (direction) {
        this.prevSnakeTail=[this.snakeModle[this.snakeModle.length-1][0],this.snakeModle[this.snakeModle.length-1][1]];
        for (var i = this.snakeModle.length - 1; i > 0; i--) {
            this.snakeModle[i] = this.snakeModle[i - 1];
        }
        this.snakeModle.shift();
        var snakeHeadX = this.snakeModle[0][0];
        var snakeHeadY = this.snakeModle[0][1];
        switch (direction) {
            case 'left':
                this.snakeModle.unshift([snakeHeadX, snakeHeadY - 1]);
                this.nowDirection = 'left';
                break;
            case 'right':
                this.snakeModle.unshift([snakeHeadX, snakeHeadY + 1]);
                this.nowDirection = 'right';
                break;
            case 'top':
                this.snakeModle.unshift([snakeHeadX - 1, snakeHeadY]);
                this.nowDirection = 'top';
                break;
            case 'down':
                this.snakeModle.unshift([snakeHeadX + 1, snakeHeadY]);
                this.nowDirection = 'down';
                break;
        }
        if(controller.notGameOver()) {
            this.eat();
            return true;
        }
        return false;
    },
    eat : function(){
        if(this.snakeModle[0][0]==food.foodx && this.snakeModle[0][1] == food.foody){
            this.snakeModle.push([this.prevSnakeTail[0],this.prevSnakeTail[1]]);
            food.createFood();
        }
        board.upDataViewBoard(this.snakeModle);
    }
}
// 食物对象
var food = {
    foodx : 0,
    foody : 0,
    createFood : function (){
        this.foodx = Math.floor(Math.random() * 20);
        this.foody = Math.floor(Math.random() * 20);
        for( var i = 0; i < snake.snakeModle.length; i++){
            if(snake.snakeModle[i][0]==this.foodx && snake.snakeModle[i][1]==this.foody){
                this.createFood();
            }
        }
    }
}
// 控制对象
var controller = {
    timer : null,
    // 状态初始化
    initStatus : function(){
        snake.snakeModle = [[10,6],[10,5],[10,4],[10,3],[10,2]];
        snake.nowDirection = 'right';
        food.foodx = 0;
        food.foody = 0;
        this.timer = null;
    },
    // 开始
    start : function(){
        var that = this;
        document.querySelector('.start').addEventListener('click',function(){
            if(!that.timer){
                that.timer = setInterval(function(){snake.snakeMove(snake.nowDirection);},200);
            }else{
                clearInterval(that.timer);
                that.timer = null;
            }
        });
        document.addEventListener('keydown',function(e){
            switch (e.keyCode){
                case 37:
                    if(snake.nowDirection=='top' || snake.nowDirection == 'down') {
                        clearInterval(that.timer);
                        if(snake.snakeMove('left')) {
                            that.timer = setInterval(function (){
                                snake.snakeMove('left')
                            }, 200);
                        }
                    }
                    e.preventDefault();
                    break;
                case 38:
                    if(snake.nowDirection=='left' || snake.nowDirection == 'right') {
                        clearInterval(that.timer);
                        if(snake.snakeMove('top')) {
                            that.timer = setInterval(function () {
                                snake.snakeMove('top')
                            }, 200);
                        }
                    }
                    e.preventDefault();
                    break;
                case 39:
                    if(snake.nowDirection=='top' || snake.nowDirection == 'down') {
                        clearInterval(that.timer);
                        if(snake.snakeMove('right')) {
                            that.timer = setInterval(function () {
                                snake.snakeMove('right')
                            }, 200);
                        }
                    }
                    e.preventDefault();
                    break;
                case 40:
                    if(snake.nowDirection=='left' || snake.nowDirection == 'right') {
                        clearInterval(that.timer);
                        if(snake.snakeMove('down')){
                            that.timer = setInterval(function () {
                                snake.snakeMove('down')
                            }, 200);
                        }
                    }
                    e.preventDefault();
                    break;
                case 32:
                    if(that.timer){
                        clearInterval(that.timer);
                        that.timer = null;
                    }else{
                        clearInterval(that.timer);
                        that.timer = setInterval(function(){
                            snake.snakeMove(snake.nowDirection);
                        },200)
                    }
                    e.preventDefault();
                    break;
                default:
                    break;    
            }
        });
    },
    // 游戏是否结束
    notGameOver : function(){
        if(snake.snakeModle[0][0] < 0 || snake.snakeModle[0][0] > 19 || snake.snakeModle[0][1] < 0 || snake.snakeModle[0][1] > 19){
            console.log(this.timer);
            clearInterval(this.timer);
            alert('GAMEOVER');
            this.initStatus();
            food.createFood();
            board.upDataViewBoard(snake.snakeModle);
            return false;
        }else{
            for(var i = 4; i < snake.snakeModle.length; i++){
                if(snake.snakeModle[0][0] == snake.snakeModle[i][0] && snake.snakeModle[0][1] == snake.snakeModle[i][1]){
                    console.log(this.timer);
                    clearInterval(this.timer);
                    alert('GAMEOVER');
                    this.initStatus();
                    food.createFood();
                    board.upDataViewBoard(snake.snakeModle);
                    return false;
                }
            }
        }
        return true;
    }
}