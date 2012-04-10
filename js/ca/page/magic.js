// Magic
tools['Page'].runtime['magic.php'] = function() {

	$('div[style*="/graphics/town_header.jpg"]:first').after('<div id="cagePinHere" style="font-family: sans-serif;font-size: 17px;background-image: url(http://image4.castleagegame.com/graphics/town_unit_bar.jpg);width: 740px;height: 93px;margin-top: 5px;"><div style="padding: 23px 0 0 114px;width: 146px;font-weight: bold;text-align:center;">Pin an item with the + on each item</div></div>');
	//Reverse buy order (5-1)
	$('form[id^="itemBuy_"]').each(function() {
		$(this).append($('<img class="cagePinIt" src="http://image4.castleagegame.com/graphics/town_button_expand.gif" style="cursor:pointer;height: 13px;position: absolute;margin-left: 1px;margin-top: -11px;">').click(function() {
			$('#cagePinHere').html($(this).parent().parent().parent().parent().parent().html()).find('img.cagePinIt').remove();
			item.set('cagePageMagicPinned', $(this).data('id'));
			$('body').animate({
				scrollTop : 0
			}, 'slow');
		}).data('id', $(this).attr('id')));
		var _s = $(this).find('select:first');
		_s.html(_s.find('option').get().reverse()).val(0);
	});
	var _pin = item.get('cagePageMagicPinned', false);
	if(_pin !== false) {
		$('#' + _pin + ' > img.cagePinIt').click();
	}
};
