// CAGE stuff working on Castle Age site

var CastleAge = {

	bqh : null,
	signed_request : null

};

com.initContentScript(com.port.castleAge);

tools['Page'].cache['allPages']();
if (tools['Page'].cache[$('#current_pg_info').attr('value') + '.php']) {
	tools['Page'].cache[$('#current_pg_info').attr('value') + '.php']();
}

$('head').append('<link rel="stylesheet" type="text/css" href="' + chrome.extension.getURL('css/trontastic/jquery-ui.css') + '">');

initTools();

com.send(com.task.castleAgeReady, com.port.facebook, {});

// console.log('FB._session.uid:'+window[FB]._session.uid);