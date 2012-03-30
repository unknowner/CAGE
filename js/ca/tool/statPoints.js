tool('StatPoints');

tools.StatPoints.update = function() {
	if($('#main_bntp a:contains("My Stats")').text().match(/\d+/g) !== null) {
		$('#cageStatPoints > span').text($('#main_bntp a:contains("My Stats")').text().match(/\d+/g)[0]);
		$('#cageStatPoints').css('backgroundImage', 'url(\'http://image4.castleagegame.com/graphics/keep_upgrade_orange.gif\')');
	} else {
		$('#cageStatPoints > span').text('');
		$('#cageStatPoints').css('backgroundImage', 'url(\'http://image4.castleagegame.com/graphics/keep_upgrade_green.gif\')');
	}
};

tools.StatPoints.start = function() {
	if($('#cageStatPoints').text() === '') {
		return false;
	}
	$('#cageStatPoints').css({
		'cursor' : 'wait',
		'backgroundSize' : '32px 32px',
		'backgroundPosition' : '-4px -4px',
		'backgroundImage' : 'url(\'http://image4.castleagegame.com/graphics/shield_wait.gif\')'
	}).attr('disabled', 'disabled').find('img').hide();
	get('keep.php', function(_data) {
		$('#cageStatPoints').css({
			'cursor' : '',
			'backgroundSize' : '',
			'backgroundPosition' : '',
			'backgroundImage' : ''
		}).removeAttr('disabled');
		tools.StatPoints.update();
		var _sp = {
			have : parseInt($('#cageStatPoints').text(), 10),
			used : 0
		}, _stat = {}, _stats = $('div.keep_attribute_section div.attribute_stat_container', _data);
		_stat.energy = {
			im : 'stat_energy.gif',
			val : parseInt(_stats.eq(0).text(), 10),
			lup : 0,
			url : 'energy_max'
		};
		_stat.stamina = {
			im : 'stat_stamina.gif',
			val : parseInt(_stats.eq(1).text(), 10),
			lup : 0,
			url : 'stamina_max'
		};
		_stat.attack = {
			im : 'demi_symbol_2.gif',
			val : parseInt(_stats.eq(2).text(), 10),
			lup : 0,
			url : 'attack'
		};
		_stat.defense = {
			im : 'demi_symbol_3.gif',
			val : parseInt(_stats.eq(3).text(), 10),
			lup : 0,
			url : 'defense'
		};
		_stat.health = {
			im : 'stat_health.gif',
			val : parseInt(_stats.eq(4).text(), 10),
			lup : 0,
			url : 'health_max'
		};
		$('body').append('<div id="cageLevelUp"><div></div><div><div id="cageLevelUpTop">Upgrade your stats!</div><div id="cageLevelUpMiddle"></div><div id="cageLevelUpBottom"></div></div></div>');
		var _cLU = $('#cageLevelUpMiddle');
		$.each(_stat, function(_i, _e) {
			_cLU.append('<div class="cageLevelUpStat"><img src="http://image4.castleagegame.com/graphics/' + _e.im + '"><span class="cageLevelUpStatName">' + _i + '</span><span class="cageLevelUpStatVal">' + _e.val + '</span><img class="cageLevelUpPlus" src="http://image4.castleagegame.com/graphics/festival_achievement_plus.jpg"><img class="cageLevelUpMinus" src="http://image4.castleagegame.com/graphics/festival_achievement_minus.jpg"></div>')
		});
		_cLU.append($('<img id="cageLevelUpSave" src="http://image4.castleagegame.com/graphics/war_select_button_accept_2.gif">').click(function() {
			$('#cageLevelUpCancel, #cageLevelUpSave').fadeOut();
			$('#main_bntp a:contains("My Stats")').text(_sp.have - _sp.used);
			function setStat(_up) {
				console.log('setStat');
				if(_up.length > 0) {
					get('keep.php?' + _up.pop(), function(_data) {
						console.log('setStat...loaded');
						$('#cageLevelUpBar > div ').css('width', ((_max - _up.length) / _max * 100).toString() + '%');
						tools.Stats.update(_data);
						setStat(_up);
					});
				} else {
					tools.StatPoints.update();
					$('#cageLevelUp').fadeOut('slow', function() {
						$(this).remove();
					})
				}
			}

			var _points = [], _max;
			$.each(_stat, function(_i, _e) {
				if(_e.lup > 0) {
					for(var i = 0; i < _e.lup; i++) {
						_points.push('upgrade=' + _e.url);
					};
				}
			});
			_max = _points.length;
			console.log(_max);
			setStat(_points);
		}));
		_cLU.append($('<img id="cageLevelUpCancel" src="http://image4.castleagegame.com/graphics/war_select_button_cancel.gif">').click(function() {
			tools.StatPoints.update();
			$('#cageLevelUp').fadeOut('slow', function() {
				$(this).remove();
			})
		}));
		_cLU.append('<div id="cageLevelUpSP">Stat Points<br>' + _sp.have + '</div><div id="cageLevelUpBar"><div></div></div>');
		_cLU.find('div.cageLevelUpStat').each(function() {
			var _this = $(this);
			$('img.cageLevelUpPlus', _this).click(function() {
				var _s = $('span.cageLevelUpStatName', _this).text().toLowerCase();
				if(_sp.used + (_s == 'stamina' ? 2 : 1) <= _sp.have) {
					_sp.used += _s == 'stamina' ? 2 : 1;
					_stat[_s].lup += 1;
					$('#cageLevelUpSP').html('Stat Points<br>' + (_sp.have - _sp.used));
					$('span.cageLevelUpStatVal', _this).css('color', '#d00').text(_stat[_s].val + _stat[_s].lup);
				}
			});
			$('img.cageLevelUpMinus', _this).click(function() {
				var _s = $('span.cageLevelUpStatName', _this).text().toLowerCase();
				if(_sp.used > 0 && _stat[_s].lup > 0) {
					_sp.used -= _s == 'stamina' ? 2 : 1;
					_stat[_s].lup -= 1;
					$('#cageLevelUpSP').html('Stat Points<br>' + (_sp.have - _sp.used));
					$('span.cageLevelUpStatVal', _this).text(_stat[_s].val + _stat[_s].lup).css('color', _stat[_s].lup === 0 ? '#000' : '#d00');
				}
			});
		});
		$('#cageLevelUp').show();
	});
};
tools.StatPoints.init = function() {

	$('#cageStatsContainer').append($('<button id="cageStatPoints"><span></span></button>').click(tools.StatPoints.start));
	tools.Page.runtime.addOn['tools.StatPoints.update'] = tools.StatPoints.update;

};
