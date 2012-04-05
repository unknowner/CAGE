var tools = {};

function tool(_id) {
	tools[_id] = {
		id : _id,
		runtime : null,
		// data only used during runtime
		settings : null,
		// settings
		fbButton : {
			id : 'cageToolButton' + _id,
			add : function(_text, _call) {
				$('#cageSidebarTools').append('<button id="' + this.id + '" class="cageToolButton">' + _text + '</button>');
				$('#' + this.id).button().removeClass('ui-corner-all').click(_call);
			},
			enable : function() {
				$('#' + this.id).button("option", "disabled", false).removeClass('ui-state-hover');
			},
			disable : function() {
				$('#' + this.id).button("option", "disabled", true);
			}
		},
		// prepare tool e.g add button to fb gui etc.
		init : null,
		// start tool on click/task
		start : null,
		// work it
		work : null,
		// clean up
		done : null
	};
}

function initTools() {

	$.each(tools, function(_index, _tool) {
		if(_tool.init) {
			console.log('INIT@' + com.port.current.name + ':' + _tool.id);
			_tool.init();
		}
	});
	get('keep.php', function(_keepdata) {
		CastleAge.bqh = $('input[name="bqh"]:first', _keepdata).val();
		tools.PotionStamina.work(_keepdata);
		tools.PotionEnergy.work(_keepdata);
	});
}