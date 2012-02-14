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

	var _sr = $(document.body).html().match(/<input.+?"signed_request".+?>/)[0].replace('input', 'input id="signed_request"');
	$(document.body).append($(_sr));
	com.send(com.task.signed, com.port.castleAge, $('#signed_request').val());
	com.send(com.task.userId, com.port.castleAge, $('#EnvUser').val());

	// renews signed_request every 10 minutes
	window.setInterval(function() {
		$.get('http://apps.facebook.com/castle_age/index.php', function(_data) {
			var _sr = _data.match(/<input.+?"signed_request".+?>/)[0].replace('input', 'input id="signed_request"');
			$('#signed_request').remove();
			$(document.body).append($(_sr));
			com.send(com.task.signed, com.port.castleAge, $('#signed_request').val());
			_data = null;
		}, 'text');
	}, 1200000);

	window.setInterval(function() {
		com.send(com.task.alive, com.port.castleAge, null);
	}, 600000);
	// Possible fix for framing problem
	$('body').removeClass('center_fixed_width_app');

}