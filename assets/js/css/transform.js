define([], function() {
	return function(el, deltaX, deltaY, deltaZ, tetaX, tetaY, tetaZ) {
		var cx = Math.cos(tetaX), sx = Math.sin(tetaX),
			cy = Math.cos(tetaY), sy = Math.sin(tetaY),
			cz = Math.cos(tetaZ), sz = Math.sin(tetaZ),

			cxsz = cx * sz, 
			cxcz = cx * cz, 
			sxsz = sx * sz, 
			czsx = cz * sx;

		el.style['-webkit-transform'] = 
			"matrix3d(" + [
				cy * cz, -1 * cy * sz, sy, 0,
				sy * czsx + cxsz, -1 * sy * sxsz + cxcz, -1 * sx * cy, 0,
				-1 * sy * cxcz + sxsz, sy * cxsz + czsx, cx * cy, 0,
				deltaX, deltaY, deltaZ, 1
			].join(", ") + ")";
	}
});