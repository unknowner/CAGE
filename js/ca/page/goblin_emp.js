// Goblin Emporium
tools['Page'].runtime['goblin_emp.php'] = function() {

	console.log('Page: goblin_emp.php');
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
					$('#app_body_container').append($(jqXHR.responseText).filter('script'));
					ajaxPageDone(data, 'globalContainer');
					jqXHR = data = undefined;
				}
			});
		};
	}, null, true, true);
};
