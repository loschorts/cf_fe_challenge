function Link(item) {
	this.item = item;
	this.next;
	this.prev;
}

Link.prototype.remove = function(){
	this.prev.next = this.next;
	this.next.prev = this.prev;
	this.next = undefined;
	this.prev = undefined;
	return this;
}

function LinkedList() {
	this.head = new Link();
	this.tail = new Link();
	this.head.next = this.tail;
	this.tail.prev = this.head;

	this._index = {};
}

LinkedList.prototype.get = function(id){
	return this._index[id].item;
}

LinkedList.prototype.add = function(item){
	if (!item.id) throw TypeError('item must be object with id property');
	if (this._index[item.id]) return false;

	var newLink = new Link(item);

	this.tail.prev.next = newLink;
	newLink.prev = this.tail.prev;
	newLink.next = this.tail;
	this.tail.prev = newLink;

	this._index[item.id] = newLink;
	return newLink.item;
}

LinkedList.prototype.remove = function(item){
	if (!this._index[item.id]) return false;
	var item = this._index[item.id].remove().item;
	delete this._index[item.id];
	return item;
}

LinkedList.prototype.forEach = function(cb){
	var link = this.head.next;
	while (link !== this.tail){
		cb(link.item)
		link = link.next;
	}
}