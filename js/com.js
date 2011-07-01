var com = {

	port : {

		current : null,
		castleAge : 'COM_CASTLEAGE',
		facebook : 'COM_FACEBOOK'

	},

	task : {

		init : 'COM_INIT',
		getGeneral : 'COM_GETGENERAL',
		general : 'COM_GENERAL',
		castleAgeReady : 'COM_CAREADY',
		heal : 'COM_HEAL',
		signed : 'COM_SIGNED',
		fbButtonEnable : 'COM_FBBUTTONENABLE'

	},

	init : function(_port) {
		com.port.current = _port;
		window.addEventListener("message", com.receive, false);
		chrome.extension.sendRequest({
			task : com.task.init,
			port : _port,
			data : document.location.origin
		});
	},

	send : function(_task, _port, _data) {
		chrome.extension.sendRequest({
			task : _task,
			port : _port,
			data : _data
		});
	},

	receive : function(_message) {
		if (_message.origin == document.location.origin) {
			if (_message.data.type == 'CAGE') {
				receiver(_message.data);
			}
		}
	},

	execute : function(_task, _port, _data) {
		var _message = {
			type : 'CAGE',
			task : _task,
			data : _data
		};
		chrome.tabs.executeScript(null, {
			code : 'window.postMessage(' + JSON.stringify(_message) + ',"'
					+ origin[_port] + '")',
			allFrames : true
		});
	},

	addFunction : function(_func, _para, _run, _once) {
		var script = document.createElement('script');
		script.textContent = (_run ? '(' : '') + _func
				+ (_run ? ')(' + _para + ');' : ';');
		document.body.appendChild(script);
		if (_once) {
			document.body.removeChild(script);
		}
	}

};
