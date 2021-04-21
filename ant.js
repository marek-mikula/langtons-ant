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
	frequency: 5, // in milliseconds
	canvas: {
		height: 250,
		width: 250,
	},
	spot: {
		width: 3,
		height: 3,
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

	getState() {
		return this.#state;
	}

	flipState() {
		this.#state = this.#state === STATE_BLACK ? STATE_WHITE : STATE_BLACK;
	}

	draw() {
		let ctx = canvas.getCtx();
		ctx.fillStyle = this.getBackground();
		ctx.fillRect(
			(this.#x * this.#width),
			(this.#y * this.#height),
			this.#width,
			this.#height
		);
	}

	getBackground() {
		return this.#state === STATE_WHITE ? 'white' : 'black';
	}
}

class Canvas {
	/**
	 * Main canvas
	 */
	#canvas = document.getElementById("ant-canvas");

	#ctx = this.#canvas.getContext('2d');

	#height = (options.canvas.height * options.spot.height);
	#width = (options.canvas.width * options.spot.width);

	/**
	 * Grid of cells
	 * @type {Array}
	 */
	#grid = [];

	#interval = null;

	constructor() {
		this.initGrid()
	}

	/**
	 * @param {Number} height
	 */
	setCanvasHeight(height) {
		this.#canvas.setAttribute('height', height);
	}

	/**
	 * @param {Number} width
	 */
	setCanvasWidth(width) {
		this.#canvas.setAttribute('width', width);
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

	/**
	 * Switches the interval meaning
	 * it either stops or releases the interval
	 */
	switchInterval() {
		if (this.#interval === null) {
			this.startInterval();
		} else {
			this.clearInterval();
		}
	}

	startInterval() {
		this.#interval = setInterval(update, options.frequency);
	}

	clearInterval() {
		clearInterval(this.#interval);
		this.#interval = null;
	}

	start() {
		this.prepareCanvas();
		this.drawGrid();
		this.startInterval();
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

	/**
	 * Draws the grid
	 */
	drawGrid() {
		for (let x = 1; x <= this.#width; x++) {
			for (let y = 1; y <= this.#height; y++) {
				this.getSpot(x, y).draw();
			}
		}
	}

	prepareCanvas() {
		this.setCanvasHeight(this.#height);
		this.setCanvasWidth(this.#width);
	}
}

class Ant {
	#x;
	#y;
	#current;

	#width = options.spot.width;
	#height = options.spot.height;

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

	move() {
		let currentBefore = this.#current;
		let shouldTurnClockwise = currentBefore.getState() === STATE_WHITE;
		this.turn(shouldTurnClockwise);
		currentBefore.flipState();
		this.step();
		this.#current = canvas.getSpot(this.#x, this.#y);
		currentBefore.draw();
	}

	/**
	 * @param {Boolean} clockwise
	 */
	turn(clockwise = true) {
		if (clockwise) {
			this.#direction += 1;
		} else {
			this.#direction -= 1;
		}
		this.checkDirection();
	}

	/**
	 * Checks the direction if we did not spin out
	 * of our bounds meaning that the direction does
	 * not match with any of our constants
	 */
	checkDirection() {
		if (this.#direction > DIRECTION_LEFT) {
			this.#direction = DIRECTION_TOP;
		}
		if (this.#direction < DIRECTION_TOP) {
			this.#direction = DIRECTION_LEFT;
		}
	}

	/**
	 * Do one step further by current direction
	 */
	step() {
		switch (this.#direction) {
			case DIRECTION_TOP:
				this.#y -= 1;
				break;
			case DIRECTION_RIGHT:
				this.#x += 1;
				break;
			case DIRECTION_DOWN:
				this.#y += 1;
				break;
			case DIRECTION_LEFT:
				this.#x -= 1;
				break;
		}
		this.checkStep();
	}

	/**
	 * Checks the step if we didn't go out of
	 * the bounds of the canvas
	 *
	 * Lets the ant disappear on one side and
	 * appear on the other side
	 */
	checkStep() {
		if (this.#y === 0) {
			this.#y = options.canvas.height;
		}
		if (this.#y > options.canvas.height) {
			this.#y = 1;
		}
		if (this.#x === 0) {
			this.#x = options.canvas.width;
		}
		if (this.#x > options.canvas.width) {
			this.#x = 1;
		}
	}

	/**
	 * Draws the ant with red color
	 */
	draw() {
		let ctx = canvas.getCtx();
		ctx.fillStyle = 'red';
		ctx.fillRect(
			(this.#x * this.#width),
			(this.#y * this.#height),
			this.#width,
			this.#height
		);
	}
}

let canvas = new Canvas();

let ant = new Ant(
	helper.randomInt(1, options.canvas.width),
	helper.randomInt(1, options.canvas.height)
);

canvas.start(); // Start the main loop!

/**
 * Function that runs as interval
 * The main function where all the required parts are called
 */
function update() {
	for (let i = 0; i < 50; i++) {
		ant.move();
		ant.draw();
	}
}

/**
 * Set keydown event so user can stop the interval with space
 */
document.addEventListener("keydown", function (event) {
	if (event.which === 32) {
		canvas.switchInterval();
	}
});
