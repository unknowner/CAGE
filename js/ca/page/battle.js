// Festival duel
tools['Page'].runtime['battle.php'] = function() {

	console.log('Page: battle.php');

	var _battles = {};
	var _heading = $('table.layout table:last tr:first');
	var _sortOrder = [];

	function renderBattles() {
		$('table.layout table:last').hide().empty();
		$.each(_sortOrder, function(_i, _e) {
			$('table.layout table:last').append(_battles[_e]);
			$('table.layout table:last tbody').append('<tr><td colspan="5"><div style="background: #000;height: 1px;margin: 0 5px;"></td></tr>');
		});
		$('table.layout table:last').prepend('<tr><td colspan="5"><div style="background: #000;height: 1px;margin: 0 5px;"></td></tr>').prepend(_heading).show();
	}

	function sortBattleRank() {
		_sortOrder = [];
		$('table.layout table:last tr:has(td.action)').each(function(_i, _e) {
			_battles[('0' + /Battle.*?(\d+)/.exec($('td.bluelink div:eq(1)', _e).text())[1]).slice(-2) + ('0' + _i).slice(-2)] = _e;
			_sortOrder.push(('0' + /Battle.*?(\d+)/.exec($('td.bluelink div:eq(1)', _e).text())[1]).slice(-2) + ('0' + _i).slice(-2));
		});
		item.set('cagePageBattleSortOrder', $('#cageBattleListSort span:last').text());
		if($('#cageBattleListSort span:last').text() == 'ascending') {
			_sortOrder.sort();
		} else {
			_sortOrder.sort().reverse()
		}
		renderBattles();
	}

	function sortWarRank(_reverse) {
		_sortOrder = [];
		$('table.layout table:last tr:has(td.action)').each(function(_i, _e) {
			_battles[('0' + /War.*?(\d+)/.exec($('td.bluelink div:eq(2)', _e).text())[1]).slice(-2) + ('0' + _i).slice(-2)] = _e;
			_sortOrder.push(('0' + /War.*?(\d+)/.exec($('td.bluelink div:eq(2)', _e).text())[1]).slice(-2) + ('0' + _i).slice(-2));
		});
		if($('#cageBattleListSort span:last').text() == 'ascending') {
			_sortOrder.sort();
		} else {
			_sortOrder.sort().reverse()
		}
		renderBattles();
	}

	// Sorting
	$('table.layout table:last').before('<div id="cageBattleListSort" style="position:absolute;margin-top:3px;font-size:16px;font-weight:bold;margin-left:153px;">Sort by <span style="cursor:pointer;text-decoration:underline;">Battle Rank</span> - <span style="cursor:pointer;text-decoration:underline;">descending</span></div>');

	$('#cageBattleListSort span:first').toggle(function() {
		$(this).text('War Rank');
		sortWarRank();
	}, function() {
		$(this).text('Battle Rank');
		sortBattleRank();
	});

	$('#cageBattleListSort span:last').toggle(function() {
		$(this).text('ascending');
		if($('#cageBattleListSort span:first').text() == 'War Rank') {
			sortWarRank();
		} else {
			sortBattleRank();
		}
	}, function() {
		$(this).text('descending');
		if($('#cageBattleListSort span:first').text() == 'War Rank') {
			sortWarRank();
		} else {
			sortBattleRank();
		}
	});
	sortBattleRank();
};
