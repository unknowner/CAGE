var CAGE = {};
if (localStorage['cageCAGE.enabled'] === undefined) {
	localStorage['cageCAGE.enabled'] = true;
};
CAGE.enable = JSON.parse(localStorage['cageCAGE.enabled']);

function updateIcon() {
	CAGE.enable = !CAGE.enable;
	if (CAGE.enable === true) {
		localStorage['cageCAGE.enabled'] = true;
		chrome.browserAction.setTitle({
			title : 'Disable CAGE'
		});
		chrome.browserAction.setIcon({
			path : 'img/icon19.png'
		});
	} else {
		localStorage['cageCAGE.enabled'] = false;
		chrome.browserAction.setTitle({
			title : 'Enable CAGE'
		});
		chrome.browserAction.setIcon({
			path : 'img/icon19off.png'
		});
	}
}

if (CAGE.enable === true) {
	chrome.browserAction.setTitle({
		title : 'Disable CAGE'
	});
	chrome.browserAction.setIcon({
		path : 'img/icon19.png'
	});
} else {
	chrome.browserAction.setTitle({
		title : 'CAGE.enable CAGE'
	});
	chrome.browserAction.setIcon({
		path : 'img/icon19off.png'
	});
}

com.initBackground();
chrome.browserAction.onClicked.addListener(updateIcon);
