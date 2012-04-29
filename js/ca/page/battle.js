// Festival duel
tools.Page.pages['battle.php'] = function() {

	console.log('Page: battle.php');

	var _battles = {};
	var _heading = $('table.layout table:last tr:first');
	var _battlesSorted = [];
	var _sortOrder = item.get('cagePageBattleOrder', 'descending');
	var _sortType = item.get('cagePageBattleType', 'Battle Rank');

	function renderBattles() {
		var _table = $('table.layout table:last');
		_table.hide().empty();
		$.each(_battlesSorted, function(_i, _e) {
			_table.append(_battles[_e]);
			_table.append('<tr><td colspan="5"><div style="background: #000;height: 1px;margin: 0 5px;"></td></tr>');
		});
		_table.prepend('<tr><td colspan="5"><div style="background: #000;height: 1px;margin: 0 5px;"></td></tr>').prepend(_heading).show();
	}

	function chooseRank() {
		if(_sortType == 'Battle Rank') {
			sortBattleRank();
		} else {
			sortWarRank();
		}
	}

	function sortBattleRank() {
		_battlesSorted = [];
		$('table.layout table:last tr:has(td.action)').each(function(_i, _e) {
			_battles[('0' + /Battle.*?(\d+)/.exec($('td.bluelink div:eq(1)', _e).text())[1]).slice(-2) + ('0' + _i).slice(-2)] = _e;
			_battlesSorted.push(('0' + /Battle.*?(\d+)/.exec($('td.bluelink div:eq(1)', _e).text())[1]).slice(-2) + ('0' + _i).slice(-2));
		});
		item.set('cagePageBattleSortOrder', $('#cageBattleListSort span:last').text());
		_battlesSorted.sort();
		if($('#cageBattleListSort span:last').text() == 'descending') {
			_battlesSorted.reverse()
		}
		renderBattles();
	}

	function sortWarRank(_reverse) {
		_battlesSorted = [];
		$('table.layout table:last tr:has(td.action)').each(function(_i, _e) {
			_battles[('0' + /War.*?(\d+)/.exec($('td.bluelink div:eq(2)', _e).text())[1]).slice(-2) + ('0' + _i).slice(-2)] = _e;
			_battlesSorted.push(('0' + /War.*?(\d+)/.exec($('td.bluelink div:eq(2)', _e).text())[1]).slice(-2) + ('0' + _i).slice(-2));
		});
		if(_sortOrder == 'ascending') {
			_battlesSorted.sort();
		} else {
			_battlesSorted.sort().reverse()
		}
		renderBattles();
	}

	// Sorting
	$('table.layout table:last').before('<div id="cageBattleListSort" style="position:absolute;margin-top:3px;font-size:16px;font-weight:bold;margin-left:153px;">Sort by <span style="cursor:pointer;text-decoration:underline;">' + _sortType + '</span> - <span style="cursor:pointer;text-decoration:underline;">' + _sortOrder + '</span></div>');

	$('#cageBattleListSort span:first').click(function() {
		_sortType = _sortType == 'Battle Rank' ? 'War Rank' : 'Battle Rank';
		item.set('cagePageBattleType', _sortType);
		$(this).text(_sortType);
		chooseRank();
	});

	$('#cageBattleListSort span:last').click(function() {
		_sortOrder = _sortOrder == 'ascending' ? 'descending' : 'ascending';
		item.set('cagePageBattleOrder', _sortOrder);
		$(this).text(_sortOrder);
		chooseRank()
	});
	chooseRank();

};
