// Achievements
tools['Page'].runtime['achievements.php'] = function() {

	var _ach = {}, _sub = {
		'Sylvana' : 'Sylvanas the Sorceress Queen',
		'Dark Legion' : 'The Battle of the Dark Legion',
		'Thanatos' : 'Thanatos of Fire',
		'Skaar' : 'Skaar Deathrune'
	};
	$('#achievements_3 div.positive').each(function(_i, _e) {
		var _t = $(_e).parent().contents()[2].nodeValue.replace(/(,.*)|Slain/i, '').trim();
		_ach[_t] = {
			have : $(_e).text(),
			need : null
		};
	});
	console.log(_ach);
	$('#achievements_3 > div').each(function() {
		var _d = $('div:contains("Requires:"):last', this);
		if(_d.length > 0) {
			if(_d.text().indexOf('Dragons') > -1) {
				var _rg = /Requires: Slay (\d+)/.exec(_d.text());
				if(_rg !== null) {
					_ach.Dragons.need = _rg[1];
				}
			} else if(_d.text().indexOf('Construct') > -1) {
				var _rg = /Help Construct (\d+) siege weapons/i.exec(_d.text());
				_ach['Sieges Assisted With'].need = _rg[1];
			} else if(_d.text().indexOf('Slay') > -1) {
				var _ts, _rg = /Requires: Slay (.+) (\d+) times/i.exec(_d.text().replace(/(,.+)\s(?=\d+)/, ' '));
				if(_rg !== null) {
					_ts = _rg[1];
					if(_sub[_ts]) {
						_ts = _sub[_ts];
					}
					_ach[_ts].need = _rg[2];
				}
			}
		}
	});
	$('#achievements_3 div.positive').each(function(_i, _e) {
		var _t = $(_e).parent().contents()[2].nodeValue.replace(/(,.*)|Slain/i, '').trim();
		if(_ach[_t] && _ach[_t].have < _ach[_t].need) {
			$(_e).text(_ach[_t].have + '/' + _ach[_t].need);
		}
	});
};
