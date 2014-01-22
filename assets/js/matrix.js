define([
	
], function() {
	var matrix = {
        precision: 1E-6,
        identity: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        multiply2: function multiply2(a, b) {
            var m = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            m[0] = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
            m[1] = a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13];
            m[2] = a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14];
            m[3] = a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15];
            m[4] = a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12];
            m[5] = a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13];
            m[6] = a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14];
            m[7] = a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15];
            m[8] = a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12];
            m[9] = a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13];
            m[10] = a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14];
            m[11] = a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15];
            m[12] = a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12];
            m[13] = a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13];
            m[14] = a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14];
            m[15] = a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15];
            
            return 2 >= arguments.length ? m : multiply2.apply(null, [m].concat(Array.prototype.slice.call(arguments, 2)));
        },
        multiply: function multiply(a, b) {
            var m = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];

            m[0] = a[0] * b[0] + a[1] * b[4] + a[2] * b[8];
            m[1] = a[0] * b[1] + a[1] * b[5] + a[2] * b[9];
            m[2] = a[0] * b[2] + a[1] * b[6] + a[2] * b[10];
            m[4] = a[4] * b[0] + a[5] * b[4] + a[6] * b[8];
            m[5] = a[4] * b[1] + a[5] * b[5] + a[6] * b[9];
            m[6] = a[4] * b[2] + a[5] * b[6] + a[6] * b[10];
            m[8] = a[8] * b[0] + a[9] * b[4] + a[10] * b[8];
            m[9] = a[8] * b[1] + a[9] * b[5] + a[10] * b[9];
            m[10] = a[8] * b[2] + a[9] * b[6] + a[10] * b[10];
            m[12] = a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + b[12];
            m[13] = a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + b[13];
            m[14] = a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + b[14];
            
            return 2 >= arguments.length ? m : multiply.apply(null, [m].concat(Array.prototype.slice.call(arguments, 2)));
        },
        move: function(a, b) {
            b[2] || (b[2] = 0);

            return [
            	a[0], a[1], a[2], 0, 
            	a[4], a[5], a[6], 0, 
            	a[8], a[9], a[10], 0, 
            	a[12] + b[0], a[13] + b[1], a[14] + b[2], 1
            ];
        },
        translate: function(x, y, z) {
            if("number" != typeof z) z = 0;
            
            return [
            	1, 0, 0, 0, 
            	0, 1, 0, 0, 
            	0, 0, 1, 0, 
            	x, y, z, 1
            ];
        },
        scale: function(a, b, c) {
            if("number" != typeof c) c = 1;

            return [
            	a, 0, 0, 0, 
            	0, b, 0, 0, 
            	0, 0, c, 0, 
            	0, 0, 0, 1
           	];
        },
        ratationX: function(x) {
            var c = Math.cos(x),
                s = Math.sin(x);
            
            return [
            	1, 0, 0, 0, 
            	0, c, s, 0, 
            	0,-s, c, 0, 
            	0, 0, 0, 1
            ];
        },
        rotationY: function(y) {
            var c = Math.cos(y),
                s = Math.sin(y);
            
            return [
            	c, 0,-s, 0, 
            	0, 1, 0, 0, 
            	s, 0, c, 0, 
            	0, 0, 0, 1
            ];
        },
        rotationZ: function (z) {
            var c = Math.cos(z),
                s = Math.sin(z);
            
            return [
            	c, s, 0, 0, 
               -s, c, 0, 0, 
                0, 0, 1, 0, 
                0, 0, 0, 1
            ];
        },
        rotate: function (x, y, z) {
            var cx = Math.cos(x),
                sx = Math.sin(x),
                cy = Math.cos(y),
                sy = Math.sin(y),
                cz = Math.cos(z),
                sz = Math.sin(z),
                r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
            
            r[0] = cy * f;
            r[1] = cx * sz + sx * sy * f;
            r[2] = sx * sz - cx * sy * f;
            r[4] = -cy * d;
            r[5] = cx * cz - sx * sy * d;
            r[6] = sx * cz + cx * sy * d;
            r[8] = b;
            r[9] = -sx * c;
            r[10] = cx * c;
            
            return r;
        },
        toMatrix3d: function (m) {
            for (var i=0, j=m.length; i<j; i++) {
            	if(Math.abs(m[i]) < matrix.precision) m[i] = 0;
            }

            return "matrix3d(" + m.join() + ")";
        },
        skew: function (x, y, z) {
            return [
            	1, 0, 0, 0, 
            	Math.tan(z), 1, 0, 0, 
            	Math.tan(y), Math.tan(x), 1, 0, 
            	0, 0, 0, 1
            ];
        },
        translateVector: function (a) {
            return [a[12], a[13], a[14]];
        },
        inverse: function (m) {
            var inv = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                bloc1 = m[5] * m[10] - m[6] * m[9],
                bloc2 = m[4] * m[10] - m[6] * m[8],
                bloc3 = m[4] * m[9] - m[5] * m[8],
                bloc4 = m[1] * m[10] - m[2] * m[9],
                bloc5 = m[0] * m[10] - m[2] * m[8],
                bloc6 = m[0] * m[9] - m[1] * m[8],
                bloc7 = m[1] * m[6] - m[2] * m[5],
                bloc8 = m[0] * m[6] - m[2] * m[4],
                bloc9 = m[0] * m[5] - m[1] * m[4],
                det = 1 / (m[0] * bloc1 - m[1] * bloc2 + m[2] * bloc3);
            
            inv[0] = det * bloc1;
            inv[1] = -det * bloc4;
            inv[2] = det * y;
            inv[4] = -det * bloc2;
            inv[5] = det * bloc5;
            inv[6] = -det * bloc8;
            inv[8] = det * bloc3;
            inv[9] = -det * bloc6;
            inv[10] = det * bloc9;
            inv[12] = -m[12] * inv[0] - m[13] * inv[4] - m[14] * inv[8];
            inv[13] = -m[12] * inv[1] - m[13] * inv[5] - m[14] * inv[9];
            inv[14] = -m[12] * inv[2] - m[13] * inv[6] - m[14] * inv[10];
            
            return inv;
        },
        decompose: function (a) {
            function ps(v) {
                return 2 == v.length ? v[0] * v[0] + v[1] * v[1] : v[0] * v[0] + v[1] * v[1] + v[2] * v[2]
            }
            var d = [a[0], a[1], a[2]],
                g = [d[0] + (0 > d[0] ? -1 : 1) * Math.sqrt(ps(d)), d[1], d[2]],
                c = 2 / ps(g),
                d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
            d[0] = 1 - c * g[0] * g[0];
            d[5] = 1 - c * g[1] * g[1];
            d[10] = 1 - c * g[2] * g[2];
            d[1] = -c * g[0] * g[1];
            d[2] = -c * g[0] * g[2];
            d[6] = -c * g[1] * g[2];
            d[4] = d[1];
            d[8] = d[2];
            d[9] = d[6];
            var g = matrix.multiply(a, d),
                g = [g[5], g[6]],
                g = [g[0] + (0 > g[0] ? -1 : 1) * Math.sqrt(ps(g)), g[1]],
                c = 2 / ps(g),
                q = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
            q[5] = 1 - c * g[0] * g[0];
            q[10] = 1 - c * g[1] * g[1];
            q[6] = -c * g[0] * g[1];
            q[9] = q[6];
            
            d = matrix.multiply(d, q);
            g = matrix.multiply(a, d);
            c = matrix.scale(0 > g[0] ? -1 : 1, 0 > g[5] ? -1 : 1, 0 > g[10] ? -1 : 1);
            g = matrix.multiply(c, g);
            d = matrix.multiply(d, c);
            
            c = {};
            c.translate = matrix.translateVector(a);
            c.rotate = [Math.atan2(-d[6], d[10]), Math.asin(d[2]), Math.atan2(-d[1], d[0])];
            c.rotate[0] || (c.rotate[0] = 0, c.rotate[2] = Math.atan2(d[4], d[5]));
            c.scale = [g[0], g[5], g[10]];
            c.skew = [Math.atan(g[9] / c.scale[2]), Math.atan(g[8] / c.scale[2]), Math.atan(g[4] / c.scale[0])];
            
            return c;
        },
        compose: function (a) {
            var scaleMatrix = matrix.scale(a.scale[0], a.scale[1], a.scale[2]),
                skewMatrix = matrix.skew(a.skew[0], a.skew[1], a.skew[2]),
                ratationMatrix = matrix.rotate(a.rotate[0], a.rotate[1], a.rotate[2]);
            return matrix.move(matrix.multiply(scaleMatrix, skewMatrix, ratationMatrix), a.translate)
        },
        equals: function (a, b) {
            if (!a || !b) return false;
            if (a == b) return true;
            
            for (var i = 0, j=a.length; i<j; i++)
                if (Math.abs(a[i] - b[i]) >= matrix.precision) return false;
            
            return true;
        },
        checkAngles: function (a) {
            a = a.slice(0);
            if (a[0] == Math.PI / 2 || a[0] == -Math.PI / 2) {
            	a[0] = -a[0], 
            	a[1] = Math.PI - a[1], 
            	a[2] -= Math.PI;
            }

            if(a[0] > Math.PI / 2) {
            	a[0] -= Math.PI;
            	a[1] = Math.PI - a[1];
            	a[2] -= Math.PI;
            }

            if(a[0] < -Math.PI / 2) {
            	a[0] += Math.PI;
            	a[1] = -Math.PI - a[1];
            	a[2] -= Math.PI;
            }

            while(a[1] < -Math.PI) a[1] += 2 * Math.PI;
            while(a[1] >= Math.PI) a[1] -= 2 * Math.PI;
            while(a[2] < -Math.PI) a[2] += 2 * Math.PI;
            while(a[2] >= Math.PI) a[2] -= 2 * Math.PI;
            
            return a;
        }
    };

    return matrix;
});