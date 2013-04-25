// Goblin Emporium
tools.Page.pages['goblin_emp.php'] = function() {

	console.log('Page: goblin_emp.php');
	// fix rolling
	addFunction(function() {
		gob_mix = function() {
			$('body').animate({
				scrollTop : 0
			}, 'slow');
			g_item_mix = '';
			var _items = [];
			$.each(g_item_map_in, function(_i, _e) {
				if (_e > 0) {
					_items.push(_i + '_' + _e);
				}
			});
			friend_browse_offset = 0;
			reset_raid_lst();
			pageCache = {};
			ajaxPerforming = true;
			$('#AjaxLoadIcon').show();
			$.ajax({
				url : 'goblin_emp.php',
				data : 'ajax=1&signed_request=' + $('#signed_request').attr('value') + '&g_item_mix=' + _items.join(','),
				type : 'POST',
				success : function(data, textStatus, jqXHR) {
					ajaxPageDone(jqXHR.responseText, 'globalContainer');
				}
			});
		};
	}, null, true, true);

	// hide items from goblin
	var _dataVersion = item.get('cagePageGoblinDataVersion', '1.2.17'), _storedLocked = item.get('cagePageGoblinLockedItems', []), _storedHidden = item.get('cagePageGoblinHideLockedItems', false), _storedHiddenUL = item.get('cagePageGoblinHideUnlockedItems', false);

	// hide unlocked
	$('#gob_emp_cost').before($('<label id="cageHideUnlockedLabel" for="cageHideUnlocked"><input type="checkbox" name="HideUnlocked" id="cageHideUnlocked">Hide unlocked items</label>').click(function() {
		var _unlocked = $('#cageHideUnlocked').prop('checked'), _locked = $('#cageHideLocked').prop('checked');
		item.set('cagePageGoblinHideUnlockedItems', _unlocked);
		$('div.ingredientUnit[id^="gout_"]').each(function(_i, _e) {
			if ((_unlocked === true && $(_e).data('locked') === false) || (_locked === true && $(_e).data('locked') === true)) {
				$(_e).hide();
			} else {
				$(_e).show();
			}
		});

	}));
	$('#cageHideUnlocked').prop('checked', _storedHiddenUL);

	// hide locked
	$('#gob_emp_cost').before($('<label id="cageHideLockedLabel" for="cageHideLocked"><input type="checkbox" name="HideLocked" id="cageHideLocked">Hide locked items</label>').click(function() {
		var _unlocked = $('#cageHideUnlocked').prop('checked'), _locked = $('#cageHideLocked').prop('checked');
		item.set('cagePageGoblinHideLockedItems', _locked);
		$('div.ingredientUnit[id^="gout_"]').each(function(_i, _e) {
			if ((_locked === true && $(_e).data('locked') === true) || (_unlocked === true && $(_e).data('locked') === false)) {
				$(_e).hide();
			} else {
				$(_e).show();
			}
		});
	}));
	$('#cageHideLocked').prop('checked', _storedHidden);

	$('div.ingredientUnit[id^="gin_"]').addClass('cageGoblinItemGin');
	var $gout = $('div.ingredientUnit[id^="gout_"]');

	// change Kobo data from image src to div id
	if (_dataVersion === '1.2.17') {
		console.log('KOBO data:', _dataVersion);
		if (_storedLocked.length > 0) {
			var _newLocked = [];
			$gout.each(function(_i, _e) {
				var $this = $(_e), _src = /\w+\.\w{3}$/.exec($this.find('img:first').attr('src'))[0], _index = _storedLocked.indexOf(_src);
				if (_index !== -1) {
					console.log('KOBO:', _src, ' > ', $this.attr('id').substr(5));
					_storedLocked.splice(_index, 1);
					_newLocked.push($this.attr('id').substr(5));
				}
			});
			item.set('cagePageGoblinLockedItems', _newLocked);
			_storedLocked = _newLocked;
		}
		item.set('cagePageGoblinDataVersion', '1.2.18');
	}

	$gout.each(function(_i, _e) {
		var $this = $(_e), _click = $this.attr('onclick');
		$this.addClass('cageGoblinItemGout').data('locked', false).prepend($('<button class="cageGoblinLocked">').button({
			text : false,
			icons : {
				primary : 'ui-icon-unlocked'
			}
		}).click(function() {
			$this.data('locked', !$this.data('locked'));
			if ($this.data('locked') === true) {
				$(this).button('option', 'icons', {
					primary : 'ui-icon-locked'
				});
				$this.find('img:last').hide();
				if (_storedLocked.indexOf($this.attr('id').substr(5)) === -1) {
					_storedLocked.push($this.attr('id').substr(5));
					item.set('cagePageGoblinLockedItems', _storedLocked);
				}
			} else {
				$(this).button('option', 'icons', {
					primary : 'ui-icon-unlocked'
				});
				$this.find('img:last').show();
				_storedLocked.splice(_storedLocked.indexOf($this.attr('id').substr(5)), 1);
				item.set('cagePageGoblinLockedItems', _storedLocked);
			}
			setTimeout(function() {
				if (($this.data('locked') === true && $('#cageHideLocked').prop('checked') === true) === true || ($this.data('locked') === false && $('#cageHideUnlocked').prop('checked') === true) === true) {
					$this.hide('slow');
				}
			}, 1000);
		})).attr('onclick', '').find('div:last').css('height', 22).find('img:last').click(function() {
			if ($this.is(':hidden') === true) {
				$this.children('button.cageGoblinLocked').hide();
			} else {
				$this.children('button.cageGoblinLocked').show();
			}
		}).attr('onclick', _click).css('cursor', 'pointer');
		if (_storedLocked.length > 0 && _storedLocked.indexOf($this.attr('id').substr(5)) !== -1) {
			$this.children('button.cageGoblinLocked:first').click();
			if (_storedHidden === true) {
				$this.hide();
			}
		}
		if (_storedHiddenUL === true && $this.data('locked') === false) {
			$this.hide();
		}
	});
};
