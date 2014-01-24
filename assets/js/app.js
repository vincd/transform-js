requirejs.config({
	paths: {
		'underscore': 'vendor/underscore-min',
	},
	config: {
	}
});

require([
	'particule',
], function(Particule, Timer, Random) {
	var NUMBER_PARTICULE = 30,
		i=0;

	while(i < NUMBER_PARTICULE) {
		new Particule(i++);
	}
});