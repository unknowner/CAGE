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
	tools.Settings.text('Settings are stored as an FB note called "CAGE-Settings". Do not mess with that note if you don\'t know what you\'re doing! ;)<br>You have to reload Castle Age after loading settings.');
	tools.Settings.button(language.cageSaveSettings, tools.cage.saveData);
	tools.Settings.button(language.cageLoadSettings, tools.cage.loadData);

	tools.Settings.text('');
	tools.Settings.text(language.cageSetReqPermDesc);
	tools.Settings.button(language.cageSetReqPermAction, tools.cage.requestPermisson);

};
tools.cage.runtimeUpdate = function() {
	if (!tools.cage.runtime) {
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
	if (!tools.cage.runtime.themes[tools.cage.runtime.theme]) {
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
			if (response.status === 'connected') {
				localStorage[FB.getAuthResponse().userID + '_' + 'permissions'] = '"1.2.18"';
			}
		}, {
			scope : 'publish_stream, read_friendlists, user_notes, create_note'
		});
	}, null, true, true);
};
tools.cage.clearSavedData = function() {

	Object.keys(localStorage).forEach(function(key) {
		if (key.indexOf(CastleAge.userId) == 0) {
			localStorage.removeItem(key);
		}
	});
	tools.Settings.start();
};
tools.cage.loadData = function(_data) {

	customEvent('GetCAGESettings', function() {
		var _load = JSON.parse($('#GetCAGESettings').val());
		if (_load == 'NODATA') {
			note('CAGE', 'No CAGE-Settings stored!');
		} else {
			Object.keys(localStorage).forEach(function(key) {
				if (key.indexOf(CastleAge.userId) == 0) {
					localStorage.removeItem(key);
				}
			});
			Object.keys(_load).forEach(function(key) {
				localStorage[key] = _load[key];
			});
			note('CAGE', 'Settings loaded from note.');
		}
	});

	addFunction(function() {
		FB.api(FB.getAuthResponse().userID + '/notes', function(_notes) {
			console.log('notes');
			if (_notes.error) {
				console.log('error:', _notes);
				$('#GetCAGESettings').val(JSON.stringify('NODATA'));
				fireGetCAGESettings();
			} else {
				var _gotData = false;
				$.each(_notes.data, function(_i, _n) {
					if (_n.subject === 'CAGE-Settings') {
						var _load = $('<DIV>').html(_n.message).text();
						_gotData = true;
						$('#GetCAGESettings').val(_load);
						fireGetCAGESettings();
						return false;
					}
				});
				if (!_gotData) {
					$('#GetCAGESettings').val('NODATA');
					fireGetCAGESettings();
				}
			}
		});
	}, null, true, true);

};

tools.cage.saveData = function() {
	var _save = {};
	Object.keys(localStorage).forEach(function(key) {
		if (key.indexOf(CastleAge.userId) == 0) {
			_save[key] = localStorage.getItem(key);
		}
	});

	addFunction(function(_data) {

		var _noteid = null;

		FB.api(FB.getAuthResponse().userID + '/notes', function(_notes) {
			console.log('notes');
			if (_notes.error) {
				console.log('error:', _notes);
			} else {
				$.each(_notes.data, function(_i, _n) {
					if (_n.subject === 'CAGE-Settings') {
						_noteid = _n.id;
						return false;
					}
				});
				var _savedata = _data.save;
				_savedata = JSON.stringify(_savedata, undefined, 2);
				var eventData = {
					"subject" : 'CAGE-Settings',
					"message" : _savedata,
					"privacy" : {
						"value" : "SELF"
					}
				};
				if (_noteid === null) {
					FB.api("/me/notes/", 'post', eventData, function(response) {
						if (response.id) {
							alert('CAGE-Settings created.');
						}
					});
				} else {
					FB.api("/" + _noteid, 'post', eventData, function(response) {
						if (response === true) {
							alert('CAGE-Settings updated.');
						}
					});
				}
			}
		});

	}, JSON.stringify({
		save : _save
	}), true, true);
};
tools.cage.centered = function() {
	$(document.body).hide();
	$('body > center').css('position', (tools.cage.runtime.centered ? 'relative' : 'absolute'));
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
};
