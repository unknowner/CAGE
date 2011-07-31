// CAGE stuff working on facebook site
com.initContentScript(com.port.facebook);
$('head').append('<link rel="stylesheet" type="text/css" href="' + chrome.extension.getURL('css/trontastic/jquery-ui.css') + '">');
$(document.body).css({
	'backgroundColor': '#000',
	'overflowY' : 'hidden'
});
$('#contentCol').css('backgroundColor', '#000');
$('#pageHead').css({
	'position': 'fixed',
	'zIndex': 1
});
$('#blueBar').css({
	'position': 'fixed',
	'zIndex': 1
});
$('#iframe_canvas').css({
	'marginTop': 41
});

window.onresize = function (evt) {

	$('#iframe_canvas').height(window.innerHeight - 41);
	com.send(com.task.resize, com.port.castleAge, {
		height : window.innerHeight - 41
	});

};