// monsterquests
tools['Page'].runtime['monsterquests.php'] = function () {

	$('div.quest_act_gen:not(:has(img[src*="nogen.gif"]))').each( function() {
		$(this).append(
		$('<img class="CAGEQuestSwitchGeneral" src="http://image4.castleagegame.com/graphics/quick_switch_button.gif">').click( function() {
			var _img = $(this);
			_img.fadeOut();
			tools['General'].setByName(_img.prevAll('img').attr('title'), function() {
				_img.fadeIn();
			});
		})
		.css({
			'top'	: -17,
			'position'	: 'relative',
			'width'		: 78,
			'cursor'	: 'pointer'
		})
		)
		.find('img:first').unwrap();
	});
};