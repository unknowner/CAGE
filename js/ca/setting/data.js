new tool('Data');

tools['Data'].start = function() {

	$.each(localStorage, function(_i) {
		console.log(localStorage.key(_i));
		console.log(localStorage.key(_i).indexOf(CastleAge.userId));
		if(localStorage.key(_i).indexOf(CastleAge.userId) !== -1) {
			console.log('remove');
			localStorage.removeItem(localStorage.key(_i));
		}
	});
};
tools['Data'].init = function () {

	$('#cageSettingContainer').append('<button id="cageClearData" class="cageToolButton">Clear Data</button>');
	$('#cageClearData').button().removeClass('ui-corner-all').addClass('ui-corner-right').click(tools['Data'].start);

};