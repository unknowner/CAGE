tool('COPTER');

tools.COPTER.settings = function() {
	tools.Settings.heading('COPTER');
	tools.Settings.text('Link your <a target="_blank" href="http://copter.bomhofintegrated.com">COPTER</a> account with CAGE. Create the link in COPTER and enter it here, after hitting submit you\'re done.');
	tools.Settings.textbox('COPTER\'s CAGE link', tools.COPTER.runtime.link, 'cageCOPTERLink', tools.COPTER.runtimeUpdate);
};

tools.COPTER.API = {
	status : 'status',
	best_offensive_general : 'best_offensive_general',
	best_defensive_general : 'best_defensive_general',
	update_stats : 'update_stats',
	update_generals : 'update_generals',
	update_soldiers : 'update_soldiers',
	update_items : 'update_items',
	update_magic : 'update_magic',
	update_land : 'update_land'
};

tools.COPTER.runtimeUpdate = function() {
	tools.COPTER.runtime = {
		tries : 0,
		link : item.get('cageCOPTERLink', ''),
		last : null,
		connected : false,
		dialogId : null
	};
	tools.COPTER.request(tools.COPTER.API.status);
};

tools.COPTER.init = function() {
	// init copter event
	customEvent('COPTERcallback', function(_evt) {
		tools.COPTER.receiver($('#COPTERcallback').val());
	});
	tools.COPTER.runtimeUpdate();
};

tools.COPTER.done = function() {
	$('#cageCOPTERSubmit').css({
		'cursor' : '',
		'backgroundSize' : '',
		'backgroundPosition' : '',
		'backgroundImage' : ''
	}).removeAttr('disabled');
	tools.COPTER.runtime.dialogId = null;
};

tools.COPTER.request = function(_req, _data) {
	if (tools.COPTER.runtime.link !== '') {
		var _ajaxData = {
			'cage_id' : tools.COPTER.runtime.link
		};
		$.extend(_ajaxData, _data);
		tools.COPTER.runtime.last = _req;
		$.ajax({
			type : 'POST',
			url : 'http://copter.bomhofintegrated.com/cage/' + _req,
			data : _ajaxData,
			// contentType : 'application/json',
			dataType : 'json',
			// jsonpCallback : 'fireCOPTERcallback',
			success : function(data) {
				tools.COPTER.receiver(data)
			}
			// success : function(_data) {
			// 	console.log('Data', _data);
			// }
		});
	} else {
		$('#cageCOPTERDisplay').remove();
	}
};

tools.COPTER.receiver = function(_data) {
	console.log('COPTER:', tools.COPTER.runtime.last, _data);
	var _copter = _data, _done = false;
	if (_copter.status == 'successful' || _copter.status == 'connected') {
		switch (tools.COPTER.runtime.last) {
			case tools.COPTER.API.status:
				if (_copter.status == 'connected') {
					tools.COPTER.runtime.connected = true;
					tools.COPTER.addDisplay();
				}
				break;
			case tools.COPTER.API.best_offensive_general:
				tools.General.setByName(_copter.name);
				_done = true;
				break;
			case tools.COPTER.API.best_defensive_general:
				tools.General.setByName(_copter.name);
				_done = true;
				break;
			case tools.COPTER.API.update_stats:
				_done = true;
				break;
			case tools.COPTER.API.update_generals:
				note('COPTER', _copter.results);
				_done = true;
				break;
			case tools.COPTER.API.update_soldiers:
				note('COPTER', _copter.results);
				_done = true;
				break;
			case tools.COPTER.API.update_items:
				note('COPTER', _copter.results);
				_done = true;
				break;
			case tools.COPTER.API.update_magic:
				note('COPTER', _copter.results);
				_done = true;
				break;
			case tools.COPTER.API.update_land:
				note('COPTER', _copter.results);
				_done = true;
				break;
		}
	} else if (_copter.status == 'failed') {
		$('<div>').text('Sorry, the last request failed: ' + _copter.results).dialog({
			title : 'COPTER',
			resizable : false,
			zIndex : 3999,
			width : 440,
			minHeight : 0,
			position : [
					'center', 150
			],
			draggable : false,
			buttons : {
				"Ok" : function() {
					$(this).dialog("close").remove();
				}
			},
			autoOpen : true
		});
		_done = true;
	}
	tools.COPTER.runtime.last = null;
	if (_done === true) {
		$(tools.COPTER.runtime.dialogId).find('button.cancel').click();
		tools.COPTER.done();
	} else {
		$(tools.COPTER.runtime.dialogId).find('div.cageDialogText > button').removeAttr('disabled').removeClass('ui-state-hover').css('opacity', 1);
	}
};

