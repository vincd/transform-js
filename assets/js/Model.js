define([
	'underscore',
	'Events',
	'utils/timer',
], function(_, Events, Timer) {
	function Model() {
		this._uid = _.uniqueId('c');
		this.isInvalidate = false;

		this.attributes = {
			uid: this._uid
		};

		this.initialize.apply(this, arguments);
	}

	_.extend(Model.prototype, Events);

	Model.prototype.initialize = function() {
		return this;
	};

	Model.prototype.get = function(attr) {
		return this.attributes[attr];
	};

	Model.prototype.set = function(key, value) {
		var attr = {};
		if (key == null) return this;

		if(_.isString(key)) {
			attr[key] = value;	
		} else {
			attr = key;
		}

		_.each(attr, function(value, key) {
			if(key !== 'uid') {
				var oldValue = this.attributes[key] 
				this.attributes[key] = value;
				this.trigger('change:' + key, value, oldValue);
			}	
		}, this);

		this.invalidate();

		return this;
	};

	Model.prototype.clear = function() {
		for (var key in this.attributes) this.attributes[key] = void 0;

		this.invalidate();
		this.trigger('clear');
	};

	Model.prototype.render = function(timestamp) {
		return this;
	};

	Model.prototype.invalidate = function() {
		if(!this.isInvalidate) {
			this.isInvalidate = true;

			Timer.registerNextFrame(_.bind(function(t) {
				this.isInvalidate = false;
				this.render(t);		
			}, this));	
		}		
	};

	// Helper function to correctly set up the prototype chain, for subclasses.
	// Similar to `goog.inherits`, but uses a hash of prototype properties and
	// class properties to be extended.
	var extend = function(protoProps, staticProps) {
		var parent = this,
			child;

		// The constructor function for the new subclass is either defined by you
		// (the "constructor" property in your `extend` definition), or defaulted
		// by us to simply call the parent's constructor.
		if (protoProps && _.has(protoProps, 'constructor')) {
			child = protoProps.constructor;
		} else {
			child = function(){ return parent.apply(this, arguments); };
		}

		// Add static properties to the constructor function, if supplied.
		_.extend(child, parent, staticProps);

		// Set the prototype chain to inherit from `parent`, without calling
		// `parent`'s constructor function.
		var Surrogate = function(){ this.constructor = child; };
		Surrogate.prototype = parent.prototype;
		child.prototype = new Surrogate;

		// Add prototype properties (instance properties) to the subclass,
		// if supplied.
		if (protoProps) _.extend(child.prototype, protoProps);

		// Set a convenience property in case the parent's prototype is needed
		// later.
		child.__super__ = parent.prototype;

		return child;
	};

	// Set up inheritance for the model, collection, router, view and history.
	Model.extend = extend;

	return Model;
});