// news

$('body').append('<div id="cageNews"><div id="cageNewsHead"></div><div id="cageNewsBody"><p id="cageNewsText"></p><br><b>Changelog:</b><br><ul id="cageNewsChanges"></ul></div><div id="cageNewsFoot"><br><a href="http://cagenhancer.blogspot.com/" target="_blank">Blog</a> <a href="http://cagenhancer.blogspot.com/p/manual.html" target="_blank">Manual</a> <a href="http://caaplayer.freeforums.org/c-a-g-e-f29.html" target="_blank">Forum</a> <a href="https://github.com/unknowner/CAGE" target="_blank">GitHub</a><br><br><span style="text-align:center;">You want to say thank you? Just visit the Blog, click an Ad or donate via PayPal.</span></div></div>');
$('#cageNewsHead').text('CAGE - Castle Age Game Enhancer - V 1.0.43α');
$('#cageNewsText').text('You\'re now running CAGE and making your Castle Age life a bit easier ;)');
$('#cageNewsFoot').prepend('<p style="text-align: left;"><b>NOTICE:</b> Finally we have some settings for the Assister and other stuff. Just click the little gear icon on the left of the navigation. Still some functions (like themes) needs to be move to it.<br><br>Found an error? Logs (CTRL+SHIFT+J) are always welcome ;)</p>');
_news = [
	'FIX: Some CSS stuff on the the guild battles',
	'ADD: Extra send gift filter by using friendlist',
	'ADD: Settings'
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