tools.COPTER.getStats = function(_callback) {
	signedGet('keep.php', function(_data) {
		_data = $(noSrc(_data));
		var _stats = _data.find('div[style="width:240px;height:54px;overflow:hidden;"]'), _stat = {
			stats : {
				energy : _stats.eq(0).text().trim().match(/\d+/)[0],
				stamina : _stats.eq(1).text().trim().match(/\d+/)[0],
				attack : _stats.eq(2).text().trim().match(/\d+/)[0],
				defense : _stats.eq(3).text().trim().match(/\d+/)[0],
				health : _stats.eq(4).text().trim().match(/\d+/)[0],
				army_size : _stats.eq(5).text().match(/\d+/)[0],
				level : $('#st_5').text().match(/\d+/)[0]
			}
		};
		console.log(_stat);
		_callback(_stat);
	});
};

tools.COPTER.getSoldiers = function(_callback) {
	signedGet('soldiers.php', function(_data) {
		var _copterSoldiers = {
			soldiers : {}
		};
		var _soldiers = [],
			_src = _data ? 'nosrc' : 'src';
		_data = _data ? $(noSrc(_data)) : $('#app_body');
		_data.find('div[style*=town_unit_bar]').each(function(i, e) {
			var $_this = $(this),
				_name = $_this.find('div div strong:first').text().trim();
				_attack = $_this.find('div div div:contains("Attack")').text().match(/\d+/)[0];
				_defense = $_this.find('div div div:contains("Defense")').text().match(/\d+/)[0];
			_copterSoldiers.soldiers[_name + "|" + _attack + "|" + _defense] = $_this.find('div div span:contains("Owned:")').text().match(/\d+/)[0];
		});

		console.log(_copterSoldiers);
		_callback(_copterSoldiers);
	});
};

tools.COPTER.getItems = function(_callback) {
	signedGet('item.php', function(_data) {
		var _copterItems = {
			items : {}
		};
		var _items = [],
			_src = _data ? 'nosrc' : 'src';
		_data = _data ? $(noSrc(_data)) : $('#app_body');
		_data.find('div[style*=town_unit_bar]').each(function(i, e) {
			var $_this = $(this),
				_name = $_this.find('div div strong:first').text().trim();
				_attack = $_this.find('div div div:contains("Attack")').text().match(/\d+/)[0];
				_defense = $_this.find('div div div:contains("Defense")').text().match(/\d+/)[0];
			_copterItems.items[_name + "|" + _attack + "|" + _defense] = $_this.find('div div span:contains("Owned:")').text().match(/\d+/)[0];
		});

		console.log(_copterItems);
		_callback(_copterItems);
	});
};

tools.COPTER.getMagic = function(_callback) {
	signedGet('magic.php', function(_data) {
		var _copterMagic = {
			magic : {}
		};
		var _magic = [],
			_src = _data ? 'nosrc' : 'src';
		_data = _data ? $(noSrc(_data)) : $('#app_body');
		_data.find('div[style*=town_unit_bar]').each(function(i, e) {
			var $_this = $(this),
				_name = $_this.find('div div strong:first').text().trim();
				_attack = $_this.find('div div div:contains("Attack")').text().match(/\d+/)[0];
				_defense = $_this.find('div div div:contains("Defense")').text().match(/\d+/)[0];
			_copterMagic.magic[_name + "|" + _attack + "|" + _defense] = $_this.find('div div span:contains("Owned:")').text().match(/\d+/)[0];
		});

		console.log(_copterMagic);
		_callback(_copterMagic);
	});
};

tools.COPTER.getLand = function(_callback) {
	signedGet('land.php', function(_data) {
		var _copterLand = {
			land : {}
		};
		var _land = [],
			_src = _data ? 'nosrc' : 'src';
		_data = _data ? $(noSrc(_data)) : $('#app_body');
		_data.find('div[style*=town_land_bar]').each(function(i, e) {
			var $_this = $(this),
				_name = $_this.find('div div strong:first').text().trim();
			_copterLand.land[_name] = $_this.find('div div span:contains("Owned:")').text().match(/\d+/)[0];
		});

		console.log(_copterLand);
		_callback(_copterLand);
	});
};

