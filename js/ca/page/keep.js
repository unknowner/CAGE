// Keep
tools['Page'].runtime['keep.php'] = function() {

	// Update potions
	tools.PotionStamina.work();
	tools.PotionEnergy.work();
	// folding units, items ...
	$('div.statsT2:has(div.statsTTitle)').css({
		'height' : 30,
		'overflow' : 'hidden',
		'cursor' : 'pointer'
	});
	// Some more stats, like BSI, LSI... keep_attribute_section
	var _lvl = $('#st_5 div:contains("Level"):last').text();
	var _stats = $('div.keep_attribute_section');
	if(_lvl && _stats.length > 0) {
		_lvl = parseInt(_lvl.match(/\d+/)[0], 10);
		//stats
		var _eng = parseInt($('div.attribute_stat_container:eq(0)', _stats).text(), 10);
		var _sta = parseInt($('div.attribute_stat_container:eq(1)', _stats).text(), 10);
		var _att = /(\d+)(?:\s\((.\d+)?\))?/.exec($('div.attribute_stat_container:eq(2)', _stats).text());
		_att = parseInt(_att[1], 10) + (_att[2] == undefined ? 0 : parseInt(_att[2], 10));
		var _def = parseInt($('div.attribute_stat_container:eq(3)', _stats).text(), 10);
		var _def = /(\d+)(?:\s\((.\d+)?\))?/.exec($('div.attribute_stat_container:eq(3)', _stats).text());
		_def = parseInt(_def[1], 10) + (_def[2] == undefined ? 0 : parseInt(_def[2], 10));
		//calculated stats
		var _eAt = _att + _def * 0.7;
		var _eDe = _def + _att * 0.7;
		var _bsi = Math.round((_att + _def) / _lvl * 100) / 100;
		var _lsi = Math.round((_eng + _sta * 2) / _lvl * 100) / 100;
		var _tsi = _bsi + _lsi;
		$('div.keep_healer_section').prepend($('<div id="cageKeepStats">').css({
			'backgroundColor' : '#000',
			'marginLeft' : 26,
			'marginTop' : -232,
			'opacity' : 0.8,
			'color' : 'white',
			'textAlign' : 'left',
			'padding' : 10,
			'height' : 204,
			'width' : 180
		}).append('<div>eAtt: ' + _eAt.toFixed(2) + '</div><div style="font-size:9px;">Effective Attack</div>').append('<div>eDef: ' + _eDe.toFixed(2) + '</div><div style="font-size:9px;">Effective Defense</div>').append('<div>BSI: ' + _bsi.toFixed(2) + '</div><div style="font-size:9px;">Battle Strength Index</div>').append('<div>LSI: ' + _lsi.toFixed(2) + '</div><div style="font-size:9px;">Levelling Speed Index</div>').append('<div>TSI: ' + _tsi.toFixed(2) + '</div><div style="font-size:9px;">Total Skillpoints per Level</div>'));
	}

	// Add stuff on others keep
	if($('#keep_battle_frm1').length == 0) {
		var _uid = $('td.statsTB > div *[uid]').attr('uid');
		$('td.statsTB > div:eq(1)').append($('<div id="cageArmyKeep"><button>DISMISS</button></div>').click(function() {
			$('#AjaxLoadIcon').show();
			get('army_member.php?action=delete&player_id=' + _uid, function() {
				tools.Page.loadPage('keep.php?user=' + _uid);
			});
		}));
	} else {
		var _uid = $('td.statsTB > div *[uid]').attr('uid');
		$('td.statsTB > div:eq(1)').append($('<div id="cageArmyKeep"><button>JOIN ARMY</button></div>').click(function() {
			$('#AjaxLoadIcon').show();
			get('party.php?twt=jneg&jneg=true&user=' + _uid + '&lka=' + _uid + '&etw=9&ref=nf', function() {
				tools.Page.loadPage('keep.php?user=' + _uid);
			});
		}));
	}

	$('div.statsTTitle').toggle(function() {
		var _this = this;
		$(this).parents('div.statsT2:first').css({
			'height' : '100%'
		});
	}, function() {
		$(this).parents('div.statsT2:first').css({
			'height' : 30
		});
	});
	$('div.statUnit a img').addClass('ui-corner-all');
	$('div.statUnit').find('div:last:contains(X)').addClass('itemNumbers');

};
