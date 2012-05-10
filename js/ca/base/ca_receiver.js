function receiver(_data) {
	//console.log('ca receiver: ', _data);
	switch (_data.task) {
		case com.task.signed:
			$('#signed_request').val(_data.data);
			CastleAge.signed_request = _data.data;
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
		case com.task.caStart:
			if(location.search.indexOf('needclickers=1') === -1) {
				initCastleAge();
			}
			break;
		default:
			console.log(_data.task + ' unknown!');
	}
}