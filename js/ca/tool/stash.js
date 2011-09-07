new tool('Stash');

tools['Stash'].runtime = {};

tools['Stash'].runtime.general = null;

tools['Stash'].start = function() {

	tools['Stash'].runtime.general = tools['General'].current;
	if(tools['General'].runtime.general['Aeris'] !== null && tools['General'].current !== "Aeris") {
		tools['General'].setByName('Aeris', tools['Stash'].work);
	} else {
		tools['Stash'].work();
	}

};
tools['Stash'].work = function() {
	$.get('keep.php?do=Stash&stash_gold=' + $('#gold_current_value').text().match(/\d*/g).join('') + '&bqh=' + CastleAge.bqh + '&signed_request=' + CastleAge.signed_request, function(_data) {
		var _time_left = $('#gold_time_sec', _data);
		if(_time_left) {
			addFunction(function(gold_token_time_left_obj) {
				gold_increase_ticker(gold_token_time_left_obj, 0, $('#gold_current_recharge_time').val(), $('#gold_current_increment').val(), 'gold', true);
			}, JSON.stringify(_time_left.val()), true, true);
		}
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
		tools['Stash'].start();
	});
};
