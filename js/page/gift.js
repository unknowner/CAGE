// Festival duel
tools['Page'].runtime['gift.php'] = function () {
	console.log('Page: gift.php');
	var $_img = $('img[src*="invite_sendgift.gif"]');
	var _giftNum = /(?:act=create&gift=)(\d+)/.exec($_img.attr('onclick'))[1];
	var _giftName = /(sent you a )(.+)( in Castle Age!)/.exec($_img.attr('onclick'))[2];
	$_img.attr('onclick', '').click( function () {
		addFunction( function () {
			FB.api('/me', function (response) {
				showRequestForm('Castle Age', escape(response.name) + ' has sent you a ' + _giftName + ' in Castle Age! Click to accept gift.', 'abc=123', 'act=create&gift=' + _giftNum);
			});
		}, null, true, true);
	});
};
