// Festival duel
tools['Page'].runtime['festival_duel_battle.php'] = function() {

	console.log('Page: festival_duel_battle.php');

	function sortFestivalRank() {

		var _battles = {};
		var _sortOrder = [];
		var _divs = $('table.layout div[style*="/graphics/festival_duelchampion/festival_duelchamp_line.jpg"]');
		var _parent = _divs.parent();
		_divs.each(function(_i, _e) {
			var _rank = ('0' + /Rank.*?(\d+)/.exec($(_e).text())[1]).slice(-2) + ('0' + _i).slice(-2);
			_battles[_rank] = _e;
			_sortOrder.push(_rank);
		});
		if($('#cageBattleListSort span').text() == 'ascending') {
			_sortOrder.sort();
		} else {
			_sortOrder.sort().reverse()
		}
		_divs.remove();
		$.each(_sortOrder, function(_i, _e) {
			_parent.append(_battles[_e]);
		});
	}

	// Sorting
	$('#festival_menu').append('<div id="cageBattleListSort" style="color:white;position:absolute;margin-top:105px;font-size:16px;font-weight:bold;width:640px;text-align:center;">Sort by <span style="cursor:pointer;text-decoration:underline;">descending</span> rank</div>');

	$('#cageBattleListSort span').toggle(function() {
		$(this).text('ascending');
		sortFestivalRank();
	}, function() {
		$(this).text('descending');
		sortFestivalRank();
	});
	sortFestivalRank();

};
