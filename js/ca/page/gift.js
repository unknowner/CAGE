// Festival duel
tools['Page'].runtime['gift.php'] = function() {

	console.log('Page: gift.php');

	$('div.extra_gift').removeClass('extra_gift');
	$('div.show_extra_link').remove();

	//rearrange gift buttons
	$('#giftContainer div[id^="gift"]').each(function() {
		var _this = $(this);
		_this.css({
			'width' : 50,
			'height' : 50,
			'padding' : '1px'
		}).unwrap().find('img').css({
			'width' : 50,
			'height' : 50
		}).attr({
			'title' : _this.text().trim()
		}).parent().unwrap().unwrap();
		_this.find('div:first').remove();
	});

	$('#giftContainer').css({
		'width' : 642,
		'marginTop' : 2,
		'marginLeft' : 11,
		'padding' : '3px 0 13px 2px'
	});

	var $_img = $('img[src*="invite_sendgift.gif"]');
	var _giftNum = /(?:act=create&gift=)(\d+)/.exec($_img.attr('onclick'))[1];
	var _giftName = /(sent you a )(.+)( in Castle Age!)/.exec($_img.attr('onclick'))[2];
	$_img.attr('onclick', '').click(function() {
		addFunction(function(_gift) {
			FB.api('/me', function(response) {
				showRequestForm('Castle Age', encodeURI(response.first_name) + ' ' + encodeURI(response.last_name) + ' has sent you a ' + _gift.name + ' in Castle Age! Click to accept gift.', 'abc=123', 'act=create&gift=' + _gift.num);
			});
		}, JSON.stringify({
			num : _giftNum,
			name : _giftName
		}), true, true);
	});
};
