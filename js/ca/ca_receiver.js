function receiver(_data) {
	switch (_data.task) {
		case com.task.getGeneral:
			tools['General'].get();
			break;
		case com.task.signed:
			CastleAge.signed_request = _data.data;
			$(document.body).append('<input id="signed_request" type="hidden" name="signed_request" value="' + _data.data + '" />');
			break;
		case com.task.userId:
			CastleAge.userId = _data.data;
			break;
		case com.task.heal:
			tools['Heal'].start[com.port.castleAge]();
			break;
		case com.task.eliteGuard:
			tools['Eliteguard'].start[com.port.castleAge]();
			break;
		case com.task.loadPage:
			tools['Page'].loadPage(_data.data);
			break;
		case com.task.updateGifter:
			tools['Gifter'].update();
			break;
		case com.task.startGifter:
			tools['Gifter'].start[com.port.castleAge]();
			break;
	}
}