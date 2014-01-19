define([
	'underscore'
], function(_) {
	var requestAnimationFrame = 
		window.requestAnimationFrame || 
		window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || 
        window.msRequestAnimationFrame ||
        function(callback) { 
       		var _callback = function() {
	        	callback(+new Date());
	        };

        	setTimeout(_callback, 50); 
        };

	var frame = function(callback) {
		var _start,
			_callback = function(timestamp) {
				if(!_start) _start = timestamp;

				callback(timestamp - _start);
				requestAnimationFrame(_callback);
			};

		requestAnimationFrame(_callback);
	};

	var nextFrame = function(callback) {
		requestAnimationFrame(callback);
	}

	var registeredCallbacks = [];
	var registerNextFrame = function(callback, context) {
		registeredCallbacks.push(function(t) { callback.call(context, t); });
	}

	frame(function(t) {
		var c = registeredCallbacks;
		registeredCallbacks = [];
		
		while(c.length > 0) {
			c.shift()(t);
		}
	});

	var timeOut = function(callback, ms) {
		setTimeout(callback, ms);
	}

	return {
		frame: frame,
		nextFrame: nextFrame,
		registerNextFrame: registerNextFrame,
		timeOut: timeOut
	};
});