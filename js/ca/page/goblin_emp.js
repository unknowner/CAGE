// Goblin Emporium
tools['Page'].runtime['goblin_emp.php'] = function() {

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
					jqXHR = data = undefined;
				}
			});
		};
	}, null, true, true);

	// hide items from goblin
	var _storedLocked = item.get('cagePageGoblinLockedItems', []);
	$('div.ingredientUnit[id^="gout_"]').each(function(_i, _e) {
		var $this = $(_e), _click = $this.attr('onclick');
		$this.prepend($('<button class="cageGoblinLocked">').button({
			text : false,
			icons : {
				primary : 'ui-icon-unlocked'
			}
		}).data('hidden', false).click(function() {
			if($(this).data('hidden') === false) {
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
			console.log(_storedLocked);
			$(this).data('hidden', !$(this).data('hidden'));

		})).css('cursor', '').attr('onclick', '').find('div:last').css('height', 22).find('img:last').click(function() {
			if($this.isHidden()) {
				$this.children('button.cageGoblinLocked').hide();
			} else {
				$this.children('button.cageGoblinLocked').show();
			}
		}).attr('onclick', _click).css('cursor', 'pointer');
		if(_storedLocked.length > 0 && _storedLocked.indexOf(/\w+\.\w{3}$/.exec($this.find('img:first').attr('src'))[0]) !== -1) {
			$this.children('button.cageGoblinLocked:first').click();
		}
	});
};
