// Festival duel
tools['Page'].runtime['army.php'] = function () {
	console.log('Page: army.php');
	var $_img = $('img[src*="invite_army.gif"]');
	$_img.attr('onclick', '').click( function () {
		addFunction( function (_gift) {
			FB.api('/me', function (response) {
				showRequestForm('Castle Age', encodeURI(response.first_name) + ' ' + encodeURI(response.last_name) + '\'s army is recruiting you to battle elves, orcs, dragons, and other mythical creatures in Castle Age! Click accept join ' + encodeURI(response.first_name) + ' ' + encodeURI(response.last_name) + '\'s army and receive a special gift.', 'abc=123', 'act=create');
			});
		}, null, true, true);
	});
};
