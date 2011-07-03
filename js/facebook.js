// CAGE stuff working on facebook site

com.initContentScript(com.port.facebook);
$('head').append(
		'<link rel="stylesheet" type="text/css" href="'
				+ chrome.extension.getURL('css/trontastic/jquery-ui.css') + '">');
