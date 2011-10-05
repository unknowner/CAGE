new tool('cage');

tools['cage'].settings = function() {

	tools['Settings'].heading('CAGE - V1.0.43α');
	tools['Settings'].text('If you have problems with gifting, generals or anything else, its the best to clear all saved data and reload Castle Age. You will loose all settings for your current user id!');
	tools['Settings'].button('Clear saved data', tools['cage'].start);

};

tools['cage'].start = function() {

	$.each(localStorage, function(_i) {
		console.log(localStorage.key(_i));
		console.log(localStorage.key(_i).indexOf(CastleAge.userId));
		if(localStorage.key(_i).indexOf(CastleAge.userId) !== -1) {
			localStorage.removeItem(localStorage.key(_i));
		}
	});
};
