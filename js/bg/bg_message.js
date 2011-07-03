var ports = {}, cageTabId = false;

chrome.extension.onConnect.addListener(function(_port) {
	console.log('connected:' + _port.name);
	ports[_port.name] = _port;
	_port.onMessage.addListener(function(_message) {
		ports[_message.port].postMessage(_message);
		console.log(_message);
	});
});

/*
 * chrome.windows.getCurrent(function(win) { chrome.tabs.getSelected(win.id,
 * function(tab) { chrome.tabs.onUpdated.addListener(function(tabid, changeInfo,
 * tab) { if (!cageTabId) { cageTabId = tab.id; } if (tab.id == cageTabId) {
 * 
 * com.execute(com.task.getGeneral, com.port.castleAge, null);
 *  } }); }); });
 */