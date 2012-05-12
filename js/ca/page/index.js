// Index
tools.Page.pages['index.php'] = function() {

	$('table:eq(1)').before('<div id="cageBattleNews"></div>');
	var xp = 0, bp = 0, wp = 0, cp = 0, cop = 0, win = 0, lose = 0, deaths = 0, cash = 0, list = [], users = {}, nemesis = {
		user : null,
		lose : 0
	}, last = null, oldest = null;
	$('#newsFeedSection span').parent().each(function() {
		if($(this).text().indexOf('ago') !== -1) {
			if(last === null) {
				last = $(this).text().trim();
			} else {
				oldest = $(this).text().trim();
			}
		}
	});
	$('#newsFeedSection div[id^="battle_messages_"] > div').each(function(i, el) {
		var txt = $(el).text().replace(/,/g, ''), my_xp = 0, my_bp = 0, my_wp = 0, my_cash = 0, my_cp = 0, my_cop = 0, result = 1, _uid;
		if(txt.match(/You were killed/i)) {
			killed = true;
			deaths++;
		} else {
			_uid = $('a:eq(0)', el).attr('href').match(/user=(\d+)/i)[1];
			if(!users[_uid]) {
				users[_uid] = {
					uid : _uid,
					win : 0,
					lose : 0
				}
			}
			if(txt.match(/Victory!|VICTORIOUS/i)) {
				win++;
				users[_uid].win++;
			} else {
				lose++;
				result = -1;
				users[_uid].lose++;
			}
			if(users[_uid].lose > nemesis.lose) {
				nemesis = {
					user : _uid,
					win : users[_uid].win,
					lose : users[_uid].lose
				}
			}
			my_xp = txt.match(/(\d+) experience/i);
			my_bp = txt.match(/(\d+) Battle Points!/i);
			my_wp = txt.match(/(\d+) War Points!/i);
			my_cp = txt.match(/(\d+) Champion Points!/i);
			my_cop = txt.match(/(\d+) Conquest Points!/i);
			my_cash = txt.match(/\$(\d+)/i);
			xp += parseInt( typeof my_xp == 'object' && my_xp !== null ? my_xp[1] : 0, 10);
			bp += parseInt( typeof my_bp == 'object' && my_bp !== null ? my_bp[1] : 0, 10) * result;
			wp += parseInt( typeof my_wp == 'object' && my_wp !== null ? my_wp[1] : 0, 10) * result;
			cp += parseInt( typeof my_cp == 'object' && my_cp !== null ? my_cp[1] : 0, 10) * result;
			cop += parseInt( typeof my_cop == 'object' && my_cop !== null ? my_cop[1] : 0, 10) * result;
			cash += parseInt( typeof my_cash == 'object' && my_cash !== null ? my_cash[1] : 0, 10) * result;
		}
	});
	if(last !== null) {
		console.log('nemesis:', nemesis);
		list.push('You were challenged <strong>' + (win + lose) + '</strong> times, winning <strong>' + win + '</strong> and losing <strong>' + lose + '</strong>.');
		list.push('You ' + (xp >= 0 ? 'gained <span class="positive">' : 'lost <span class="negative">') + xp + '</span> experience points.');
		list.push('You ' + (cash >= 0 ? 'gained <span class="positive">' : 'lost <span class="negative">') + '<b class="gold">$' + cash.toString().replace(/(\d)(?=(\d{3})+\b)/g, '$1,') + '</b></span>.');
		list.push('You ' + (bp >= 0 ? 'gained <span class="positive">' : 'lost <span class="negative">') + bp + '</span> Battle Points.');
		list.push('You ' + (wp >= 0 ? 'gained <span class="positive">' : 'lost <span class="negative">') + wp + '</span> War Points.');
		list.push('You ' + (cp >= 0 ? 'gained <span class="positive">' : 'lost <span class="negative">') + cp + '</span> Champion Points.');
		list.push('You ' + (cop >= 0 ? 'gained <span class="positive">' : 'lost <span class="negative">') + cop + '</span> Conquest Points.');
		list.push('<br>Last attack: ' + last.replace(':', ''));
		list.push('Oldest attack: ' + oldest.replace(':', ''));
		if(deaths) {
			list.push('You died ' + (deaths > 1 ? deaths + ' times' : 'once') + '!');
		}

		$('#cageBattleNews').html(list.join('<br>'));
		if(nemesis.user !== null) {
			$('#cageBattleNews').append($('<div id="cagePageKeepNemesisImg"><div style="background-image:url(\'http://graph.facebook.com/' + nemesis.user + '/picture?type=large\');"></div><div><strong style="width:150px;padding:0 0 3px 0;">Your Nemesis</strong><br><strong>Won</strong>' + nemesis.win + '<br><strong>Lost</strong>' + nemesis.lose + '<br></div></div>').click(function() {
				tools.Page.loadPage('keep.php?user=' + nemesis.user);
			}))
		}
	}

	$('div.indexRightCol:has(img[src*="/newiphone_ad_facebook.jpg"])').remove();
	$('div.indexRightCol').parent().prepend($('div.indexRightCol:last').detach());

};
