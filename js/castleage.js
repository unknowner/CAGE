// CAGE stuff working on Castle Age site
var CastleAge = {
	bqh: null,
	signed_request: null,
	userId: null,
	pageModTimer: null,
	inGuild: null
};

var CAGE = {}

com.initContentScript(com.port.castleAge);

$('head').append('<link id="cageTheme" rel="stylesheet" type="text/css" href="' + chrome.extension.getURL('css/dark-hive/') + 'jquery-ui.css">');
$('center:first').css('textAlign', 'left');
$(document.body).css({
	'backgroundColor' : '#000',
	'backgroundImage' : ''
});
if (tools['Page'].runtime[$('#current_pg_info').attr('value') + '.php']) {
	tools['Page'].runtime[$('#current_pg_info').attr('value') + '.php']();
}
tools['Page'].runtime['allPages']();

var _elm = {
	cage : '<div id="cageContainer"></div>',
	general : '<div id="cageGeneralContainer" class="ui-corner-br ui-widget-content"></div>',
	generalImageContainer : '<div id="cageGeneralImageContainer" class="ui-state-active ui-corner-all"></div>',
	generalImage : '<img id="cageGeneralImage" class="ui-corner-all" src="http://image4.castleagegame.com/graphics/shield_wait.gif"/>',
	generalName : '<span id="cageGeneralName" class="ui-state-active ui-corner-right"></span>',
	generalValues : '<span id="cageGeneralValues" class="ui-state-active ui-corner-br"><img src="http://image4.castleagegame.com/graphics/demi_symbol_2.gif" class="cageGeneralAttDefImg" /><span id="cageGeneralAttack" class="cageGeneralAttDefText"></span><img src="http://image4.castleagegame.com/graphics/demi_symbol_3.gif" class="cageGeneralAttDefImg" /><span id="cageGeneralDefense" class="cageGeneralAttDefText"></span></span>',
	tools : '<div id="cageToolsContainer" class="ui-widget-content ui-corner-right"></div>',
	settings : '<div id="cageSettingContainer" class="ui-widget-content ui-corner-right"></div>'
}


$(document.body).append($(_elm.cage).append($(_elm.general).append($(_elm.generalImageContainer).append(_elm.generalImage)).append(_elm.generalName).append(_elm.generalValues)).append(_elm.tools).append(_elm.settings));

_elm = null;

initTools();

com.send(com.task.castleAgeReady, com.port.facebook, {});