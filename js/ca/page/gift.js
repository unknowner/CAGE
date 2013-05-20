// Festival duel
tools.Page.pages['gift.php'] = function() {

	console.log('Page: gift.php');

	// new gifts design
	var _giftdiv = $('table.layout div[style*="/graphics/giftpage_title.jpg"]'), _content = '';
	_giftdiv.next().find('td:eq(1) > div').each(function(_i, _e) {
		_content += $(_e).removeAttr('style', '').html();
	});
	_giftdiv.attr('style', _giftdiv.attr('style').replace('giftpage_title', 'keep_top')).css('height', 136).html('<div title="David" style="padding:40px 0 0 0;width:100%;height:33px;color:#ffd20b;font-size:20px;font-weight:bold;text-align:center;overflow:hidden;">Send gifts to your friends</div><div style="padding: 11px 0 0 0;color:white;font-size:14px;text-align:center;font-weight: bold;">...they\'ll return the favor!</div>');
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
			'giftid' : _num
		}).click(function() {
			$('#giftsContent > img.imgButton').attr('class', 'imgButtonReverse').css('boxShadow', 0);
			$('#giftsContent').attr({
				'CAGEGiftNum' : _num,
				'CAGEGiftName' : _nam.replace('!', ''),
			});
			$(this).attr('class', 'imgButton').css('boxShadow', '0 0 6px 1px #09f');
		}).css({
			'width' : 50,
			'height' : 50,
			'padding' : '1px',
			'cursor' : 'pointer'
		}).unwrap().unwrap().unwrap().unwrap().unwrap().unwrap();
	});
	$('#giftsContent div[style="padding:10px 0 0 0;"]').remove();

	var $_img = $('img[src*="request_fb_gift.gif"]');
	if ($_img.length > 0) {
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
	}
};