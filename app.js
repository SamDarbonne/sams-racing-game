


$( document ).ready(function() {
    gameStart();
    $('#restart-button').on('click', function(){
    	clearInterval(intervalId);
    	gameStart();
    })
})




function countCircles(){
	if(gameboard.childNodes.length === 0){
		clearInterval(intervalId);
		endTime = Date.now();
		totalGameTime = endTime - startTime;
		console.log(totalGameTime);
		$('#current-score').text(totalGameTime);
		if (totalGameTime < highScore){
			highScore = totalGameTime;
		}
		$('#high-score').text(highScore.toString());
	}
}

var intervalId;
var highScore = 12000;
var totalGameTime;
var startTime;
var endTime;
var defaultRed = 0;
var defaultGreen = 0;
var defaultBlue = 0;
var defaultColorVariety = 200;
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
function timing(){
	thisTime = Date.now();
	displayTime = thisTime - startTime;
	$('#current-score').text(displayTime);
}
function gameStart(){
	console.log(highScore);
	$('#gameboard').text('');
	startTime = Date.now();
	intervalId = setInterval(function(){
		timing();
	});
	makeBubbles(10);
	//Clicksteners = Click Listeners.
	setCircleClicksteners();

}

