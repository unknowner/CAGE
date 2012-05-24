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
	update_stats : 'update_stats'
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
			url : 'http://copter.bomhofintegrated.com/cage/' + _req,
			data : _ajaxData,
			contentType : 'application/json',
			dataType : 'jsonp',
			jsonpCallback : 'fireCOPTERcallback',
			success : function(_data) {
				console.log('Data', _data);
			}
		});
	} else {
		$('#cageCOPTERDisplay').remove();
	}
};

tools.COPTER.receiver = function(_data) {
	console.log('COPTER:', tools.COPTER.runtime.last, _data);
	var _copter = JSON.parse(_data);
	switch (tools.COPTER.runtime.last) {
		case tools.COPTER.API.status:
			if (_copter.status == 'connected') {
				tools.COPTER.runtime.connected = true;
				tools.COPTER.addDisplay();
			}
			break;
		case tools.COPTER.API.best_offensive_general:
			tools.General.setByName(_copter.name);
			break;
		case tools.COPTER.API.best_defensive_general:
			tools.General.setByName(_copter.name);
			break;
		case tools.COPTER.API.update_stats:
			break;
	}
	$(tools.COPTER.runtime.dialogId).find('div.cageDialogText > button').removeAttr('disabled').removeClass('ui-state-hover').css('opacity', 1);
	tools.COPTER.runtime.last = null;
};

tools.COPTER.getStats = function(_callback) {
	signedGet('keep.php', function(_data) {
		_data = $(noSrc(_data));
		var _stats = _data.find('div.keep_attribute_section div.attribute_stat_container'), _stat = {
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
		_callback(_stat);
	});
};

tools.COPTER.addDisplay = function() {
	$('#cageSidebarStats').append('<div id="cageCOPTERDisplay" class="cageSidebarStat"><div>COPTER</div><div><div></div></div><span></span><span>connected</span></div></div>').append($('<button id="cageCOPTERSubmit" title="Update data"></button>').click(function() {
		$('#cageCOPTERSubmit').css({
			'cursor' : 'wait',
			'backgroundSize' : '33px 33px',
			'backgroundPosition' : '-4px -4px',
			'backgroundImage' : 'url(\'http://image4.castleagegame.com/graphics/shield_wait.gif\')'
		}).attr('disabled', 'disabled');
		tools.COPTER.runtime.dialogId = '#' + tools.Sidebar.smallDialog('COPTER', '<button id="cageCOPTERUpdateStats">Update stats</button><br><button id="cageCOPTERBestAttG">Best offensive general</button><button id="cageCOPTERBestDefG">Best defensive general</button>', null, {
			'display' : 'none'
		}, tools.COPTER.done, {
			'top' : ($('#cageCOPTERDisplay').offset().top - 40)
		});
		$(tools.COPTER.runtime.dialogId).find('div.cageDialogText > button').css('width', '98%').button();
		// update_stats
		$('#cageCOPTERUpdateStats').click(function() {
			$(tools.COPTER.runtime.dialogId).find('div.cageDialogText > button').attr('disabled', 'disabled').css('opacity', 0.7);
			tools.COPTER.getStats(function(_stats) {
				console.log(_stats);
				tools.COPTER.request(tools.COPTER.API.update_stats, _stats);
			});
		});
		// best_defensive_general
		$('#cageCOPTERBestDefG').click(function() {
			$(tools.COPTER.runtime.dialogId).find('div.cageDialogText > button').attr('disabled', 'disabled').css('opacity', 0.7);
			tools.COPTER.getStats(function(_stats) {
				_stats.current_health = $('#health_current_value').text().trim();
				console.log(_stats);
				tools.COPTER.request(tools.COPTER.API.best_defensive_general, _stats);
			});
		});
		// best_offensive_general
		$('#cageCOPTERBestAttG').click(function() {
			$(tools.COPTER.runtime.dialogId).find('div.cageDialogText > button').attr('disabled', 'disabled').css('opacity', 0.7);
			tools.COPTER.getStats(function(_stats) {
				_stats.current_health = $('#health_current_value').text().trim();
				console.log(_stats);
				tools.COPTER.request(tools.COPTER.API.best_offensive_general, _stats);
			});
		});
	}));
};
