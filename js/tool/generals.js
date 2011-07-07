new tool('General');
tools['General'].current = null;
tools['General'].get = function () {
	if ($('#equippedGeneralContainer div.general_name_div3').length > 0) {
		tools['General'].current = $('#equippedGeneralContainer div.general_name_div3').text().trim();
		com.send(com.task.general, com.port.facebook, JSON.stringify({
			name: tools['General'].current,
			img: $('#equippedGeneralContainer img').attr('src')
		}));
	}
};
tools['General'].set = function (_general) {
	_general = JSON.parse(_general);
	$('#cageGeneralImage').attr('src', _general.img);
	$('#cageGeneralName').text(_general.name);
};
tools['General'].init[com.port.facebook] = function() {
	$('#cageGeneralImage').click(function(){
		com.send(com.task.loadPage, com.port.castleAge, '"generals.php"');
	});
}