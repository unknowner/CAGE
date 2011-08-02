function startCAGE() {

	addFunction( function () {
		var _i = document.createElement('INPUT');
		_i.type = 'hidden';
		_i.id = 'EnvUser';
		_i.value = Env.user;
		document.body.appendChild(_i);
	}, null, true, true);
	
	$('#iframe_canvas').height(window.innerHeight - 43);
	com.send(com.task.resize, com.port.castleAge, {
		height : window.innerHeight - 43
	});

	com.send(com.task.signed, com.port.castleAge, $('input[name="signed_request"]').val());
	com.send(com.task.userId, com.port.castleAge, $('#EnvUser').val());

}