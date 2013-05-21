tool('Loadout');

tools.Loadout.init = function() {

	$('#cageSidebarStats').append('<div id="cageLoadoutDisplay" class="cageSidebarStat"><div>Loadouts</div><div></div></div>').append($('<button id="cageLoadoutSubmit" title=""><div></div></button>').click(function() {

	}));
	$('#main_bn div img.imgButton[onclick*="action=select_loadout"]').each(function(_i, _e) {

		var _img = $(_e).parent('div').next('div').find('img').attr('src');
		var _loadoutNum = /loadout=(\d+)/.exec($(_e).attr('onclick'))[1];

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
			signedGet('index.php?&action=select_loadout&loadout=' + _loadoutNum, function(_data) {
				$data = $($.parseHTML(noSrc(_data)));
				$('#main_bn').html($data.find('#main_bn').html());
				var _i = $('#main_bn').find('div > img[style="width:24px;height:24px;"]');
				if ($('div.generalContainerBox').length == 1) {
					$('div.generalContainerBox').next('div').html(noNoSrc($data.find('div.generalContainerBox').next('div')).html());
				}
				setTimeout(function() {
					if (_i.length > 0) {
						_i.each(function() {
							$(this).attr('src', $(this).attr('nosrc')).attr('nosrc', '');
						});
						$('#cageGeneralEquipment').empty().append(_i);
					}
				}, 100);
				tools.Stats.update($('#main_sts', $data));
				tools.General.parsePage(_data);
				$('#cageLoadoutSubmit').css({
					'cursor' : 'wait',
					'backgroundImage' : 'url(\'http://image4.castleagegame.com/graphics/achivement_tabicons_conquest_duel_rank.gif\')'
				});
			});
		});

	});
};
