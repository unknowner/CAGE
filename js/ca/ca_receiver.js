function receiver(_data) {
	console.log('ca receiver: ', _data);
	switch (_data.task) {
		case com.task.signed:
			CastleAge.signed_request = _data.data;
			if($('#signed_request').length > 0) {
				$('#signed_request').val(_data.data);
			} else {
				$(document.body).append('<input id="signed_request" type="hidden" name="signed_request" value="' + _data.data + '" />');
			}
			get('keep.php', function(_keepdata) {
				CastleAge.bqh = $('input[name="bqh"]:first', _keepdata).val();
				tools['PotionStamina'].work(_keepdata);
				tools['PotionEnergy'].work(_keepdata);
			});
			break;
		case com.task.userId:
			if(!CastleAge.userId) {
				CastleAge.userId = _data.data;
				tools['Theme'].start();
			}
			break;
		case com.task.fbReady:
			CastleAge.started = true;
			break;
		// start stuff that requires user id here
		case com.task.heal:
			tools['Heal'].start[com.port.castleAge]();
			break;
		case com.task.updateGifter:
			tools['Gifter'].update();
			break;
		case com.task.startGifter:
			tools['Gifter'].start[com.port.castleAge]();
			break;
		case com.task.startStash:
			tools['Stash'].start[com.port.castleAge]();
			break;
		case com.task.resize:
			$('#globalContainer').height(_data.data.height);
			break;
		default:
			console.log(_data.task + ' unknown!');
	}
}