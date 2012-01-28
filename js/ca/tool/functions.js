new tool('Functions');

tools.Functions.runtime = {};
/*
 * Reassign CA Function
 */
tools.Functions.init = function() {
	// add global cageStat
	addFunction(function() {
		cageStat = {}
	}, null, true, true);
	// replace CA funtions
	addFunction(tools.Functions.stat_increase_ticker, null, true, false);
	addFunction(tools.Functions.PopupAtMousePosition, null, true, false);
	addFunction(tools.Functions.hidePositionBox, null, true, false);
	addFunction(tools.Functions.PositionAndDisplayPopupAutoCenter, null, true, false);
	addFunction(tools.Functions.PositionAndDisplayPopupAtTop, null, true, false);
	addFunction(tools.Functions.PositionAndDisplayPopupBox, null, true, false);
	addFunction(tools.Functions.generateAtPageTop, null, true, false);
	addFunction(tools.Functions.centerPopups, null, true, false);
	addFunction(tools.Functions.hideFeedbackPositionBox, null, true, false);
	addFunction(tools.Functions.cageRePos, null, true, false);

};
// Fixed Popups
tools.Functions.cageRePos = function() {
	window['cageRePos'] = function(fb_js_var, top) {
		$('#single_popup_background').css('opacity', 0).removeClass('connect_castlepb_bg').fadeTo('slow', 0.75);
		var _sp = $('#single_popup');
		if(fb_js_var.indexOf('<div') !== -1) {
			_sp.html(fb_js_var);
		} else {
			_sp.html($('#' + fb_js_var).html());
		}
		_sp.find('>div:first').css({
			'margin' : 0,
			'padding' : 0
		});
		var _width = _sp.width() == 0 ? _sp.find('>div:first').width() : _sp.width();
		var _margin = (770 - _width) / 2;
		console.log(_width);
		if(top) {
			_sp.css('top', top);
		}
		_sp.css({
			'marginLeft' : (_margin),
			'opacity' : 0
		}).fadeTo('slow', 1);
		$(document).keypress(function(_key) {
			console.log(_key.charCode);
			if(_key.charCode == 120) {
				$(document).unbind('keypress');
				hidePositionBox();
			}
		});
	};
}
tools.Functions.centerPopups = function() {
	window['centerPopups'] = function() {
		$('.result_popup_message').each(function() {
			var _popup = $(this);
			_popup.css({
				'top' : 60,
				'marginLeft' : (770 - _popup.width()) / 2,
				'opacity' : 0
			}).fadeTo('fast', 1);
			$(document).keypress(function(_key) {
				if(_key.charCode == 120) {
					$(document).unbind('keypress');
					hideFeedbackPositionBox();
				}
			});
		});
	}
};

tools.Functions.generateAtPageTop = function() {
	window['generateAtPageTop'] = function(fb_js_var) {
		cageRePos(fb_js_var);
	};
};

tools.Functions.hideFeedbackPositionBox = function() {
	window['hideFeedbackPositionBox'] = function() {
		$(document).unbind('keypress');
		$('#single_popup_background_feedback').fadeOut('slow', function() {
			$(this).hide().css('opacity', 1).unbind('keypress');
		});
		$('#single_popup_feedback').fadeOut('fast', function() {
			$(this).hide().css('opacity', 1).unbind('keypress');
		});
	};
};

tools.Functions.hidePositionBox = function() {
	window['hidePositionBox'] = function(event, fb_js_var) {
		$('#single_popup_background').fadeOut('slow', function() {
			$(this).hide().css('opacity', 1);
		});
		$('#single_popup').fadeOut('fast', function() {
			$(this).hide().css('opacity', 1);
		});
	};
};

tools.Functions.PositionAndDisplayPopupBox = function() {
	window['PositionAndDisplayPopupBox'] = function(fb_js_var, anchor, classname) {
		cageRePos(fb_js_var, $(anchor).offset().top);
	};
};

tools.Functions.PositionAndDisplayPopupAtTop = function() {
	window['PositionAndDisplayPopupAtTop'] = function(fb_js_var, anchor, posX, posY, classname) {
		cageRePos(fb_js_var);
	};
};

tools.Functions.PopupAtMousePosition = function() {
	window['PopupAtMousePosition'] = function(event, fb_js_var) {
		cageRePos(fb_js_var);
	};
};
tools.Functions.PositionAndDisplayPopupAutoCenter = function() {
	window['PositionAndDisplayPopupAutoCenter'] = function(event, fb_js_var) {
		cageRePos(fb_js_var, window.pageYOffset + 150);
	}
};
// Stats Ticker + CAGE calls
tools.Functions.stat_increase_ticker = function() {
	// set new value via cageStat
	window['stat_increase_ticker'] = function(ticks_left, stat_current, stat_max, tick_time, increase_value, stat_type, first_call) {
		if(cageStat[stat_type] && cageStat[stat_type] !== null) {
			stat_current = cageStat[stat_type];
			$('#' + stat_type + '_current_value').text(stat_current);
			cageStat[stat_type] = null;
		}

		if(!first_call && stopTimers) {
			return;
		}

		if(timedStats[stat_type] && first_call) {
			clearTimeout(timedStats[stat_type]);
		}

		if(ticks_left < 0) {
			ticks_left = 0;
		}

		var time_container = $('#' + stat_type + '_time_container');
		var time_value = $('#' + stat_type + '_time_value');
		var current_val = $('#' + stat_type + '_current_value');

		if(!time_container || !time_value || !current_val) {
			return;
		}

		if(ticks_left == 0) {
			stat_current = parseInt(stat_current);
			increase_value = parseInt(increase_value);
			stat_current += increase_value;
			if(stat_current > stat_max) {
				stat_current = stat_max;
			}
			current_val.html(stat_current);
			ticks_left = tick_time;
		} else {
			ticks_left -= 1;
		}

		if(stat_max == stat_current) {
			time_container.html('');
			return;
		}

		var mins = parseInt(ticks_left / 60);
		var secs = ticks_left % 60;
		time_value.html(mins + ':' + ((secs > 9) ? secs : '0' + secs ));
		timedStats[stat_type] = setTimeout(function() {
			stat_increase_ticker(ticks_left, stat_current, stat_max, tick_time, increase_value, stat_type, false);
		}, 1000);
	};
};
