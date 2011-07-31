var tools = {};

function tool(_id) {
	tools[_id] = this;
	this.id = _id;
	this.runtime = null;
	this.fbButton = {
		id: 'cageToolButton' + _id,
		add: function (_text, _call) {
			$('#cageToolsContainer').append('<button id="' + this.id + '" class="cageToolButton">' + _text + '</button>');
			$('#' + this.id).button().removeClass('ui-corner-all').addClass('ui-corner-right').click(_call);
		},
		enable: function () {
			$('#' + this.id).button("option", "disabled", false);
		},
		disable: function () {
			$('#' + this.id).button("option", "disabled", true);
		}
	};
	// prepare tool e.g add button to fb gui etc.
	this.init = {};
	this.init[com.port.castleAge] = null;
	this.init[com.port.facebook] = null;
	// start tool on click/task
	this.start = {};
	this.start[com.port.castleAge] = null;
	this.start[com.port.facebook] = null;
	// work it
	this.work = {};
	// clean up
	this.done = {};
}

function initTools() {
	$.each(tools, function (_index, _tool) {
		if (_tool.init[com.port.current.name]) {
			console.log('INIT@' + com.port.current.name + ':' + _tool.id);
			_tool.init[com.port.current.name]();
		} else {
			if(com.port.current.name == com.port.castleAge &&  (typeof _tool.init) == 'function') {
				_tool.init();
			}
		}
	});
}