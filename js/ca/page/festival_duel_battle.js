// Festival duel
tools['Page'].runtime['festival_duel_battle.php'] = function() {

	console.log('Page: festival_duel_battle.php');

	var _sortOrder = item.get('cagePageFestivalDuelOrder', 'descending');

	function sortFestivalRank() {
		var _battles = {}, _battleSorted = [], _divs = $('table.layout div[style*="/graphics/festival_duelchampion/festival_duelchamp_line.jpg"]'), _parent = _divs.parent();
		_divs.each(function(_i, _e) {
			var _rank = ('0' + /Rank.*?(\d+)/.exec($(_e).text())[1]).slice(-2) + ('0' + _i).slice(-2);
			_battles[_rank] = _e;
			_battleSorted.push(_rank);
		});
		_battleSorted.sort();
		if(_sortOrder == 'descending') {
			_battleSorted.reverse()
		}
		_divs.remove();
		$.each(_battleSorted, function(_i, _e) {
			_parent.append(_battles[_e]);
		});
	}

	// Sorting
	$('#festival_menu').append('<div id="cageBattleListSort" style="color:white;position:absolute;margin-top:105px;font-size:16px;font-weight:bold;width:640px;text-align:center;">Sort by <span style="cursor:pointer;text-decoration:underline;">' + _sortOrder + '</span> rank / <span style="cursor:pointer;text-decoration:underline;">Reload</span></div>');

	$('#cageBattleListSort span:first').click(function() {
		_sortOrder = _sortOrder == 'descending' ? 'ascending' : 'descending';
		$(this).text(_sortOrder);
		item.set('cagePageFestivalDuelOrder', _sortOrder);
		sortFestivalRank();
	});

	$('#cageBattleListSort span:last').click(function() {
		tools.Page.loadPage('festival_duel_battle.php');
	});
	sortFestivalRank();

};
