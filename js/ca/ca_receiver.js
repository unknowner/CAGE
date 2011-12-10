function receiver(_data) {
	console.log('ca receiver: ', _data);
	switch (_data.task) {
		case com.task.signed:
			CastleAge.signed_request = _data.data;
			if($('#signed_request').length > 0) {
				$('#signed_request').val(_data.data);
			} else {
				$(document.body).append('<input id="signed_request" type="hidden" name="signed_request" value="' + _data.data + '" />');
			}
			break;
		case com.task.userId:
			if(!CastleAge.userId) {
				CastleAge.userId = _data.data;
			}
			break;
		case com.task.fbReady:
			CastleAge.started = true;
			break;
		case com.task.resize:
			$('#globalContainer').height(_data.data.height);
			break;
		default:
			console.log(_data.task + ' unknown!');
	}
}