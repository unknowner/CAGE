new tool('Sidebar');

tools.Sidebar.button = {

	add : function(_id, _text, _call) {
		$('#cageSidebarTools').append($('<button id="' + _id + '" class="cageToolButton">' + _text + '</button>').button({
			icons : {
				primary : "ui-icon-play"
			}
		}).removeClass('ui-corner-all').click(_call));
	},
	enable : function(_id) {
		$('#' + _id).button("option", "disabled", false).removeClass('ui-state-hover');
		$('#' + _id + 'WaitImg').fadeOut('slow', function() {
			$(this).remove();
		});
	},
	disable : function(_id) {
		$('#' + _id).before('<img id="' + _id + 'WaitImg" style="height: 14px;position: relative;margin-bottom: -20px;z-index: 2;margin-top: 4px;left: 7px;" src="http://image4.castleagegame.com/graphics/shield_wait.gif">').button("option", "disabled", true);
	}
};

tools.Sidebar.smallDialog = function(_heading, _text, _okCallBack, _okButtonCSS, _cancelCallBack, _css) {
	var _id = guid();
	$('#cageSidebar').append($('<div id="' + _id + '" class="cageDialogSmall"><div>' + _heading + '</div><div></div><div>' + _text + '<div><button class="ok"></button><button class="cancel"></div></button></div><div></div><div></div></div>').animate({
		'right' : 177,
		'opacity' : 1
	}).css(_css === undefined ? {} : _css));
	$('#' + _id + ' button.ok:first').css(_okButtonCSS).click(function() {
		$('#' + _id + ' button').fadeOut();
		if(_okCallBack) {
			_okCallBack();
		}
		$('#' + _id).animate({
			'right' : 0,
			'opacity' : 0
		}, function() {
			$(this).remove();
		});
	});
	$('#' + _id + ' button.cancel:first').click(function() {
		$('#' + _id).animate({
			'right' : 0,
			'opacity' : 0
		}, function() {
			$(this).remove();
			if(_cancelCallBack) {
				_cancelCallBack();
			}
		});
	});
};
