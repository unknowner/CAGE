var com = {
	// Port names
	port: {
		current: null,
		castleAge: 'PORT_CASTLEAGE',
		facebook: 'PORT_FACEBOOK'
	},
	// Ports
	ports: {},
	// Available tasks
	task: {
		init: 'TASK_INIT',
		getGeneral: 'TASK_GETGENERAL',
		general: 'TASK_GENERAL',
		updateGenerals: 'TASK_UPDATEGENERALS',
		castleAgeReady: 'TASK_CAREADY',
		heal: 'TASK_HEAL',
		signed: 'TASK_SIGNED',
		userId: 'TASK_USERID',
		fbButtonEnable: 'TASK_FBBUTTONENABLE',
		scroll: 'TASK_SCROLL',
		eliteGuard: 'TASK_ELITEGUARD',
		loadPage: 'LOADPAGE',
		updateGifter: 'TASK_UPDATEGIFTER',
		startGifter: 'TASK_STARTGIFTER',
		startStash: 'TASK_STASH',
		resize: 'TASK_RESIZE'
	},
	// Called in content script to setup port
	initContentScript: function (_port) {
		com.port.current = chrome.extension.connect({
			name: _port
		});
		com.port.current.onMessage.addListener(receiver);
	},
	// Called in background.html to setup port listeners
	initBackground: function () {
		chrome.extension.onConnect.addListener( function (_port) {
			com.ports[_port.name] = _port;
			_port.onMessage.addListener( function (_message) {
				com.ports[_message.port].postMessage(_message);
			});
		});
	},
	// Send Messages to ports
	send: function (_task, _port, _data) {
		//if(_task !== com.task.resize) {
			console.log(_task + ' >> ' + _port);
		//}
		com.port.current.postMessage({
			task: _task,
			port: _port,
			data: _data
		});
	}
};