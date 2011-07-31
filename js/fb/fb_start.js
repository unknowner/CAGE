function startCAGE() {

	$('#contentArea').css('width', 1005);
	$('#pagelet_canvas_footer_content').hide();
	$('#contentCol').css('paddingTop', 0);
	$('div.fixedAux').hide();
	/*$('div.fixedAux').css({
		'width': 205,
		'border': 0,
		'position': 'fixed'
	}).empty().append(
	$('<div id="cageGeneralContainer" class="ui-corner-br ui-state-default"></div>')
	.append(
	$('<div id="cageGeneralImageContainer" class="ui-state-active ui-corner-all"></div>')
	.append('<img id="cageGeneralImage" class="ui-corner-all" />')
	).append('<span id="cageGeneralName" class="ui-state-active ui-corner-right"></span>')
	).append('<div id="cageToolsContainer" class="ui-state-default ui-corner-right"></div>');*/
	addFunction( function () {
		var _i = document.createElement('INPUT');
		_i.type = 'hidden';
		_i.id = 'EnvUser';
		_i.value = Env.user;
		document.body.appendChild(_i);
	}, null, true, true);
	$('#iframe_canvas').height(window.innerHeight - 41);
	com.send(com.task.resize, com.port.castleAge, {
		height : window.innerHeight - 41
	});

	com.send(com.task.signed, com.port.castleAge, $('input[name="signed_request"]').val());
	com.send(com.task.userId, com.port.castleAge, $('#EnvUser').val());
	//com.send(com.task.updateGenerals, com.port.castleAge, null);
	//com.send(com.task.getGeneral, com.port.castleAge, null);

}