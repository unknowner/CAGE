var tools = {};

function tool(_id) {
	tools[_id] = this;
	this.id = _id;
	this.runtime = null;
	// data only used during runtime
	this.settings = null;
	// settings
	this.fbButton = {
		id : 'cageToolButton' + _id,
		add : function(_text, _call) {
			$('#cageToolsContainer').append('<button id="' + this.id + '" class="cageToolButton">' + _text + '</button>');
			$('#' + this.id).button().click(_call).removeClass('ui-corner-all').addClass('ui-corner-bottom');
		},
		enable : function() {
			$('#' + this.id).button("option", "disabled", false).removeClass('ui-state-hover');
		},
		disable : function() {
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

	$.each(tools, function(_index, _tool) {
		if(_tool.init) {
			console.log('INIT@' + com.port.current.name + ':' + _tool.id);
			_tool.init();
		}
	});
	tools['Page'].runtime['allPages']();
	var _startURL = $('#current_pg_url').attr('value');
	if(_startURL.indexOf('?') != -1) {
		_startURL = _startURL.substring(0, _startURL.indexOf('?'));
	}
	console.log("URL:" + _startURL);
	if(tools['Page'].runtime[_startURL]) {
		tools['Page'].runtime[_startURL]();
	}
	_startURL = undefined;
	get('keep.php', function(_keepdata) {
		CastleAge.bqh = $('input[name="bqh"]:first', _keepdata).val();
		tools['PotionStamina'].work(_keepdata);
		tools['PotionEnergy'].work(_keepdata);
	});
}