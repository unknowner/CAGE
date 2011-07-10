// CAGE stuff working on Castle Age site
var CastleAge = {
	bqh: null,
	signed_request: null,
	pageModTimer: null
};

com.initContentScript(com.port.castleAge);
tools['Page'].runtime['allPages']();

if (tools['Page'].runtime[$('#current_pg_info').attr('value') + '.php']) {
	tools['Page'].runtime[$('#current_pg_info').attr('value') + '.php']();
}

$('head').append('<link rel="stylesheet" type="text/css" href="' + chrome.extension.getURL('css/trontastic/jquery-ui.css') + '">');

initTools();

addFunction( function() {
	FB.Canvas.setAutoResize(false);
}, null, true, true);

$('#app_body').live('DOMSubtreeModified', function(event) {
	window.clearTimeout(CastleAge.pageModTimer);
	CastleAge.pageModTimer = window.setTimeout(setCASize, 50);
});

com.send(com.task.castleAgeReady, com.port.facebook, {});
setCASize();
