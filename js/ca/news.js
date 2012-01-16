// news
function cageNews(_full) {
	var _hed = 'CAGE - Castle Age Game Enhancer - V ' + version.string();
	var _sub = 'You\'re now running CAGE and making your Castle Age life a bit easier ;)';
	$('#results_main_wrapper').prepend('<div class="results"><div class="result"><span class="result_body"></div></span></div></div>');
	if(version.string() !== item.get('cageLocalVersion', '')) {
		item.set('cageLocalVersion', version.string());
		_full = true;
	}
	if(_full == false) {
		$('#results_main_wrapper div.result:first').css({
			'height' : 65,
			'overflow' : 'hidden'
		})
	}
	$('#results_main_wrapper span.result_body:first').append('<div id="cageNews"><center id="cageNewsHead">' + _hed + '</center><center id="cageNewsSubHead">' + _sub + '</center><div id="cageNewsBody"><br><b>Changelog:</b><ul id="cageNewsChanges"></ul></div><div id="cageNewsFoot"><br><a href="http://cagenhancer.blogspot.com/" target="_blank">Blog</a> <a href="http://cagenhancer.blogspot.com/p/manual.html" target="_blank">Manual</a> <a href="http://caaplayer.freeforums.org/c-a-g-e-f29.html" target="_blank">Forum</a> <a href="https://github.com/unknowner/CAGE" target="_blank">GitHub</a><br><br><span style="font-size:12px;text-align:center;">You want to say thank you? Just visit the Blog, click an Ad or donate via PayPal.</span></div></div>');
	$('#cageNewsFoot').prepend('<center>If you find bugs, just go to the blog and post them there (no signup required).<br>Logs (CTRL+SHIFT+J) are always welcome!</center>');
	$.each([
			'ADD: aaa'	
		], function(_i, _e) {
			$('#cageNewsChanges').append('<li><span>' + _e.split(':')[0] + '</span>' + _e.split(':')[1] + '</li>');
		});
	$('#cageNewsFoot a').button().css('color', '#FFF');
	if($('#results_main_wrapper div.results').length > 1) {
		$('#results_main_wrapper div.result:first').css({
			'borderBottom' : '1px solid #701919',
			'paddingBottom' : 10
		});
	}
}