var Welcome_Controller = {
	index: function(arg1, arg2) {
		console.log(this.post);
		this.res.end();
	}
}

module.exports = Welcome_Controller;
