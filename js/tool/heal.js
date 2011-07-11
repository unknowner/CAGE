new tool('Heal');

tools['Heal'].start[com.port.castleAge] = function () {
	if (parseInt($('#health_current_value').next().text(), 10) - parseInt($('#health_current_value').text(), 10) > 0) {
		if (CastleAge.bqh !== null) {
			$.get('keep.php?action=heal_avatar&do=heal wounds&bqh=' + CastleAge.bqh + '&signed_request=' + CastleAge.signed_request, function () {
				addFunction( function () {
					clearTimeout(timedStats['health']);
					stat_increase_ticker(0, $('#health_current_value').next().text(), $('#health_current_value').next().text(), 0, 0, 'health', false);
				}, null, true, true);
				tools['Heal'].done[com.port.castleAge]();
			});
		} else {
			$.get('keep.php?signed_request=' + CastleAge.signed_request, function (_data) {
				CastleAge.bqh = $('input[name="bqh"]:first', _data).attr('value');
				tools['Heal'].start[com.port.castleAge]();
			});
		}
	} else {
		tools['Heal'].done[com.port.castleAge]();
	}
};

tools['Heal'].done[com.port.castleAge] = function () {
	com.send(com.task.fbButtonEnable, com.port.facebook, 'Heal');
};

tools['Heal'].init[com.port.facebook] = function () {
	tools['Heal'].fbButton.add(chrome.i18n.getMessage("buttonHeal"), function () {
		tools['Heal'].fbButton.disable();
		com.send(com.task.heal, com.port.castleAge, null);
	});
};