// Open army requests
tools.Page.pages['army_reqs.php'] = function() {

	console.log('Page: army_reqs.php');

	function deleteRequest() {
		$('#AjaxLoadIcon').show();
		$('#app_body table.layout table:eq(1) table td').hide();
		if($('#app_body table.layout table table td.action').length > 0) {
			get('army_reqs.php?action=delete&player_id=' + $('#app_body table table table *[uid]:first').attr('uid'), function(_reqpage) {
				$('#app_body table.layout table:eq(1)').hide().html($('#app_body table.layout table:eq(1)', _reqpage).html()).show();
				deleteRequest();
			});
		} else {
			tools.Page.loadPage('army_reqs.php');
		}
	}


	$('div:contains("Current Army Size"):last').css('width', 400).before($('<button class="cageGifterButton">S<span>top </span>A<span>ll </span>M<span>essengers</span></button>').click(function() {
		$(this).fadeOut('slow', function() {
			$(this).remove();
		});
		deleteRequest();
	}));
};
