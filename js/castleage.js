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
com.send(com.task.caStart, com.port.castleAge, null);

function initCastleAge() {
	$('#AjaxLoadIcon').append('<img id="cageLogo" src="' + getPath('img/icon64.png') + '"><div id="cageLoadError">Loading CAGE...</div>').fadeIn('slow');
	var _append = '';
	$.each([
			'css/ca_cage.css', 'css/ca_monster.css', 'css/ca_pages.css', 'css/cage_general.css', 'css/cage_settings.css', 'css/cage_sidebar.css', 'css/cage_stats.css', 'css/cage_tools.css', 'css/cage.css'
	], function(_i, _e) {
		_append += '<link rel="stylesheet" type="text/css" href="' + getPath(_e) + '?_=' + Math.random() + '" >';
	});
	_append += '<link id="cageTheme" rel="stylesheet" type="text/css" href="' + getPath('css/dark-hive/jquery-ui.css') + '" >';
	_append += '<script type="text/javascript" language="javascript" src="' + getPath('js/jquery.js') + '"></script>';
	$(document.body).append($('<input>').attr({
		'id' : 'signed_request',
		'type' : 'hidden'
	})).append(_append);
	_append = null;

	// Add CAGE container / repos menu / repos chat
	$('#globalContainer').append('<div id="cageSidebar"><div id="cageSidebarHeader"></div><div id="cageSidebarStats"></div><div id="cageSidebarTools"></div><div id="cageSidebarChat"></div><div id="cageSidebarBottom"><a href="http://cagenhancer.blogspot.com/" target="_blank">Blog</a> <a href="http://cagenhancer.blogspot.com/p/manual.html" target="_blank">Manual</a> <a href="http://caaplayer.freeforums.org/c-a-g-e-f29.html" target="_blank">Forum</a> <a href="https://github.com/unknowner/CAGE" target="_blank">GitHub</a></div></div><div id="cageStatsContainer"></div><div id="cageContainer"></div>').prepend($('#expandedGuildChat, #collapsedGuildChat').detach());
	CastleAge.startInterval = setInterval(function() {
		if (CastleAge.signed_request !== null && CastleAge.userId !== null) {
			clearInterval(CastleAge.startInterval);
			setInterval(function() {
				com.send(com.task.alive, com.port.facebook, null);
			}, 10000);
			initTools();
			setTimeout(function() {
				var _startURL = $('#current_pg_url').attr('value');
				if (_startURL.indexOf('?') !== -1) {
					_startURL = _startURL.substring(0, _startURL.indexOf('?'));
				}
				console.log("URL:" + _startURL);
				tools.Page.allPages();
				if (tools.Page.pages[_startURL]) {
					tools.Page.pages[_startURL]();
				}
				_startURL = null;
			}, 500);
			$('#AjaxLoadIcon').delay(3000).fadeOut(1000, function() {
				$('#collapsedGuildChat').css('left', '');
				$('#expandedGuildChat').css('left', '');
				$('#chatGuildChat').scrollTop($('#chatGuildChat div').length * 1000);
				$('#cageLoadError').remove();
			});
		
		} else {
			com.send(com.task.castleAgeReady, com.port.facebook);
		}
	}, 100);
	// startup repos etc...
	$('#main_ststb').html($('#main_ststb').html().replace(/more/g, ''));
}
