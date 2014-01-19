require(function() {
	// Use the request animation frame as timer
	window.requestAnimationFrame = 
		window.requestAnimationFrame || 
		window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || 
        window.msRequestAnimationFrame;

	var frameTimer = function(callback) {
		var _start,
			_callback = function(timestamp) {
				if(!_start) _start = timestamp;

				callback(timestamp - _start);
				requestAnimationFrame(_callback);
			};

		requestAnimationFrame(_callback);
	};

	var randomColor = function() {
		return "#" + Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1);
	};

	var random = function(min, max) {
		if(!max) {
			max = min;
			min = 0;
		}

		return min + parseInt((max-min) * Math.random());
	};

	var tranformElement = function(el, deltaX, deltaY, deltaZ, tetaX, tetaY, tetaZ) {
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
	};

	var HEIGHT = 400, WIDTH = 1000;

    function Particule(msg) {
    	this.data = {};
    	this.render(msg);
    }

    Particule.prototype.setData = function(key, value) {
    	this.data[key] = value;
    }

    Particule.prototype.setDatas = function(data) {
    	this.data = data;
    };

    Particule.prototype.getDatas = function() {
    	return this.data;
    }

    Particule.prototype.render = function(src) {
    	var container = document.getElementById('container');

    	var s = document.createElement('div'),
			p = document.createElement('img');

		p.src = src
		;
		p.style.height = "92px";
		p.style.width = "61px";

		s.appendChild(p);
		container.appendChild(s);

		s.style.position = "fixed";

		this.setDatas({
			deltaX: random(WIDTH),
			sensX: random(-10, 10),
			deltaY: random(HEIGHT),
			sensY: random(-10, 10),
			deltaZ: 0,
			tetaX: 0,
			speedX: random(-10, 10) / 100.0,
			//speedX: 0,
			tetaY: 0,
			speedY: random(-10, 10) / 100.0,
			//speedY: 0,
			tetaZ: 0,
			speedZ: random(-10, 10) / 100.0
			//speedZ: 0
		});

		this.el = s;
    };

    Particule.prototype.tick = function(timestamp) {
		var dx = this.data['deltaX'],
			sensX = this.data['sensX'],
			dy = this.data['deltaY'],
			sensY = this.data['sensY'],
			dz = this.data['deltaZ'],
			tetaX = this.data['tetaX'],
			speedX = this.data['speedX']
			tetaY = this.data['tetaY'],
			speedY = this.data['speedY']
			tetaZ = this.data['tetaZ'],
			speedZ = this.data['speedZ'],

			previousTick = this._previousTick || 0;

		dx += parseInt(sensX * (previousTick - timestamp) / 100.0); 
		dy += parseInt(sensY * (previousTick - timestamp) / 100.0); 

		if(dx > WIDTH || dx < 0) {
			sensX = -1 * sensX;
		}

		if(dy > HEIGHT || dy < 0) {
			sensY = -1 * sensY;
		}

		dx = Math.min(WIDTH, Math.max(0, dx));
		dy = Math.min(HEIGHT, Math.max(0, dy));

		//dz++;
		tetaX += speedX;
		tetaY += speedY;
		tetaZ += speedZ;			

		this._previousTick = timestamp;
		this.setData('sensX', sensX);
		this.setData('sensY', sensY);
		this.setPosition(dx, dy, dz, tetaX, tetaY, tetaZ);
    }

    Particule.prototype.setPosition = function(x, y, z, tetaX, tetaY, tetaZ) {
		this.data['deltaX'] = x;
		this.data['deltaY'] = y;
		this.data['deltaZ'] = z;
		this.data['tetaX'] = tetaX;
		this.data['tetaY'] = tetaY;
		this.data['tetaZ'] = tetaZ;

    	tranformElement(this.el, x, y, z, tetaX, tetaY, tetaZ);
    }

	function init() {
		var squares = [];

		//var chars = ['100054G.jpg', '100147U.jpg', '100241T.jpg', '100340R.jpg', '100535S.jpg', '100647J.jpg', '100055L.jpg', '100148Z.jpg', '100242Y.jpg', '100341W.jpg', '100536X.jpg', '100649T.jpg', '100056Q.jpg', '100149E.jpg', '100243D.jpg', '100342B.jpg', '100537C.jpg', '100650E.jpg', '100057V.jpg', '100150P.jpg', '100244I.jpg', '100346V.jpg', '100539M.jpg', '100651J.jpg', '100058A.jpg', '100151U.jpg', '100245N.jpg', '100347A.jpg', '100540X.jpg', '100652O.jpg', '100059F.jpg', '100152Z.jpg', '100246S.jpg', '100364T.jpg', '100541C.jpg', '100653T.jpg', '100060Q.jpg', '100153E.jpg', '100247X.jpg', '100371I.jpg', '100542H.jpg', '100654Y.jpg', '100061V.jpg', '100154J.jpg', '100248C.jpg', '100372N.jpg', '100543M.jpg', '100655D.jpg', '100062A.jpg', '100155O.jpg', '100249H.jpg', '100373S.jpg', '100544R.jpg', '100657N.jpg', '100063F.jpg', '100156T.jpg', '100250S.jpg', '100376H.jpg', '100545W.jpg', '100658S.jpg', '100064K.jpg', '100157Y.jpg', '100251X.jpg', '100378R.jpg', '100546B.jpg', '100659X.jpg', '100066U.jpg', '100158D.jpg', '100252C.jpg', '100381M.jpg', '100547G.jpg', '100661N.jpg', '100067Z.jpg', '100159I.jpg', '100253H.jpg', '100384B.jpg', '100548L.jpg', '100663X.jpg', '100068E.jpg', '100162D.jpg', '100254M.jpg', '100385G.jpg', '100549Q.jpg', '100664C.jpg', '100069J.jpg', '100163I.jpg', '100255R.jpg', '100386L.jpg', '100550B.jpg', '100665H.jpg', '100070U.jpg', '100164N.jpg', '100256W.jpg', '100387Q.jpg', '100551G.jpg', '100667R.jpg', '100071Z.jpg', '100165S.jpg', '100257B.jpg', '100388V.jpg', '100552L.jpg', '100669B.jpg', '100072E.jpg', '100166X.jpg', '100258G.jpg', '100389A.jpg', '100554V.jpg', '100675L.jpg', '100073J.jpg', '100167C.jpg', '100259L.jpg', '100390L.jpg', '100555A.jpg', '100676Q.jpg', '100074O.jpg', '100168H.jpg', '100260W.jpg', '100391Q.jpg', '100556F.jpg', '100677V.jpg', '100075T.jpg', '100169M.jpg', '100261B.jpg', '100392V.jpg', '100557K.jpg', '100684K.jpg', '100076Y.jpg', '100170X.jpg', '100262G.jpg', '100393A.jpg', '100559U.jpg', '100688E.jpg', '100077D.jpg', '100171C.jpg', '100263L.jpg', '100394F.jpg', '100560F.jpg', '100721A.jpg', '100078I.jpg', '100172H.jpg', '100264Q.jpg', '100395K.jpg', '100561K.jpg', '100722F.jpg', '100079N.jpg', '100173M.jpg', '100265V.jpg', '100396P.jpg', '100562P.jpg', '100723K.jpg', '100080Y.jpg', '100174R.jpg', '100266A.jpg', '100397U.jpg', '100564Z.jpg', '100724P.jpg', '100081D.jpg', '100175W.jpg', '100267F.jpg', '100400E.jpg', '100565E.jpg', '100725U.jpg', '100082I.jpg', '100176B.jpg', '100268K.jpg', '100401J.jpg', '100567O.jpg', '100727E.jpg', '100083N.jpg', '100177G.jpg', '100269P.jpg', '100402O.jpg', '100568T.jpg', '100728J.jpg', '100084S.jpg', '100178L.jpg', '100270A.jpg', '100403T.jpg', '100569Y.jpg', '100729O.jpg', '100085X.jpg', '100179Q.jpg', '100271F.jpg', '100404Y.jpg', '100570J.jpg', '100730Z.jpg', '100086C.jpg', '100180B.jpg', '100272K.jpg', '100406I.jpg', '100571O.jpg', '100731E.jpg', '100087H.jpg', '100181G.jpg', '100273P.jpg', '100407N.jpg', '100572T.jpg', '100733O.jpg', '100088M.jpg', '100182L.jpg', '100274U.jpg', '100410I.jpg', '100573Y.jpg', '100737I.jpg', '100089R.jpg', '100183Q.jpg', '100275Z.jpg', '100415H.jpg', '100575I.jpg', '100746H.jpg', '100090C.jpg', '100184V.jpg', '100276E.jpg', '100417R.jpg', '100576N.jpg', '100747M.jpg', '100091H.jpg', '100185A.jpg', '100277J.jpg', '100419B.jpg', '100577S.jpg', '100749W.jpg', '100092M.jpg', '100186F.jpg', '100278O.jpg', '100420M.jpg', '100578X.jpg', '100751M.jpg'];
		var chars = ['100001X.jpg', '100093R.jpg', '100187K.jpg', '100279T.jpg', '100424G.jpg', '100579C.jpg', '100002C.jpg', '100094W.jpg', '100188P.jpg', '100280E.jpg', '100427V.jpg', '100580N.jpg', '100003H.jpg', '100095B.jpg', '100189U.jpg', '100281J.jpg', '100430Q.jpg', '100581S.jpg', '100004M.jpg', '100096G.jpg', '100190F.jpg', '100282O.jpg', '100431V.jpg', '100582X.jpg', '100005R.jpg', '100097L.jpg', '100191K.jpg', '100283T.jpg', '100433F.jpg', '100583C.jpg', '100006W.jpg', '100098Q.jpg', '100192P.jpg', '100284Y.jpg', '100435P.jpg', '100584H.jpg', '100007B.jpg', '100099V.jpg', '100193U.jpg', '100285D.jpg', '100436U.jpg', '100585M.jpg', '100008G.jpg', '100100V.jpg', '100195E.jpg', '100289X.jpg', '100437Z.jpg', '100586R.jpg', '100009L.jpg', '100101A.jpg', '100196J.jpg', '100290I.jpg', '100439J.jpg', '100587W.jpg', '100010W.jpg', '100102F.jpg', '100197O.jpg', '100291N.jpg', '100440U.jpg', '100588B.jpg', '100011B.jpg', '100103K.jpg', '100198T.jpg', '100292S.jpg', '100441Z.jpg', '100589G.jpg', '100012G.jpg', '100105U.jpg', '100199Y.jpg', '100293X.jpg', '100442E.jpg', '100590R.jpg', '100013L.jpg', '100106Z.jpg', '100200Y.jpg', '100294C.jpg', '100444O.jpg', '100591W.jpg', '100014Q.jpg', '100107E.jpg', '100201D.jpg', '100297R.jpg', '100445T.jpg', '100592B.jpg', '100015V.jpg', '100108J.jpg', '100202I.jpg', '100298W.jpg', '100447D.jpg', '100593G.jpg', '100016A.jpg', '100109O.jpg', '100203N.jpg', '100299B.jpg', '100448I.jpg', '100594L.jpg', '100017F.jpg', '100110Z.jpg', '100204S.jpg', '100300B.jpg', '100449N.jpg', '100595Q.jpg', '100018K.jpg', '100111E.jpg', '100205X.jpg', '100301G.jpg', '100450Y.jpg', '100596V.jpg', '100019P.jpg', '100112J.jpg', '100206C.jpg', '100302L.jpg', '100451D.jpg', '100597A.jpg', '100020A.jpg', '100113O.jpg', '100207H.jpg', '100303Q.jpg', '100452I.jpg', '100598F.jpg', '100021F.jpg', '100114T.jpg', '100208M.jpg', '100304V.jpg', '100453N.jpg', '100599K.jpg', '100022K.jpg', '100115Y.jpg', '100209R.jpg', '100305A.jpg', '100454S.jpg', '100600K.jpg', '100023P.jpg', '100116D.jpg', '100210C.jpg', '100306F.jpg', '100455X.jpg', '100601P.jpg', '100024U.jpg', '100117I.jpg', '100211H.jpg', '100307K.jpg', '100456C.jpg', '100602U.jpg', '100025Z.jpg', '100118N.jpg', '100212M.jpg', '100308P.jpg', '100457H.jpg', '100603Z.jpg', '100026E.jpg', '100119S.jpg', '100213R.jpg', '100309U.jpg', '100461H.jpg', '100604E.jpg', '100027J.jpg', '100120D.jpg', '100214W.jpg', '100310F.jpg', '100462M.jpg', '100605J.jpg', '100028O.jpg', '100121I.jpg', '100215B.jpg', '100311K.jpg', '100463R.jpg', '100606O.jpg', '100029T.jpg', '100122N.jpg', '100216G.jpg', '100312P.jpg', '100464W.jpg', '100607T.jpg', '100030E.jpg', '100123S.jpg', '100217L.jpg', '100313U.jpg', '100465B.jpg', '100611T.jpg', '100031J.jpg', '100124X.jpg', '100218Q.jpg', '100314Z.jpg', '100466G.jpg', '100612Y.jpg', '100032O.jpg', '100125C.jpg', '100219V.jpg', '100315E.jpg', '100467L.jpg', '100614I.jpg', '100033T.jpg', '100126H.jpg', '100220G.jpg', '100316J.jpg', '100469V.jpg', '100615N.jpg', '100034Y.jpg', '100127M.jpg', '100221L.jpg', '100318T.jpg', '100470G.jpg', '100621X.jpg', '100035D.jpg', '100128R.jpg', '100222Q.jpg', '100319Y.jpg', '100471L.jpg', '100628G.jpg', '100036I.jpg', '100129W.jpg', '100223V.jpg', '100320J.jpg', '100472Q.jpg', '100629L.jpg', '100037N.jpg', '100130H.jpg', '100224A.jpg', '100321O.jpg', '100473V.jpg', '100630W.jpg', '100038S.jpg', '100131M.jpg', '100226K.jpg', '100322T.jpg', '100474A.jpg', '100631B.jpg', '100039X.jpg', '100132R.jpg', '100227P.jpg', '100323Y.jpg', '100477P.jpg', '100632G.jpg', '100040I.jpg', '100133W.jpg', '100228U.jpg', '100324D.jpg', '100488Y.jpg', '100633L.jpg', '100041N.jpg', '100134B.jpg', '100229Z.jpg', '100328X.jpg', '100493D.jpg', '100635V.jpg', '100042S.jpg', '100135G.jpg', '100230K.jpg', '100329C.jpg', '100494I.jpg', '100636A.jpg', '100043X.jpg', '100136L.jpg', '100231P.jpg', '100330N.jpg', '100495N.jpg', '100637F.jpg', '100044C.jpg', '100137Q.jpg', '100232U.jpg', '100331S.jpg', '100499H.jpg', '100638K.jpg', '100046M.jpg', '100138V.jpg', '100233Z.jpg', '100332X.jpg', '100500H.jpg', '100639P.jpg', '100047R.jpg', '100139A.jpg', '100234E.jpg', '100333C.jpg', '100512V.jpg', '100640A.jpg', '100048W.jpg', '100141Q.jpg', '100235J.jpg', '100334H.jpg', '100513A.jpg', '100641F.jpg', '100049B.jpg', '100142V.jpg', '100236O.jpg', '100335M.jpg', '100516P.jpg', '100642K.jpg', '100050M.jpg', '100143A.jpg', '100237T.jpg', '100336R.jpg', '100517U.jpg', '100643P.jpg', '100051R.jpg', '100144F.jpg', '100238Y.jpg', '100337W.jpg', '100529I.jpg', '100644U.jpg', '100052W.jpg', '100145K.jpg', '100239D.jpg', '100338B.jpg', '100530T.jpg', '100645Z.jpg', '100053B.jpg', '100146P.jpg', '100240O.jpg', '100339G.jpg', '100533I.jpg', '100646E.jpg', '100054G.jpg', '100147U.jpg', '100241T.jpg', '100340R.jpg', '100535S.jpg', '100647J.jpg', '100055L.jpg', '100148Z.jpg', '100242Y.jpg', '100341W.jpg', '100536X.jpg', '100649T.jpg', '100056Q.jpg', '100149E.jpg', '100243D.jpg', '100342B.jpg', '100537C.jpg', '100650E.jpg', '100057V.jpg', '100150P.jpg', '100244I.jpg', '100346V.jpg', '100539M.jpg', '100651J.jpg', '100058A.jpg', '100151U.jpg', '100245N.jpg', '100347A.jpg', '100540X.jpg', '100652O.jpg', '100059F.jpg', '100152Z.jpg', '100246S.jpg', '100364T.jpg', '100541C.jpg', '100653T.jpg', '100060Q.jpg', '100153E.jpg', '100247X.jpg', '100371I.jpg', '100542H.jpg', '100654Y.jpg', '100061V.jpg', '100154J.jpg', '100248C.jpg', '100372N.jpg', '100543M.jpg', '100655D.jpg', '100062A.jpg', '100155O.jpg', '100249H.jpg', '100373S.jpg', '100544R.jpg', '100657N.jpg', '100063F.jpg', '100156T.jpg', '100250S.jpg', '100376H.jpg', '100545W.jpg', '100658S.jpg', '100064K.jpg', '100157Y.jpg', '100251X.jpg', '100378R.jpg', '100546B.jpg', '100659X.jpg', '100066U.jpg', '100158D.jpg', '100252C.jpg', '100381M.jpg', '100547G.jpg', '100661N.jpg', '100067Z.jpg', '100159I.jpg', '100253H.jpg', '100384B.jpg', '100548L.jpg', '100663X.jpg', '100068E.jpg', '100162D.jpg', '100254M.jpg', '100385G.jpg', '100549Q.jpg', '100664C.jpg', '100069J.jpg', '100163I.jpg', '100255R.jpg', '100386L.jpg', '100550B.jpg', '100665H.jpg', '100070U.jpg', '100164N.jpg', '100256W.jpg', '100387Q.jpg', '100551G.jpg', '100667R.jpg', '100071Z.jpg', '100165S.jpg', '100257B.jpg', '100388V.jpg', '100552L.jpg', '100669B.jpg', '100072E.jpg', '100166X.jpg', '100258G.jpg', '100389A.jpg', '100554V.jpg', '100675L.jpg', '100073J.jpg', '100167C.jpg', '100259L.jpg', '100390L.jpg', '100555A.jpg', '100676Q.jpg', '100074O.jpg', '100168H.jpg', '100260W.jpg', '100391Q.jpg', '100556F.jpg', '100677V.jpg', '100075T.jpg', '100169M.jpg', '100261B.jpg', '100392V.jpg', '100557K.jpg', '100684K.jpg', '100076Y.jpg', '100170X.jpg', '100262G.jpg', '100393A.jpg', '100559U.jpg', '100688E.jpg', '100077D.jpg', '100171C.jpg', '100263L.jpg', '100394F.jpg', '100560F.jpg', '100721A.jpg', '100078I.jpg', '100172H.jpg', '100264Q.jpg', '100395K.jpg', '100561K.jpg', '100722F.jpg', '100079N.jpg', '100173M.jpg', '100265V.jpg', '100396P.jpg', '100562P.jpg', '100723K.jpg', '100080Y.jpg', '100174R.jpg', '100266A.jpg', '100397U.jpg', '100564Z.jpg', '100724P.jpg', '100081D.jpg', '100175W.jpg', '100267F.jpg', '100400E.jpg', '100565E.jpg', '100725U.jpg', '100082I.jpg', '100176B.jpg', '100268K.jpg', '100401J.jpg', '100567O.jpg', '100727E.jpg', '100083N.jpg', '100177G.jpg', '100269P.jpg', '100402O.jpg', '100568T.jpg', '100728J.jpg', '100084S.jpg', '100178L.jpg', '100270A.jpg', '100403T.jpg', '100569Y.jpg', '100729O.jpg', '100085X.jpg', '100179Q.jpg', '100271F.jpg', '100404Y.jpg', '100570J.jpg', '100730Z.jpg', '100086C.jpg', '100180B.jpg', '100272K.jpg', '100406I.jpg', '100571O.jpg', '100731E.jpg', '100087H.jpg', '100181G.jpg', '100273P.jpg', '100407N.jpg', '100572T.jpg', '100733O.jpg', '100088M.jpg', '100182L.jpg', '100274U.jpg', '100410I.jpg', '100573Y.jpg', '100737I.jpg', '100089R.jpg', '100183Q.jpg', '100275Z.jpg', '100415H.jpg', '100575I.jpg', '100746H.jpg', '100090C.jpg', '100184V.jpg', '100276E.jpg', '100417R.jpg', '100576N.jpg', '100747M.jpg', '100091H.jpg', '100185A.jpg', '100277J.jpg', '100419B.jpg', '100577S.jpg', '100749W.jpg', '100092M.jpg', '100186F.jpg', '100278O.jpg', '100420M.jpg', '100578X.jpg', '100751M.jpg'];
		for(var i=0, j=chars.length; i<j; i++) {
			squares.push(new Particule('./img/' + chars[i]));
		}

		var animationFrameCallback = function(timestamp) {
			for(var i=0, j=squares.length; i<j; i++) {
				squares[i].tick(timestamp);
			}
		};

		frameTimer(animationFrameCallback)
	}

	window.addEventListener('DOMContentLoaded', init, false);
});