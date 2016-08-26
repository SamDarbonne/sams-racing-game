// push me, and then just touch me, till i can get my satisfaction

// on ddoc ready 
// $('.circles').on(click calll){
//	this.remove
//}

// $( document ).ready(function() {
//     $('.circles').on('click', function(){
//     	this.parentNode.removeChild(this);
//     })
// })
function removal(){
	console.log('removing!')
}

function countCircles(){
	if(document.getElementById('gameboard').childNodes.length === 0){
		console.log('good job you killed all the bubbles!')
	}
}
var randomr = 10;
var gameboardsize;
var gameboard = document.getElementById('gameboard');

randomColorValue = function(){
	return (Math.round(Math.random() * 254));
}

randomx = function(){
	return (Math.round(Math.random() * 460) + 30);
}

randomy = function(){
	return (Math.round(Math.random() * 460) + 30);
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
		gameboard.appendChild(circle);
	}
	// this.remove = function(){
	// 	console.log(this)
	// 	// this.parentNode.removeChild(this);
	// }
}

function makeBubbles(num){
	var bubbleList = new Array;
	for (var i = 0; i < (num + 1); i++){
		bubbleList[i] = new Bubble(i * 2 + 10);
		bubbleList[i].place();
		// bubbleList[i].setAttribute('id', i);
		// // thisbubble = bubbleList[i];
		// document.getElementById(i).on('click', bubbleList[i].remove());
	}
	console.log(bubbleList)
}

makeBubbles(10);
circleList = document.getElementById('gameboard').childNodes;
for (var i = 0; i < circleList.length; i++){
	circleList[i].addEventListener('click', function(){
		this.parentNode.removeChild(this);
		countCircles();
	})
}
