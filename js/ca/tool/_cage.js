new tool('_cage');

tools['_cage'].settings = function() {

	tools['Settings'].heading('CAGE');
	tools['Settings'].text('Monster message is appended after the standard post (eg 25th for Narf).');
	tools['Settings'].button('Clear saved data', tools['_cage'].start);
};

tools['_cage'].start = function() {

	$.each(localStorage, function(_i) {
		console.log(localStorage.key(_i));
		console.log(localStorage.key(_i).indexOf(CastleAge.userId));
		if(localStorage.key(_i).indexOf(CastleAge.userId) !== -1) {
			console.log('remove');
			localStorage.removeItem(localStorage.key(_i));
		}
	});
};
tools['_cage'].init = function () {

	$('#cageSettingContainer').append('<button id="cageClearData" class="cageToolButton">' + chrome.i18n.getMessage("buttonClearData") + '</button>');
	$('#cageClearData').button().removeClass('ui-corner-all').addClass('ui-corner-right').click(tools['Data'].start);

};