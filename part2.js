// Question 1

function EventEmitter(options) {
	this._ons = {}
	this._onces = {};
}

EventEmitter.prototype.on = function(name, cb){
	if(!this._ons[name]) this._ons[name] = [];
	this._ons[name].push(cb);
}
EventEmitter.prototype.once = function(){
	if(!this._onces[name]) this._onces[name] = [];
	this._onces[name].push(cb);	
}
EventEmitter.prototype.off = function(name, cb){

	if (this._ons[name]) {
		for (var i = 0 ; i < this._ons.length ; i++) {
			if (cb === this._ons[i]) {
				this._ons = this._ons.splice(i, 1);
				break;
			}
		}
	}

	if (this._onces[name]) {
		for (var i = 0 ; i < this._onces.length ; i++) {
			if (cb === this._onces[i]) {
				this._onces = this._onces.splice(i, 1);
				break;
			}
		}
	}
}

EventEmitter.prototype.emit = function(name){
	var args = [].slice.call(arguments, 1)

	if (this._ons[name]) {
		for (var i = 0 ; i < this._ons[name].length ; i++) {
			this._ons[name][i](args)
		}
	}

	if (this._onces[name]) {
		for (var i = 0 ; i < this._onces[name].length ; i++) {
			this._onces[name][i](args)
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
	this._list = new LinkedList();
	this.on('changes', this.render.bind(this))
}

FriendsEmitter.prototype = Object.create(EventEmitter.prototype);
FriendsEmitter.prototype.constructor = FriendsEmitter;

FriendsEmitter.prototype.update = function(actions) {
	
	var action, friend;
	var changes = false;

	for (var i = 0 ; i < actions.length ; i++) {
		var action = actions[i].action;
		var friend = actions[i].friend;
		if (this[action](friend)) changes = true;
	}

	if (changes) this.emit('changes');
}

FriendsEmitter.prototype.render = function() {
	this._list.forEach(function(friend){
		console.log(friend);
	})
}

FriendsEmitter.prototype.add = function(friend) {
	return this._list.add(friend);
}

FriendsEmitter.prototype.remove = function(friend) {
	return this._list.remove(friend);
}

var instance = new FriendsEmitter({auth: new String('XF-254')});

console.log(1)
instance.update([
	{action: "add", friend: {id: 1, name: "aud"}},
	{action: "add", friend: {id: 2, name: "bob"}},
	{action: "add", friend: {id: 3, name: "cat"}},
	{action: "add", friend: {id: 4, name: "dat"}},
	{action: "add", friend: {id: 5, name: "efg"}},
])
console.log(2)
instance.update([
	{action: "add", friend: {id: 1, name: "aud"}},
	{action: "remove", friend: {id: 6, name: "fab"}},
])

console.log(3)
instance.update([
	{action: "remove", friend: {id: 1, name: "aud"}},
])

console.log(4)
instance.update([
	{action: "add", friend: {id: 1, name: "aud"}},
	{action: "remove", friend: {id: 2, name: "bob"}},
])