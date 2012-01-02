new tool('Settings');

tools.Settings.runtime = {};

tools.Settings.start = function() {
	$('body').animate({
		scrollTop : 0
	}, 'slow');
	$('#app_body').html('<div id="cageSettingsTop"><span>CAGE Settings<span></div><div id="cageSettingsMiddle"></div><div id="cageSettingsBottom"><a href="http://cagenhancer.blogspot.com/" target="_blank">Blog</a> <a href="http://cagenhancer.blogspot.com/p/manual.html" target="_blank">Manual</a> <a href="http://caaplayer.freeforums.org/c-a-g-e-f29.html" target="_blank">Forum</a> <a href="https://github.com/unknowner/CAGE" target="_blank">GitHub</a><br><br><span style="text-align:center;">You want to say thank you? Just visit the Blog, click an Ad or donate via PayPal.</span></div>');
	$.each(tools, function(_index, _tool) {
		if(_tool.settings) {
			_tool.settings();
		}
	});
};
// heading text
tools.Settings.heading = function(_text) {
	$('#cageSettingsMiddle').append('<div class="cageSettingsHeading">' + _text + '</div>');
};
// simple text
tools.Settings.text = function(_text) {
	$('#cageSettingsMiddle').append('<div class="cageSettingsText">' + _text + '</div>');
};
// text, currentvalue, savename, callback func
tools.Settings.textbox = function(_text, _value, _save, _callback) {
	$('#cageSettingsMiddle').append('<div id="cageSettingsTextBox' + _save + '" class="cageSettingsTextbox"><span>' + _text + '</span><input type="text" value="' + _value + '"><button></button></div>');
	$('#cageSettingsTextBox' + _save + ' > button').click(function() {
		item.set(_save, $('#cageSettingsTextBox' + _save + ' > input').val());
		if(_callback) {
			_callback();
		}
	});
};
// text, callback func
tools.Settings.button = function(_text, _callback) {
	var _id = Math.floor(Math.random() * Math.random() * 100000000);
	$('#cageSettingsMiddle').append('<div id="cageSettingsButton' + _id + '" class="cageSettingsButton"><span>' + _text + '</span><button></button></div>');
	$('#cageSettingsButton' + _id + ' > button').click(function() {
		if(_callback) {
			_callback();
		}
	});
};
// on off switch
tools.Settings.onoff = function(_text, _value, _save, _callback) {
	var _id = Math.floor(Math.random() * Math.random() * 100000000);
	$('#cageSettingsMiddle').append('<div id="cageSettingsOnOff' + _id + '" class="cageSettingsOnOff" onoff="' + _value + '"><span>' + _text + '</span><button></button></div>');
	if(_value == true) {
		$('#cageSettingsOnOff' + _id + ' > button').css('backgroundImage', 'url("http://image4.castleagegame.com/graphics/town_button_expand.gif")');
	}
	$('#cageSettingsOnOff' + _id + ' > button').click(function() {
		console.log($('#cageSettingsOnOff' + _id).attr('onoff'));
		var _onoff = $('#cageSettingsOnOff' + _id), _newvalue = _onoff.attr('onoff') == 'true' ? false : true, _button = $('#cageSettingsOnOff' + _id + ' > button');
		console.log('_newvalue', _newvalue);
		_onoff.attr('onoff', _newvalue);
		if(_newvalue == true) {
			_button.css('backgroundImage', 'url("http://image4.castleagegame.com/graphics/town_button_expand.gif")');
		} else {
			_button.css('backgroundImage', 'url("http://image4.castleagegame.com/graphics/town_button_collapse.gif")');
		}
		item.set(_save, _newvalue);
		if(_callback) {
			_callback();
		}
	});
};
// dropdown
tools.Settings.dropdown = function(_text, _values, _value, _save, _callback) {

	var _id = Math.floor(Math.random() * Math.random() * 100000000);
	$('#cageSettingsMiddle').append('<div id="cageSettingsDropdown' + _id + '" class="cageSettingsDropdown"><span>' + _text + '</span><select></div');
	var _sel = $('#cageSettingsDropdown' + _id + ' select');
	$.each(_values, function(_i, _e) {
		_sel.append('<option value="' + _i + '" ' + (_i == _value ? 'selected' : '') + ' >' + _i + '</option>');
	});
	_sel.change(function() {
		item.set(_save, $(this).val());
		if(_callback) {
			_callback($(this).val());
		}
	});
};

tools.Settings.init = function() {
	tools.Settings.fbButton.add('Settings', tools.Settings.start);
}