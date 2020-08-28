const options = {
	wrapperSelector: '#ant',
	canvas: {
		height: 800,
		width: 800,
		background: {
			R: 240,
			G: 240,
			B: 240,
		},
	},
};

let frequency = 50;

const STATE_WHITE = 0;
const STATE_BLACK = 1;

const DIR_UP = 1;
const DIR_RIGHT = 2;
const DIR_DOWN = 3;
const DIR_LEFT = 4;

function Cell(x, y) {
	this.x = x;
	this.y = y;
	this.state = STATE_WHITE;
	this.changeState = function(state) {
		this.state = state;
	}
}

/**
 * @constructor
 */
function Canvas() {
	/**
	 * Main selector of canvas
	 */
	this.canvas = $('<canvas></canvas>');

	this.background = {
		R: options.canvas.background.R,
		G: options.canvas.background.G,
		B: options.canvas.background.B,
	};

	this.height = options.canvas.height;
	this.width = options.canvas.width;

	/**
	 * Grid of cells
	 * @type {*[]}
	 */
	this.grid = [];

	this.ctx = null;

	this.start = function () {
		this.createCanvas();
		this.initGrid();
		setInterval(update, frequency);
	};

	this.createCanvas = function () {
		this.canvas.attr('height', this.height);
		this.canvas.attr('width', this.width);
		this.ctx = this.canvas[0].getContext('2d');

		$(options.wrapperSelector).append(this.canvas);
	};

	this.initGrid = function () {
		for (let x = 1; x <= this.width; x++) {
			this.grid[x] = [];

			for (let y = 1; y <= this.height; y++) {
				this.grid[x][y] = new Cell(x, y);
			}
		}
	}

	this.changeCellState = function(x,y, state) {
		this.grid[x][y].changeState(state);
	}
}

function Ant() {
	this.x = randomInt(1, canvas.width); // start on random place of X
	this.y = randomInt(1, canvas.height); // start on random place of Y

	this.direction = randomElementFromArr([
		DIR_UP,
		DIR_RIGHT,
		DIR_DOWN,
		DIR_LEFT
	]);

	this.move = function() {

	}
}

let canvas = new Canvas();
let ant = new Ant();

canvas.start();

/**
 * Generates a new random integer
 * @param min
 * @param max
 * @returns {*}
 */
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Gets random element from array
 * @param array
 * @returns {*}
 */
function randomElementFromArr(array)
{
	return array[Math.floor(Math.random() * array.length)];
}

/**
 * Function that runs as interval
 * The main function where all the required parts are called
 */
function update() {
	ant.move();
}