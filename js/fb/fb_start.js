function startCAGE() {

	addFunction( function () {
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

}