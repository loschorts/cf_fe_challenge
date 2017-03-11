Part 2: JavaScript

FriendEmitter Class

Sample 1 below contains a JavaScript implementation of a basic FriendsEmitter
class, with an instantiation of it. Unfortunately, it doesn’t work. Rewrite it
so that the code will run properly.

// “EventEmitter” is in scope at this time

```
function FriendsEmitter(options) {
EventEmitter.call(this, options);

for (option in options) {

type = typeof config[option];

if (type === ‘string’ || type === ‘array’) {

this[option] = options[option];

}

}

}

FriendsEmitter.prototype = Object.create(EventEmitter.prototype);

FriendsEmitter.prototype.constructor = FriendsEmitter;

var instance = FriendsEmitter(auth: new String(‘XF-254’));

Sample 1: Code for a basic FriendsEmitter class, and an instantiation of it.

DOM and Events

The EventEmitter class implements the following methods:

• An on method that takes an event name and a callback which is executed

whenever that event is emitted.

• A once method that takes and event name and a callback which is executed

only the first time the event is emitted.

• An off method that takes an event name and a callback and removes it from

future events.

• An emit method that takes an event name and arguments which are passed to

the event callbacks.

FriendsEmitter extends the EventEmitter and emits a ‘changes’ event containing

and array of actions adding and removing friends.

The add message is formatted as:

{action: “add”, friend: {id: 42, name: “Ilya Grigorik”, strength: 0.9}}

The remove message:

{action: “remove”, friend: {id: 13, name: “Paul Irish”, strength: 0.6}}

You will be updating a friends list ( ul#friends-list ) with the actions from the

‘changes’ event. When a friend get added, their name should be appended to the

bottom of the list, and should disappear if removed.

EventEmitter

Implement the EventEmitter class used by FriendsEmitter.

Front-end aptitude test | 1 888 99 FLARE | info@cloudflare.com | www.cloudflare.com 8

Bonus Questions

How can EventEmitter change to support wildcard tokens in the event key

( app.*.log )?

Can EventEmitter be modified to support a limited number of callbacks for a given

event key?