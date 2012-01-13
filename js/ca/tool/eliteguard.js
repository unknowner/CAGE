new tool('Eliteguard');

tools.Eliteguard.runtime = {};

tools.Eliteguard.getUserIds = function() {

	console.log('Eliteguard: Reading guild...');
	$.get('guild.php?signed_request=' + CastleAge.signed_request, function(_guild) {
		console.log('Eliteguard: got guild...');
		$('#cta_log input[name="guild_player_id"]', _guild).each(function() {
			tools.Eliteguard.runtime.id.push($(this).prop('value'));
		});
		tools.Eliteguard.runtime.id = unique(tools.Eliteguard.runtime.id);

		tools.Facebook.CAPlayers(tools.Eliteguard.start);

	});
};
tools.Eliteguard.start = function(_ids) {
	if(!_ids) {
		console.log('Eliteguard: Reading ids...');
		tools.Eliteguard.runtime.id = [];
		tools.Eliteguard.getUserIds();
	} else {
		tools.Eliteguard.runtime.id = _ids;
		console.log('Eliteguard: do it...');
		tools.Eliteguard.work();
	}
};
tools.Eliteguard.work = function() {

	if(tools.Eliteguard.runtime.id.length > 0) {
		var _id = tools.Eliteguard.runtime.id.shift();
		$.get('party.php?twt=jneg&jneg=true&user=' + _id + '&lka=' + _id + '&etw=1&ref=nf&signed_request=' + CastleAge.signed_request, function(_guarddata) {
			if($(_guarddata).text().match(/YOUR Elite Guard is FULL!/i)) {
				tools.Eliteguard.done();
			} else {
				tools.Eliteguard.work();
			}
		});
	} else {
		tools.Eliteguard.done();
	}
};
tools.Eliteguard.done = function() {
	note('Eliteguard', 'Your elite guard is full.');
	tools.Eliteguard.fbButton.enable();
};
tools.Eliteguard.init = function() {
	tools.Eliteguard.fbButton.add(language.eliteguardButton, function() {
		tools.Eliteguard.fbButton.disable();
		tools.Eliteguard.start();
	});
};
