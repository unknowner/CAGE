function receiver(_data) {

	console.log('ca_receiver: ' + _data.task);
	switch (_data.task) {

	case com.task.getGeneral:
		tools['General'].get();
		break;

	case com.task.signed:
		CastleAge.signed_request = _data.data;
		$(document.body).append(
				'<input id="signed_request" type="hidden" name="signed_request" value="'
						+ _data.data + '" />');
		break;

	case com.task.heal:
		tools['Heal'].start[com.port.current]();
		break;

	}

}
