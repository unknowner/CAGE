// news
function cageNews(_full) {
	var _hed = 'CAGE - Castle Age Game Enhancer - V ' + version.string(), _sub = 'You\'re now running CAGE and making your Castle Age life a bit easier ;)';
	var _permissionsVersion = item.get('permissions', false);
	if (!_permissionsVersion || _permissionsVersion !== '1.2.18') {
		_sub += '<br><span style="color:red;font-weight:bold">It\'s possible you need some extra permissons for CAGE, please check Settings > <a id="cageOpenSettings" style="cursor:pointer;">CAGE</a></span>';
	}
	$('#results_main_wrapper').prepend('<div class="results"><div class="result"><span class="result_body"></div></span></div></div>');
	$('#results_main_wrapper span.result_body:first')
			.append('<div id="cageNews"><center id="cageNewsHead">' + _hed + '</center><center id="cageNewsSubHead">' + _sub + '</center><div id="cageNewsBody"><br><b>Changelog:</b><ul id="cageNewsChanges"></ul></div><div id="cageNewsFoot"><br><a href="http://cagenhancer.blogspot.com/" target="_blank">Blog</a> <a href="http://cagenhancer.blogspot.com/p/manual.html" target="_blank">Manual</a> <form action="https://www.paypal.com/cgi-bin/webscr" target="_blank" method="post" style="display:inline-block;bottom:-8px;position:relative"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="PC84GRGBLQ2J8"><input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"><img alt="" border="0" src="https://www.paypalobjects.com/de_DE/i/scr/pixel.gif" width="1" height="1"></form> <a href="http://caaplayer.freeforums.org/c-a-g-e-f29.html" target="_blank">Forum</a> <a href="https://github.com/unknowner/CAGE" target="_blank">GitHub</a><br><br><span style="font-size:12px;text-align:center;">You want to say thank you? Just visit the Blog, click an Ad or donate via PayPal.</span></div></div>');
	$('#cageNewsFoot').prepend('<center>If you find bugs, just go to the blog and post them there (no signup required).<br>Logs (CTRL+SHIFT+J) are always welcome!</center>');
	$('#cageOpenSettings').click(function(){
		tools.Settings.start();
	});
	$.each([
	    'ADD: Clickable user images',
	    'ADD: Filters for guild conquest battles',
	    'FIX: Assister (still no FB comments)'
	], function(_i, _e) {
		$('#cageNewsChanges').append('<li><span>' + _e.split(':')[0] + '</span>' + _e.split(':')[1] + '</li>');
	});
	$('#cageNewsFoot a').button().css('color', '#FFF');
	if (version.string() !== item.get('cageLocalVersion', '')) {
		item.set('cageLocalVersion', version.string());
		_full = true;
	}
	if (_full === false) {
		$('#results_main_wrapper div.result:first').css({
			'height' : 75,
			'overflow' : 'hidden'
		});
		$('#cageNewsSubHead').append($('<div>[View More]</div>').css({
			'cursor' : 'pointer',
			'fontSize' : 10,
			'paddingTop' : 3
		}).click(function() {
			$('#results_main_wrapper div.result:first').css({
				'height' : ''
			});
			$(this).remove();
		}));
	}
	if ($('#results_main_wrapper div.results').length > 1) {
		$('#results_main_wrapper div.result:first').css({
			'borderBottom' : '1px solid #701919',
			'paddingBottom' : 10
		});
	} else {
		$('#results_main_wrapper').css('marginBottom', 10);
	}
}
