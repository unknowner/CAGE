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
			$('#' + this.id).button("option", "disabled", false).removeClass('ui-state-hover');
		},
		disable: function () {
			$('#' + this.id).button("option", "disabled", true);
		}
	};
	// prepare tool e.g add button to fb gui etc.
	this.init = null;
	// start tool on click/task
	this.start = null;
	// work it
	this.work = null;
	// clean up
	this.done = null;
}

function initTools() {
	$.each(tools, function (_index, _tool) {
		if (_tool.init) {
			console.log('INIT@' + com.port.current.name + ':' + _tool.id);
			_tool.init();
		}
	});
}