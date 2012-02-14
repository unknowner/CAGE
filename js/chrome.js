/*
* CHROME only
*/
// Chrome Desktop notifications
function note(_data) {
	var _note = webkitNotifications.createNotification('img/icon64.png', _data.t, _data.m);
	_note.show();
	setTimeout(function() {
		_note.cancel();
	}, 10000);
}

// Chrome get path to internals
function getPath(_file) {
	return chrome.extension.getURL(_file);
}

// Chrome communication
var com = {
	// Port names
	port : {
		current : null,
		background : 'PORT_BACKGROUND',
		castleAge : 'PORT_CASTLEAGE',
		facebook : 'PORT_FACEBOOK'
	},
	// Ports
	ports : {},
	// Available tasks
	task : {
		alive : 'TASK_ALIVE',
		init : 'TASK_INIT',
		fbReady : 'TASK_FBREADY',
		getGeneral : 'TASK_GETGENERAL',
		general : 'TASK_GENERAL',
		updateGenerals : 'TASK_UPDATEGENERALS',
		castleAgeReady : 'TASK_CAREADY',
		showAllGenerals : 'TASK_SHOWALLGENERALS',
		heal : 'TASK_HEAL',
		signed : 'TASK_SIGNED',
		userId : 'TASK_USERID',
		fbButtonEnable : 'TASK_FBBUTTONENABLE',
		scroll : 'TASK_SCROLL',
		eliteGuard : 'TASK_ELITEGUARD',
		loadPage : 'LOADPAGE',
		updateGifter : 'TASK_UPDATEGIFTER',
		startGifter : 'TASK_STARTGIFTER',
		startStash : 'TASK_STASH',
		resize : 'TASK_RESIZE',
		showSettings : 'TASK_SETTINGS'
	},
	// Called in content script to setup port
	initPort : function(_port) {
		com.port.current = chrome.extension.connect({
			name : _port
		});
		com.port.current.onMessage.addListener(receiver);
	},
	// Called in background.html to setup port listeners
	initBackground : function() {
		chrome.extension.onConnect.addListener(function(_port) {
			console.log('onconnect:', _port);
			com.ports[_port.name] = _port;
			_port.onMessage.addListener(function(_message) {
				console.log('onMessage:', _message);
				if(_message.port === com.port.background) {
					note(_message.data);
				} else {
					com.ports[_message.port].postMessage(_message);
				}
			});
		});
	},
	// Send Messages to ports
	send : function(_task, _port, _data) {
		com.port.current.postMessage({
			task : _task,
			port : _port,
			data : _data
		});
	},
	note : function(_title, _message) {
		com.send('NOTE', com.port.background, {
			t : _title,
			m : _message
		});
	}
};
