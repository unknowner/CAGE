function startCAGE() {

	// Create uid-input from CA (easier to get uid)
	addFunction(function() {
		var _i = document.createElement('INPUT');
		_i.type = 'hidden';
		_i.id = 'EnvUser';
		_i.value = Env.user;
		document.body.appendChild(_i);
	}, null, true, true);
	// Iframe changes
	$('#cageIFrame').html('.cageIFrame {height:' + (window.innerHeight - 34) + 'px !important;}');
	$('#iframe_canvas').addClass('cageIFrame').attr('scrolling', 'yes');

	$.get('http://apps.facebook.com/castle_age/index.php', function(_data) {
		com.send(com.task.signed, com.port.castleAge, $('#pagelet_iframe_canvas_content form:first > input').val());
		_data = null;
	})
	com.send(com.task.userId, com.port.castleAge, $('#EnvUser').val());

	// renews signed_request every 10 minutes
	window.setInterval(function() {
		$.get('http://apps.facebook.com/castle_age/index.php', function(_data) {
			com.send(com.task.signed, com.port.castleAge, $('#pagelet_iframe_canvas_content form:first > input').val());
			_data = null;
		})
	}, 1200000);

	window.setInterval(function() {
		com.send(com.task.alive, com.port.castleAge, null);
	}, 600000);
	// Possible fix for framing problem
	$('body').removeClass('center_fixed_width_app');

}