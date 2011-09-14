// news

var _news = '<div class="results"><div class="result"><span class="result_body"><div id="cageNews"><div id="cageNewsHead"></div><div id="cageNewsBody"></div></div><div id="cageNewsFoot"></div></span></div><br></div>';
$('#results_main_wrapper').prepend(_news).show();
$('#cageNewsHead').text('CAGE - Castle Age Game Enhance - V 1.0.32');
$('#cageNewsBody').html('<p>Your now running CAGE and making your Castle Age life a bit easier ;)<br><br><b>Changelog:</b></p><ul><li><b>FIX: </b>Results shows scrollbar for empty area</li><li><b>FIX: </b>General switcher for Atlantis</li></ul>');
$('#cageNewsFoot').html('<a href="http://cagenhancer.blogspot.com/" target="_blank">Blog</a> - <a href="http://caaplayer.freeforums.org/c-a-g-e-f29.html" target="_blank">Forum</a> - <a href="https://github.com/unknowner/CAGE" target="_blank">GitHub</a>');
_news = undefined;
