tool('Stats');

tools.Stats.start = function() {

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
