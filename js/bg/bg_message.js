var origin = {}, cageTabId = false;

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {

	if (request.task == com.task.init) {
		origin[request.port] = request.data;
	} else {
		com.execute(request.task, request.port, request.data);
	}

});

chrome.windows.getCurrent(function(win) {
	chrome.tabs.getSelected(win.id, function(tab) {
		chrome.tabs.onUpdated.addListener(function(tabid, changeInfo, tab) {
			if (!cageTabId) {
				cageTabId = tab.id;
			}
			if (tab.id == cageTabId) {

				com.execute(com.task.getGeneral, com.port.castleAge, null);

			}
		});
	});
});
