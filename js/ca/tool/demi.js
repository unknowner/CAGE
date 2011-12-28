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
			console.log($(this).attr('symbol'));
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
				if($('#cageDemiResult').text().indexOf('Your demi points for') > 0) {
					var _wait = 24;
					if(/Your demi points for (\w+)/.exec($('#cageDemiResult').text())[1] == 'Azeron') {
						_wait = 48;
					}
					item.set('CAGEdemiLast', (new Date()).toISOString());
					item.set('CAGEdemiNext', _wait);
				} else {
					console.log(/(\d+)(?= hours)/.exec($('#cageDemiResult').text()));
					console.log(/(\d+)(?= minutes)/.exec($('#cageDemiResult').text()));
				}
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

tools.Demi.done = function() {
	tools.Demi.fbButton.enable();
};
tools.Demi.init = function() {
	$('#cageContainer').append('<div id="cageDemiContainer" class="ui-corner-bottom ui-widget-content"></div>');
	tools.Demi.fbButton.add(language.demiButton, function() {
		tools.Demi.fbButton.disable();
		tools.Demi.start();
	});
};
