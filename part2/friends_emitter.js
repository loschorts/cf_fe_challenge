function EventEmitter(options) {
	this._ons = {};
	this._onces = {};
}

EventEmitter.prototype.on = function(name, cb){
// add cb to the recurring use array for the event name
	if(!this._ons[name]) this._ons[name] = [];
	this._ons[name].push(cb);
}

EventEmitter.prototype.once = function(name, cb){
// add cb to a single use array for the event name
	if(!this._onces[name]) this._onces[name] = [];
	this._onces[name].push(cb);	
}

EventEmitter.prototype.off = function(name, cb){
// search for a matching cb and splice it out of either callback array if found

	if (this._ons[name]) {
		for (var i = 0 ; i < this._ons[name].length ; i++) {
			if (cb === this._ons[name][i]) {
				this._ons[name].splice(i, 1);
				break;
			}
		}
	}

	if (this._onces[name]) {
		for (var i = 0 ; i < this._onces[name].length ; i++) {
			if (cb === this._onces[name][i]) {
				this._onces[name].splice(i, 1);
				break;
			}
		}
	}
}

EventEmitter.prototype.emit = function(name){
	// gather up arguments
	var args = [].slice.call(arguments, 1)

	// find the recurring callback array and call each callback, passing args
	if (this._ons[name]) {
		for (var i = 0 ; i < this._ons[name].length ; i++) {
			this._ons[name][i].apply(null, args)
		}
	}

	// find the single-use callback array and call each callback, passing args
	if (this._onces[name]) {
		for (var i = 0 ; i < this._onces[name].length ; i++) {
			this._onces[name][i].apply(null, args)
		}
	}

	// clear the single-use callback array
	this._onces[name] = [];

}

function FriendsEmitter(options) {
	EventEmitter.call(this, options);

	for (option in options) {
		var type = typeof option;
		if ((type === 'string') ||( type === 'array')) {
			this[option] = options[option];
		}
	}
}

FriendsEmitter.prototype = Object.create(EventEmitter.prototype);
FriendsEmitter.prototype.constructor = FriendsEmitter;
