define([
	
], function() {
	var x2 = function(x1, y1, x2, y2, t, duration) {
		t = 1.0 * Math.min(t, duration) / duration;

		return {
			x: x1 + (x2 - x1) * t,
			y: y1 + (y2 - y1) * t * t
		}
	};

	var linear = function(x1, y1, x2, y2, t, duration) {
		t = 1.0 * Math.min(t, duration) / duration;

		return {
			x: x1 + (x2-x1) * t,
			y: y1 + (y2-y1) * t
		}
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

	return {
		linear: linear,
		x2: x2,
		ellipse: ellipse,
		circle: circle
	};
});