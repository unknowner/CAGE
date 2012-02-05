// Open army requests
tools['Page'].runtime['army_reqs.php'] = function() {

	console.log('Page: army_reqs.php');

	function deleteRequest() {
		$('#AjaxLoadIcon').show();
		$('#app_body table.layout table:eq(1)').css({
			'height' : 86,
			'overflow' : 'hidden',
			'display' : 'block'
		})
		if($('#app_body table.layout table table td.action').length > 0) {
			get('army_reqs.php?action=delete&player_id=' + $('#app_body table table table *[uid]:first').attr('uid'), function(_reqpage) {
				$('#app_body table.layout table:eq(1)').hide().html($('#app_body table.layout table:eq(1)', _reqpage).html()).show();
				addFunction(function() {
					FB.XFBML.parse($('#app_body table.layout table:eq(1)')[0]);
				}, null, true, true);
				window.setTimeout(deleteRequest, 1000);
			});
		} else {
			tools.Page.loadPage('army_reqs.php');
		}
	}


	$('div:contains("Current Army Size"):last').css('width', 400).before($('<button class="cageGifterButton">S<span>top </span>A<span>ll </span>M<span>essengers</span></button>').click(deleteRequest));
};
