// CAGE stuff working on Castle Age site
var CastleAge = {
	bqh : null,
	signed_request : null,
	userId : null,
	inGuild : null,
	startInterval : null,
	started : false
};

var CAGE = {};

com.initContentScript(com.port.castleAge);

$('head').append('<link id="cageTheme" rel="stylesheet" type="text/css" href="' + chrome.extension.getURL('css/dark-hive/') + 'jquery-ui.css">');

var _elm = {
	cage : '<div id="cageContainer"></div>',
	abilities : '<div id="cageAbilitiesContainer" class="ui-corner-br ui-widget-content"></div>',
	general : '<div id="cageGeneralContainer" class="ui-corner-br ui-widget-content"></div>',
	generalImageContainer : '<div id="cageGeneralImageContainer" class="ui-state-active ui-corner-all"></div>',
	generalImage : '<img id="cageGeneralImage" class="ui-corner-all" src="http://image4.castleagegame.com/graphics/shield_wait.gif"/>',
	generalName : '<span id="cageGeneralName" class="ui-state-active ui-corner-right"></span>',
	generalValues : '<span id="cageGeneralValues" class="ui-state-active ui-corner-br"><img src="http://image4.castleagegame.com/graphics/demi_symbol_2.gif" class="cageGeneralAttDefImg" /><span id="cageGeneralAttack" class="cageGeneralAttDefText"></span><img src="http://image4.castleagegame.com/graphics/demi_symbol_3.gif" class="cageGeneralAttDefImg" /><span id="cageGeneralDefense" class="cageGeneralAttDefText"></span></span>',
	generalSelector : '<div id="cageGeneralSelector" class="ui-widget-content ui-corner-bottom">',
	tools : '<div id="cageToolsContainer" class="ui-widget-content ui-corner-right"></div>',
	settings : '<div id="cageSettingContainer" class="ui-widget-content ui-corner-right"></div>'
};

$(document.body).prepend($(_elm.cage).append(_elm.abilities).append($(_elm.general).append($(_elm.generalImageContainer).append(_elm.generalImage)).append(_elm.generalName).append(_elm.generalValues)).append(_elm.tools).append(_elm.settings)).prepend(_elm.generalSelector);
_elm = undefined;

initTools();
tools['Page'].runtime['allPages']();
var _startURL = $('#current_pg_url').attr('value');
if(_startURL.indexOf('?') != -1) {
	_startURL = _startURL.substring(0, _startURL.indexOf('?'));
}
console.log("URL:" + _startURL);
if(tools['Page'].runtime[_startURL]) {
	tools['Page'].runtime[_startURL]();
}
_startUrl = undefined;

CastleAge.startInterval = window.setInterval(function() {
	if(CastleAge.started == false) {
		com.send(com.task.castleAgeReady, com.port.facebook);
	} else {
		window.clearInterval(CastleAge.startInterval);
	}
}, 100);
