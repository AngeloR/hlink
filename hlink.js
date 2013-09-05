config = require('./config.json');

var hlink,
	http,
	Events = require('./lib/events');


var default_controller = require('./lib/default_controller'); 
var loaded_controllers = {};

function parse_url_parts(url) {
	var controller = config.defualt_route,
		method = 'index',
		args;

	var url_parts = url.split('/');
	// the first element is always blank
	url_parts.shift();

	if(url_parts[0] != undefined && url_parts[0] != '') {
		controller = url_parts.shift();	
	}
	
	if(url_parts[0] != undefined && url_parts[0] != '') {
		method = url_parts.shift();
	}

	if(url_parts[0] != undefined && url_parts[0] != '') {
		args = url_parts;
	}

	return {
		controller: controller,
		method: method,
		args: args
	};
}


function handle_request(req, res) {
	var routes = parse_url_parts(req.url),
		tmp_loader;

	if(loaded_controllers[routes.controller] == undefined) {
		tmp_loader = require('./controllers/' + routes.controller);
		
		loaded_controllers[routes.controller] = default_controller.extend(tmp_loader);
	}

	loaded_controllers[routes.controller].req = req;
	loaded_controllers[routes.controller].res = res;
	loaded_controllers[routes.controller][routes.method].apply(loaded_controllers[routes.controller], routes.args);
}


http = require('http');

http.createServer(handle_request).listen(config.http.port, config.http.server);
console.log('HTTP Server on: ' + config.http.server + ':' + config.http.port);
