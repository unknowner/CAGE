new tool('Settings');

tools['Settings'].runtime = {};

tools['Settings'].start = function() {
	$('#app_body').html('<div id="cageSettingsTop"><span>CAGE Settings<span></div><div id="cageSettingsMiddle"></div><div id="cageSettingsBottom"></div>');
	$.each(tools, function(_index, _tool) {
		if(_tool.settings) {
			_tool.settings();
		}
	});
};

tools['Settings'].init = function() {
	$('body').append($('<button id="cageSettings"></button>').button({
		icons : {
			primary : 'ui-icon-gear'
		},
		text : false
	}).click(function() {
		tools['Settings'].start();
	}));
};
// heading text
tools['Settings'].heading = function(_text) {
	$('#cageSettingsMiddle').append('<div class="cageSettingsHeading">' + _text + '</div>');
};
// simple text
tools['Settings'].text = function(_text) {
	$('#cageSettingsMiddle').append('<div class="cageSettingsText">' + _text + '</div>');
};
// text, currentvalue, savename, callback func
tools['Settings'].textbox = function(_text, _value, _save, _callback) {
	$('#cageSettingsMiddle').append('<div id="' + _save + '" class="cageSettingsTextbox"><span>' + _text + '</span><input type="text" value="' + _value + '"><button></button></div>');
	$('#' + _save + ' > button').click(function() {
		item.set(_save, $('#' + _save + ' > input').val());
		if(_callback) {
			_callback();
		}
	});
};
// text, callback func
tools['Settings'].button = function(_text, _callback) {
	var _id = new Date().getTime();
	$('#cageSettingsMiddle').append('<div id="' + _id + '" class="cageSettingsButton"><span>' + _text + '</span><button></button></div>');
	$('#' + _id + ' > button').click(function() {
		if(_callback) {
			_callback();
		}
	});
};
// on off switch
tools['Settings'].onoff = function(_text) {
	$('#cageSettingsMiddle').append('<div class="cageSettingsText">' + _text + '</div>');
};