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

/**
 * Main variable for interval
 */
let interval;

let frequency = 50;

let canvas = new Canvas();

/**
 * Function that runs as interval
 * The main function where all the required parts are called
 */
function update() {
	canvas.clear();
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

	this.ctx = null;

	this.start = function () {
		/**
		 * Build the canvas
		 */
		this.createCanvas();
		/**
		 * Start the interval
		 */
		interval = setInterval(update, frequency);
	};

	this.createCanvas = function () {
		this.canvas.attr('height', this.height);
		this.canvas.attr('width', this.width);
		this.ctx = this.canvas[0].getContext('2d');
		/**
		 * Appends the canvas
		 */
		$(options.wrapperSelector).append(this.canvas);
	};

	/**
	 * Draws rectangle all over the whole canvas
	 * Clears all existing cells
	 */
	this.clear = function () {
		this.ctx.fillStyle = "rgb(" + this.background.R + "," + this.background.G + "," + this.background.B + ")";
		this.ctx.fillRect(0, 0, this.width, this.height);
	};
}

canvas.start();