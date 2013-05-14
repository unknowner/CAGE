function startCAGE() {

	addFunction(function() {

		// Create uid-input from CA (easier to get uid)
		function cageGetUID() {
			var _i = document.createElement('INPUT');
			_i.type = 'hidden';
			_i.id = 'EnvUser';
			_i.value = getCookie('c_user');
			console.log('cageGetUID:', _i.value);
			// _i.value = Env.user;
			if (_i.value !== null) {
				document.body.appendChild(_i);
			} else {
				cageGetUID();
			}
		}
		cageGetUID();
	}, null, true, true);
	// Fix for double scrollbars
	$('#body').css({
		'overflow' : '',
		'overflowY' : ''
	});
	// Iframe changes
	$('#cageIFrame').html('.cageIFrame {height:' + (window.innerHeight - 34) + 'px !important;}');
	$('#iframe_canvas').addClass('cageIFrame').attr('scrolling', 'yes');
	$('#js_0').width('100%');

	$(document.body).append('<input id="signed_request" type="hidden" value="' + $('input[name="signed_request"]').val() + '">');
	com.send(com.task.signed, com.port.castleAge, $('#signed_request').val());
	com.send(com.task.userId, com.port.castleAge, $('#EnvUser').val());

	// renews signed_request every 10 minutes
	window.setInterval(function() {
		$.get('//apps.facebook.com/castle_age/index.php', function(_data) {
			var _sr = $(_data.match(/<input.*name="signed_request".*\/>/)[0]).val();
			$('#signed_request').remove();
			$(document.body).append('<input id="signed_request" type="hidden" value="' + _sr + '">');
			com.send(com.task.signed, com.port.castleAge, $('#signed_request').val());
			_data = null;
		}, 'html');
	}, 1200000);

	window.setInterval(function() {
		com.send(com.task.alive, com.port.castleAge, null);
	}, 600000);
	// Possible fix for framing problem
	$('body').removeClass('center_fixed_width_app');

}
