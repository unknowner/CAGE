new tool('Demi');

tools['Demi'].start = function() {

	var _demi = $('#cageDemiContainer');
	$('body').append('<div id="cageDemiResult">');
	get('symbols.php', function(_demipage) {
		$('div[id^="symbol_displaysymbols"]', _demipage).each(function(_i, _e) {
			var _text = $(_e).text(),
					_deity = /\+1 max (\w+)/.exec(_text)[1],
					_points = /You have (\d+)/.exec(_text)[1]
			_demi.append('<div><div id="cageDemi' + _deity + '" class="cageDemiImage" style="background-image:url(http://image4.castleagegame.com/graphics/deity_' + _deity + '.jpg);" symbol="' + (_i + 1) + '"><span>' + _points + '<br>' + _deity.substr(0, 1).toUpperCase() + _deity.substr(1) + '</span></div></div>');
		})
		_demi.animate({
			'top' : 52
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
					position : [180, 20],
					draggable : false,
					buttons : {
						"Ok" : function() {
							$(this).dialog("close").remove();
						}
					},
					autoOpen : true
				});
			});
			_demi.animate({
				'top' : -100
			}, 'slow', function() {
				_demi.empty();
			});
			tools['Demi'].done();
		})
	})
};

tools['Demi'].done = function() {
	tools['Demi'].fbButton.enable();
};
tools['Demi'].init = function() {
	$('#cageContainer').append('<div id="cageDemiContainer" class="ui-corner-br ui-widget-content"></div>');
	tools['Demi'].fbButton.add('Demi', function() {
		tools['Demi'].fbButton.disable();
		tools['Demi'].start();
	});
};
