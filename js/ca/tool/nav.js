new tool('Nav');
tools['Nav'].runtime = {};
tools['Nav'].runtime['menu'] = {
	'Home' : {
		url : 'index.php',
		items : {
			'Crusaders' : {
				url : 'specialmembership.php'
			}
		}
	},
	'Festival' : {
		url : 'festival_home.php',
		items : {
			'Duel' : {
				url : 'festival_duel_home.php'
			},
			'Guild' : {
				url : 'festival_battle_home.php'
			},
			'Monster Tower I' : {
				url : 'festival_tower.php'
			},
			'Monster Tower II' : {
				url : 'festival_tower2.php'
			},
			'Games' : {
				url : 'festival_games.php'
			},
			'Feats' : {
				url : 'festival_feat_nav.php'
			},
			'Quests' : {
				url : 'festival_quests.php'
			}
		}
	},
	'Quests' : {
		url : 'quests.php',
		items : {
			'Demi Quests' : {
				url : 'symbolquests.php'
			},
			'Atlantis' : {
				url : 'monster_quests.php'
			}
		}

	},
	'Battle' : {
		url : 'battle.php',
		items : {
			'Battle Rank' : {
				url : 'battlerank.php'
			},
			'War Rank' : {
				url : 'war_rank.php'
			},
			'War Council' : {
				url : 'war_council.php'
			},
			'Raid' : {
				url : 'raid.php'
			},
			'Arena' : {
				url : 'arena.php'
			}
		}
	},
	'Monster' : {
		url : 'player_monster_list.php',
		items : {
			'Summon monster' : {
				url : 'monster_summon_list.php'
			},
			'Monster class' : {
				url : 'view_class_progress.php'
			},
			'Live feed' : {
				url : 'army_news_feed.php'
			},
			'Public monsters' : {
				url : 'public_monster_list.php'
			}
		}
	},
	'Generals' : {
		url : 'generals.php',
		items : {
			'Heroes' : {
				url : 'mercenary.php'
			}
		}
	},
	'Soldiers' : {
		url : 'soldiers.php',
		items : {
			'Black smith' : {
				url : 'item.php'
			},
			'Magic' : {
				url : 'magic.php'
			},
			'Land' : {
				url : 'land.php'
			}
		}
	},
	'Oracle' : {
		url : 'oracle.php',
		items : {
			'Reinforcements' : {
				url : 'reinforcements.php'
			},
			'Demi power' : {
				url : 'symbols.php'
			},
			'Chest' : {
				url : 'treasure_chest.php'
			}
		}
	},
	'Keep' : {
		url : 'keep.php',
		items : {
			'Elite guard' : {
				url : 'party.php'
			},
			'Achievements' : {
				url : 'achievements.php'
			},
			'Alchemy' : {
				url : 'alchemy.php'
			},
			'Goblin emporium' : {
				url : 'goblin_emp.php'
			}
		}
	},
	'Gift' : {
		url : 'gift.php',
		items : {
			'Invite' : {
				url : 'army.php'
			},
			'View army' : {
				url : 'army_member.php'
			},
			'Sent invites' : {
				url : 'army_reqs.php'
			}
		}
	},
	'Guild' : {
		url : 'guild.php'
	}
};
tools['Nav'].init = function() {

	$(document.body).append($('<div id="cageMenu"><ul></ul></div>').addClass('ui-widget ui-state-default'));
	tools['Nav'].start();

};
tools['Nav'].start = function() {

	if(CastleAge.inGuild !== null) {
		if(CastleAge.inGuild == true) {
			tools['Nav'].runtime['menu'].Guild = {
				url : 'guild.php',
				items : {
					'Management' : {
						url : 'guild_panel.php'
					},
					'Character Class' : {
						url : 'guild_class.php'
					},
					'Guild List' : {
						url : 'guild.php?guild_page=1'
					},
					'Guild Battles' : {
						url : 'guild_current_battles.php'
					},
					'Guild Monsters' : {
						url : 'guild_current_monster_battles.php'
					}
				}
			};
		}
		$.each(tools['Nav'].runtime['menu'], function(_i, _e) {
			$('#cageMenu ul:first').append($('<li id="cageMenu' + _i + '">').hover(function() {
				$(this).find('ul').show();
			}, function() {
				$(this).find('ul').hide();
			}).append($('<button>' + _i + '</button>').click(function() {
				tools['Page'].loadPage(_e.url);
			})));
			if(_e.items) {
				$('#cageMenu' + _i).append('<ul class="cageSubMenu">');
				var _list = $('#cageMenu' + _i + ' ul');
				$.each(_e.items, function(_item, _itemdata) {
					_list.append($('<li><button>' + _item + '</button></li>').click(function() {
						tools['Page'].loadPage(_itemdata.url);
					}));
				});
			}
		});
		$('#cageMenu ul li button').button().removeClass('ui-corner-all');
	} else {
		if(CastleAge.signed_request !== null) {
			$.get('guild.php?signed_request=' + CastleAge.signed_request, function(data) {
				CastleAge.inGuild = data.search(/tab_guild_current_battles/) == -1 ? false : true;
				tools['Nav'].start();
			});
		} else {
			window.setTimeout(tools['Nav'].start, 50);
		}
	}

};
