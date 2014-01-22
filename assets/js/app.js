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
	var NUMBER_PARTICULE = 30;

	for(var i=0; i < NUMBER_PARTICULE; i++) {
		new Particule();
	}
});