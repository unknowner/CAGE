tool('Stats');

tools.Stats.update = function(_data) {

	$('#gold_current_value').text($('#gold_current_value_amount', _data).val().replace(/(\d)(?=(\d{3})+\b)/g, '$1,'));

	$('#stamina_current_value').text($('#stamina_current_value_amount', _data).val());
	$('#stamina_current_value').next('span').text($('#stamina_current_max', _data).val());

	$('#energy_current_value').text($('#energy_current_value_amount', _data).val());
	$('#energy_current_value').next('span').text($('#energy_current_max', _data).val());

	$('#health_current_value').text($('#health_current_value_amount', _data).val());
	$('#health_current_value').next('span').text($('#health_current_max', _data).val());
	
};
tools.Stats.init = function() {

	$('#cageStatsContainer')
		.append('<div id="cageFavorPoints"><img src="http://image4.castleagegame.com/graphics/favor_icon.jpg"><span></div>')
		.append('<div id="cageStatPoints"><img src="http://image4.castleagegame.com/graphics/keep_upgrade_green.gif"><span></div>');

	$('#main_sts_container')
		.prepend('<div id="cageStatBGGold" class="cageStatBackground"><div></div><hr/><div>Gold</div></div>')
		.prepend('<div id="cageStatBGEnergy" class="cageStatBackground"><div></div><hr/><div>Energy</div></div>')
		.prepend('<div id="cageStatBGHealth" class="cageStatBackground"><div></div><hr/><div>Health</div></div>')
		.prepend('<div id="cageStatBGStamina" class="cageStatBackground"><div></div><hr/><div>Stamina</div></div>')
		.prepend('<div id="cageStatBGLevel" class="cageStatBackground"><div></div><div>-</div></div>');

};
