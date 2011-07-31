function receiver(_data) {
	switch (_data.task) {
		case com.task.castleAgeReady:
			startCAGE();
			break;
	}
}
