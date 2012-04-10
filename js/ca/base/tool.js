var tools = {};

function tool(_id) {
	tools[_id] = {
		id : _id,
		// data only used during runtime
		runtime : null,
		// settings
		settings : null,
		// prepare tool e.g add button to gui etc.
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