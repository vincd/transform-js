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
	var NUMBER_PARTICULE = 30;

	for(var i=0; i < NUMBER_PARTICULE; i++) {
		//Timer.timeOut(function() { 
				new Particule();
		//	}, Random.number(0, 1000));
	}
});