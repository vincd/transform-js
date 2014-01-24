define([
	'utils/timer'
], function(Timer) {
	var linear = function(t) {
		return t;
	}

	var easeInOut = function (t) {
        return 0.5 >= t ? 2 * t * t : -2 * t * t + 4 * t - 1;
    }

	var ellipse = function(cx, cy, a, b, t, duration) {
		t = 1.0 * Math.min(t, duration) / duration;

		return {
			x: cx + a * Math.cos(2 * Math.PI * t),
			y: cy + b * Math.sin(2 * Math.PI * t)
		}
	}

	var circle = function(cx, cy, r, t, duration) {
		return ellipse(cx, cy, r, r, t, duration);
	}

	var registeredEasing = [];
	var lastTick = 0;

	var registerEasing = function(e) {
		if(!!e.fn) {
			e.start = lastTick;
			e.duration || (e.duration || 1000);

			registeredEasing.push(e);			
		}
	}

	Timer.frame(function(timestamp) {
		lastTick = timestamp;
		var temp = registeredEasing;
		registeredEasing = [];

		for(var i=0, j=temp.length; i<j; i++) {
			var e = temp[i],
				t = Math.min(timestamp - e.start, e.duration) / e.duration;

			e.fn(t);
			if(t < 1) registeredEasing.push(e);
		}
	});

	return {
		registerEasing: registerEasing,
		ease: {
			linear: linear,
			easeInOut: easeInOut,
			ellipse: ellipse,
			circle: circle
		}
	};
});