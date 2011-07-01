// CAGE stuff working on Castle Age site

var CastleAge = {

	bqh : null,
	signed_request : null

};

com.init(com.port.castleAge);
console.log('CA started.');
com.send(com.task.castleAgeReady, com.port.facebook, null);

tools['Page'].cache['allPages']();
if (tools['Page'].cache[$('#current_pg_info').attr('value') + '.php']) {
	tools['Page'].cache[$('#cagePageURL').attr('value') + '.php']();
}

$('head').append(
		'<link rel="stylesheet" type="text/css" href="'
				+ chrome.extension.getURL('css/trontastic/jquery-ui.css')
				+ '">');

$('#globalContainer').live('DOMSubtreeModified', function() {// DOMSubtreeModified

	general.update();

});

initTools();
