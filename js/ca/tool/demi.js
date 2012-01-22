new tool('Demi');

tools.Demi.start = function() {

	var _demi = $('#cageDemiContainer');
	$('body > center').append('<div id="cageDemiResult">');
	get('symbols.php', function(_demipage) {
		$('div[id^="symbol_displaysymbols"]', _demipage).each(function(_i, _e) {
			var _text = $(_e).text(), _deity = /\+1 max (\w+)/.exec(_text)[1], _points = /You have (\d+)/.exec(_text)[1]
			_demi.append('<div><div id="cageDemi' + _deity + '" class="cageDemiImage" style="background-image:url(http://image4.castleagegame.com/graphics/deity_' + _deity + '.jpg);" symbol="' + (_i + 1) + '"><span>' + _points + '<br>' + _deity.substr(0, 1).toUpperCase() + _deity.substr(1) + '</span></div></div>');
		})
		_demi.show().animate({
			'top' : 110
		}, 'slow');
		$('div.cageDemiImage').click(function() {
			get('symbols.php?action=tribute&symbol=' + $(this).attr('symbol'), function(_blessed) {
				$('#cageDemiResult').text($('div.result[contains("You cannot pay another tribute so soon"])', _blessed).text().trim()).dialog({
					title : 'Demi Power',
					resizable : false,
					zIndex : 3999,
					width : 440,
					minHeight : 0,
					position : ['center', 50],
					draggable : false,
					buttons : {
						"Ok" : function() {
							$(this).dialog("close").remove();
						}
					},
					autoOpen : true
				});
				tools.Demi.parse($('#cageDemiResult'));
			});
			_demi.animate({
				'top' : -100
			}, 'slow', function() {
				_demi.hide().empty();
			});
			tools.Demi.done();
		})
	})
};
tools.Demi.timer = function() {
	var _last = item.get('cageDemiLast', null);
	if(_last !== null) {
		var _date = new Date(_last);
		var _wait = item.get('cageDemiTime', 24);
		_date.setHours(_date.getHours() + _wait);
		var _ms = Date.parse(_date) - Date.parse((new Date()));
		var _sec = _ms / 1000;
		var _min = Math.floor(_sec % 3600 / 60);
		var _hr = Math.floor(_sec / 3600);
		if(_hr < 0 || _min < 0) {
			$('#cageNextDemi span:last').text('Now');
			$('#cageNextDemi > div > div').css({
				'width' : '100%',
				'backgroundColor' : '#c00'
			});
		} else {
			$('#cageNextDemi span:last').text(_hr + ':' + ('0' + _min).slice(-2));
			$('#cageNextDemi > div > div').css({
				'width' : (100 - (_hr * 60 + _min) * 100 / (_wait * 60)) + '%',
				'backgroundColor' : '#1A7A30'
			});
		}
	}
};
tools.Demi.parse = function(_pagedata) {
	// Set/check demi timer
	var _pagedata = $(_pagedata).text();
	if(_pagedata.indexOf('You cannot pay another tribute so soon') !== -1 || _pagedata.indexOf('You have paid tribute to') !== -1) {
		var _wait = _pagedata.indexOf('Azeron') > 0 ? 48 : 24;
		var _hour = _wait;
		var _minute = 0;
		var _demi = new Date();
		if(_pagedata.indexOf('You cannot pay another tribute so soon') !== -1) {
			_hour = parseInt(/(\d+)(?= hours)/.exec(_pagedata)[0], 10);
			_minute = parseInt(/(\d+)(?= minutes)/.exec(_pagedata)[0], 10);
			_demi.setHours(_demi.getHours() + _hour - _wait, _demi.getMinutes() + _minute);
		}
		item.set('cageDemiLast', Date.parse(_demi));
		item.set('cageDemiTime', _wait);
		tools.Demi.timer();
	}
};
tools.Demi.done = function() {
	tools.Demi.fbButton.enable();
};
tools.Demi.init = function() {
	$('#cageContainer').append('<div id="cageDemiContainer" class="ui-corner-bottom ui-widget-content"></div>');
	$('#cageStatsContainer').append('<div id="cageNextDemi"><div><div></div></div><span>Next Demi:</span><span></span></div>');
	tools.Demi.fbButton.add(language.demiButton, function() {
		tools.Demi.fbButton.disable();
		tools.Demi.start();
	});
	tools.Demi.timer();
	window.setInterval(function() {
		tools.Demi.timer();
	}, 60000);
};
