tool('Loadout');

tools.Loadout.init = function() {
	tools.Loadout.runtimeUpdate();
	$('#cageSidebarStats').append('<div id="cageLoadoutDisplay" class="cageSidebarStat"><div>Loadouts</div><div></div></div>').append($('<button id="cageLoadoutSubmit" title="Update data"><div></div></button>').click(function() {

	}));
	$('#main_bn div img.imgButton[src*="/graphics/load_btn_set"]').each(function(_i, _e) {
		var _img = $(_e).parent('div').next('div').find('img').attr('src');
		if (_img !== undefined) {
			$(_e).attr('src', _img);
		}
		$('#cageLoadoutDisplay > div:last').append(_e);
	});
};

tools.Loadout.runtimeUpdate = function() {

};

tools.Loadout.start = function() {

};

tools.Loadout.done = function() {

};
