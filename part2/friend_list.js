function FriendList(root){
	this.root = root;
	this.children = {}
	this._list = new LinkedList();
	this.emitter = new FriendsEmitter();
	this.emitter.on('changes', this.receiveUpdates.bind(this))
}

FriendList.prototype.dispatch = function(actions){
	this.emitter.emit('changes', actions)
}

FriendList.prototype.receiveUpdates = function(actions){
	
	var action, friend;

	for (var i = 0 ; i < actions.length ; i++) {
		var action = actions[i].action;
		var friend = actions[i].friend;
		this[action](friend);
	}

}

FriendList.prototype.add = function(friend) {
	if (this._list.add(friend)) {

		this.children[friend.id] = document.createElement("li");
	 	this.children[friend.id].appendChild(document.createTextNode(friend.name)); 
		this.root.appendChild(this.children[friend.id]);

		return this.children[friend.id];
	} else {
		return false;
	}
}

FriendList.prototype.remove = function(friend) {
	if (this._list.remove(friend)) {
		this.children[friend.id].remove();
		return delete this.children[friend.id];
	} else {
		return false;
	}
}