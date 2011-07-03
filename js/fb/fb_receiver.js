function receiver(_data) {

	switch (_data.task) {

	case com.task.castleAgeReady:
		startCAGE();
		break;

	case com.task.general:
		tools['General'].set(_data.data);
		break;

	case com.task.fbButtonEnable:
		tools[_data.data].fbButton.enable();
		break;

	case com.task.scroll:
		tools['Scroll'].start[com.port.facebook](_data.data);
		break;
		
	}

}
