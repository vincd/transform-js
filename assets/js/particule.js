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
		PIC_WIDTH = 125;

	var count = 0;

	var zGenerator = function(nbRow, zMax, zMin) {
		var a = Math.PI / (nbRow + 5);

		return function(x) {
			return zMax + (zMin - zMax) * Math.sin(a * (x + 2.5));
		}
	}

	var xGenerator = function(nbRow, xMax, xMin) {
		var a = Math.PI / (nbRow + 5);

		return function(x) {
			var d = Math.cos(a * (x + 2.5));
			d = -0.5 * d + 0.5;

			return (xMax - xMin) * d;
		}
	}

	var tetaGenerator = function(nbRow) {
		return function(x) {
			return -0.21 * (x - nbRow * 0.5);			
		}
	}

	var z = zGenerator(9, 0, -550);
	var x = xGenerator(9, w.width, 0);
	var teta = tetaGenerator(9);

	var Particule = Model.extend({
		initialize: function() {
			var container = document.getElementById('container');
			var item = document.createElement('div');
			var text = document.createElement('div');
			var c = count++;
			var picPerLine = parseInt(w.width / PIC_WIDTH),
				space = (w.width - PIC_WIDTH * picPerLine) / (picPerLine + 1),
				row = c % picPerLine;

			item.className = "surface periodic-item";
			item.style['background-color'] = Random.color();
			text.className = "symbol";
			text.appendChild(document.createTextNode(c));

			item.appendChild(text);
			container.appendChild(item);

			this.set({
				el: item,
				count: c,

				position: {
					x: 0,
					y: 0,
					z: 0,
					alpha: 0,
					teta: 0,
					phi: 0			
				},
				easing: {
					start: 0,
					duration: 2000,
					finish: false,
					
					startX: 0,
					startY: 0,
					startZ: 0,
					startTeta: 0,
					
					endX: x(row),
					endY: 10 + parseInt(c / picPerLine) * (PIC_HEIGHT + 10),
					endZ: z(row),
					endTeta: teta(row)
				}
			});

			w.on('resize', _.bind(this.onresize, this));
			item.addEventListener('click', _.bind(this.onclick, this));

			return this;
		},

		render: function(t) {	
			var p = this.get('position'),
				force = !this.easing(t, p, this.get('easing'));

			var m = Matrix.multiply(Matrix.rotationY(p.teta), Matrix.translate(p.x, p.y, p.z));

			tranformElement(this.get('el'), m);

			this.set('_previousTick', t, {
				forceInvalidate: force
			});

			return this;
		},

		easing: function(t, p, easing) {
			t = 1.0 * Math.min(t - easing.start, easing.duration) / easing.duration,

			p.x = Easing.linear(easing.startX, easing.endX, t);
			p.y = Easing.linear(easing.startY, easing.endY, t);
			p.z = Easing.linear(easing.startZ, easing.endZ, t);
			p.teta = Easing.linear(easing.startTeta, easing.endTeta, t);

			if(p.x == easing.endX) easing.startX = p.x;
			if(p.y == easing.endY) easing.startY = p.y;
			if(p.z == easing.endZ) easing.startZ = p.z;
			if(p.teta == easing.endTeta) easing.startTeta = p.teta;

			easing.finish = t == 1;

			return easing.finish;
		},

		onresize: function(width, height) {
			var p = this.get('position'),
				easing = this.get('easing'),
				picPerLine = parseInt(width / PIC_WIDTH),
				space = (width - PIC_WIDTH * picPerLine) / (picPerLine + 1),
				count = this.get('count'),
				zFn = zGenerator(picPerLine-1, 0, -520),
				xFn = xGenerator(picPerLine-1, width, 0),
				tetaFn = tetaGenerator(picPerLine-1);

			easing.duration = 1000;
			easing.start = Timer.getLastTick();
			easing.finish = false;

			easing.startX = p.x;
			easing.startY = p.y;
			easing.startZ = p.z;
			easing.startTeta = p.teta;

			easing.endX = xFn(count % picPerLine);
			easing.endY = 10 + parseInt(count / picPerLine) * (PIC_HEIGHT + 10);
			easing.endZ = zFn(count % picPerLine);
			easing.endTeta = tetaFn(count % picPerLine);

			this.invalidate();

			return this;
		},

		onclick: function() {
			var p = this.get('position'),
				easing = this.get('easing');

			easing.startTeta = p.teta;
			easing.endTeta = p.teta + 2 * Math.PI;
			easing.start = Timer.getLastTick();
			easing.duration = 2000;
			easing.finish = false;

			this.invalidate();
		}
	});

	return Particule;
});