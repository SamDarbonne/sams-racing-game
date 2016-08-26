// push me, and then just touch me, till i can get my satisfaction

var randomr = 10;
var gameboardsize;

randomColorValue = function(){
	return (Math.round(Math.random() * 254));
}

randomx = function(){
	return Math.round(Math.random() * 200);
}

randomy = function(){
	return Math.round(Math.random() * 200);
}
function randomColor(){
	red = randomColorValue();
	green = randomColorValue();
	blue = randomColorValue();
	return('rgb(' + red + ', ' + green + ', ' + blue + ')');
}

var svgholder = document.createElementNS("http://www.w3.org/2000/svg", "svg");
var Bubble = function(radius){
	this.xpos = randomx();
	this.ypos = randomy();
	this.radius = radius;
	this.color = randomColor();
	this.place = function(){
		var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");;
		circle.setAttribute('cy', this.ypos);
		circle.setAttribute('cx', this.xpos);
		circle.setAttribute('r', this.radius);
		circle.setAttribute('fill', this.color);
		$('#gameboard').append(circle);
	}
}

var bubbleList = new Array;
for (var i = 0; i < 10; i++){
	bubbleList[i] = new Bubble(i * 2 + 10);
	bubbleList[i].place();
}
