function receiver(_data) {

	console.log('fb_receiver: ' + _data.task);
	switch (_data.task) {

	case com.task.castleAgeReady:
		startCAGE();
		break;

	case com.task.general:
		general(_data.data);
		break;

	case com.task.fbButtonEnable:
		tools[_data.data].fbButton.enable();
		break;

	}

}
