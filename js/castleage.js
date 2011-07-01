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

/*
 * $('#globalContainer').live('DOMNodeInserted', function() {//
 * DOMSubtreeModified
 * 
 * $('*[includeself="false"]').each(function(i, e) { var s =
 * document.createElement("script"); s.type = "text/javascript"; s.textContent =
 * "FB.XFBML.parse(" + e[0] + ");"; document.body.appendChild(s); });
 * 
 * });
 */

initTools();
