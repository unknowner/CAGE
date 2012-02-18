tool('PotionStamina');

tools.PotionStamina.start = function() {
	$.post('keep.php', {
		'consume' : true,
		'item' : 2,
		'ajax' : 1,
		'signed_request' : CastleAge.signed_request
	}, function(_data) {
		if($('span.result_body:contains("You consumed")', _data).length > 0) {
			addFunction(function(data) {
				cageStat.stamina = data.stamina;
			}, JSON.stringify({
				stamina : parseInt($('#stamina_current_value').text(), 10) + 10
			}), true, true);
		}
		tools.PotionStamina.work(_data);
		tools.PotionStamina.done();
	});
};
// Parse keep for stamina potions
tools.PotionStamina.work = function(_pagedata) {
	if(_pagedata == null) {
		_pagedata = $('#app_body');
	}
	var _potions = /\d+/.exec($('img[alt="Stamina Potion"]', _pagedata).parent().next().text());
	if(_potions !== null) {
		$('#cagePotionStamina > span.cagePotionCount').text(_potions[0]);
	} else {
		$('#cagePotionStamina > span.cagePotionCount').text('');
	}
};
tools.PotionStamina.done = function() {
	$('#cagePotionStamina').removeAttr('disabled').css('cursor', 'pointer');
};
tools.PotionStamina.init = function() {
	$('#cageStatsContainer').append($('<button id="cagePotionStamina" title="Use stamina potion if available"><span class="cagePotionCount"></span></button>').click(function() {
		if($(this).text() !== '' && $(this).text() !== '0') {
			$(this).attr('disabled', 'true').css('cursor', 'wait');
			tools.PotionStamina.start();
		}
	}));
};
