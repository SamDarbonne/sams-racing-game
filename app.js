var source   = document.getElementById('entry-template').innerHTML;
var template = Handlebars.compile(source);

//dummy high score values to start with
var highScore = [10, 11, 12, 13, 14];

//variables that need to be global scope
var totalGameTime;
var startTime;
var endTime;
var intervalId;

//color values to be used by bubble constructor
var defaultRed = 50;
var defaultGreen = 200;
var defaultBlue = 50;
var defaultColorVariance = 40;

//grab gameboard for later use
var gameboard = document.getElementById('gameboard');

function highScoreTemplate() {
	// var source   = $("#entry-template").html();
	// var template = Handlebars.compile(source);
	var context = {highScore: highScore};
	var html    = template(context);
	document.getElementById('high-score').innerHTML = html;
}

//check if the game has ended, then do endgame functions
function countCircles(){
	if(gameboard.childNodes.length === 0){
		clearInterval(intervalId);
		endTime = Date.now();
		totalGameTime = Math.round((endTime - startTime)/10)/100;
		document.getElementById('current-score').innerHTML = totalGameTime;
		//if this score is better than the last high score, replace that one then resort high score list
		if (totalGameTime < highScore[4]){
			highScore[4] = totalGameTime;
			highScore.sort(sortNumber);
			highScoreTemplate();
		}
	}
}


//sets a click listener on designated color button to change default color values used in bubble constructor
function setColorListener(buttonNumber, red, green, blue, variance){
	document.getElementById('color' + buttonNumber).addEventListener('click', function(){
		defaultRed = red;
		defaultGreen = green;
		defaultBlue = blue;
		defaultColorVariance = variance;
		clearInterval(intervalId);
		gameStart();

	})
}

//sets color button click listeners
setColorListener(1, 200, 50, 50, 55);
setColorListener(2, 50, 200, 50, 55);
setColorListener(3, 50, 50, 200, 55);
setColorListener(4, 50, 50, 50, 55);
setColorListener(5, 50, 50, 50, 205);

//handlebars helper so high score list is indexed at 1 isntead of 0
Handlebars.registerHelper("inc", function(value, options){
    return parseInt(value) + 1;
});

//force javascript to sort numerically
function sortNumber(a,b) {
    return a - b;
}

//random x position within svg range
function randomx(){
	return (Math.round(Math.random() * 460) + 30);
}

//random y position within svg range
function randomy(){
	return (Math.round(Math.random() * 460) + 30);
}

function randomColorValue(variance, offset){
	return (Math.round(Math.random() * variance) + offset);
}

//chose a semi-random color value for each color component, then concatenate them into an rgb color code
function randomColor(variance, redBase, greenBase, blueBase){
	red = randomColorValue(variance, redBase);
	green = randomColorValue(variance, greenBase);
	blue = randomColorValue(variance, blueBase);
	return('rgb(' + red + ', ' + green + ', ' + blue + ')');
}

//bubble constructor
var Bubble = function(radius){
	this.xpos = randomx();
	this.ypos = randomy();
	this.radius = radius;
	this.color = randomColor(defaultColorVariance, defaultRed, defaultGreen, defaultBlue);
	this.place = function(){
		var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		circle.setAttribute('cy', this.ypos);
		circle.setAttribute('cx', this.xpos);
		circle.setAttribute('r', this.radius);
		circle.setAttribute('fill', this.color);
		gameboard.appendChild(circle);
	}
}

//makes num bubbles and places them in SVG holder
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
function timing(){
	thisTime = Date.now();
	displayTime = Math.round((thisTime - startTime)/10)/100;
	document.getElementById('current-score').innerHTML = displayTime;
}
function gameStart(){
	highScoreTemplate();
	gameboard.innerHTML = '';
	startTime = Date.now();
	intervalId = setInterval(function(){
		timing();
	});
	makeBubbles(9);
	//Clicksteners = Click Listeners.
	setCircleClicksteners();

}
//events to start a new game
gameStart();
document.getElementById('restart-button').addEventListener('click', function(){
    clearInterval(intervalId);
    gameStart();
})

