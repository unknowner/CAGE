new tool('cage');

tools.cage.settings = function() {
	tools.cage.runtimeUpdate();
	tools.Settings.heading('CAGE - V' + version.string());
	tools.Settings.text(language.cageSetClearDataDesc);
	tools.Settings.button(language.cageSetClearDataAction, tools.cage.clearSavedData);
	tools.Settings.onoff(language.cageSetAnimationAction, tools.cage.runtime.fxOn, 'cageFXOnOff', function() {
		tools.cage.runtime.fxOn = !tools.cage.runtime.fxOn;
		tools.cage.toggleFx();
	});
	tools.Settings.onoff(language.cageSetAlignCenter, tools.cage.runtime.centered, 'cageCentered', function() {
		tools.cage.runtime.centered = !tools.cage.runtime.centered;
		tools.cage.centered();
	});
	tools.Settings.dropdown(language.cageSetThemeAction, tools.cage.runtime.themes, tools.cage.runtime.theme, 'cageTheme', function(_value) {
		$('#cageTheme').attr('href', tools.cage.runtime.themes[_value] + 'jquery-ui.css');
	});
};

tools.cage.runtimeUpdate = function() {
	if(!tools.cage.runtime) {
		tools.cage.runtime = {};
	}
	tools.cage.runtime.centered = item.get('cageCentered', 'true');
	tools.cage.runtime.fxOn = item.get('cageFXOnOff', 'true');
	tools.cage.runtime.theme = item.get('cageTheme', 'true');
	tools.cage.runtime.themes = {
		'Dark Hive (default)' : getPath('css/dark-hive/'),
		'Base' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/',
		'Black tie' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/black-tie/',
		'Blitzer' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/blitzer/',
		'Darkness' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/ui-darkness/',
		'Dot Luv' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/dot-luv/',
		'Excite Bike' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/excite-bike/',
		'Flick' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/flick/',
		'Hot Sneaks' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/hot-sneaks/',
		'Humanity' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/humanity/',
		'Le Frog' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/le-frog/',
		'Lightness' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/ui-lightness/',
		'Mint Choc' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/mint-choc/',
		'Overcast' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/overcast/',
		'Pepper-Grinder' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/pepper-grinder/',
		'Smoothness' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/smoothness/',
		'South Street' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/south-street/',
		'Start' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/start/',
		'Sunny' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/sunny/',
		'Trontastic' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/trontastic/',
		'Vader' : 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/vader/'
	};
	$('#cageTheme').attr('href', tools.cage.runtime.themes[tools.cage.runtime.theme] + 'jquery-ui.css');
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
tools.cage.centered = function() {
	$('#cageContainer').hide();
	$('body > center').css('position', (tools.cage.runtime.centered ? 'relative' : 'absolute'));
	window.setTimeout(function() {
		$('#cageContainer').show()
	}, 10);
};
tools.cage.toggleFx = function() {
	var _fx = !tools.cage.runtime.fxOn;
	$.fx.off = _fx;
	addFunction(function(_cafx) {
		$.fx.off = _cafx;
	}, _fx, true, true);
};

tools.cage.init = function() {
	tools.cage.runtimeUpdate();
}