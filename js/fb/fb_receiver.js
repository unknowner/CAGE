function receiver(_data) {
	// console.log('fb receiver: ', _data);
	switch (_data.task) {
		case com.task.castleAgeReady:
			if (Facebook.started === false) {
				com.send(com.task.fbReady, com.port.castleAge);
				Facebook.started = true;
				startCAGE();
			}
			break;
		case com.task.alive:
			break;
		case com.task.hideBluebar:
			Facebook.bluebarHidden = true;
			$('#pagelet_bluebar').css({
				'marginTop' : -33
			});
			$('#jewelContainer').addClass('cageJewels');
			$('#fbRequestsFlyout').addClass('cageRequestsFlyout');
			$('#fbMessagesFlyout').addClass('cageMessagesFlyout');
			$('#fbNotificationsFlyout').addClass('cageNotificationsFlyout');
			$('#cageIFrame').html('.cageIFrame {height:' + (_window.innerHeight - (Facebook.bluebarHidden === true ? 1 : 34)) + 'px !important;}');
			break;
		case com.task.showBluebar:
			Facebook.bluebarHidden = false;
			$('#pagelet_bluebar').css({
				'marginTop' : 0
			});
			$('#jewelContainer').removeClass('cageJewels');
			$('#fbRequestsFlyout').removeClass('cageRequestsFlyout');
			$('#fbMessagesFlyout').removeClass('cageMessagesFlyout');
			$('#fbNotificationsFlyout').removeClass('cageNotificationsFlyout');
			$('#cageIFrame').html('.cageIFrame {height:' + (_window.innerHeight - (Facebook.bluebarHidden === true ? 1 : 34)) + 'px !important;}');
			break;
		case com.task.fbStart:
			if (location.search.indexOf('needclickers=1') === -1) {
				initFacebook();
			}
			break;
	}
}
