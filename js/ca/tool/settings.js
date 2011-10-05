new tool('Settings');

tools['Settings'].runtime = {};

tools['Settings'].start = function() {
	$('#app_body').html('<div id="cageSettingsTop"><span>CAGE Settings<span></div><div id="cageSettingsMiddle"></div><div id="cageSettingsBottom"></div>');
	$.each(tools, function(_index, _tool) {
		if(_tool.settings) {
			_tool.settings();
		}
	});
	tools['Settings'].done();
};
tools['Settings'].work = function() {

};
tools['Settings'].done = function() {
	tools['Settings'].fbButton.enable();
};
tools['Settings'].init = function() {
	tools['Settings'].fbButton.add('Settings', function() {
		tools['Settings'].fbButton.disable();
		tools['Settings'].start();
	});
};
// heading text
tools['Settings'].heading = function(_text) {
	$('#cageSettingsMiddle').append('<div class="cageSettingsHeading">' + _text + '</div>');
};
// text, currentvalue, savename
tools['Settings'].textbox = function(_text, _value, _save) {
	$('#cageSettingsMiddle').append('<div class="cageSettingsTextbox"><span>' + _text + '</span><input type="text" value="' + _value + '"><img src=""></div>');
};
