tool('Loadout');

tools.Loadout.init = function() {

	$('#cageSidebarStats').append('<div id="cageLoadoutDisplay" class="cageSidebarStat"><div>Loadouts</div><div></div></div>').append($('<button id="cageLoadoutSubmit" title=""><div></div></button>').click(function() {
		tools.Page.loadPage('player_loadouts.php');
	}));
	$('#cageLoadoutDisplay').append($('#hot_swap_loadouts_div select[name="choose_loadout"]').attr('id', 'chooseLoadout').detach());

	addFunction(function() {
		console.log("validLoadouts:" + Object.keys(validLoadouts).length);
		$('#chooseLoadout').attr('Loadouts', Object.keys(validLoadouts).length);
	}, null, true, true);

	customEvent('ChooseLoadout', function(_evt) {
		tools.General.get();
	});

	var maxLoadouts = $('#chooseLoadout').attr('Loadouts');
	$('#chooseLoadout option').each(function(a, b) {
		if ($(this).val()*1 > maxLoadouts) {
			$(this).remove();
		}
	});
};
