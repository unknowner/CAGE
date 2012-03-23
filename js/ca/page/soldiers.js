// soldiers
tools['Page'].runtime['soldiers.php'] = function() {

	// Add discount general
	var _general = null;
	if(tools.General.runtime.general.Darius) {
		_general = tools.General.runtime.general.Darius;
	} else if(tools.General.runtime.general.Lucius) {
		_general = tools.General.runtime.general.Lucius;
	} else if(tools.General.runtime.general.Garlan) {
		_general = tools.General.runtime.general.Garlan;
	} else if(tools.General.runtime.general.Penelope) {
		_general = tools.General.runtime.general.Penelope;
	}
	if(_general !== null) {
		$('table.layout div > img[src$="/graphics/hero_lucius.jpg"]:first').attr('src', _general.image).css('cursor', 'pointer').click(function() {
			tools.General.setByName(_general.name);
		}).parent().append('<div style="position: relative;bottom: 15px;width: 159px;background: #000;color: #fff;text-align: center;font-size: 12px;opacity: 0.75;">Click here to set</div>');
		$('table.layout b:contains("Lucius"):first').parent().html('<b>' + _general.name + '</b>: ' + _general.text);
	}
};
