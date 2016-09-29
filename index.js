"use strict";

var canvas = document.querySelector("#canvas");
	var ctx = canvas.getContext('2d');
	BOARD_SIZE =  25

	canvas.width =  window.innerWidth - 20
	canvas.height = window.innerHeight - 20
	ctx.font = "20px veranda"

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


		if (snake,direction ==  "right")  snake.head.x++
		else if (snake,direction ==  "left")  snake.head.x--
		else if (snake,direction ==  "down")  snake.head.y++
		else if (snake,direction ==  "up")  snake.head.y--


		// food check

		if (snake.head.x == food.x && snake.head.y == food.y){
			score++

			if(score > high_score) high_score = score

			food = {
				x: random(0 , BOARD_SIZE),
				y: random(0, BOARD_SIZE),
			}
		}else{
			snake.body.pop()
		}

		// if nigga collided

		if (collision()){
			reset()
		}else{
			snake.body.unshift(snake.head)
		}

		render()
		setTimeout(tick , 100 - score * 5)
	}