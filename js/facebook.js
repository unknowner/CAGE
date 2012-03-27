// CAGE stuff working on facebook site
Facebook = {
	started : false
};

com.initPort(com.port.facebook);

$('head').append('<style type="text/css" id="cageIFrame">')
//.append('<link id="cageTheme" rel="stylesheet" type="text/css" href="' + getPath('css/dark-hive/') + 'jquery-ui.css">')
.append('<link rel="stylesheet" type="text/css" href="' + getPath('css/fb_cage.css?x=' + Math.random() * 1000) + '">');

var _window = window || this.unsafeWindow;
_window.onresize = function(evt) {
	$('#cageIFrame').html('.cageIFrame {height:' + (_window.innerHeight - ($('#pagelet_bluebar').css('overflow') === 'hidden' ? 1 : 34)) + 'px !important;}');
};

$('#contentArea').css('backgroundColor', '#000');
$('#cageIFrame').html('.cageIFrame {height:' + (_window.innerHeight - ($('#pagelet_bluebar').css('overflow') === 'hidden' ? 1 : 34)) + 'px !important;}');
$('#iframe_canvas').addClass('cageIFrame').attr('scrolling', 'yes');
