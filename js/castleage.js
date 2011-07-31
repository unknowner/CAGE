// CAGE stuff working on Castle Age site
var CastleAge = {
	bqh: null,
	signed_request: null,
	userId: null,
	pageModTimer: null
};

com.initContentScript(com.port.castleAge);

if (tools['Page'].runtime[$('#current_pg_info').attr('value') + '.php']) {
	tools['Page'].runtime[$('#current_pg_info').attr('value') + '.php']();
}

$('head').append('<link rel="stylesheet" type="text/css" href="' + chrome.extension.getURL('css/trontastic/jquery-ui.css') + '">');

var _elm = {
	cage : '<div id="cageContainer"></div>',
	general : '<div id="cageGeneralContainer" class="ui-corner-br ui-state-default"></div>',
	generalImageContainer : '<div id="cageGeneralImageContainer" class="ui-state-active ui-corner-all"></div>',
	generalImage : '<img id="cageGeneralImage" class="ui-corner-all" />',
	generalName : '<span id="cageGeneralName" class="ui-state-active ui-corner-right"></span>',
	tools : '<div id="cageToolsContainer" class="ui-state-default ui-corner-right"></div>'
}

$(document.body).append($(_elm.cage).append($(_elm.general).append($(_elm.generalImageContainer).append(_elm.generalImage)).append(_elm.generalName)).append(_elm.tools));

_elm = null;

initTools();
/*
 addFunction( function() {
 FB.Canvas.setAutoResize(false);
 }, null, true, true);
 $('#app_body').live('DOMSubtreeModified', function(event) {
 window.clearTimeout(CastleAge.pageModTimer);
 CastleAge.pageModTimer = window.setTimeout(setCASize, 50);
 });
 */
com.send(com.task.castleAgeReady, com.port.facebook, {});

//setCASize();

$('center:first').css('textAlign', 'left');
$(document.body).css({
	'backgroundColor' : '#000',
	'backgroundImage' : ''
});

tools['Page'].runtime['allPages']();
