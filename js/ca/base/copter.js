tool('COPTER');

tools.COPTER.settings = function() {

	tools.Settings.heading('COPTER');
	tools.Settings.text('Link your <a href="http://copter.bomhofintegrated.com">COPTER</a> account with CAGE. Create the link in COPTER and enter it here, after hitting submit youßre done.');
	tools.Settings.textbox('COPTER\'s CAGE link', tools.COPTER.runtime.link, 'cageCOPTERLink', tools.COPTER.runtimeUpdate);

};
tools.COPTER.runtimeUpdate = function() {
	tools.COPTER.runtime = {
		tries : 0,
		link : item.get('cageCOPTERLink', '')
	};
	tools.COPTER.request();
};
tools.COPTER.init = function() {
	// init copter event
	customEvent('COPTERcallback', function(_evt) {
		tools.COPTER.receiver($('#COPTERcallback').val());
	});
	tools.COPTER.runtimeUpdate();
};
tools.COPTER.request = function() {
	$.ajax({
		url : 'http://copter.bomhofintegrated.com/cage/status',
		data : {
			'cage_id' : tools.COPTER.runtime.link
		},
		contentType : 'application/json',
		dataType : 'jsonp',
		jsonpCallback : 'fireCOPTERcallback',
		success : function(_data) {
			console.log('Data', _data);
		}
	});
};
tools.COPTER.receiver = function(_data) {
	_copter = JSON.parse(_data);
	if(_copter && _copter.status === 'connected') {
		var _lvl = parseInt($('#st_5').children().eq(1).text().match(/\d+/), 10)
		if(!isNaN(_lvl) && _lvl !== _copter.level) {
			tools.COPTER.addDisplay();
		} else {
			console.log(_lvl);
			if(tools.COPTER.runtime.link !== '' && tools.COPTER.runtime.tries < 5) {
				tools.COPTER.runtime.tries += 1;
				setTimeout(tools.COPTER.request(), 1000);
			}
		}
	}
};
tools.COPTER.addDisplay = function() {
	$('#cageSidebarStats').append('<div id="cageCOPTERDisplay" class="cageSidebarStat"><div>COPTER</div><div><div></div></div><span></span><span>connected</span></div></div>').append($('<button id="cageCOPTERSubmit" title="Update data"></button>').click(function() {
		$('#cageCOPTERSubmit').css({
			'cursor' : 'wait',
			'backgroundSize' : '33px 33px',
			'backgroundPosition' : '-4px -4px',
			'backgroundImage' : 'url(\'http://image4.castleagegame.com/graphics/shield_wait.gif\')'
		}).attr('disabled', 'disabled');

	}));

};
