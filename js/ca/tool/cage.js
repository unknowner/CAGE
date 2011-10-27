new tool('cage');

tools['cage'].settings = function() {

	tools['Settings'].heading('CAGE - V' + CAGE.version);
	tools['Settings'].text('If you have problems with gifting, generals or anything else, its the best to clear all saved data and reload Castle Age. You will loose all settings for your current user id!');
	tools['Settings'].button('Clear saved data', tools['cage'].clearSavedData);
	tools['Settings'].text('If you have a slower PC or just don\'t like the animations you can turn them off an on. Currently this is not saved so its always on at startup.')
	tools['Settings'].button('Turn animations on/off', tools['cage'].toggleFx);

};

tools['cage'].clearSavedData = function() {

	Object.keys(localStorage).forEach(function(key) {
		console.log(key);
		if(key.indexOf(CastleAge.userId) == 0) {
			localStorage.removeItem(key);
		}
	});
	console.log('localStorage:', localStorage);

};
tools['cage'].toggleFx = function() {
	$.fx.off = !$.fx.off;
	addFunction(function() {
		$.fx.off = !$.fx.off;
	}, null, true, true);
};
