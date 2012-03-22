tool('PotionEnergy');

tools.PotionEnergy.start = function() {
	$.post('keep.php', {
		'consume' : true,
		'item' : 1,
		'ajax' : 1,
		'signed_request' : CastleAge.signed_request
	}, function(_data) {
		if($('span.result_body:contains("You consumed")', _data).length > 0) {
			addFunction(function(data) {
				cageStat.energy = data.energy;
			}, JSON.stringify({
				energy : parseInt($('#energy_current_value').text(), 10) + 10
			}), true, true);
		}
		tools.PotionEnergy.work(_data);
		tools.PotionEnergy.done();
	});
};
// Parse keep for Energy potions
tools.PotionEnergy.work = function(_pagedata) {
	if(_pagedata == null) {
		_pagedata = $('#app_body');
	}
	var _potions = /\d+/.exec($('img[alt="Energy Potion"]', _pagedata).parent().next().text());
	if(_potions !== null) {
		$('#cagePotionEnergy > span.cagePotionCount').text(_potions[0]);
	} else {
		$('#cagePotionEnergy > span.cagePotionCount').text('');
	}
};
tools.PotionEnergy.done = function() {
	$('#cagePotionEnergy').css({
		'cursor' : '',
		'backgroundSize' : '',
		'backgroundPosition' : '',
		'backgroundImage' : ''
	}).removeAttr('disabled');
};
tools.PotionEnergy.init = function() {
	$('#cageStatsContainer').append($('<button id="cagePotionEnergy" title="Use energy potion if available"><span class="cagePotionCount"></span></button>').click(function() {
		if($(this).text() !== '' && $(this).text() !== '0') {
			$(this).css({
				'cursor' : 'wait',
				'backgroundSize' : '32px 32px',
				'backgroundPosition' : '-4px -4px',
				'backgroundImage' : 'url(\'http://image4.castleagegame.com/graphics/shield_wait.gif\')'
			}).attr('disabled', 'disabled');
			tools.PotionEnergy.start();
		}
	}));
};
