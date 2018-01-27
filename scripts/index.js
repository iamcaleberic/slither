"use strict";
// basic html selector
var canvas = document.querySelector("#canvas"),
			ctx = canvas.getContext('2d'), // get context in 2D get 3D using webGL and the likes
			BOARD_SIZE =  25

canvas.width =  window.innerWidth - 20
canvas.height = window.innerHeight - 20
ctx.font = "15px roboto"

var cw = canvas.width / BOARD_SIZE,
		ch = canvas.height/ BOARD_SIZE


var snake, food , score , high_score = 0


function random(min , max){
	return Math.floor(Math.random() * (max - min) + min)
}


function reset(){
	score = 0

	snake = {
		direction: 'right',
		body: [

			{x: 3 , y: 0},
			{x: 2 , y: 0},
			{x: 1 , y: 0},
			{x: 0 , y: 0}
		]
	}

	food = {
		x: random(0, BOARD_SIZE),
		y: random(0, BOARD_SIZE),
	}
}

function tick(){
	snake.head = {
		x: snake.body[0].x,
		y: snake.body[0].y
	}


	if (snake.direction ==  "right")  snake.head.x++
	else if (snake.direction ==  "left")  snake.head.x--
	else if (snake.direction ==  "down")  snake.head.y++
	else if (snake.direction ==  "up")  snake.head.y--


	// food check

	if (snake.head.x == food.x && snake.head.y == food.y){
		score++

		if(score > high_score) high_score = score

		food = {
			x: random(0 , BOARD_SIZE),
			y: random(0, BOARD_SIZE),
		}
	} else {
		snake.body.pop()
	}

	// if nigga collided

	if (collision()){
		reset()
	} else {
		snake.body.unshift(snake.head)
	}

	render()
	setTimeout(tick , 100 - score * 5)
}

function collision() {
	return(
		snake.head.x < 0 ||
		snake.head.x >= BOARD_SIZE ||
		snake.head.y < 0 ||
		snake.head.y >= BOARD_SIZE ||
		snake.body.some(function (cell) {
			return(cell.x ==  snake.head.x && cell.y == snake.head.y)
		})

		)
}

function render() {
	ctx.fillStyle = "black"
	ctx.fillRect(0, 0 , canvas.width , canvas.height)

	snake.body.forEach(function(cell){
		paint_cell(cell, 'blue')
	})

	paint_cell(food, "red")

	ctx.fillStyle = "white"
	ctx.fillText("Score: " + score , 10, 20)
	ctx.fillText("High Score: " + high_score, 10, 45 )
}

function paint_cell(cell ,color){
	ctx.fillStyle = color
	ctx.fillRect(cell.x * cw , cell.y * ch ,cw ,ch)
	ctx.strokeStyle = "white"
	ctx.strokeRect( cell.x * cw , cell.y * ch , cw, ch)
}

document.addEventListener('keydown' , function (e) {
	if (e.key == "ArrowLeft") snake.direction = "left"
	else if (e.key == "ArrowUp") snake.direction = "up"
	else if (e.key == "ArrowRight") snake.direction = "right"
	else if (e.key == "ArrowDown") snake.direction = "down"

})

reset()
tick()
