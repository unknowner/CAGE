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
		fbButtonEnable : 'COM_FBBUTTONENABLE',
		scroll : 'COM_SCROLL'
	},

	init : function(_port) {
		com.port.current = chrome.extension.connect({
			name : _port
		});
		com.port.current.onMessage.addListener(receiver);
	},

	send : function(_task, _port, _data) {
		console.log('send');
		com.port.current.postMessage({
			task : _task,
			port : _port,
			data : _data
		});
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

	addFunction : function(_func, _arg, _run, _once) {
		var script = document.createElement('script');
		script.textContent = (_run ? '(' : '') + _func
				+ (_run ? ')(' + _arg + ');' : ';');
		document.body.appendChild(script);
		if (_once) {
			document.body.removeChild(script);
		}
	}

};
