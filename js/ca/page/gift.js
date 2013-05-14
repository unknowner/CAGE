// Festival duel
tools.Page.pages['gift.php'] = function() {

	console.log('Page: gift.php');

	tools.Gifter.newRequestForm();

	// new gifts design
	var _giftdiv = $('table.layout div[style*="/graphics/giftpage_title.jpg"]'), _content = '';
	_giftdiv.next().find('td:eq(1) > div').each(function(_i, _e) {
		_content += $(_e).removeAttr('style', '').html();
	});
	_giftdiv.attr('style', _giftdiv.attr('style').replace('giftpage_title', 'keep_top')).css('height', 136);
	_giftdiv.next().replaceWith($('<div id="giftsContent">').append(_content));
	_giftdiv.next().next().attr('style', _giftdiv.next().next().attr('style').replace('giftpage_bottom', 'keep_endcap')).css('height', 49);

	// rearrange gift buttons and make reloading obsolete
	$('#giftContainer').css({
		'width' : 642,
		'marginTop' : 2,
		'marginLeft' : 11,
		'padding' : '3px 0 13px 2px'
	});

	var _div = $('#giftsContent').next('div');
	_div.find('div:first').remove();
	_div.find('div:first').css('paddingTop', 22);
	$('#giftsContent > div:last').removeAttr('style');
	$('#giftsContent > div:last').prepend($('<button class="cageGifterButton">R<span>ECEIVE</span> G<span>IFTS</span></button>').click(tools.Gifter.receiveGifts));
	$('#giftsContent > div:last').prepend($('<button class="cageGifterButton">R<span>ETURN</span> <span>THE</span> F<span>AVOR</span></button>').click(function() {
		addFunction(function() {
			FB.api('/me', function(response) {
				showRequestForm('Castle Age', encodeURI(response.first_name) + ' ' + encodeURI(response.last_name) + ' has sent you a ' + $('#giftsContent').attr('CAGEGiftName') + ' in Castle Age! Click to accept gift.', 'abc=123', 'act=create&gift=' + $('#giftsContent').attr('CAGEGiftNum'), null, true);
			});
		}, null, true, true);
	}));
	$('div.extra_gift').removeClass('extra_gift');
	$('div.show_extra_link').remove();
	$('#giftsContent div[id^="gift"]').each(function(_i, _e) {
		var _this = $(this), _num = /\d+/.exec(_this.attr('id'))[0], _nam = _this.text().trim(), _img = _this.find('img.imgButton, img.imgButtonReverse');
		if (_i === 0) {
			$('#giftsContent').attr({
				'CAGEGiftNum' : _num,
				'CAGEGiftName' : _nam.replace('!', ''),
			});
		}
		_img.attr({
			'title' : _this.text().trim(),
		}).click(function() {
			$('#giftsContent > img.imgButton').attr('class', 'imgButtonReverse');
			$('#giftsContent').attr({
				'CAGEGiftNum' : _num,
				'CAGEGiftName' : _nam.replace('!', ''),
			});
			$(this).attr('class', 'imgButton');
		}).css({
			'width' : 50,
			'height' : 50,
			'padding' : '1px',
			'cursor' : 'pointer'
		}).unwrap().unwrap().unwrap().unwrap().unwrap().unwrap();
	});
	$('#giftsContent div[style="padding:10px 0 0 0;"]').remove();

	var $_img = $('img[src*="request_fb_gift.gif"]');
	var _giftNum = /(?:act=create&gift=)(\d+)/.exec($_img.attr('onclick'))[1];
	var _giftName = /(sent you a )(.+)( in Castle Age!)/.exec($_img.attr('onclick'))[2];
	$_img.attr('onclick', '').click(function() {
		addFunction(function() {
			FB.api('/me', function(response) {
				showRequestForm('Castle Age', encodeURI(response.first_name) + ' ' + encodeURI(response.last_name) + ' has sent you a ' + $('#giftsContent').attr('CAGEGiftName') + ' in Castle Age! Click to accept gift.', 'abc=123', 'act=create&gift=' + $('#giftsContent').attr('CAGEGiftNum'));
			});
		}, JSON.stringify({
			num : _giftNum,
			name : _giftName
		}), true, true);
	});

	// http://image4.castleagegame.com/graphics/essencebox.gif
	if (item.get('cage.Gifter.sendToList', {}) !== {}) {
		var _list = item.get('cage.Gifter.sendToList', {});
	}

};
