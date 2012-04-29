// public_monster_list.js
/*
tools.Page.runtime['public_monster_list.php'] = {
	tier : null
};

tools.Page.pages['public_monster_list.php'] = function() {

	console.log('Page: public_monster_list.php');
	// add all tiers to public monsters
	var $buttons = $('table.layout div > div > a > img[src*="pubmonster_button_"]'), _current = $buttons.filter('[src$="on.gif"]').attr('src');
	_current = tools.Page.runtime['public_monster_list.php'].tier === null ? _current : tools.Page.runtime['public_monster_list.php'].tier;
	$buttons.parents('div:eq(1)').attr('id', 'cageTiers').css('paddingLeft', 200).empty();
	$.each(['low', 'med', 'high'], function(_i, _e) {
		$('#cageTiers').append($('<img>').css({
			'margin' : '0 2px'
		}).addClass('imgButton').attr('src', 'http://image4.castleagegame.com/graphics/pubmonster_button_' + _e + 'tier_' + (_current.match(_e) ? 'on' : 'off') + '.gif').click(function() {
			tools.Page.runtime['public_monster_list.php'].tier = _e;
			var _link = $('#mainMenu_monster').find('a:contains("Public List")'), _oc = _link.attr('onclick').replace(/=3/g, '=' + (_i + 1)), _hr = _link.attr('href').replace(/=3/g, '=' + (_i + 1));
			_link.attr('onclick', _oc);
			_link.attr('href', _hr);
			console.log(_link);
			tools.Page.loadPage('public_monster_list.php?monster_tier=' + (_i + 1));
		}));
	});

};
*/