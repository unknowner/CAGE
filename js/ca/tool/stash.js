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
	get('keep.php?do=Stash&stash_gold=' + $('#gold_current_value').text().match(/\d*/g).join('') + '&bqh=' + CastleAge.bqh, function(_data) {
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
	$('#cageStash').removeAttr('disabled').css('cursor', 'pointer');
	//tools['Stash'].fbButton.enable();
};
tools['Stash'].init = function() {
	$('body').append($('<button id="cageStash"></button>').click(function() {
		if($('#gold_current_value').text() !== '$0') {
			$(this).attr('disabled', 'true').css('cursor', 'wait');
			tools['Stash'].start();
		}
	}));
	/*tools['Stash'].fbButton.add(chrome.i18n.getMessage("buttonStash"), function() {
	 if($('#gold_current_value').text() !== '$0') {
	 tools['Stash'].fbButton.disable();
	 tools['Stash'].start();
	 }
	 });*/
};
