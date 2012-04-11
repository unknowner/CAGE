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
			});
			$('#jewelContainer').addClass('cageJewels');
			$('#fbRequestsFlyout').addClass('cageRequestsFlyout');
			$('#fbMessagesFlyout').addClass('cageMessagesFlyout');
			$('#fbNotificationsFlyout').addClass('cageNotificationsFlyout');
			$('#cageIFrame').html('.cageIFrame {height:' + (_window.innerHeight - ($('#pagelet_bluebar').css('overflow') === 'hidden' ? 1 : 34)) + 'px !important;}');
			break;
		case com.task.showBluebar:
			$('#pagelet_bluebar').css({
				'overflow' : '',
				'height' : 32
			});
			$('#jewelContainer').removeClass('cageJewels');
			$('#fbRequestsFlyout').removeClass('cageRequestsFlyout');
			$('#fbMessagesFlyout').removeClass('cageMessagesFlyout');
			$('#fbNotificationsFlyout').removeClass('cageNotificationsFlyout');
			$('#cageIFrame').html('.cageIFrame {height:' + (_window.innerHeight - ($('#pagelet_bluebar').css('overflow') === 'hidden' ? 1 : 34)) + 'px !important;}');
			break;
	}
}