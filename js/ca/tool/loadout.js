tool('Loadout');

tools.Loadout.init = function() {

	$('#cageSidebarStats').append('<div id="cageLoadoutDisplay" class="cageSidebarStat"><div>Loadouts</div><div></div></div>').append($('<button id="cageLoadoutSubmit" title="Update data"><div></div></button>').click(function() {

	}));
	$('#main_bn div img.imgButton[onclick*="action=select_loadout"]').each(function(_i, _e) {
		var _img = $(_e).parent('div').next('div').find('img').attr('src');
		if (_img !== undefined) {
			$('#cageLoadoutDisplay > div:last').append($('<input>').attr({
				'type' : 'image',
				'src' : _img,
				'onclick' : $(_e).attr('onclick').replace('\'index.php', '$(\'#PageURL\').val() + \'')
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
			}));
		}
	});
};
