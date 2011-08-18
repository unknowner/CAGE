new tool('Assister');

tools['Assister'].runtime = {};

tools['Assister'].start = function () {

	tools['Assister'].runtime.CTA = [];
	get('army_news_feed.php', function(_data){
		$('#action_logs > a[href*="action=doObjective"]', _data).each(function(i, e) {
			tools['Assister'].runtime.CTA.push({
				MonsterLink	: $(e).attr('href'),
				UID			: $('*[uid]:first', $(e)).attr('uid'),
				Username	: /(?:[You|Your] friend )(.*)(?: has requested your help)/.exec($(e).text())[1]
			});
		});
		console.log(tools['Assister'].runtime.CTA);
	});

	// elite guard page > <input type="hidden" name="like_recent_news_post_id" value="POST_ID">
/*
	addFunction( function() {
		FB.api("/POST_ID/likes", 'post', function(response) {
			console.log(response);
		});
	}, null, true, false);
	addFunction( function(_message) {
		console.log(_message);
		FB.api("/POST_ID/comments", 'post', _message, function(response) {
			console.log(response);
		});
	}, JSON.stringify({
		message: 'test'
	}), true, false);
*/
	tools['Assister'].done();

};
tools['Assister'].done = function () {
	tools['Assister'].fbButton.enable();
};
tools['Assister'].init = function () {
	tools['Assister'].fbButton.add(chrome.i18n.getMessage("buttonAssister"), function () {
		tools['Assister'].fbButton.disable();
		tools['Assister'].start();
	});
};