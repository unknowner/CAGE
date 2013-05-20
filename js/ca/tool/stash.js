tool('Stash');

tools.Stash.runtime = {};

tools.Stash.runtime.general = null;

tools.Stash.start = function() {

	tools.Stash.work();

};
tools.Stash.work = function() {
	tools.Stash.runtime.gold = parseInt($('#gold_current_value').text().match(/\d*/g).join(''), 10);
	signedGet('keep.php?do=Stash&stash_gold=' + tools.Stash.runtime.gold + '&bqh=' + CastleAge.bqh, function(_data) {
		_data = $($.parseHTML(noSrc(_data)));
		var _time_left = _data.find('#gold_time_sec');
		if (_time_left) {
			addFunction(function(gold_token_time_left_obj) {
				gold_increase_ticker(gold_token_time_left_obj, 0, $('#gold_current_recharge_time').val(), $('#gold_current_increment').val(), 'gold', true);
			}, JSON.stringify(_time_left.val()), true, true);
		}
		if ($('input[name="stash_gold"]').length > 0) {
			$('input[name="stash_gold"]').val('0');
			$('b.money').text($('b.money').text());
		}
		tools.Stash.runtime.stashTimer = window.setInterval(function() {
			tools.Stash.runtime.gold = tools.Stash.runtime.gold - (Math.pow(7, tools.Stash.runtime.gold.toString().length));
			if (tools.Stash.runtime.gold <= 0) {
				window.clearInterval(tools.Stash.runtime.stashTimer);
				tools.Stash.runtime.gold = 0;
			}
			$('#gold_current_value').text('$' + tools.Stash.runtime.gold.toString().replace(/(\d)(?=(\d{3})+\b)/g, '$1,'));
		}, 5);

	});
};
tools.Stash.done = function() {
	$('#cageStash').css({
		'cursor' : '',
		'backgroundSize' : '',
		'backgroundPosition' : '',
		'backgroundImage' : ''
	}).removeAttr('disabled');
};
tools.Stash.init = function() {
	$('#cageStatsContainer').append($('<button id="cageStash" title="Stash gold"></button>').click(function() {
		if ($('#gold_current_value').text() !== '$0') {
			$(this).css({
				'cursor' : 'wait',
				'backgroundSize' : '32px 32px',
				'backgroundPosition' : '-4px -4px',
				'backgroundImage' : 'url(\'http://image4.castleagegame.com/graphics/shield_wait.gif\')'
			}).attr('disabled', 'disabled');
			tools.Stash.start();
		}
	}));
};
