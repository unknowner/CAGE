new tool('castleage');

tools.castleage.settings = function() {
	tools.castleage.runtimeUpdate();
	tools.Settings.heading('Castle Age');
	tools.Settings.text(language.cAgeheadText);
	tools.Settings.onoff(language.cAgeNoResults, tools.castleage.runtime.battleResults, 'castleageBattleResults', function() {
		tools.castleage.runtime.battleResults = !tools.castleage.runtime.battleResults;
		tools.castleage.results();
	});
	tools.Settings.onoff(language.cageNoHourly, tools.castleage.runtime.hourly, 'castleageHourly', function() {
		tools.castleage.runtime.hourly = !tools.castleage.runtime.hourly;
		tools.castleage.results();
	});
};

tools.castleage.runtimeUpdate = function() {
	if(!tools.castleage.runtime) {
		tools.castleage.runtime = {};
	}
	tools.castleage.runtime.battleResults = item.get('castleageBattleResults', false);
	tools.castleage.runtime.hourly = item.get('castleageHourly', false);
	tools.castleage.results();
};

tools.castleage.init = function() {
	tools.castleage.runtimeUpdate();
}

tools.castleage.results = function() {
	if(tools.castleage.runtime.battleResults || tools.castleage.runtime.hourly) {
		tools.castleage.allPagesAddOn = function() {
			var _re = [];
			if(tools.castleage.runtime.battleResults) {
				_re.push('You have now won a total');
			}
			if(tools.castleage.runtime.hourly) {
				_re.push('Dwarven Miner - Sorry Boss|Dwarven Miner - I found a nice|Your treasury is flourishing in Castle Age');
			}
			var _reg = new RegExp(_re.join('|'), "g");
			$('#results_main_wrapper div.results').each(function() {
				if($(this).text().match(_reg) !== null) {
					console.log('REMOVED BR');
					$(this).remove();
				}
			});
			if($('#results_main_wrapper div.results').length == 0) {
				$('#results_main_wrapper').hide();
			}
		}
	} else {
		tools.castleage.allPagesAddOn = null;
	}
};
