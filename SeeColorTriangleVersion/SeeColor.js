/**
 * Created by Jancy on 2015/4/7 0007.
 */

// var gameView = document.getElementById('gameView');
// var cxt= gameView.getContext("2d");
var stage = new createjs.Stage("gameView");
createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick",stage);
var gameView = new createjs.Container();
stage.addChild(gameView);

function startGame(){
    getCanvasSize();
    n = 2;
    addRect();
}



function addRect(){
    var color = '#' + parseInt(Math.random()*1000000);
    var Rectcolor ='#' + parseInt(Math.random()*1000000);

    // var color = '#000000';
    // var Rectcolor = '#ffffff';
    var x = parseInt(Math.random() * (n - 1));
    var y = parseInt(Math.random() * (2*x));
    // for(var indexX = 0; indexX < n; indexX++){
    //     for(var indexY = 0; indexY < n; indexY++){
    //         var r = new SeeColorRect(n, color,Rectcolor);
    //         gameView.addChild(r);
    //         r.x = indexX;
    //         r.y = indexY;
    //         if(r.x == x && r.y == y){
    //             r.setRectType(2);
    //         }
    //         r.x = indexX * (getSize()/n);
    //         r.y = indexY * (getSize()/n);
    //         if(r.getRectType() == 2){
    //             r.addEventListener("click",clickRect);
    //         }
    //     }
    // }

    for(var indexX = (n - 1); indexX >= 0; indexX--){       //等腰三角形与正方形类别 ，可看成每行的个数是一个等差数列的项

        for(var indexY = 0; indexY < (2 * indexX + 1); indexY++){
            var r = new SeeColorRect(n, color,Rectcolor,indexY);
            gameView.addChild(r);
            if(indexX == x && indexY == y){
                r.setRectType(2);
            }

            console.log('x='+x+',y='+y);
            console.log('indexX=' +indexX+',indexY='+indexY);
            r.x = indexY * (getSize()/(2*n)) + (n - 1 -indexX) * (getSize()/(2*n));
            r.y = indexX * (getSize()/n);
            if(r.getRectType() == 2){
                r.addEventListener("click",clickRect);
            }
        }

    }




}
function clickRect(){
    if(n < 24){
        ++n;
    }
    gameView.removeAllChildren();
    addRect();
}
function getCanvasSize() {
    var gView = document.getElementById("gameView");
    gView.height = window.innerHeight - 4;
    gView.width = window.innerWidth - 4;
}
function getSize() {
    if (window.innerHeight >= window.innerWidth) {
        return window.innerWidth;
    } else {
        return window.innerHeight;
    }
}
startGame();
