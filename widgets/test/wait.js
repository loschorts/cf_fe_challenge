module.exports = function(test, cb, timeout = 0){
	const start = new Date();

	const interval = setInterval(function(){
		if (test()) {
			clearInterval(interval);
			cb();
		} else if (new Date() - start > timeout) {
			clearInterval(interval);
			throw new Error('wait timed out');
		} 
	},0)
}