tool('Heal');

tools.Heal.start = function() {
	if(parseInt($('#health_current_value').next().text(), 10) - parseInt($('#health_current_value').text(), 10) > 0) {
		$.get('keep.php?signed_request=' + CastleAge.signed_request, function(_data) {
			CastleAge.bqh = $('input[name="bqh"]:first', _data).attr('value');
			post('keep.php?action=heal_avatar&bqh=' + CastleAge.bqh, function() {
				addFunction(function() {
					clearTimeout(timedStats['health']);
					stat_increase_ticker(0, $('#health_current_value').next().text(), $('#health_current_value').next().text(), 0, 0, 'health', false);
				}, null, true, true);
				tools.Heal.done();
			});
		});
	} else {
		tools.Heal.done();
	}
};

tools.Heal.done = function() {
	$('#cageHeal').removeAttr('disabled').css('cursor', 'pointer');
};
tools.Heal.init = function() {
	$('#cageStatsContainer').append($('<button id="cageHeal" title="Heal to full health"></button>').click(function() {
		$(this).attr('disabled', true).css('cursor', 'wait');
		tools.Heal.start();
	}));
};
