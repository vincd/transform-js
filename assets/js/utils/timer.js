define([
	'underscore'
], function(_) {
	var requestAnimationFrame = 
		window.requestAnimationFrame || 
		window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || 
        window.msRequestAnimationFrame ||
        function(callback) { 
        	setTimeout(function() {
	        	callback(+new Date());
	        }, 1000.0 / 60); 
        };

	var frame = function(callback) {
		var _callback = function(timestamp) {
			callback(timestamp);
			requestAnimationFrame(_callback);
		};

		requestAnimationFrame(_callback);
	};

	var nextFrame = function(callback) {
		requestAnimationFrame(callback);
	}

	var registeredCallbacks = [];
	var lastTick = 0;
	var registerNextFrame = function(callback, context) {
		registeredCallbacks.push(function(t) { callback.call(context, t); });
	}

	frame(function(t) {
		lastTick = t;
		var c = registeredCallbacks;
		registeredCallbacks = [];
		
		while(c.length > 0) {
			c.shift()(t);
		}
	});

	var getLastTick = function() {
		return lastTick;
	}

	var timeOut = function(callback, ms) {
		setTimeout(callback, ms);
	}

	return {
		frame: frame,
		nextFrame: nextFrame,
		registerNextFrame: registerNextFrame,
		getLastTick: getLastTick,
		timeOut: timeOut
	};
});