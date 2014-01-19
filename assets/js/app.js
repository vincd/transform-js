requirejs.config({
	paths: {
		'underscore': 'vendor/underscore-min',
	},
	config: {
	}
});

require([
	'particule',
	'utils/timer',
	'utils/random'
], function(Particule, Timer, Random) {
	var squares = [];

	for(var i=0, j=5; i<j; i++) {
		Timer.timeOut(function() { 
				new Particule();
			}, Random.number(0, 1000));
	}
});