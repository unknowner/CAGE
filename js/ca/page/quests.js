// quests
tools['Page'].runtime['quests.php'] = function () {

	$('div.quest_act_gen:not(:has(img[src*="nogen.gif"]))').each( function() {
		$(this).append(
			$('<img class="cageQuestSwitchGeneral" src="http://image4.castleagegame.com/graphics/quick_switch_button.gif">').click( function() {
				var _img = $(this);
				_img.fadeOut();
				tools['General'].setByName(_img.prevAll('img').attr('title'), function() {
					_img.fadeIn();
				});
			})
		)
		.find('img:first').unwrap();
	});
};