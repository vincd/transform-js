define([
	'matrix'
], function(Matrix) {
	return function(el, m) {
		el.style['-webkit-transform'] = Matrix.toMatrix3d(m);
	}
});