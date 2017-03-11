function EventEmitter(options) {
	this._ons = {};
	this._onces = {};
}

EventEmitter.prototype.on = function(name, cb){
	if(!this._ons[name]) this._ons[name] = [];
	this._ons[name].push(cb);
}

EventEmitter.prototype.once = function(name, cb){
	if(!this._onces[name]) this._onces[name] = [];
	this._onces[name].push(cb);	
}

EventEmitter.prototype.off = function(name, cb){

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
	var args = [].slice.call(arguments, 1)

	if (this._ons[name]) {
		for (var i = 0 ; i < this._ons[name].length ; i++) {
			this._ons[name][i].apply(null, args)
		}
	}

	if (this._onces[name]) {
		for (var i = 0 ; i < this._onces[name].length ; i++) {
			this._onces[name][i].apply(null, args)
		}
	}

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
