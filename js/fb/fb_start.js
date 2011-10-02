function startCAGE() {

	// Create uid-input from CA (easier to get uid)
	addFunction(function() {
		var _i = document.createElement('INPUT');
		_i.type = 'hidden';
		_i.id = 'EnvUser';
		_i.value = Env.user;
		document.body.appendChild(_i);
	}, null, true, true);

	$('#cageIFrame').html('.cageIFrame {height:' + (window.innerHeight - 34) + 'px !important;}');
	$('#iframe_canvas').addClass('cageIFrame').attr('scrolling', 'yes');

	com.send(com.task.signed, com.port.castleAge, $('input[name="signed_request"]').val());
	com.send(com.task.userId, com.port.castleAge, $('#EnvUser').val());

	// renews signed_request every 10 minutes
	window.setInterval(function() {
		$.get('http://apps.facebook.com/castle_age/index.php', function(_data) {
			com.send(com.task.signed, com.port.castleAge, /signed_request\\" value=\\"(.+?)\\"/.exec(_data)[1]);
			_data = null;
		}, "text")
	}, 1200000);

	$('#cageNews').dialog('open');
	$('#cageNews a').blur();

}