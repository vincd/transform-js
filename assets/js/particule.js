define([
	'underscore',
	'Model',
	'utils/random',
	'css/transform',
	'easing'
], function(_, Model, Random, tranformElement, Easing) {
	var PIC_HEIGHT = 90,
		PIC_WIDTH = 60,
		HEIGHT = 400, WIDTH = 1000,
		TWO_PI = 2 * Math.PI;

	var Particule = Model.extend({
		initialize: function() {
			var container = document.getElementById('container');
	    	var s = document.createElement('div');

			s.style.height = PIC_HEIGHT + "px";
			s.style.width = PIC_WIDTH + "px";
			s.style.position = "fixed";
			s.style['background-color'] = Random.color();

			container.appendChild(s);

			this.set({
				x: Random.number(WIDTH),
				y: Random.number(HEIGHT),
				deltaZ: 0,

				tetaX: 0,
				speedX: Random.number(-10, 10) / 100.0,
				tetaY: 0,
				speedY: Random.number(-10, 10) / 100.0,
				tetaZ: 0,
				speedZ: Random.number(-10, 10) / 100.0,

				easingDuration: 0,
				easingStart: 0,

				el: s,
			});

			this.set('endX', this.get('x'));
			this.set('endY', this.get('y'));

			return this;
	    },

	    render: function(timestamp) {
			var dx = this.get('x'),
				dy = this.get('y'),
				tetaX = this.get('tetaX'),
				tetaY = this.get('tetaY'),
				tetaZ = this.get('tetaZ'),

				startX = this.get('startX'),
				startY = this.get('startY'),
				endX = this.get('endX'),
				endY = this.get('endY'),

				easingDuration = this.get('easingDuration'),
				easingStart = this.get('easingStart'),

				tick = this.get('_previousTick') || 0,
				speed = (tick - (timestamp || tick)) / 100.0;

			if(timestamp > easingStart + easingDuration) {
				startX = endX;
				startY = endY;
				endX = Random.number(0, WIDTH);
				endY = Random.number(0, HEIGHT);
				easingStart = timestamp;
				easingDuration = Random.number(2000, 5000);
			}

			var delta = Easing.ellipse(
				WIDTH / 2 - PIC_WIDTH / 2, 
				HEIGHT / 2 - PIC_HEIGHT / 2, 
				WIDTH / 2 - PIC_WIDTH / 2 - 10, 
				HEIGHT / 2 - PIC_HEIGHT / 2 - 10, 
				timestamp - easingStart, 
				easingDuration
			);
			dx = delta.x;
			dy = delta.y;

			tetaX += this.get('speedX') * speed;
			tetaY += this.get('speedY') * speed;
			tetaZ += this.get('speedZ') * speed;	

			if(tetaX > TWO_PI) tetaX -= TWO_PI;
			if(tetaY > TWO_PI) tetaY -= TWO_PI;
			if(tetaZ > TWO_PI) tetaZ -= TWO_PI;

			this.set({
				'_previousTick': timestamp || tick,

				'x': dx,
				'y': dy,

				'tetaX': tetaX,
				'tetaY': tetaY,
				'tetaZ': tetaZ,

				'easingStart': easingStart,
				'easingDuration': easingDuration,
				'easingStartX': startX,
				'easingStartY': startY,
				'easingEndX': endX,
				'easingEndY': endY
			});

			tranformElement(this.get('el'), dx, dy, 0, tetaX, tetaY, tetaZ);

			this.invalidate();

			return this;
	    }
	});

    return Particule;
});