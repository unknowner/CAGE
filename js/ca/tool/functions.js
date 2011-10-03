new tool('Functions');

tools['Functions'].runtime = {};

tools['Functions'].stat_increase_ticker = function() {

	// set new value via cageStat
	console.log('stat_increase_ticker');
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
		timedStats[stat_type] = setTimeout(function() {stat_increase_ticker(ticks_left, stat_current, stat_max, tick_time, increase_value, stat_type, false);
		}, 1000);
	}
};

tools['Functions'].init = function() {
	// add global cageStat
	addFunction(function() {
		cageStat = {};
	}, null, true, true);
	// replace CA funtions
	addFunction(tools['Functions'].stat_increase_ticker, null, true, false);

};
