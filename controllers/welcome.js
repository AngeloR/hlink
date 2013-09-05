var Welcome_Controller = {
	index: function(arg1, arg2) {
		console.log('Arg 1: ' + arg1);
		console.log('Arg 2: ' + arg2);
		this.res.end();
	}
}

module.exports = Welcome_Controller;
