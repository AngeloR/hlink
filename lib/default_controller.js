var Default_Controller = {
	req: undefined,
	res: undefined,
	extend: function(obj) {
		var keys = Object.keys(obj);

		for(var i = 0, l = keys.length; i < l; ++i) {
			Default_Controller[keys[i]] = obj[keys[i]];
		}	

		return Default_Controller;
	}
};

module.exports = Default_Controller;
