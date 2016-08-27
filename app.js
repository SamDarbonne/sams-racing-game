



$( document ).ready(function() {
    gameStart();
})




function countCircles(){
	if(gameboard.childNodes.length === 0){
		console.log('good job you killed all the bubbles!');
		gameStart();
	}
}

var defaultRed = 40;
var defaultGreen = 175;
var defaultBlue = 160;
var defaultColorVariety = 80;
var gameboard = document.getElementById('gameboard');

function randomx(){
	return (Math.round(Math.random() * 460) + 30);
}

function randomy(){
	return (Math.round(Math.random() * 460) + 30);
}

function randomColorValue(variety, offset){
	return (Math.round(Math.random() * variety) + offset);
}

//chose a semi-random color value for each color component, then concatenate them into an rgb color code
function randomColor(variety, redBase, greenBase, blueBase){
	red = randomColorValue(variety, redBase);
	green = randomColorValue(variety, greenBase);
	blue = randomColorValue(variety, blueBase);
	return('rgb(' + red + ', ' + green + ', ' + blue + ')');
}

var svgholder = document.createElementNS("http://www.w3.org/2000/svg", "svg");
var Bubble = function(radius){
	this.xpos = randomx();
	this.ypos = randomy();
	this.radius = radius;
	this.color = randomColor(defaultColorVariety, defaultRed, defaultGreen, defaultBlue);
	this.place = function(){
		var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		circle.setAttribute('cy', this.ypos);
		circle.setAttribute('cx', this.xpos);
		circle.setAttribute('r', this.radius);
		circle.setAttribute('fill', this.color);
		gameboard.appendChild(circle);
	}
}

function makeBubbles(num){
	var bubbleList = new Array;
	for (var i = 0; i < (num + 1); i++){
		//increase the bubble's radius by 2 pixels for each new bubble
		bubbleList[i] = new Bubble(i * 2 + 10);
		bubbleList[i].place();
	}
}

//remove circle when clicked, then check to see if it was the last circle
function setCircleClicksteners() {
	circleList = gameboard.childNodes;
	for (var i = 0; i < circleList.length; i++){
		circleList[i].addEventListener('click', function(){
			this.parentNode.removeChild(this);
			countCircles();
		})
	}
}

function gameStart(){
	makeBubbles(10);
	setCircleClicksteners();
}

