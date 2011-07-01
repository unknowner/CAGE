// CAGE stuff working on facebook site

com.init(com.port.facebook);
console.log('FB started.');
$('head').append(
		'<link rel="stylesheet" type="text/css" href="'
				+ chrome.extension.getURL('css/trontastic/jquery-ui.css') + '">');
