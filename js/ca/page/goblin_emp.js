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
				if(_e > 0) {
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
	var _storedLocked = item.get('cagePageGoblinLockedItems', []), _storedHidden = item.get('cagePageGoblinHideLockedItems', false), _storedHiddenUL = item.get('cagePageGoblinHideUnlockedItems', false);

	$('#gob_emp_cost').before($('<label id="cageHideUnlockedLabel" for="cageHideUnlocked"><input type="checkbox" name="HideUnocked" id="cageHideUnlocked">Hide unlocked items</label>').click(function() {
		var _unlocked = $('#cageHideUnlocked').prop('checked'), _locked = $('#cageHideLocked').prop('checked');
		item.set('cagePageGoblinHideUnlockedItems', _unlocked);
		$('div.ingredientUnit[id^="gout_"]').each(function(_i, _e) {
			if(_unlocked === true && $(_e).data('locked') === false) {
				$(_e).hide();
			} else {
				if(_locked === true && $(_e).data('locked') === true) {
					$(_e).hide();
				} else {
					$(_e).show();
				}
			}
		});

	}));
	$('#cageHideUnlocked').prop('checked', _storedHiddenUL);

	$('#gob_emp_cost').before($('<label id="cageHideLockedLabel" for="cageHideLocked"><input type="checkbox" name="HideLocked" id="cageHideLocked">Hide locked items</label>').click(function() {
		var _unlocked = $('#cageHideUnlocked').prop('checked'), _locked = $('#cageHideLocked').prop('checked');
		item.set('cagePageGoblinHideLockedItems', _locked);
		$('div.ingredientUnit[id^="gout_"]').each(function(_i, _e) {
			if(_locked === true && $(_e).data('locked') === true) {
				$(_e).hide();
			} else {
				if(_unlocked === true && $(_e).data('locked') === false) {
					$(_e).hide();
				} else {
					$(_e).show();
				}
			}
		});
	}));
	$('#cageHideLocked').prop('checked', _storedHidden);

	$('div.ingredientUnit[id^="gin_"]').addClass('cageGoblinItemGin');
	$('div.ingredientUnit[id^="gout_"]').each(function(_i, _e) {
		var $this = $(_e), _click = $this.attr('onclick');
		$this.addClass('cageGoblinItemGout').data('locked', false).prepend($('<button class="cageGoblinLocked">').button({
			text : false,
			icons : {
				primary : 'ui-icon-unlocked'
			}
		}).click(function() {
			$this.data('locked', !$this.data('locked'));
			if($this.data('locked') === true) {
				$(this).button('option', 'icons', {
					primary : 'ui-icon-locked'
				});
				$this.find('img:last').hide();
				_storedLocked.push(/\w+\.\w{3}$/.exec($this.find('img:first').attr('src'))[0]);
				item.set('cagePageGoblinLockedItems', _storedLocked);
			} else {
				$(this).button('option', 'icons', {
					primary : 'ui-icon-unlocked'
				});
				$this.find('img:last').show();
				_storedLocked.splice(_storedLocked.indexOf(/\w+\.\w{3}$/.exec($this.find('img:first').attr('src'))[0]), 1);
				item.set('cagePageGoblinLockedItems', _storedLocked);
			}
			setTimeout(function() {
				if(($this.data('locked') === true && $('#cageHideLocked').prop('checked') === true) === true || ($this.data('locked') === false && $('#cageHideUnlocked').prop('checked') === true) === true) {
					$this.hide('slow');
				}
			}, 1000);
		})).attr('onclick', '').find('div:last').css('height', 22).find('img:last').click(function() {
			if($this.is(':hidden') === true) {
				$this.children('button.cageGoblinLocked').hide();
			} else {
				$this.children('button.cageGoblinLocked').show();
			}
		}).attr('onclick', _click).css('cursor', 'pointer');
		if(_storedLocked.length > 0 && _storedLocked.indexOf(/\w+\.\w{3}$/.exec($this.find('img:first').attr('src'))[0]) !== -1) {
			$this.children('button.cageGoblinLocked:first').click();
			if(_storedHidden === true) {
				$this.hide();
			}
		}
		if(_storedHiddenUL === true && $this.data('locked') === false) {
			$this.hide();
		}
	});
};
