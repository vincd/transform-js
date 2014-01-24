define([
	'underscore',
	'Model',
	'utils/random',
	'utils/window',
	'css/transform',
	'matrix',
	'easing',
	'utils/timer'
], function(_, Model, Random, w, tranformElement, Matrix, Easing, Timer) {
	var PIC_HEIGHT = 170,
		PIC_WIDTH = 125,
		SPACE = 0;

	var xGenerator = function(row, nbRow, xMax, xMin) {
		var offset = (w.width - nbRow * PIC_WIDTH) / (nbRow + 1);
		return 0.5 * (xMax - xMin) * (1 - Math.cos(Math.PI * (row) / (nbRow)));
	}

	var yGenerator = function(line, nbRow) {
		return 10 + parseInt(line) * (PIC_HEIGHT + 10);
	}

	var zGenerator = function(row, nbRow, zMax, zMin) {
		return zMax + (zMin - zMax) * Math.sin(Math.PI * (row) / (nbRow));
	}

	var tetaGenerator = function(row, nbRow) {
		return -0.314 * (row - nbRow * 0.5);	
	}

	var Particule = Model.extend({
		initialize: function(count) {
			var container = document.getElementById('container'),
				item = document.createElement('div'),
				text = document.createElement('div');

			item.className = "surface periodic-item";
			item.style['background-color'] = Random.color();
			text.className = "symbol";
			text.appendChild(document.createTextNode(count));

			item.appendChild(text);
			container.appendChild(item);

			this.set({
				el: item,
				count: count,

				matrix: Matrix.identity,

				position: {
					x: 0,
					y: 0,
					z: 0,
					alpha: 0,
					teta: 0,
					phi: 0			
				}
			});

			// events
			w.on('resize', _.bind(this.setPosition, this));
			item.addEventListener('click', _.bind(this.onclick, this));

			// set the start position
			this.setPosition();

			return this;
		},

		render: function() {	
			return this;
		},

		setPosition: function() {
			var p = this.get('position'),
				row = this.get('count'),
				picPerLine = parseInt(w.width / (PIC_WIDTH + SPACE)),
				space = (w.width - PIC_WIDTH * picPerLine) / (picPerLine + 1);

			var e = {
				duration: 2000,
				fn: (function(that, startX, endX, startY, endY, startZ, endZ, startTeta, endTeta) {
						var el = that.get('el'),
							p = that.get('position');

						return _.bind(function(t) {
							p.x = startX + (endX - startX) * Easing.ease.linear(t);
							p.y = startY + (endY - startY) * Easing.ease.linear(t);
							p.z = startZ + (endZ - startZ) * Easing.ease.linear(t);
							p.teta = startTeta + (endTeta - startTeta) * Easing.ease.linear(t);

							var m = Matrix.multiply(Matrix.rotationY(p.teta), Matrix.translate(p.x, p.y, p.z));

							tranformElement(el, m);
					}, that);
				})(
				this, 
				p.x, xGenerator(row % picPerLine, picPerLine, w.width, 0), 
				p.y, yGenerator(row / picPerLine),
				p.z, zGenerator(row % picPerLine, picPerLine - 1, -100, -550),
				p.teta, tetaGenerator(row % picPerLine, picPerLine - 1))
			};

			Easing.registerEasing(e);
		},

		onclick: function() {
			var p = this.get('position'),
				easing = this.get('easing');

			var e = {
				duration: 3000,
				fn: (function(that, startZ, endZ, startTeta, endTeta) {
						var el = that.get('el'),
							p = that.get('position');

						return _.bind(function(t) {
							if(3 * t < 1) {
								p.z = startZ + (endZ - startZ) * 3 * Easing.ease.linear(t);
							} else if (3 * t > 2){
								p.z = startZ + (endZ - startZ) * 3 * (1 - Easing.ease.linear(t));
							}
							p.teta = startTeta + (endTeta - startTeta) * Easing.ease.easeInOut(t);

							var m = Matrix.multiply(Matrix.rotationY(p.teta), Matrix.translate(p.x, p.y, p.z));

							tranformElement(el, m);
					}, that);
				})(
				this, 
				p.z, -100,
				p.teta, p.teta + 4*Math.PI)
			};

			Easing.registerEasing(e);
		}
	});

	return Particule;
});