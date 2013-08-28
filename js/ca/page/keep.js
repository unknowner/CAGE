/** Keep */
tools.Page.pages['keep.php'] = function() {

	// Update potions
	tools.PotionStamina.work();
	tools.PotionEnergy.work();

	// Some more stats, like BSI, LSI... keep_data.attribute_section
	_data = [];
	_data.lvl = $('#main_sts_container').find('div:contains("Level"):last').text();
	_data.stats = $('#app_body').find('div[style="width:240px;height:54px;overflow:hidden;"]');
	if (_data.lvl && _data.stats.length > 0) {
		_data.lvl = parseInt(_data.lvl.match(/\d+/)[0], 10);
		// stats
		_data.eng = parseInt(_data.stats.eq(0).text(), 10);
		_data.sta = parseInt(_data.stats.eq(1).text(), 10);
		_data.att = /(\d+)(?:\s\((.\d+)?\))?/.exec(_data.stats.eq(2).text());
		_data.att = parseInt(_data.att[1], 10) + (_data.att[2] == null ? 0 : parseInt(_data.att[2], 10));
		// _data.def = parseInt(_data.stats.eq(3).text(), 10);
		_data.def = /(\d+)(?:\s\((.\d+)?\))?/.exec(_data.stats.eq(3).text());
		_data.def = parseInt(_data.def[1], 10) + (_data.def[2] == null ? 0 : parseInt(_data.def[2], 10));
		// calculated stats
		_data.eAt = (_data.att + _data.def * 0.7).toFixed(2);
		_data.eDe = (_data.def + _data.att * 0.7).toFixed(2);
		_data.bsi = Math.round((_data.att + _data.def) / _data.lvl * 100) / 100;
		_data.lsi = Math.round((_data.eng + _data.sta * 2) / _data.lvl * 100) / 100;
		_data.tsi = _data.bsi + _data.lsi;
		console.log(_data);
		$('#keepAltStats').before($('<div id="cageKeepStats">').append('<div><div>eAtt: ' + _data.eAt + '</div><div style="font-size:9px;">Effective Attack</div></div>').append('<div><div>eDef: ' + _data.eDe + '</div><div style="font-size:9px;">Effective Defense</div></div><div/><div/>').append('<div><div>BSI: ' + _data.bsi.toFixed(2) + '</div><div style="font-size:9px;">Battle Strength Index</div></div>').append('<div><div>LSI: ' + _data.lsi.toFixed(2) + '</div><div style="font-size:9px;">Levelling Speed Index</div></div>').append('<div><div>TSI: ' + _data.tsi.toFixed(2) + '</div><div style="font-size:9px;">Total Skillpoints per Level</div>'));
	}

	// Add stuff on others keep
	if ($('div.keep_main_section').length === 0) {
		if ($('#keep_battle_frm1').length === 0) {
			$('td.statsTB > div:eq(1)').append($('<div id="cageArmyKeep"><button>DISMISS</button></div>').click(function() {
				$('#AjaxLoadIcon').show();
				var _uid = $('td.statsTB').find('div *[uid]').attr('uid');
				get('army_member.php?action=delete&player_id=' + _uid, function() {
					tools.Page.loadPage('keep.php?user=' + _uid);
				});
			}));
		} else {
			tools.Facebook.CAPlayers(function(_ids) {
				if (_ids.indexOf($('td.statsTB').find('div *[uid]').attr('uid')) !== -1) {
					$('td.statsTB').children('div:eq(1)').append($('<div id="cageArmyKeep"><button>JOIN ARMY</button></div>').click(function() {
						$('#AjaxLoadIcon').show();
						var _uid = $('td.statsTB').find('div *[uid]').attr('uid');
						get('party.php?twt=jneg&jneg=true&user=' + _uid + '&lka=' + _uid + '&etw=9&ref=nf', function() {
							tools.Page.loadPage('keep.php?user=' + _uid);
						});
					}));
				}
			});
		}

	}
	_data = _uid = _divPow = _divItems = _divine = null;
};
