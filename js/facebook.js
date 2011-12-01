// CAGE stuff working on facebook site
Facebook = {
	started : false
};

com.initContentScript(com.port.facebook);

$('head')
	.append('<style type="text/css" id="cageIFrame">')
	.append('<link id="cageTheme" rel="stylesheet" type="text/css" href="' + getPath('css/dark-hive/') + 'jquery-ui.css">')
	.append('<link rel="stylesheet" type="text/css" href="' + getPath('css/fb_cage.css') + '">');

window.onresize = function(evt) {

	$('#cageIFrame').html('.cageIFrame {height:' + (window.innerHeight - 34) + 'px !important;}');

};

$('#cageIFrame').html('.cageIFrame {height:' + (window.innerHeight - 34) + 'px !important;}');
$('#iframe_canvas').addClass('cageIFrame').attr('scrolling', 'yes');
