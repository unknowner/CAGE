/*tool('COPTER');

tools.COPTER.settings = function() {

	tools.Settings.heading('COPTER');
	tools.Settings.text('<a href="http://copter.bomhofintegrated.com">COPTER</a>');
	tools.Settings.textbox('COPTER\'s CAGE link', tools.COPTER.runtime.link, 'cageCOPTERLink', tools.COPTER.runtimeUpdate);

};
tools.COPTER.runtimeUpdate = function() {
	tools.COPTER.runtime = {
		link : item.get('cageCOPTERLink', '')
	};
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
}

tools.COPTER.init = function() {
	// init copter event
	customEvent('COPTERcallback', function(_evt) {
		var _data = $('#COPTERcallback').val();
		console.log(_data);
		tools.COPTER.receiver(_data);
	});
	tools.COPTER.runtimeUpdate();
};

tools.COPTER.receiver = function(_data) {
	_copter = JSON.parse(_data);
}
*/