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

$('center:first').prepend('<div id="cageContainer"><div id="cageToolsContainer" class="ui-widget-content"></div></div>');

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
