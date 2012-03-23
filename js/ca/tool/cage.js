tool('cage');

tools.cage.settings = function() {
	tools.cage.runtimeUpdate();
	tools.Settings.heading('CAGE - V' + version.string());
	tools.Settings.text(language.cageSetClearDataDesc);
	tools.Settings.button(language.cageSetClearDataAction, tools.cage.clearSavedData);
	tools.Settings.text('');
	tools.Settings.dropdown(language.cageSetThemeAction, tools.cage.runtime.themes, tools.cage.runtime.theme, 'cageTheme', function(_value) {
		$('#cageTheme').attr('href', tools.cage.runtime.themes[_value] + 'jquery-ui.css');
	});
	tools.Settings.onoff(language.cageSetAnimationAction, tools.cage.runtime.fxOn, 'cageFXOnOff', function() {
		tools.cage.runtime.fxOn = !tools.cage.runtime.fxOn;
		tools.cage.toggleFx();
	});
	tools.Settings.onoff(language.cageSetAlignCenter, tools.cage.runtime.centered, 'cageCentered', function() {
		tools.cage.runtime.centered = !tools.cage.runtime.centered;
		tools.cage.centered();
	});
	tools.Settings.onoff(language.cageNotifications, tools.cage.runtime.showNotes, 'cageShowNotes', function() {
		tools.cage.runtime.showNotes = !tools.cage.runtime.showNotes;
	});
	tools.Settings.text('');
	tools.Settings.text('You should reload Castle Age after loading settings.');
	tools.Settings.button(language.cageSaveSettings, tools.cage.saveData);
	tools.Settings.textbox(language.cageLoadSettings, '', null, tools.cage.loadData);

	tools.Settings.text('');
	tools.Settings.text(language.cageSetReqPermDesc);
	tools.Settings.button(language.cageSetReqPermAction, tools.cage.requestPermisson);

};
tools.cage.runtimeUpdate = function() {
	if(!tools.cage.runtime) {
		tools.cage.runtime = {};
	}
	tools.cage.runtime.centered = item.get('cageCentered', true);
	tools.cage.centered();
	tools.cage.runtime.fxOn = item.get('cageFXOnOff', true);
	tools.cage.toggleFx();
	tools.cage.runtime.showNotes = item.get('cageShowNotes', true);
	tools.cage.runtime.theme = item.get('cageTheme', 'Dark Hive (default)');
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
	if(!tools.cage.runtime.themes[tools.cage.runtime.theme]) {
		tools.cage.runtime.theme = 'Dark Hive (default)';
		item.set('cageTheme', 'Dark Hive (default)');
	}
	$('#cageTheme').attr('href', tools.cage.runtime.themes[tools.cage.runtime.theme] + 'jquery-ui.css');
};
/*
 * Request permisson to let CA post for user
 */
tools.cage.requestPermisson = function() {
	addFunction(function() {
		FB.login(function(response) {
			if(response.status === 'connected') {
				localStorage[FB.getAuthResponse().userID + '_' + 'permissions'] = '"1.1.21"';
			}
		}, {
			scope : 'publish_stream, read_friendlists'
		});
	}, null, true, true);
};
tools.cage.clearSavedData = function() {

	Object.keys(localStorage).forEach(function(key) {
		if(key.indexOf(CastleAge.userId) == 0) {
			localStorage.removeItem(key);
		}
	});
	tools.Settings.start();
};
tools.cage.loadData = function(_data) {
	var _data = JSON.parse(_data);
	Object.keys(_data).forEach(function(key) {
		console.log(key, _data[key]);
		localStorage[key] = _data[key];
	});
};
tools.cage.saveData = function() {
	var _save = {};
	Object.keys(localStorage).forEach(function(key) {
		if(key.indexOf(CastleAge.userId) == 0) {
			_save[key] = localStorage.getItem(key);
		}
	});
	var _pop1 = '<div style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0"><div style="float:left;width:500px;height:390px"><div style="background-image:url(\'http://image4.castleagegame.com/graphics/helpmenu_top.jpg\');width:500px;height:60px"><div style="padding:15px 0 0 36px"><div style="float:left;width:395px;height:25px;text-align:center;overflow:hidden"><div style="clear:both"></div><div style="color:white;font-size:18px"> SAVE SETTINGS </div><div style="clear:both"></div></div><div style="padding:3px 15px 0 0"><div style="float:right"><div style="text-align:right"><a href="#" onclick="hidePositionBox();return false"><img src="http://image4.castleagegame.com/graphics/popup_close_button.png"></a></div></div></div></div></div><div style="background-image:url(\'http://image4.castleagegame.com/graphics/helpmenu_middle.jpg\');width:500px;height:300px"><div style="padding:0 0 0 15px"><div style="float:left;width:470px;height:300px;text-align:left;overflow-y:auto"><div style="clear:both"></div><div style="color:black;font-size:16px;font-family:Times New Roman"> You can copy this data into  a text file and keep it there for later use. When you have to use CAGE on another computer you can restore your data easily.<br><b>Data</b><textarea rows="14" cols="55" readonly>';
	var _pop2 = '</textarea></div><div style="clear:both"></div></div></div></div><div style="background-image:url(\'http://image4.castleagegame.com/graphics/helpmenu_bottom.jpg\');width:500px;height:30px;overflow:hidden"></div></div></div>';
	addFunction(function(_data) {
		console.log(1);
		cageRePos(_data.html);
	}, JSON.stringify({
		html : _pop1 + JSON.stringify(_save) + _pop2
	}), true, true);
};
tools.cage.centered = function() {
	$(document.body).hide();
	$('body > center').css('position', (tools.cage.runtime.centered ? 'relative' : 'absolute'));
	var _chat = tools.cage.runtime.centered ? {
		'left' : '50% !important',
		'marginLeft' : -373
	} : {
		'left' : '5px !important',
		'marginLeft' : 7
	};
	$('#expandedguildchat, #collapsedguildchat').css(_chat);
	window.setTimeout(function() {
		$(document.body).show();
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