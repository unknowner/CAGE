// news

$('body').append('<div id="cageNews"><div id="cageNewsHead"></div><div id="cageNewsBody"><p id="cageNewsText"></p><br><b>Changelog:</b><br><ul id="cageNewsChanges"></ul></div><div id="cageNewsFoot"><br><a href="http://cagenhancer.blogspot.com/" target="_blank">Blog</a> <a href="http://cagenhancer.blogspot.com/p/manual.html" target="_blank">Manual</a> <a href="http://caaplayer.freeforums.org/c-a-g-e-f29.html" target="_blank">Forum</a> <a href="https://github.com/unknowner/CAGE" target="_blank">GitHub</a><br><br><span style="text-align:center;">You want to say thank you? Just visit the Blog, click an Ad or donate via PayPal.</span></div></div>');
$('#cageNewsHead').text('CAGE - Castle Age Game Enhancer - V 1.0.43α');
$('#cageNewsText').text('You\'re now running CAGE and making your Castle Age life a bit easier ;)');
$('#cageNewsFoot').prepend('<p style="text-align: left;"><b>NOTICE:</b> You can find the Assists log on the live newsfeed. When the assister is finished, you can find a new tab next to Monster and Guard. The log remains until you reload the complete page.<br><br>The Assister is now available for testing. It can assist up to 10 CTAs (max. 10 Stamina) from the Live Feed and assist only friends. It likes and comments the post on the users newsfeed and on the monster. If you notice anything weird, just go to the blog and post there (no need to sign up). If you want to assist more than 10, just click again.<br>Error logs (CTRL+SHIFT+J) are always welcome ;)</p>');
_news = [
	''
];
$.each(_news, function(_i, _e) {
	$('#cageNewsChanges').append('<li><span>' + _e.split(':')[0] + ':</span>' + _e.split(':')[1] + '</li>');
});
$('#cageNewsFoot a').button();
$('#cageNews').dialog({
	resizable : false,
	width : 750,
	height : 'auto',
	modal : true,
	zIndex : 3999,
	position : 'top',
	dialogClass : 'cageNewsDialog',
	draggable : false,
	buttons : {
		"Ok" : function() {
			$(this).dialog("close").remove();
		}
	},
	autoOpen : false
});
