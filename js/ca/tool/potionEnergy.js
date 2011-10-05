new tool('PotionEnergy');

tools['PotionEnergy'].start = function() {
	$.post('keep.php', {
		'consume' : true,
		'item' : 1,
		'ajax' : 1,
		'signed_request' : CastleAge.signed_request
	}, function(_data) {
		if($('span.result_body:contains("You consumed")', _data).length > 0) {
			addFunction(function(data) {
				cageStat['energy'] = data.energy;
			}, JSON.stringify({
				energy : parseInt($('#energy_current_value').text(), 10) + 10
			}), true, true);
		}
		tools['PotionEnergy'].work(_data);
		tools['PotionEnergy'].done();
	});
};
// Parse keep for Energy potions
tools['PotionEnergy'].work = function(_pagedata) {
	if(_pagedata == undefined) {
		_pagedata = $('#app_body');
	}
	var _potions = /\d+/.exec($('img[alt="Energy Potion"]', _pagedata).parent().next().text());
	if(_potions !== null) {
		$('#cagePotionEnergy > span.cagePotionCount').text(_potions[0]);
	}
};
tools['PotionEnergy'].done = function() {
	$('#cagePotionEnergy').removeAttr('disabled').css('cursor', 'pointer');
};
tools['PotionEnergy'].init = function() {
	$('body').append($('<button id="cagePotionEnergy"><span class="cagePotionCount"></span></button>').click(function() {
		if($(this).text() !== '' && $(this).text() !== '0') {
			$(this).attr('disabled', 'true').css('cursor', 'wait');
			tools['PotionEnergy'].start();
		}
	}));
};
