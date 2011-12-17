function receiver(_data) {
	console.log('fb receiver: ', _data);
	switch (_data.task) {
		case com.task.castleAgeReady:
			if(Facebook.started == false) {
				com.send(com.task.fbReady, com.port.castleAge);
				Facebook.started = true;
				startCAGE();
			}
			break;
		case com.task.general:
			$('#cageGeneralImage').attr('src', _data.data.image);
			$('#cageGeneralName').text(_data.data.name);
			$('#cageGeneralAttack').text(_data.data.attack);
			$('#cageGeneralDefense').text(_data.data.defense);
			break;
		case com.task.alive:
			break;
	}
}