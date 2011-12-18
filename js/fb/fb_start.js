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

	// Replace Search with general
	$('#navSearch').html('<ul id="cageFacebook"><li><a id="cageSettings"><span>CAGE</span></a></li><li><a id="cageGenerals"><img id="cageGeneralImage"><img src="http://image4.castleagegame.com/graphics/sword_stat.gif" class="cageGeneralAttDefImg" /><span id="cageGeneralAttack"></span><img src="http://image4.castleagegame.com/graphics/shield_stat.gif" class="cageGeneralAttDefImg" /><span id="cageGeneralDefense"></span><span id="cageGeneralName"></span></a></li></ul>');
	$('#cageFacebook').unwrap();
	$('#cageGenerals').click(function() {
		com.send(com.task.showAllGenerals, com.port.castleAge, null);
	});
	$('#cageSettings').click(function() {
		com.send(com.task.showSettings, com.port.castleAge, null);
	});

	com.send(com.task.signed, com.port.castleAge, $('input[name="signed_request"]').val());
	com.send(com.task.userId, com.port.castleAge, $('#EnvUser').val());

	// renews signed_request every 10 minutes
	window.setInterval(function() {
		$.get('http://apps.facebook.com/castle_age/index.php', function(_data) {
			com.send(com.task.signed, com.port.castleAge, /signed_request\\" value=\\"(.+?)\\"/.exec(_data)[1]);
			_data = null;
		}, "text")
	}, 1200000);

	window.setInterval(function() {
		com.send(com.task.alive, com.port.castleAge, null);
	}, 600000);
	// Possible fix for framing problem
	$('body').removeClass('center_fixed_width_app');

	$('#cageNews').dialog('open');
	$('#cageNews a').blur();

}