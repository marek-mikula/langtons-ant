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

let interval;
let frequency = 50;

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
		this.createCanvas();
		setInterval(update, frequency);
	};

	this.createCanvas = function () {
		this.canvas.attr('height', this.height);
		this.canvas.attr('width', this.width);
		this.ctx = this.canvas[0].getContext('2d');

		$(options.wrapperSelector).append(this.canvas);
	};
}

let canvas = new Canvas();

/**
 * Function that runs as interval
 * The main function where all the required parts are called
 */
function update() {
	//
}

canvas.start();