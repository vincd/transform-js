define([], function() {
	//Math.random() : Return a random number between 0 (inclusive) and 1 (exclusive):

	/**
	 * Return a RGB hex value color (#ABCDEF)
	 */
	var randomColor = function() {
		return "#" + Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1);
	};

	/**
	 * Return a random number between min (inclusive) and max (exclusive)
	 *
	 * random() -> (0, 1)
	 * random(a) -> [|0, a[|
	 * random(a, b) -> [|a, b[|
	 */
	var randomInteger = function(min, max) {
		if(!min && !max) {
			min = 0;
			max = 2;
		} else if(!max) {
			max = min;
			min = 0;
		}

		return min + parseInt((max-min) * Math.random());
	};

	return {
		number: randomInteger,
		color: randomColor
	};
})