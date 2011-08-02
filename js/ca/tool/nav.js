new tool('Nav');
tools['Gifter'].runtime = {};
tools['Gifter'].runtime['menu'] = {
	'Home': {
		url: 'index.php',
		items: {
			'Crusaders': {
				url: 'specialmembership.php'
			}
		}
	},
	'Festival': {
		url: 'festival_home.php',
		items: {
			'Battle': {
				url: 'festival_battle_home.php'
			},
			'Monster Tower': {
				url: 'festival_tower.php',
			},
			'Monster List': {
				url: 'festival_tower.php?tab=monster'
			},
			'Games': {
				url: 'festival_games.php',
			},
			'Feats': {
				url: 'festival_feat_nav.php'
			},
			'Quests': {
				url: 'festival_quests.php'
			}
		}
	},
	'Quests': {
		url: 'quests.php',
		items: {
			'Demi Quests': {
				url: 'symbolquests.php'
			},
			'Atlantis': {
				url: 'monster_quests.php'
			}
		}

	},
	'Battle': {
		url: 'battle.php',
		items: {
			'Battle Rank': {
				url: 'battlerank.php'
			},
			'War Rank': {
				url: 'war_rank.php'
			},
			'War Council': {
				url: 'war_council.php'
			},
			'Raid': {
				url: 'raid.php'
			},
			'Arena': {
				url: 'arena.php'
			}
		}
	},
	'Monster': {
		url: 'player_monster_list.php',
		items: {
			'Summon monster': {
				url: 'monster_summon_list.php'
			},
			'Monster class': {
				url: 'view_class_progress.php'
			},
			'Live feed': {
				url: 'army_news_feed.php'
			}
		}
	},
	'Generals': {
		url: 'generals.php',
		items: {
			'Heroes': {
				url: 'mercenary.php'
			}
		}
	},
	'Soldiers': {
		url: 'soldiers.php',
		items: {
			'Black smith': {
				url: 'item.php'
			},
			'Magic': {
				url: 'magic.php'
			},
			'Land': {
				url: 'land.php'
			}
		}
	},
	'Oracle': {
		url: 'oracle.php',
		items: {
			'Reinforcements': {
				url: 'reinforcements.php'
			},
			'Demi power': {
				url: 'symbols.php'
			},
			'Chest': {
				url: 'treasure_chest.php'
			}
		}
	},
	'Keep': {
		url: 'keep.php',
		items: {
			'Elite guard': {
				url: 'party.php'
			},
			'Achievements': {
				url: 'achievements.php'
			},
			'Alchemy': {
				url: 'alchemy.php'
			},
			'Goblin emporium': {
				url: 'goblin_emp.php'
			}
		}
	},
	'Gift': {
		url: 'gift.php',
		items: {
			'Invite': {
				url: 'army.php'
			},
			'View army': {
				url: 'army_member.php'
			},
			'Sent invites': {
				url: 'army_reqs.php'
			}
		}
	},
	'Guild': {
		url: 'guild.php'
	}
};
tools['Nav'].init = function () {
	$(document.body).append($('<div id="cageMenu"><ul></ul></div>').addClass('ui-widget ui-state-default'));
	$.each(tools['Gifter'].runtime['menu'], function(_i, _e) {
		console.log(_i);
		$('#cageMenu ul:first').append($('<li id="cageMenu'+_i+'">').hover( function() {
			$(this).find('ul').show();
		}, function() {
			$(this).find('ul').hide();
		}).append($('<button>' + _i + '</button>').click( function() {
			tools['Page'].loadPage(_e.url);
		})));
		if(_e.items) {
			$('#cageMenu'+_i).append('<ul class="cageSubMenu">');
			var _list = $('#cageMenu'+_i+' ul');
			$.each(_e.items, function(_item, _itemdata) {
				_list.append($('<li><button>' + _item + '</button></li>').click( function() {
					tools['Page'].loadPage(_itemdata.url);
				}))
			});
		}
	});
	$('#cageMenu ul li button').button().removeClass('ui-corner-all');
};