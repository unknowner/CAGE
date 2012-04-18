// soldiers
tools.Page.runtime['soldiers.php'] = function() {

	// Add discount general
	var _general = null;
	if(tools.General.runtime.general.Darius) {
		_general = tools.General.runtime.general.Darius;
	} else if(tools.General.runtime.general.Lucius) {
		_general = tools.General.runtime.general.Lucius;
	} else if(tools.General.runtime.general.Garlan) {
		_general = tools.General.runtime.general.Garlan;
	} else if(tools.General.runtime.general.Penelope) {
		_general = tools.General.runtime.general.Penelope;
	}
	if(_general !== null) {
		$('table.layout div > img[src$="/graphics/hero_lucius.jpg"]:first').attr('src', _general.image).css('cursor', 'pointer').click(function() {
			tools.General.setByName(_general.name);
		}).parent().append('<div style="position: relative;bottom: 15px;width: 159px;background: #000;color: #fff;text-align: center;font-size: 12px;opacity: 0.75;">Click here to set</div>');
		$('table.layout b:contains("Lucius"):first').parent().html('<b>' + _general.name + '</b>: ' + _general.text);
	}
	$('div[style*="/graphics/town_header.jpg"]:first').after('<div id="cagePinHere" style="font-family: sans-serif;font-size: 17px;background-image: url(http://image4.castleagegame.com/graphics/town_unit_bar.jpg);width: 740px;height: 93px;margin-top: 5px;"><div style="padding: 23px 0 0 114px;width: 146px;font-weight: bold;text-align:center;">Pin an item with the + on each item</div></div>');
	//Reverse buy order (5-1)
	$('form[id^="itemBuy_"]').each(function() {
		$(this).append($('<img class="cagePinIt" src="http://image4.castleagegame.com/graphics/town_button_expand.gif" style="cursor:pointer;height: 13px;position: absolute;margin-left: 1px;margin-top: -11px;">').click(function() {
			$('#cagePinHere').html($(this).parent().parent().parent().parent().parent().html()).find('img.cagePinIt').remove();
			item.set('cagePageSoldierPinned', $(this).data('id'));
			$('body').animate({
				scrollTop : 0
			}, 'slow');
		}).data('id', $(this).attr('id')));
		var _s = $(this).find('select:first');
		_s.html(_s.find('option').get().reverse()).val(0);
	});
	var _pin = item.get('cagePageSoldierPinned', false);
	if(_pin !== false) {
		$('#' + _pin + ' > img.cagePinIt').click();
	}
};
