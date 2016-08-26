# sams-racing-game
<a href="https://github.com/sf-wdi-31/oop-game-training">Original Github Repository</a>

   The more open ended and abstract projects like this are always more difficult for me. I feel like this is very incomplete because it's often hard for me to envision every step I will need to take when designing code. I'm sure there are twice as many methods and thrice as many properties that i would actually end up using while writing this game. I'm really excited that I just got to use the word thrice. There's no word for four times. I think it would be fun to use handlebars and SVG code for all the objects on screen. 

## User Stories

1. A user can see their car and obstacles on the screen
2. A user can control their car's movement on the screen along the track
3. A user can not control their car's movement past the bounds of the track
4. If a user makes it to the end of the track their lap total is incremented
5. if a user makes it to the predetermined lap total, they win

## Data Structures

Objects: Game, Racetrack, Player, Car, Cone, finishLine, scoreboard

####Game:
    methods: reset(), addPlayer(), setScore(), addTrack(), reset()
    properties: playerScore, winCount, raceTime, scoreboard

####Racetrack:
	methods: placeCone(), placeCar(), reset()
	properties: trackNum, cones, cars

####Car:
	properties: speed, direction, position(x, y), color, acceleration, size, image
	methods: accelerate(), brake(), turnLeft(), turnRight()

####Cone:
	properties: position, color, density
	methods: hitCar(), fallDown()

####finishLine:
	properties: position, orientation, length, color

####player: 
	properties: winCount, playerName, 