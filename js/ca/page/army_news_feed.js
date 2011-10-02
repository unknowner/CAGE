// army_news_feed
tools['Page'].runtime['army_news_feed.php'] = function() {

	console.log('Page: army_news_feed.php');

	if(tools['Assister'].runtime.Assisted !== undefined && tools['Assister'].runtime.Assisted.length > 0) {
	var _alogs = $('#action_logs');
	$('div:first', _alogs).append($('<div id="cageAssists" class="imgButton">Assists</div>').click(function() {
		$('#monster_tab, #guard_tab').css({
			'backgroundColor' : '#C6A56F',
			'color' : 'black'
		});
		$(this).css({
			'backgroundColor' : '#8C562A',
			'color' : 'white'
		});
		$('> a, div.cageAssisterList', _alogs).remove();
		$.each(tools['Assister'].runtime.Assisted, function(_i, _e) {
			_alogs.append($('<div class="cageAssisterList imgButton"><img class="cageAssisterListImage" src="' + _e.image + '"><div class="cageAssisterListName">Assisted for: ' + _e.name + '<br>Time left: ' + _e.timer + '</div><div class="cageAssisterListValues">' + _e.values.join('<br>') + '</div></div>').click(function() {
				tools['Page'].loadPage(_e.link);
			}))
		});
	}));
	}
};
