function receiver(_data) {
	//console.log('ca receiver: ', _data);
	switch (_data.task) {
		case com.task.signed:
			$('#signed_request').remove();
			$(document.body).append(_data.data.replace('autocomplete="off"', 'id="signed_request"'));
			CastleAge.signed_request = $('#signed_request').val();
			break;
		case com.task.userId:
			if(!CastleAge.userId) {
				CastleAge.userId = _data.data;
				cageNews(false);
			}
			break;
		case com.task.fbReady:
			CastleAge.started = true;
			break;
		case com.task.resize:
			$('#globalContainer').height(_data.data.height);
			break;
		case com.task.showAllGenerals:
			tools.General.showAll();
			break;
		case com.task.alive:
			break;
		default:
			console.log(_data.task + ' unknown!');
	}
}