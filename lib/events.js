var Event_Manager = {
	events: {},
	watch: function(event, callback, scope, opts) {
		var event_obj = {};
		if(Event_Manager.events[event] == undefined) {
			Event_Manager.events[event] = [];
		}

		event_obj = {
			callback: callback,
			scope: scope,
			options: opts
		};

		Event_Manager.events[event].push(event_obj);
	},
	trigger: function(event, args) {
		var event_obj;
		if(Event_Manager.events[event].length > 0) {
			for(var i = 0, l = Event_Manager.events[event].length; i < l; ++i) {
				event_obj = Event_Manager.events[event][i];
				
				if(event_obj.scope == undefined) {
					// regular call
					event_obj.callback(args);
				}
				else {
					// scope provided
					event_obj.callback.call(event_obj.scope, args);
				}

				if(event_obj.options !== undefined && event_obj.options.kill_chain === true) {
					i = l;
				}
			}
		}
	}
};

module.exports = Event_Manager;
