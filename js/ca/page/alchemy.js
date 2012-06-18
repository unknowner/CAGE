// Alchemy
tools.Page.pages['alchemy.php'] = function() {

	console.log('Page: alchemy.php');
	$('div[style*="/graphics/alchfb_top.jpg"]').css('height', 320).after($('<div id="cageItemsStatus">'));

	function fixTooltip(_this) {
		var $this = $(_this);
		var _info = $this.text().split(/\n/);
		for ( var i = 0; i < _info.length; i++) {
			if (_info[i].trim() == '') {
				_info.splice(i, 1);
				i--;
			} else {
				_info[i] = _info[i].trim();
			}
		}
		_info[0] = '<b>' + _info[0].trim() + '</b>';
		if ($this.attr('id').indexOf('_origin_') !== -1) {
			$this.prev('img').css({
				'height' : 64,
				'width' : 64
			}).parent().css({
				'width' : '',
				'textAlign' : '',
				'padding' : '12px 0 0 34px'
			});
		}
		$this.prev('img').data('info', _info.join('<br>')).removeAttr('alt').removeAttr('title').removeAttr('onmouseover').removeAttr('onmouseout').hover(function() {
			$(this).css('zIndex', 2).after('<div class="cageUnitStats" style="z-index:1;margin-top:-24px;"><div style="max-width:225px;white-space:normal;">' + $(this).data('info') + '</div></div>');
		}, function() {
			$(this).css('zIndex', '').next('div.cageUnitStats').remove();
		});
		$this.remove();
	}
	function addFilter(_id, _text, _f1, _f2) {
		$('#cageItemsStatus').append($('<div id="' + _id + '" class="cageAlchemyButtons"><img src="http://image4.castleagegame.com/graphics/boss_lotus_help2.gif"><span></span><span>' + _text + '</span></div>').toggle(function() {
			$('#' + _id).find('span:first').html('&#10003').end().children('img').attr('src', 'http://image4.castleagegame.com/graphics/boss_lotus_help3.gif');
			_f1();
		}, function() {
			$('#' + _id).find('span:first').html('').end().children('img').attr('src', 'http://image4.castleagegame.com/graphics/boss_lotus_help2.gif');
			_f2();
		}));
	}
	function pinItem() {
		var _topin = $(this).parent(), _stored = item.get('cagePageAlchemyPinned', []);
		if (_stored.indexOf(_topin.data('name')) === -1) {
			_stored.push(_topin.data('name'));
		}
		item.set('cagePageAlchemyPinned', _stored);
		_topin.find('button.cageHideItem').hide();
		_topin.addClass('cageIsPinned').find('button.cagePinItem').removeClass('ui-icon-pin-w').addClass('ui-icon-pin-s').css('background-color', '#00a').unbind('click').click(unpinItem);
		if (item.get('cagePageAlchemyShowPinned', true) == true) {
			_topin.addClass('cagePinnedItems');
		}
	}
	function unpinItem() {
		var _topin = $(this).parent(), _stored = item.get('cagePageAlchemyPinned', []), _index = _stored.indexOf(_topin.data('name'));
		_topin.find('button.cageHideItem').show();
		if (_index !== -1) {
			_stored.splice(_index, 1);
			item.set('cagePageAlchemyPinned', _stored);
		}
		_topin.removeClass('cagePinnedItems cageIsPinned').find('button.cagePinItem').removeClass('ui-icon-pin-s').addClass('ui-icon-pin-w').css('background-color', '').unbind('click').click(pinItem);
	}

	function pageAlchemyHidden() {
		var _hidden = $(this).parent(), _stored = item.get('cagePageAlchemyHidden', []);
		if ($(this).data('hidden') === false) {
			_hidden.addClass('cageIsHidden ' + (item.get('cagePageAlchemyShowHidden', false) === false ? 'cageForceHidden' : '')).find('button.cagePinItem').hide();
			$(this).data('hidden', true).css({
				'background-color' : '#a00',
				'top' : 9
			});
			if (_stored.indexOf(_hidden.data('name')) === -1) {
				_stored.push(_hidden.data('name'));
				item.set('cagePageAlchemyHidden', _stored);
			}
		} else {
			_hidden.removeClass('cageIsHidden cageForceHidden').find('button.cagePinItem').show();
			$(this).data('hidden', false).css({
				'background-color' : '',
				'top' : ''
			});
			if (_stored.indexOf(_hidden.data('name')) !== -1) {
				_stored.splice(_stored.indexOf(_hidden.data('name')), 1);
				item.set('cagePageAlchemyHidden', _stored);
			}
		}
	}

	// hide incomplete button
	addFilter('cageHideRecipe', 'Hide incomplete', function() {
		$('#cageItemsStatus').nextAll('div.cageAlchemyContainer, div.cageAlchemyContainerBlank').filter(function() {
			return $(this).find('input[value = "perform_alchemy"]').length == 0;
		}).hide();
		item.set('cagePageAlchemyHideIncomplete', true);
	}, function() {
		$('#cageItemsStatus').nextAll('div.cageAlchemyContainer, div.cageAlchemyContainerBlank').show();
		item.set('cagePageAlchemyHideIncomplete', false);
	});

	// hide items
	addFilter('cageHideItems', 'Show hidden items', function() {
		$('div.cageIsHidden').removeClass('cageForceHidden');
		item.set('cagePageAlchemyShowHidden', true);
	}, function() {
		$('div.cageIsHidden').addClass('cageForceHidden');
		item.set('cagePageAlchemyShowHidden', false);
	});

	// pin items
	addFilter('cageShowPinned', 'Always show pinned items', function() {
		$('div.cageIsPinned').addClass('cagePinnedItems');
		item.set('cagePageAlchemyShowPinned', true);
	}, function() {
		$('div.cageIsPinned').removeClass('cagePinnedItems');
		item.set('cagePageAlchemyShowPinned', false);
	});

	// check for stored stuff
	var _storedHidden = item.get('cagePageAlchemyHidden', []);
	$('.cageAlchemyContainer, .cageAlchemyContainerBlank').each(function() {
		if (_storedHidden.indexOf($(this).data('name')) !== -1) {
			$(this).find('button.cageHideItem').click();
		}
	});

	var _pinItem = '<button class="cageHideItem ui-icon ui-icon-cancel"><button class="cagePinItem ui-icon ui-icon-pin-w">', _storedPinned = item.get('cagePageAlchemyPinned', []);
	$('table.layout div[style *= "graphics/alchfb_midrepeat.jpg"], table.layout div[style *= "graphics/alchfb_midrepeat_blank.jpg"]').each(function(_i) {
		var $this = $(this), _index = _storedPinned.indexOf($this.data('name'));
		setTimeout(function() {
			$this.find('div[id ^= "display_"]').each(function() {
				fixTooltip(this);
			});
		}, 50);
		$this.data('name', $this.find('div:eq(9)').text().trim()).addClass('cageAlchemyContainer').removeAttr('style').append(_pinItem);
		if (_index >= 0) {
			$(this).find('button.cagePinItem').click();
		}
	});

	$('button.cagePinItem').click(pinItem);
	if (item.get('cagePageAlchemyShowPinned', true) === true) {
		$('#cageShowPinned').click();
	}
	$('button.cageHideItem').data('hidden', false).click(pageAlchemyHidden);
	if (item.get('cagePageAlchemyShowHidden', false) === true) {
		$('#cageHideItems').click();
	}
	if (item.get('cagePageAlchemyHideIncomplete', false) === true) {
		$('#cageHideRecipe').click();
	}

};
