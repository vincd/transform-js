define([
	'underscore',
	'Events'
], function(_, Events) {
	var w = {
		height: window.innerHeight,
		width: window.innerWidth
	}

	var onResize = function() {
		w.height = window.innerHeight;
		w.width = window.innerWidth;

		w.trigger('resize', w.width, w.height);
	};

	window.onresize = onResize;

	_.extend(w, Events);

	return w;
});