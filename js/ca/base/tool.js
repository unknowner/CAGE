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

	var _timer = 1;
	$.each(tools, function(_index, _tool) {
		if (_tool.init) {
			console.log('INIT@' + com.port.current.name + ':' + _tool.id);
			window.setTimeout(_tool.init, _timer * 500);
			_timer += 1;
		}
	});
	window.setTimeout(function() {
		var start = new Date();
		signedGet('keep.php', function(_keepdata) {
			tools.PotionStamina.work(_keepdata);
			tools.PotionEnergy.work(_keepdata);
			console.log('signedGet keep:', (new Date() - start));
			_keepdata = _keepdata.replace(/src="/g, 'nosrc=');
			CastleAge.bqh = $('input[name="bqh"]:first', $.parseHTML(_keepdata)).val();
		});
	}, _timer * 500);
}
