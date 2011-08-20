function receiver(_data) {
	console.log('fb receiver:');
	console.log(_data);
	switch (_data.task) {
		case com.task.castleAgeReady:
			if(Facebook.started == false) {
				com.send(com.task.fbReady, com.port.castleAge);
				Facebook.started = true;
				startCAGE();
			}
			break;
	}
}