tools.COPTER.addDisplay = function() {
	$('#cageSidebarStats').append('<div id="cageCOPTERDisplay" class="cageSidebarStat"><div>COPTER</div><div><div></div></div><span></span><span>connected</span></div></div>').append($('<button id="cageCOPTERSubmit" title="Update data"><div>C</div></button>').click(function() {
		$('#cageCOPTERSubmit').css({
			'cursor' : 'wait',
			'backgroundSize' : '33px 33px',
			'backgroundPosition' : '-4px -4px',
			'backgroundImage' : 'url(\'http://image4.castleagegame.com/graphics/shield_wait.gif\')'
		}).attr('disabled', 'disabled');
		tools.COPTER.runtime.dialogId = '#' + tools.Sidebar.smallDialog('COPTER', '<button id="cageCOPTERUpdateStats">Update stats</button><button id="cageCOPTERUpdateGenerals">Update generals</button><button id="cageCOPTERUpdateSoldiers">Update soldiers</button><button id="cageCOPTERUpdateItems">Update items</button><button id="cageCOPTERUpdateMagic">Update magic</button><button id="cageCOPTERUpdateLand">Update land</button><button id="cageCOPTERBestAttG">Best offensive general</button><button id="cageCOPTERBestDefG">Best defensive general</button>', null, {
			'display' : 'none'
		}, tools.COPTER.done, {
			'top' : ($('#cageCOPTERDisplay').offset().top - 40)
		});
		$(tools.COPTER.runtime.dialogId).find('div.cageDialogText > button').css('width', '98%').button();
		// update_stats
		$('#cageCOPTERUpdateStats').click(function() {
			$(tools.COPTER.runtime.dialogId).find('div.cageDialogText > button').attr('disabled', 'disabled').css('opacity', 0.7);
			$(tools.COPTER.runtime.dialogId).find('button.cancel').hide();
			tools.COPTER.getStats(function(_stats) {
				tools.COPTER.request(tools.COPTER.API.update_stats, _stats);
			});
		});
		// update_generals
		$('#cageCOPTERUpdateGenerals').click(function() {
			$(tools.COPTER.runtime.dialogId).find('div.cageDialogText > button').attr('disabled', 'disabled').css('opacity', 0.7);
			$(tools.COPTER.runtime.dialogId).find('button.cancel').hide();
			var _copterGenerals = {
				generals : {}
			};
			$.each(tools.General.runtime.general, function() {
				_copterGenerals.generals[this.name] = /\d+/.exec(this.level)[0];
			});
			tools.COPTER.request(tools.COPTER.API.update_generals, _copterGenerals);
		});
		// update_soldiers
		$('#cageCOPTERUpdateSoldiers').click(function() {
			$(tools.COPTER.runtime.dialogId).find('div.cageDialogText > button').attr('disabled', 'disabled').css('opacity', 0.7);
			$(tools.COPTER.runtime.dialogId).find('button.cancel').hide();
			tools.COPTER.getSoldiers(function(_soldiers) {
				tools.COPTER.request(tools.COPTER.API.update_soldiers, _soldiers);
			});
		});
		// update_items
		$('#cageCOPTERUpdateItems').click(function() {
			$(tools.COPTER.runtime.dialogId).find('div.cageDialogText > button').attr('disabled', 'disabled').css('opacity', 0.7);
			$(tools.COPTER.runtime.dialogId).find('button.cancel').hide();
			tools.COPTER.getItems(function(_items) {
				tools.COPTER.request(tools.COPTER.API.update_items, _items);
			});
		});
		// update_magic
		$('#cageCOPTERUpdateMagic').click(function() {
			$(tools.COPTER.runtime.dialogId).find('div.cageDialogText > button').attr('disabled', 'disabled').css('opacity', 0.7);
			$(tools.COPTER.runtime.dialogId).find('button.cancel').hide();
			tools.COPTER.getMagic(function(_magic) {
				tools.COPTER.request(tools.COPTER.API.update_magic, _magic);
			});
		});
		// update_land
		$('#cageCOPTERUpdateLand').click(function() {
			$(tools.COPTER.runtime.dialogId).find('div.cageDialogText > button').attr('disabled', 'disabled').css('opacity', 0.7);
			$(tools.COPTER.runtime.dialogId).find('button.cancel').hide();
			tools.COPTER.getLand(function(_land) {
				tools.COPTER.request(tools.COPTER.API.update_land, _land);
			});
		});
		// best_defensive_general
		$('#cageCOPTERBestDefG').click(function() {
			$(tools.COPTER.runtime.dialogId).find('div.cageDialogText > button').attr('disabled', 'disabled').css('opacity', 0.7);
			$(tools.COPTER.runtime.dialogId).find('button.cancel').hide();
			tools.COPTER.getStats(function(_stats) {
				_stats.current_health = $('#health_current_value').text().trim();
				tools.COPTER.request(tools.COPTER.API.best_defensive_general, _stats);
			});
		});
		// best_offensive_general
		$('#cageCOPTERBestAttG').click(function() {
			$(tools.COPTER.runtime.dialogId).find('div.cageDialogText > button').attr('disabled', 'disabled').css('opacity', 0.7);
			$(tools.COPTER.runtime.dialogId).find('button.cancel').hide();
			tools.COPTER.getStats(function(_stats) {
				_stats.current_health = $('#health_current_value').text().trim();
				tools.COPTER.request(tools.COPTER.API.best_offensive_general, _stats);
			});
		});
	}));
};
