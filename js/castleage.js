// CAGE stuff working on Castle Age site - Firefox
var CastleAge = {
	bqh : null,
	signed_request : null,
	userId : null,
	inGuild : null,
	startInterval : null,
	started : false
};

var CAGE = {
	version : '1.0.56β',
	fastAnim : 200,
	slowAnim : 600
};

com.initContentScript(com.port.castleAge);

$('head')
	.append('<link id="cageTheme" rel="stylesheet" type="text/css" href="' + getPath('css/dark-hive/jquery-ui.css') + '">')
	.append('<link rel="stylesheet" type="text/css" href="' + getPath('css/cage.css') + '">')
	.append('<link rel="stylesheet" type="text/css" href="' + getPath('css/ca_cage.css') + '">')
	.append('<link rel="stylesheet" type="text/css" href="' + getPath('css/ui.selectmenu.css') + '">');
	
var _elm = {
	cage : '<div id="cageContainer"></div>',
	tools : '<div id="cageToolsContainer" class="ui-widget-content ui-corner-right"></div>',
	settings : '<div id="cageSettingContainer" class="ui-widget-content ui-corner-right"></div>'
};

$(document.body).prepend($(_elm.cage).append(_elm.tools).append(_elm.settings));
_elm = undefined;

/**/

CastleAge.startInterval = window.setInterval(function() {
	if(CastleAge.signed_request !== null && CastleAge.userId !== null) {
		window.clearInterval(CastleAge.startInterval);
		initTools();
		console.log('initTools');
	} else {
		com.send(com.task.castleAgeReady, com.port.facebook);
	}
}, 100);
