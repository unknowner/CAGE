new tool('Heal');

tools['Heal'].start = function() {
	if(parseInt($('#health_current_value').next().text(), 10) - parseInt($('#health_current_value').text(), 10) > 0) {
		if(CastleAge.bqh !== null) {
			$.get('keep.php?action=heal_avatar&do=heal wounds&bqh=' + CastleAge.bqh + '&signed_request=' + CastleAge.signed_request, function() {
				addFunction(function() {
					clearTimeout(timedStats['health']);
					stat_increase_ticker(0, $('#health_current_value').next().text(), $('#health_current_value').next().text(), 0, 0, 'health', false);
				}, null, true, true);
				tools['Heal'].done();
			});
		} else {
			$.get('keep.php?signed_request=' + CastleAge.signed_request, function(_data) {
				CastleAge.bqh = $('input[name="bqh"]:first', _data).attr('value');
				tools['Heal'].start();
			});
		}
	} else {
		tools['Heal'].done();
	}
};

tools['Heal'].done = function() {
	$('#cageHeal').removeAttr('disabled').css('cursor', 'pointer');
};
tools['Heal'].init = function() {
	$('body').append($('<button id="cageHeal"></button>').click(function() {
		$(this).attr('disabled', true).css('cursor', 'wait');
		tools['Heal'].start();
	}));
};
