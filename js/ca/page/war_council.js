// war_council
tools.Page.pages['war_council.php'] = function() {

	console.log('Page: war_council');

	addFunction(function() {
		gob_mix = function() {
			if (g_item_map_in.length < g_item_max) {
				return;
			}
			$('body').animate({
				scrollTop : 0
			}, 'slow');
			friend_browse_offset = 0;
			reset_raid_lst();
			pageCache = {};
			ajaxPerforming = true;
			var params = {
				'ajax' : 1,
				'select_council' : 1,
				'g_item_map_in' : g_item_map_in,
				'signed_request' : $('#signed_request').attr('value')
			};
			$('#AjaxLoadIcon').show();
			$.ajax({
				url : 'war_council.php',
				data : params,
				type : 'POST',
				success : function(data, textStatus, jqXHR) {
					ajaxPageDone(jqXHR.responseText, 'globalContainer');
				}
			});
		};
	}, null, true, true);

	// sort listed generals
	var _generals = {}, _generalsSorted = '';
	$('#selectingCouncilDisplay div.generalSmallContainer').each(function(_i) {
		var _a = parseInt($(this).find('div.generals_indv_stats_padding div:first').text()), _d = parseInt($(this).find('div.generals_indv_stats_padding div:last').text());
		$(this).height(200).find('div.general_pic_div3').attr('style', 'cursor: pointer;height:115px;');
		_generals[Math.floor(100000 - 1000 * (_a + _d * 0.7)) + _i] = $(this)[0].outerHTML;
		$(this).remove();
	});

	$('#selectingCouncilDisplay div.selfSmallContainer').height(200).find('div.general_pic_div3').attr('style', 'cursor: pointer;height:115px;');

	$.each(_generals, function() {
		_generalsSorted += this;
	});
	_generals = null;
	$('#selectingCouncilDisplay div.selfSmallContainer').after(_generalsSorted);

};
