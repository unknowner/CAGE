// Festival duel
tools.Page.runtime['gift.php'] = function() {

	console.log('Page: gift.php');

	tools.Gifter.newRequestForm();
	//rearrange gift buttons and make reloading obsolete
	$('div.extra_gift').removeClass('extra_gift');
	$('div.show_extra_link').remove();
	$('#giftContainer div[id^="gift"]').each(function() {
		var _this = $(this), _num = /\d+/.exec(_this.attr('id'))[0], _nam = $(this).text().trim();
		if(_this.find('img.imgButton').length > 0) {
			$('#giftContainer').attr({
				'CAGEGiftNum' : _num,
				'CAGEGiftName' : _nam.replace('!', '')
			})
		}
		_this.click(function() {
			$('#giftContainer').attr({
				'CAGEGiftNum' : _num,
				'CAGEGiftName' : _nam.replace('!', '')
			}).find('img.imgButton').toggleClass('imgButtonReverse imgButton');
			$(this).find('img').toggleClass('imgButtonReverse imgButton');
		}).css({
			'width' : 50,
			'height' : 50,
			'padding' : '1px'
		}).unwrap().find('img').css({
			'width' : 50,
			'height' : 50,
			'cursor' : 'pointer'
		}).attr({
			'title' : _this.text().trim()
		}).unwrap().unwrap().unwrap();
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
		addFunction(function() {
			FB.api('/me', function(response) {
				showRequestForm('Castle Age', encodeURI(response.first_name) + ' ' + encodeURI(response.last_name) + ' has sent you a ' + $('#giftContainer').attr('CAGEGiftName') + ' in Castle Age! Click to accept gift.', 'abc=123', 'act=create&gift=' + $('#giftContainer').attr('CAGEGiftNum'));
			});
		}, JSON.stringify({
			num : _giftNum,
			name : _giftName
		}), true, true);
	});
	var _div = $('#giftContainer').next('div');
	_div.find('div:first').remove();
	_div.find('div:first').css('paddingTop', 22);
	_div.prepend($('<button class="cageGifterButton">R<span>ECEIVE</span> G<span>IFTS</span></button>').css('marginTop', 14).click(tools.Gifter.start));
	_div.prepend($('<button class="cageGifterButton">R<span>ETURN</span> <span>THE</span> F<span>AVOR</span></button>').css('marginTop', 55).click(function() {
		addFunction(function() {
			FB.api('/me', function(response) {
				showRequestForm('Castle Age', encodeURI(response.first_name) + ' ' + encodeURI(response.last_name) + ' has sent you a ' + $('#giftContainer').attr('CAGEGiftName') + ' in Castle Age! Click to accept gift.', 'abc=123', 'act=create&gift=' + $('#giftContainer').attr('CAGEGiftNum'), null, true);
			});
		}, null, true, true);
	}));
};
