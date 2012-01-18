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

	com.send(com.task.signed, com.port.castleAge, $('input[name="signed_request"]').val());
	com.send(com.task.userId, com.port.castleAge, $('#EnvUser').val());

	// renews signed_request every 10 minutes
	$.get('http://apps.facebook.com/castle_age/index.php', function(_data) {
		console.log(_data.match(/<input.*signed_request.*\/>/));
		_data = null;
	})
	$.get('http://apps.facebook.com/castle_age/index.php', function(_data) {
		console.log(_data.match(/<input.*signed_request.*\/>/));
		_data = null;
	})
	window.setInterval(function() {
		$.get('http://apps.facebook.com/castle_age/index.php', function(_data) {
			com.send(com.task.signed, com.port.castleAge, $('input[name="signed_request"]', _data).val());
			_data = null;
		}, "text")
	}, 1200000);

	window.setInterval(function() {
		com.send(com.task.alive, com.port.castleAge, null);
	}, 600000);
	// Possible fix for framing problem
	$('body').removeClass('center_fixed_width_app');

}