// Festival duel

tools.Page.runtime['festival_duel_home.php'] = function () {
	console.log('Page: festival_duel_home.php');
	$('img[src*="festival_duelchamp_invitefollow.gif"]').attr('onclick', '').click(function () {
		addFunction(function () {
			FB.api('/me', function (response) {
				showRequestForm('Castle Age', encodeURI(response.first_name) + ' ' + encodeURI(response.last_name) + ' is rallying you to aid them in their quest to become the Festival Duel Champion! Help each other rise to new heights in Castle Age!', 'abc=123', 'act=create&fest=1');
			});
		}, null, true, true);
	});
};
