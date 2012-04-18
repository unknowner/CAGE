// public_monster_list.js
tools.Page.runtime['public_monster_list.php'] = function() {

	console.log('Page: public_monster_list.php');
	$('table.layout div > div > a > img[src*="pubmonster_button_"]:first').parents('div:eq(1)').attr('id', 'cageTiers').css('paddingLeft', 200).empty();

	$.each(['low', 'med', 'high'], function(_i, _e) {
		$('#cageTiers').append($('<img style="margin:0 2px;" class="imgButton" src="http://image4.castleagegame.com/graphics/pubmonster_button_' + _e + 'tier_' + (item.get('cagePagePublicMonsterListTier', 2) === _i + 1 ? 'on' : 'off') + '.gif">').click(function() {
			tools.Page.loadPage('public_monster_list.php?monster_tier=' + _i + 1);
			item.set('cagePagePublicMonsterListTier', _i + 1);
		}));
	});

};
