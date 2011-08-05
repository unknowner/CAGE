new tool('Theme');

tools['Theme'].start = function() {

	var _theme = item.get('Theme', 'Dark Hive (default)');
	console.log(_theme);
	$('#cageTheme').attr('href', CAGE.themes[_theme] + 'jquery-ui.css');
	$('#cageThemeSelector option[value="'+_theme+'"]').attr('selected',true);
	$('#cageThemeSelector').selectmenu({
		maxHeight: 150
	});
	//$('#cageThemeSelector-button').css('marginLeft', 3);
	$('#cageThemeSelector-button').addClass('cageThemeSelector');
};
tools['Theme'].init = function () {

	// Themes
	CAGE.themes = {
		'Dark Hive (default)' : chrome.extension.getURL('css/dark-hive/'),
		'Base' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/',
		'Black tie' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/black-tie/',
		'Blitzer' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/blitzer/',
		'Cupertino' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/cupertino/',
		'Darkness' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/ui-darkness/',
		'Dot Luv' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/dot-luv/',
		'Eggplant' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/eggplant/',
		'Excite Bike' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/excite-bike/',
		'Flick' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/flick/',
		'Hot Sneaks' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/hot-sneaks/',
		'Humanity' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/humanity/',
		'Le Frog' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/le-frog/',
		'Lightness' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/ui-lightness/',
		'Mint Choc' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/mint-choc/',
		'Overcast' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/overcast/',
		'Pepper-Grinder' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/pepper-grinder/',
		'Redmond' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/redmond/',
		'Smoothness' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/smoothness/',
		'South Street' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/south-street/',
		'Start' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/start/',
		'Sunny' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/sunny/',
		//'Swanky Purse' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/swanky-purse/',
		'Trontastic' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/trontastic/',
		'Vader' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/vader/'

	};
	$('#cageSettingContainer').append('<select id="cageThemeSelector">');
	var _sel = $('#cageThemeSelector');
	$.each(CAGE.themes, function(_i, _e) {
		_sel.append('<option value="'+_i+'">'+_i+'</option>')
	});
	_sel.change( function() {
		item.set('Theme', $(this).val());
		$('#cageTheme').attr('href', CAGE.themes[$(this).val()] + 'jquery-ui.css');
	});//.selectmenu({		maxHeight: 150	});
};