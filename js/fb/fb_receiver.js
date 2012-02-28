function receiver(_data) {
	//console.log('fb receiver: ', _data);
	switch (_data.task) {
		case com.task.castleAgeReady:
			if(Facebook.started === false) {
				com.send(com.task.fbReady, com.port.castleAge);
				Facebook.started = true;
				startCAGE();
			}
			break;
		case com.task.alive:
			break;
		case com.task.hideBluebar:
			$('#pagelet_bluebar').css({
				'overflow' : 'hidden',
				'height' : 1
			})
			break;
		case com.task.showBluebar:
			$('#pagelet_bluebar').css({
				'overflow' : '',
				'height' : 32
			})
			break;
	}
}