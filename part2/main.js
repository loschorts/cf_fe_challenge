document.addEventListener("DOMContentLoaded", function(){

	window.friendList = new FriendList(document.querySelector("#friends-list"))
	window.addFriends = [
	{action: "add", friend: {id: 1, name: "alice"}},
	{action: "add", friend: {id: 2, name: "bob"}},
	{action: "add", friend: {id: 3, name: "carol"}},
	{action: "add", friend: {id: 4, name: "dave"}},
	{action: "add", friend: {id: 5, name: "ed"}},
	{action: "add", friend: {id: 6, name: "frank"}},
	{action: "add", friend: {id: 7, name: "gina"}},
	]

	window.addAndRemove = [
	{action: "remove", friend: {id: 1, name: "alice"}},
	{action: "remove", friend: {id: 3, name: "carol"}},
	{action: "remove", friend: {id: 5, name: "ed"}},
	
	{action: "add", friend: {id: 8, name: "harry"}},
	{action: "add", friend: {id: 9, name: "ingrid"}},
	{action: "add", friend: {id: 10, name: "jake"}},
	]

	console.log('try these:', 'friendList.dispatch(addFriends)', 'friendList.dispatch(addAndRemove)')
});
