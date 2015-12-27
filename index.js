function getEle(ele){
    return document.querySelector(ele);
}
var bell = getEle("#bell");
var say = getEle("#say");
var music = getEle("#music");
var main = getEle("#main");
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640;
var desH = 1080;
if(winW/winH>desW/desH){
    main.style.webkitTransform = "scale("+winW/desW+")";
}else{
    main.style.webkitTransform = "scale("+winH/desH+")";
}
var rem = desW/100;
if(winW>desW){
    winW = desW;
}
document.documentElement.style.fontSize = winW/rem+"px";

var loadSpan = getEle(".loadSpan");
//var arr= ['phoneBg.jpg', 'cubeBg.jpg', 'cubeImg1.png', 'cubeImg2.png', 'cubeImg3.png', 'cubeImg4.png', 'cubeImg5.png', 'cubeImg6.png','phoneBtn.png', 'phoneKey.png', 'messageHead1.png', 'messageHead2.png', 'messageText.png', 'phoneHeadName.png'];
var arr= ['first.jpg','yanjing.png','tou.png','hudiejie.png', 'second.jpg', 'third.jpg', 'fourth.jpg'];
var n = 0;
fnLoad();
function fnLoad(){
    arr.forEach(function(){
        var oImg = new Image();
        //oImg.src = "images/"+arguments[0];
        oImg.src = "img/"+arguments[0];
        oImg.onload = function(){
            n++;
            loadSpan.style.width = n/arr.length*100+"%"
        }
    })
    loadSpan.addEventListener("webkitTransitionEnd",function(){
        this.parentNode.parentNode.remove();
        fnFirst.init();
    },false)

}

function addClass(obj, cls) {
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;
}
function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

var first = getEle('#first');
var second = getEle('#second');

var pages = document.getElementsByClassName("page");


var eyes  = getEle('#eyes');
var hdj  = getEle('#hdj');
var fnFirst = {
    init: function(){
        addClass(eyes,'animated flash infinite');
        addClass(hdj,'animated rubberBand infinite');
        first.index = 0;
        first.addEventListener("touchstart", firstStart, false);
        first.addEventListener('touchmove', firstMove, false);
        first.addEventListener('touchend', firstEnd, false);

        [].forEach.call(pages, function () {
            arguments[0].index = arguments[1];
            arguments[0].addEventListener("touchstart", firstStart, false);
            arguments[0].addEventListener('touchmove', firstMove, false);
            arguments[0].addEventListener('touchend', firstEnd, false);

            //arguments[0].addEventListener('touchcancel', firstCancel, false);
        })


    }
}

var firstStart = function (e) {
    //this.start = e.changedTouches[0].pageY;
    this.start = e.touches[0].pageY;
    //console.log(this.start);
}
var firstMove = function (e) {
    e.preventDefault();
    //var moveTouch = e.changedTouches[0].pageY;
    var moveTouch = e.touches[0].pageY;
    console.log(moveTouch);
    var changePos = moveTouch - this.start;

    var cur = this.index;

    [].forEach.call(pages,function(){
        if(arguments[1]!=cur){
            //console.log(arguments[1]);
            arguments[0].style.display="none";
        }
        arguments[0].className = "page";
    })

    if (changePos > 0) {
        var pos = -winH+changePos;
        this.nextIndex = cur == 0 ? pages.length - 1 : cur - 1;
    } else if (changePos < 0) {
        var pos =winH+changePos;
        this.nextIndex = cur == pages.length - 1 ? 0 : cur + 1;
    }
    pages[this.nextIndex].style.webkitTransform = "translate(0,"+pos+"px)";
    pages[this.nextIndex].className = 'page zIndex';
    pages[this.nextIndex].style.display ="block";
}
var firstEnd = function (e) {
    pages[this.nextIndex].style.webkitTransform = "translate(0,0)";
    pages[this.nextIndex].style.webkitTransition = "0.5s";
    pages[this.nextIndex].addEventListener("webkitTransitionEnd",function(){
        this.style.webkitTransition = "";
    },false)
}

