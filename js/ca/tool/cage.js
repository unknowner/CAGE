new tool('cage');

tools.cage.settings = function() {
	tools['Settings'].heading('CAGE - V' + CAGE.version);
	tools['Settings'].text(language.cageSetClearDataDesc);
	tools['Settings'].button(language.cageSetClearDataAction, tools.cage.clearSavedData);
	tools['Settings'].text(language.cageSetAnimationDesc);
	tools['Settings'].onoff(language.cageSetAnimationAction, tools.cage.runtime.fxOn, 'fxOn', function() {
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