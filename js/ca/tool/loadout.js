tool('Loadout');

tools.Loadout.init = function() {

	$('#cageSidebarStats').append('<div id="cageLoadoutDisplay" class="cageSidebarStat"><div>Loadouts</div><div></div></div>').append($('<button id="cageLoadoutSubmit" title=""><div></div></button>').click(function() {
		tools.Page.loadPage('player_loadouts.php');
	}));
	$('#hot_swap_loadouts_content_div img.imgButton').each(function(_i, _e) {

		var _img = $(_e).parent('div').next('div').find('img').attr('src');
		var _loadoutNum = /\d+/.exec($(_e).attr('onclick'))[0];

		if (_img !== undefined) {
			$('#cageLoadoutDisplay > div:last').append($('<input>').attr({
				'id' : 'cageLoudout' + _loadoutNum,
				'type' : 'image',
				'src' : _img,
			}).hover(function() {
				$(this).stop().animate({
					'height' : 28,
					'width' : 28,
					'top' : -2,
					'marginRight' : -4,
					'marginLeft' : -1
				}, 'fast');
			}, function() {
				$(this).stop().animate({
					'height' : 20,
					'width' : 20,
					'top' : '',
					'marginRight' : '',
					'marginLeft' : 3
				}, 'fast');
			}).removeAttr('onclick'));
		}

		$('#cageLoudout' + _loadoutNum).click(function() {
			$('#cageLoadoutSubmit').css({
				'cursor' : 'wait',
				'backgroundImage' : 'url(\'http://image4.castleagegame.com/graphics/shield_wait.gif\')'
			});

			addFunction(function(lo) {
				doHotSwapLoadout(lo.num);
			}, JSON.stringify({
				num : _loadoutNum
			}), true, true);

			customEvent('ChangeLoadout', function(_evt) {
				var _i = $('#hot_swap_gen_incl_container').find('div > img[style="width:24px;height:24px;"]');
				tools.General.get();
				$('#cageLoadoutSubmit').css({
					'cursor' : 'pointer',
					'backgroundImage' : 'url(\'http://image4.castleagegame.com/graphics/achivement_tabicons_conquest_duel_rank.gif\')'
				});
			});
		});

	});
};
