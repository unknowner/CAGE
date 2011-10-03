// Keep
tools['Page'].runtime['keep.php'] = function() {
	// Update potions
	tools['PotionStamina'].work();
	// folding units, items ...
	$('div.statsT2:has(div.statsTTitle)').css({
		'height' : 30,
		'overflow' : 'hidden',
		'cursor' : 'pointer'
	});
	// Some more stats, like BSI, LSI... keep_attribute_section
	var _lvl = $('#st_5 div:contains("Level"):last').text();
	if(_lvl) {
		_lvl = parseInt(_lvl.match(/\d+/)[0], 10);
		var _stats = $('div.keep_attribute_section');
		var _eng = parseInt($('div.attribute_stat_container:eq(0)', _stats).text(), 10);
		var _sta = parseInt($('div.attribute_stat_container:eq(1)', _stats).text(), 10);
		var _att = parseInt($('div.attribute_stat_container:eq(2)', _stats).text(), 10);
		var _def = parseInt($('div.attribute_stat_container:eq(3)', _stats).text(), 10);
		var _bsi = Math.round((_att + _def) / _lvl * 100) / 100;
		var _lsi = Math.round((_eng + _sta * 2) / _lvl * 100) / 100;
		var _tsi = _bsi + _lsi;
		$('div.keep_healer_section').prepend($('<div>').css({
			'backgroundColor' : '#000',
			'marginLeft' : 26,
			'marginTop' : -232,
			'opacity' : 0.8,
			'color' : 'white',
			'textAlign' : 'left',
			'padding' : 10,
			'height' : 204,
			'width' : 180
		}).html('BSI: ' + _bsi.toFixed(2) + '<br><span style="font-size:9px;">Battle Strength Index</span><br>LSI: ' + _lsi.toFixed(2) + '<br><span style="font-size:9px;">Levelling Speed Index</span><br>TSI: ' + _tsi.toFixed(2) + '<br><span style="font-size:9px;">Total Skillpoints per Level</span><br>'));
	}

	$('div.statsTTitle').toggle(function() {
		var _this = this;
		$(this).parents('div.statsT2:first').css({
			'height' : '100%'
		});
	}, function() {
		$(this).parents('div.statsT2:first').css({
			'height' : 30
		});
	});
	$('div.statUnit a img').addClass('ui-corner-all');
	$('div.statUnit').find('div:last:contains(X)').addClass('itemNumbers');

};
