function startCAGE() {

	$('#rightCol')
			.css({
				'position' : 'fixed',
				'top' : 56,
				'right' : 0
			})
			.empty()
			.append(
					$(
							'<div id="cageGeneralContainer" class="ui-corner-left ui-state-default"></div>')
							.append(
									'<img id="cageGeneralImage" class="ui-corner-all" />')
							.append(
									'<span id="cageGeneralName" class="ui-state-active ui-corner-left"></span>'))
			.append(
					'<div id="cageToolsContainer" class="ui-state-default ui-corner-left"></div>');

	console.log('init fb');
	initTools();

	com.send(com.task.signed, com.port.castleAge, $(
			'input[name="signed_request"]').attr('value'));
	com.send(com.task.getGeneral, com.port.castleAge, null);

}
