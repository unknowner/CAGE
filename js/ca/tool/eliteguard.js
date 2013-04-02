tool('Eliteguard');

tools.Eliteguard.runtime = {};

tools.Eliteguard.getUserIds = function() {

	console.log('Eliteguard: Reading guild...');
	signedGet('guild.php', function(_guild) {
		_guild = $($.parseHTML(noSrc(_guild)));
		console.log('Eliteguard: got guild...');
		_guild.find('#cta_log input[name="guild_player_id"]').each(function() {
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
		signedGet('party.php?twt=jneg&jneg=true&user=' + _id + '&lka=' + _id + '&etw=1&ref=nf', function(_guarddata) {
			_guarddata = $($.parseHTML(noSrc(_guarddata)));
			if(_guarddata.find('span.result_body').text().match(/YOUR Elite Guard is FULL!/i)) {
				tools.Eliteguard.done();
			} else {
				setTimeout(tools.Eliteguard.work, 100);
			}
		});
	} else {
		tools.Eliteguard.done();
	}
};
tools.Eliteguard.done = function() {
	note('Eliteguard', 'Your elite guard is full.');
	tools.Sidebar.button.enable('cageEliteGuardStart');
};
tools.Eliteguard.init = function() {
	tools.Sidebar.button.add('cageEliteGuardStart', language.eliteguardButton, function() {
		tools.Sidebar.button.disable('cageEliteGuardStart');
		tools.Eliteguard.start();
	});
};
