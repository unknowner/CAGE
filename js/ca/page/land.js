// Land
tools.Page.pages['land.php'] = function() {

	console.log('Page: land.php');
	$('div[style*="/graphics/town_header_land.jpg"]:first').after('<div id="cagePinHere" style="font-family: sans-serif;font-size: 15px;background-image: url(http://image4.castleagegame.com/graphics/town_land_bar.jpg);width: 740px;height: 93px;margin-top: 5px;"><div style="padding: 25px 0 0 185px;width: 238px;font-weight: bold;text-align: center;">Pin an item with the + on each item</div></div>');
	//Reverse buy order (10-1)
	$('#section_land form[id^="prop_"], #section_special_land form[id^="prop_"]').each(function() {
		$(this).append($('<img class="cagePinIt" src="http://image4.castleagegame.com/graphics/town_button_expand.gif" style="cursor:pointer;height: 13px;position: absolute;margin-left: 1px;margin-top: -11px;">').click(function() {
			$('#cagePinHere').html($(this).parent().parent().parent().parent().html()).find('img.cagePinIt').remove();
			item.set('cagePageLandPinned', $(this).data('id'));
			$('body').animate({
				scrollTop : 0
			}, 'slow');
		}).data('id', $(this).attr('id')));
		var _s = $(this).find('select:first');
		_s.html(_s.find('option').get().reverse()).val(0);
	});
	var _pin = item.get('cagePageLandPinned', false);
	if(_pin !== false) {
		$('#' + _pin + ' > img.cagePinIt').click();
	}
	// ROI
	$('#section_land, #section_special_land').children().each(function() {
		$this = $(this);
		var _income = parseInt($this.children('div:eq(1), div:eq(2):has(strong.gold)').text().trim().match(/\d+$/), 10), _price = parseInt($this.find('strong.gold').text().replace(',', '').match(/\d+/));
		console.log(_income, _price);
		console.log(_income / _price);
	});
};
