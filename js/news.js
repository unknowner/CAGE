// news

$('#results_main_wrapper').prepend('<div class="results"><div class="result"><span class="result_body"><div id="cageNews"><div id="cageNewsHead"></div><div id="cageNewsBody"><p id="cageNewsText"><br><br><b>Changelog:</b></p><ul id="cageNewsChanges"></ul></div></div><div id="cageNewsFoot"><a href="http://cagenhancer.blogspot.com/" target="_blank">Blog</a> - <a href="http://caaplayer.freeforums.org/c-a-g-e-f29.html" target="_blank">Forum</a> - <a href="https://github.com/unknowner/CAGE" target="_blank">GitHub</a></div></span></div><br></div>').show();
$('#cageNewsHead').text('CAGE - Castle Age Game Enhance - V 1.0.37α');
$('#cageNewsText').text('You\'re now running CAGE and making your Castle Age life a bit easier ;)');
$('#cageNewsFoot').prepend('<p style="text-align: left;"><b>IMPORTANT:</b> The Assister is currently available for testing. It can assist up 10 CTAs from the Live Feed and assist only friends. It likes and comments the post on the users newsfeed and on the monster. If you notice anything weird, just go to the blog and post there (no need to sign up).</p>')
_news = [
	'FIX: Activity filter for Festival Guild Battle',
	'ADD: More info when sending gifts',
	'ADD: Assister for testing'
];
$.each(_news, function(_i, _e) {
	$('#cageNewsChanges').append('<li><span>' + _e.split(':')[0] + ':</span>' + _e.split(':')[1] + '</li>');
});
