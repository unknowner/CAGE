// Alchemy
tools.Page.pages['alchemy.php'] = function() {

	console.log('Page: alchemy.php');

	// pinned items
	$('div[style*="/graphics/alchfb_top.jpg"]').after($('<div id="cagePinnedItems">'));
	$('div[style *= "graphics/alchfb_midrepeat.jpg"]').addClass('cageAlchemyContainer').attr('style', '').append('<button class="cagePinItem ui-icon ui-icon-unlocked">');
	$('div[style *= "graphics/alchfb_midrepeat_blank.jpg"]').addClass('cageAlchemyContainerBlank').attr('style', '').append('<button class="cagePinItem ui-icon ui-icon-unlocked">');
	$('button.cagePinItem').click(function() {
		var _topin = $(this).parent(), _pinned = _topin.clone(), _id = Math.floor(Math.random() * Math.random() * 100000000), _stored = item.get('cagePageAlchemyPinned', []);
		_topin.data('name', _topin.find('div > div:eq(2) > div:eq(0) > div').text().trim());
		if (_stored.indexOf(_topin.data('name')) === -1) {
			_stored.push(_topin.data('name'));
		}
		item.set('cagePageAlchemyPinned', _stored);
		_pinned.attr('id', _id + 'pinned').find('button.cagePinItem').unbind('click').click(function() {
			var _storedPinned = item.get('cagePageAlchemyPinned', []), _hiddenPin = $('#' + _id + 'list'), _index = _stored.indexOf(_hiddenPin.data('name'));
			if (_index !== -1) {
				_storedPinned.splice(_index, 1);
				item.set('cagePageAlchemyPinned', _storedPinned);
			}
			$(this).parent().remove();
			_hiddenPin.removeClass('cagePinItemForceHidden');
		}).removeClass('ui-icon-unlocked').addClass('ui-icon-locked').css('background-color', '#633').end().appendTo('#cagePinnedItems');
		_topin.addClass('cagePinItemForceHidden').attr('id', _id + 'list');
	});
	var _stored = item.get('cagePageAlchemyPinned', []);
	$('#cagePinnedItems').nextAll('div.cageAlchemyContainer, div.cageAlchemyContainerBlank').each(function() {
		if (_stored.indexOf($(this).find('div > div:eq(2) > div:eq(0) > div').text().trim()) >= 0) {
			$(this).find('button.cagePinItem').click();
		}
	});

	// hide incomplete button
	$('#alchemy_sort_pulldown, #alchemy_filter_pulldown').parent().parent().height(40);
	$('#alchemy_filter_pulldown').parent().parent().after($('<div id="cageHideRecipe"><img src="http://image4.castleagegame.com/graphics/boss_lotus_help2.gif"><span></span><span>HIDE INCOMPLETE</span></div>').toggle(function() {
		$('#cagePinnedItems').nextAll('div.cageAlchemyContainer, div.cageAlchemyContainerBlank').filter(function() {
			return $(this).find('input[value = "perform_alchemy"]').length == 0;
		}).hide();
		$('#cageHideRecipe').find('span:first').html('&#10003').end().children('img').attr('src', 'http://image4.castleagegame.com/graphics/boss_lotus_help3.gif');
		item.set('cagePageAlchemyHideIncomplete', true);
	}, function() {
		$('#cagePinnedItems').nextAll('div.cageAlchemyContainer, div.cageAlchemyContainerBlank').show();
		$('#cageHideRecipe').find('span:first').html('').end().children('img').attr('src', 'http://image4.castleagegame.com/graphics/boss_lotus_help2.gif');
		item.set('cagePageAlchemyHideIncomplete', false);
	}));

	if (item.get('cagePageAlchemyHideIncomplete', false) === true) {
		$('#cageHideRecipe').click();
	}

};
