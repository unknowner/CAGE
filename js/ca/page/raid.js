// Festival duel
tools['Page'].runtime['raid.php'] = function() {

	console.log('Page: raid.php');
	$('#raid_invade_buttons > div[id^="raid_atk_lst"]').css({
		'position' : 'absolute'
	}).find('>div>div>div').css('whiteSpace', 'nowrap');
	addFunction(function() {
		setRaidLst = function(diff, max_raid_lst) {
			var next_lst = cur_raid_lst + diff;
			if(next_lst < 0)
				next_lst = 0;
			else if(next_lst > max_raid_lst)
				next_lst = max_raid_lst;
			if(next_lst !== cur_raid_lst && $('#raid_atk_lst' + next_lst).text().length !== 0) {
				$('#raid_atk_lst' + cur_raid_lst).fadeOut();
				$('#raid_atk_lst' + next_lst).fadeIn();
				cur_raid_lst = next_lst;
			}
		}
	}, null, true, false);
};
