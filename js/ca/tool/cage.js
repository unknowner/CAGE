new tool('cage');

tools.cage.settings = function() {
	tools['Settings'].heading('CAGE - V' + CAGE.version);
	tools['Settings'].text('If you have problems with gifting, cages or anything else, its the best to clear all saved data and reload Castle Age. You will loose all settings for your current user id!');
	tools['Settings'].button('Clear saved data', tools.cage.clearSavedData);
	tools['Settings'].text('If you have a slower PC or just don\'t like the animations you can turn them off and on.');
	tools['Settings'].onoff('Animations', tools.cage.runtime.fxOn, 'fxOn', function() {
		tools.cage.runtimeUpdate();
		tools.cage.toggleFx();
	});
};

tools.cage.runtimeUpdate = function() {
	if(!tools.cage.runtime) {
		tools.cage.runtime = {};
	}
	tools.cage.runtime.fxOn = item.get('fxOn', 'true');
};

tools.cage.clearSavedData = function() {

	Object.keys(localStorage).forEach(function(key) {
		console.log(key);
		if(key.indexOf(CastleAge.userId) == 0) {
			localStorage.removeItem(key);
		}
	});
	console.log('localStorage:', localStorage);

};
tools.cage.toggleFx = function() {
	var _fx = tools.cage.runtime.fxOn == 'true' ? false : true;
	console.log(_fx);
	$.fx.off = _fx;
	addFunction(function(_cafx) {
		console.log(_cafx);
		$.fx.off = _cafx;
	}, _fx, true, true);
};

tools.cage.init = function() {
	tools.cage.runtimeUpdate();
}