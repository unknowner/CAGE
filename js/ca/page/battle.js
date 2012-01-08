// Festival duel
tools['Page'].runtime['battle.php'] = function() {

	console.log('Page: battle.php');

	function sortBattlerank(_reverse) {
		var _battles = {};
		var _sort = [];
		var _heading = $('table.layout table:last tr:first');
		$('table.layout table:last').hide();
		$('table.layout table:last tr:has(td.action)').each(function(_i, _e) {
			_battles[('0' + /Battle.*?(\d+)/.exec($('td.bluelink div:eq(1)', _e).text())[1]).slice(-2) + ('0' + _i).slice(-2)] = _e;
			_sort.push(('0' + /Battle.*?(\d+)/.exec($('td.bluelink div:eq(1)', _e).text())[1]).slice(-2) + ('0' + _i).slice(-2));
			// /War.*?(\d+)/.exec($('td.bluelink div:eq(1)', _e).text());
		});
		$('table.layout table:last').empty();
		if(_reverse == true) {
			_sort.sort();
		} else {
			_sort.sort().reverse()
		}
		$.each(_sort, function(_i, _e) {
			$('table.layout table:last').append(_battles[_e]);
			$('table.layout table:last tbody').append('<tr><td colspan="5"><div style="background: #000;height: 1px;margin: 0 5px;"></td></tr>');
		});
		$('table.layout table:last').prepend('<tr><td colspan="5"><div style="background: #000;height: 1px;margin: 0 5px;"></td></tr>').prepend(_heading).show();
	}

	sortBattlerank();

};
