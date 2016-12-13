/**
 * Created by Jancy on 2015/4/7 0007.
 */


function createCode() {                                     //先将输入的文本转换成二进制，再将其填充到三角形中
    var textinput = document.getElementById('text');
    var text = textinput.value;
    if(text == "" || text == undefined || text == null){
        alert('请输入要转换的文本');
    }else{
        console.log('编码前:'+ text);
        var total2str = "";
        for (var i = 0; i < text.length; i++) {
            var num10 = text.charCodeAt(i);  ///< 以10进制的整数返回 某个字符 的unicode编码
            var str2 = num10.toString(2);   ///< 将10进制数字 转换成 2进制字符串

            if( total2str == "" ){
                total2str = str2;
            }else{
                total2str = total2str+str2;
            }
        }
        console.log("编码后:" + total2str);
        var num = Math.ceil(Math.sqrt(total2str.length));   //取得编码长度的根号
        textinput.value = '';
        document.getElementById('result').style.display = "";
        document.getElementById('codeBefore').value = text;
        document.getElementById('codeed').value = total2str;
        startGame(num,total2str);                                     //根据编码长度的根号的大小生成三角形
    }
}      
var stage = new createjs.Stage("gameView");
createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick",stage);
var gameView = new createjs.Container();
stage.addChild(gameView);

function startGame(num,total2str){
    getCanvasSize();
    n = num;
    addRect(total2str);
}



function addRect(total2str){
    // var color = '#' + parseInt(Math.random()*1000000);
    // var Rectcolor ='#' + parseInt(Math.random()*1000000);

    var color = '#000000';
    var Rectcolor = '#ffffff';
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
    console.log('指定位置4：'+(total2str.charAt(4) == '1'));
    var type = new Array();                                 //定义一个二维数组type用于记录小三角形的位置坐标，即小三角形在大三角形的第几行第几列
    for(var indexX = (n - 1); indexX >= 0; indexX--){       //等腰三角s形与正方形类比 ，可看成每行的个数是一个等差数列的项

        type[indexX] = new Array();
        for(var indexY = 0; indexY < (2 * indexX + 1); indexY++){
            var r = new SeeColorRect(n, color,Rectcolor,indexY);
            type[indexX][indexY] = r;
            gameView.addChild(r);

            if(indexX == x && indexY == y){         //白色0
                r.setRectType(2);
            }else{                                  //黑色1

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


    var count = 0;                                          //用于标记二进制编码total2str的元素下标
    var length = total2str.length;
    for(var indexX = 0 ; indexX < n; indexX++){             //根据二进制编码对应改变小三角形的黑白颜色

        for(var indexY = 0; indexY < 2 * indexX + 1; indexY++){

            if(count < length){                                 //二进制编码串的长度范围内
                if(total2str.charAt(count) == '1'){             //黑色
                    type[indexX][indexY].setTypeAndColor(1);
                }else if(total2str.charAt(count) == '0'){       //白色
                    type[indexX][indexY].setTypeAndColor(2);
                }

                count++;
            }else{                                              //二进制编码串的长度范围外，默认为黑色                           
                 type[indexX][indexY].setTypeAndColor(1);
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
