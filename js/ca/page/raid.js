// Festival duel
tools.Page.pages['raid.php'] = function() {

	console.log('Page: raid.php');
	$('#raid_invade_buttons > div[id^="raid_atk_lst"]').css({
		'position' : 'absolute'
	}).find('div > div > div').css('whiteSpace', 'nowrap');
	addFunction(function() {
		cur_raid_lst = 0;
		setRaidLst = function(diff, max_raid_lst) {
			console.log(diff, max_raid_lst, cur_raid_lst);
			var next_lst = cur_raid_lst + diff;
			if (next_lst < 0)
				next_lst = 0;
			else if (next_lst > max_raid_lst)
				next_lst = max_raid_lst;
			if (next_lst !== cur_raid_lst && $('#raid_atk_lst' + next_lst).text().length !== 0) {
				$('#raid_atk_lst' + cur_raid_lst).stop().fadeOut('fast');
				$('#raid_atk_lst' + next_lst).stop().fadeIn('fast');
				cur_raid_lst = next_lst;
			}
		};
	}, null, true, false);
};
