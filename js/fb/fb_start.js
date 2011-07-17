function startCAGE() {

	$('#globalContainer').css('width', 1005);
	$('#contentCol').css('paddingTop', 0);
	$('div.fixedAux').css({
		'width': 245,
		'border': 0
	}).empty()
	.append(
	$('<div id="cageGeneralContainer" class="ui-corner-br ui-state-default"></div>')
	.append($('<div id="cageGeneralImageContainer" class="ui-state-active ui-corner-all"></div>')
	.append('<img id="cageGeneralImage" class="ui-corner-all" />'))
	.append('<span id="cageGeneralName" class="ui-state-active ui-corner-right"></span>'))
	.append('<div id="cageToolsContainer" class="ui-state-default ui-corner-right"></div>');
	console.log('init fb');
	initTools();

	var _requestIds = location.search.replace(/bm=1|request_ids=|ref=notif|ref=bookmarks|notif_t=app_request|\?|&/g,'');
	if (_requestIds !== null && _requestIds.length > 0) {
		_requestIds = _requestIds.split('%2C').join(',');
	} else {
		_requestIds = null;
	}
	console.log('requestIds:' + _requestIds);
	com.send(com.task.gifter, com.port.castleAge, _requestIds);

	com.send(com.task.signed, com.port.castleAge, $('input[name="signed_request"]').attr('value'));
	com.send(com.task.getGeneral, com.port.castleAge, null);

}