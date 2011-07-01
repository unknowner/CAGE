function general(_general) {

	_general = JSON.parse(_general);
	$('#cageGeneralImage').attr('src', _general.img);
	$('#cageGeneralName').text(_general.name);
	
}
