class Helper {
	randomElementFromArr(array) {
		return array[Math.floor(Math.random() * array.length)];
	}
	randomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

let helper = new Helper();

const options = {
	frequency: 50,
	wrapperSelector: '#ant',
	canvas: {
		height: 250,
		width: 250,
		background: {
			R: 240,
			G: 240,
			B: 240,
		},
	},
	spot: {
		width: 2,
		height: 2,
	}
};

const STATE_WHITE = 1;
const STATE_BLACK = 2;

const DIRECTION_TOP = 0;
const DIRECTION_RIGHT = 1;
const DIRECTION_DOWN = 2;
const DIRECTION_LEFT = 3;

class Spot {
	#x = null;
	#y = null;
	#width = options.spot.width;
	#height = options.spot.height;
	#state = STATE_WHITE;

	constructor(x, y) {
		this.#x = x;
		this.#y = y;
	}
	changeState() {
		this.#state = this.#state === STATE_BLACK ? STATE_WHITE : STATE_BLACK;
	}
	draw() {
		let ctx = canvas.getCtx();
		ctx.fillStyle = this.getBackground();
		ctx.fillRect(this.#x, this.#y, this.#width, this.#height);
	}
	getBackground() {
		return this.#state === STATE_WHITE ? 'white' : 'black';
	}
}

class Canvas {
	/**
	 * Main selector of canvas
	 */
	#canvas = $('<canvas></canvas>');

	#ctx = null;

	#height = (options.canvas.height * options.spot.height);
	#width = (options.canvas.width * options.spot.width);

	/**
	 * Grid of cells
	 * @type {Array}
	 */
	#grid = [];

	constructor() {
		this.initGrid()
	}
	/**
	 * @param {Number} height
	 */
	setCanvasHeight(height) {
		this.#canvas.attr('height', height);
	}
	/**
	 * @param {Number} width
	 */
	setCanvasWidth(width) {
		this.#canvas.attr('width', width);
	}
	/**
	 * @param {Number} x
	 * @param {Number} y
	 * @returns Spot
	 */
	getSpot(x, y) {
		return this.#grid[x][y];
	}
	/**
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Spot} spot
	 */
	setSpot(x, y, spot) {
		this.#grid[x][y] = spot;
	}
	getCtx() {
		return this.#ctx;
	}
	setCtx(ctx) {
		this.#ctx = ctx;
	}
	start() {
		this.createCanvas();
		this.drawGrid();
		// setInterval(update, options.frequency);
	};
	/**
	 * Fills the grid with spots
	 */
	initGrid() {
		for (let x = 1; x <= this.#width; x++) {
			this.#grid[x] = [];
			for (let y = 1; y <= this.#height; y++) {
				this.setSpot(x, y, new Spot(x, y))
			}
		}
	}
	drawGrid() {
		for (let x = 1; x <= this.#width; x++) {
			for (let y = 1; y <= this.#height; y++) {
				this.getSpot(x,y).draw();
			}
		}
	}
	createCanvas() {
		this.setCanvasHeight(this.#height);
		this.setCanvasWidth(this.#width);
		this.setCtx(this.#canvas[0].getContext('2d'));
		$(options.wrapperSelector).append(this.#canvas);
	}
}

class Ant {
	#x;
	#y;
	#current;
	#direction = helper.randomElementFromArr([
		DIRECTION_TOP,
		DIRECTION_RIGHT,
		DIRECTION_DOWN,
		DIRECTION_LEFT
	]);

	/**
	 * @param {Number} x
	 * @param {Number} y
	 */
	constructor(x, y) {
		this.#x = x;
		this.#y = y;
		this.#current = canvas.getSpot(x, y);
	}
	checkDirection() {
		if (this.#direction > DIRECTION_LEFT) {
			this.#direction = DIRECTION_TOP;
		}
		if (this.#direction < DIRECTION_TOP) {
			this.#direction = DIRECTION_LEFT;
		}
	}
	checkStep() {
		if (this.#y < 0) {
			this.#y = options.canvas.height;
		}
		if (this.#y > options.canvas.height) {
			this.#y = 0;
		}
		if (this.#x < 0) {
			this.#x = options.canvas.width;
		}
		if (this.#x > options.canvas.width) {
			this.#x = 0;
		}
	}
	draw() {
		let ctx = canvas.getCtx();
		ctx.fillStyle = 'red';
		ctx.fillRect(this.#x, this.#y, options.spot.width, options.spot.height);
	}
}

let canvas = new Canvas();

let ant = new Ant(
	helper.randomInt(0, options.canvas.width),
	helper.randomInt(0, options.canvas.height)
);

canvas.start();
ant.draw();

/**
 * Function that runs as interval
 * The main function where all the required parts are called
 */
function update() {

}