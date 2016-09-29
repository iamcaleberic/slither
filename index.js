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