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
				'marginTop' : -42
			});
			$('a.jewelButton').attr('style', 'background-size: 22px 22px !important;');
			$('#jewelContainer').addClass('cageJewels').css('paddingTop', 5);
			$('#fbRequestsFlyout').addClass('cageRequestsFlyout');
			$('#fbMessagesFlyout').addClass('cageMessagesFlyout');
			$('#fbNotificationsFlyout').addClass('cageNotificationsFlyout');
			$('#cageIFrame').html('.cageIFrame {height:' + (_window.innerHeight - (Facebook.bluebarHidden === true ? 1 : 42)) + 'px !important;}');
			break;
		case com.task.showBluebar:
			Facebook.bluebarHidden = false;
			$('#pagelet_bluebar').css({
				'marginTop' : 0
			});
			$('a.jewelButton').removeAttr('style');
			$('#jewelContainer').removeClass('cageJewels').css('paddingTop', 0);
			$('#fbRequestsFlyout').removeClass('cageRequestsFlyout');
			$('#fbMessagesFlyout').removeClass('cageMessagesFlyout');
			$('#fbNotificationsFlyout').removeClass('cageNotificationsFlyout');
			$('#cageIFrame').html('.cageIFrame {height:' + (_window.innerHeight - (Facebook.bluebarHidden === true ? 1 : 42)) + 'px !important;}');
			break;
		case com.task.fbStart:
			if (location.search.indexOf('needclickers=1') === -1) {
				initFacebook();
			}
			break;
	}
}
