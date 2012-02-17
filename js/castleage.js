// CAGE stuff working on Castle Age site
var CastleAge = {
	bqh : null,
	signed_request : null,
	userId : null,
	inGuild : null,
	startInterval : null,
	started : false
};

com.initPort(com.port.castleAge);

var _append = '';
$.each(['css/cage.css', 'css/ca_cage.css', 'css/ca_stats.css', 'css/ca_general.css', 'css/ca_monster.css', 'css/ui.selectmenu.css', 'css/settings.css'], function(_i, _e) {
	_append += '<link rel="stylesheet" type="text/css" href="' + getPath(_e) + '?_=' + Math.random() + '" >';
});
_append += '<link id="cageTheme" rel="stylesheet" type="text/css" href="' + getPath('css/dark-hive/jquery-ui.css') + '" >';
_append += '<script type="text/javascript" language="javascript" src="' + getPath('js/jquery.js') + '"></script>';

$(document.body).append($('<input>').attr({
	'id' : 'signed_request',
	'type' : 'hidden'
})).append(_append);
_append = _css = undefined;

// Add CAGE container
$('center:first').prepend('<div id="cageContainer"><div id="cageStatsContainer"></div><div id="cageToolsContainer" class="ui-widget-content ui-corner-bottom"></div></div>');
$('#main_bntp, #nvbar_div_end, #hinvite_help').remove();
$('#nvbar_table').empty();

//rework stats
$('#cageStatsContainer').append('<div class="cageStatsTextPos" style="width: 125px;left: 50px;"><strong class="cageStatsText">Gold</strong></div>').append('<div class="cageStatsTextPos" style="width: 109px;left: 225px;"><strong class="cageStatsText">Energy</strong></div>').append('<div class="cageStatsTextPos" style="width: 109px;left: 382px;"><strong class="cageStatsText">Health</strong></div>').append('<div class="cageStatsTextPos" style="width: 109px;left: 542px;"><strong class="cageStatsText">Stamina</strong></div>')

tools.Page.runtime.allPages();

CastleAge.startInterval = window.setInterval(function() {
	if(CastleAge.signed_request !== null && CastleAge.userId !== null) {
		window.clearInterval(CastleAge.startInterval);
		window.setInterval(function() {
			com.send(com.task.alive, com.port.facebook, null);
		}, 600000);
		initTools();
		var _startURL = $('#current_pg_url').attr('value');
		if(_startURL.indexOf('?') !== -1) {
			_startURL = _startURL.substring(0, _startURL.indexOf('?'));
		}
		console.log("URL:" + _startURL);
		if(tools.Page.runtime[_startURL]) {
			tools.Page.runtime[_startURL]();
		}
		_startURL = undefined;
	} else {
		com.send(com.task.castleAgeReady, com.port.facebook);
	}
}, 100);
