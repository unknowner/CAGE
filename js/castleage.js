// CAGE stuff working on Castle Age site
var CastleAge = {
	bqh : null,
	signed_request : null,
	userId : null,
	inGuild : null,
	startInterval : null,
	started : false
};

var CAGE = {
	fastAnim : 200,
	slowAnim : 600
};

com.initContentScript(com.port.castleAge);
$('head').append('<link id="cageTheme" rel="stylesheet" type="text/css" href="' + getPath('css/dark-hive/jquery-ui.css') + '?x=' + Math.random()*1000 + '">').append('<link rel="stylesheet" type="text/css" href="' + getPath('css/cage.css') + '?x=' + Math.random()*1000 + '">').append('<link rel="stylesheet" type="text/css" href="' + getPath('css/ca_cage.css') + '?x=' + Math.random()*1000 + '">').append('<link rel="stylesheet" type="text/css" href="' + getPath('css/ui.selectmenu.css') + '?x=' + Math.random()*1000 + '">').append('<link rel="stylesheet" type="text/css" href="' + getPath('css/settings.css') + '?x=' + Math.random()*1000 + '">');

$('center:first').prepend('<div id="cageContainer"><div id="cageStatsContainer"></div><div id="cageToolsContainer" class="ui-widget-content ui-corner-bottom"></div></div>');

/**/

CastleAge.startInterval = window.setInterval(function() {
	if(CastleAge.signed_request !== null && CastleAge.userId !== null) {
		window.clearInterval(CastleAge.startInterval);
		initTools();
		console.log('initTools');
	} else {
		com.send(com.task.castleAgeReady, com.port.facebook);
		window.setInterval(function() {
			com.send(com.task.alive, com.port.facebook, null);
		}, 30000);
	}
}, 100);
