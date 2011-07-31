new tool('Stash');

tools['Stash'].runtime = {};

tools['Stash'].runtime.general = null;

tools['Stash'].start = function() {

	if(tools['General'].general['Aeris'] !== null) {
		tools['Stash'].runtime.general = tools['General'].current;
		tools['General'].setByName('Aeris', tools['Stash'].work);
	} else {
		tools['Stash'].work();
	}

};
tools['Stash'].work = function() {
	$.get('keep.php?do=Stash&stash_gold=' + $('#gold_current_value').text().match(/\d*/g).join('') + '&bqh=' + CastleAge.bqh + '&signed_request=' + CastleAge.signed_request, function() {
		addFunction( function() {
			clearTimeout(timedStats['gold']);
			stat_increase_ticker(0, 0, 0, 0, 0, 'gold', false);
		}, null, true, true);
		if($('input[name="stash_gold"]').length > 0) {
			$('input[name="stash_gold"]').val('0');
			$('b.money').text($('b.money').text());
		}
		$('#gold_current_value').text('$0');
		if(tools['Stash'].runtime.general !== tools['General'].current) {
			tools['General'].setByName(tools['Stash'].runtime.general, tools['Stash'].done);
		} else {
			tools['Stash'].done();
		}
	});
};
tools['Stash'].done = function() {
	tools['Stash'].fbButton.enable();
};
tools['Stash'].init = function() {
	tools['Stash'].fbButton.add(chrome.i18n.getMessage("buttonStash"), function() {
		tools['Stash'].fbButton.disable();
		com.send(com.task.startStash, com.port.castleAge, null);
	});
};