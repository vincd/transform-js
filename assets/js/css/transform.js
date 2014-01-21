define([], function() {
	return function(el, x, y, z, alpha, teta, phi) {
		var cx = Math.cos(alpha), sx = Math.sin(alpha),
			cy = Math.cos(teta), sy = Math.sin(teta),
			cz = Math.cos(phi), sz = Math.sin(phi),

			cxsz = cx * sz, 
			cxcz = cx * cz, 
			sxsz = sx * sz, 
			czsx = cz * sx;

		el.style['-webkit-transform'] = 
			"matrix3d(" + [
				cy * cz, -1 * cy * sz, sy, 0,
				sy * czsx + cxsz, -1 * sy * sxsz + cxcz, -1 * sx * cy, 0,
				-1 * sy * cxcz + sxsz, sy * cxsz + czsx, cx * cy, 0,
				x, y, z, 1
			].join(", ") + ")";
	}
});