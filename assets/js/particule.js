define([
	'underscore',
	'Model',
	'utils/random',
	'utils/window',
	'css/transform',
	'easing'
], function(_, Model, Random, w, tranformElement, Easing) {
	var PIC_HEIGHT = 170,
		PIC_WIDTH = 125,
		HEIGHT = w.height, 
		WIDTH = w.width,
		PIC_PER_LINE = parseInt(WIDTH / PIC_WIDTH),
		SPACE = (WIDTH - PIC_WIDTH * PIC_PER_LINE) / (PIC_PER_LINE + 1),
		TWO_PI = 2 * Math.PI;

	var count = 0;

	var Particule = Model.extend({
		initialize: function() {
			var container = document.getElementById('container');
	    	var item = document.createElement('div');
	    	var text = document.createElement('div');
	    	var c = count++;

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
					x: Random.number(WIDTH),
					y: Random.number(HEIGHT),
					z: 0,
					alpha: 0,
					teta: 0,
					phi: 0			
				},
				easing: {
					start: 0,
					duration: 5000,
					startX: SPACE,
					startY: 10,
					endX: SPACE + (c % PIC_PER_LINE) * (PIC_WIDTH + SPACE), 
					endY: 10 + parseInt(c / PIC_PER_LINE) * (PIC_HEIGHT + 10)
				}
			});

			w.on('resize', _.bind(this.onresize, this));

			return this;
	    },

	    render: function(t) {	
	    	var p = this.get('position'),
	    		force = this.easing(t, p, this.get('easing'));

			tranformElement(
				this.get('el'), 
				p.x, p.y, p.z, 
				p.alpha, p.teta, p.phi
			);

			this.set('_previousTick', t, {
				forceInvalidate: force
			});

			return this;
	    },

	    easing: function(t, p, easing) {
	    	var count = this.get('count'),
	    		delta = Easing.linear(
	    			easing.startX,
	    			easing.startY,
	    			easing.endX,
	    			easing.endY,
	    			t - easing.start,
	    			easing.duration
	    		);

	    	p.x = delta.x;
	    	p.y = delta.y;

			/*
	    	p.alpha += 1 * speed;
			p.teta += 1 * speed;
			p.phi += 1 * speed;	
	
			if(p.alpha > TWO_PI) p.alpha -= TWO_PI;
			if(p.teta > TWO_PI) p.teta -= TWO_PI;
			if(p.phi > TWO_PI) p.phi -= TWO_PI;
			*/

			return t < easing.start + easing.duration;
	    },

	    onresize: function(width, height) {
	    	var p = this.get('position'),
	    		easing = this.get('easing'),
	    		picPerLine = parseInt(width / PIC_WIDTH),
	    		space = (width - PIC_WIDTH * picPerLine) / (picPerLine + 1),
	    		count = this.get('count');

	    	easing.start = this.get('_previousTick');
	    	easing.duration = 5000;
			easing.startX = p.x;
			easing.startY = p.y;
			easing.endX = space + (count % picPerLine) * (PIC_WIDTH + space);
			easing.endY = 10 + parseInt(count / picPerLine) * (PIC_HEIGHT + 10);

			this.invalidate();
    	}
	});

    return Particule;
});