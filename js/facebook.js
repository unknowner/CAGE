// CAGE stuff working on facebook site
var _window = window || this.unsafeWindow, Facebook = {
	started : false,
	bluebarHidden : false
};

com.initPort(com.port.facebook);
com.send(com.task.fbStart, com.port.facebook, null);

function initFacebook() {
	$('head').append('<style type="text/css" id="cageIFrame">').append('<link rel="stylesheet" type="text/css" href="' + getPath('css/fb_cage.css?x=' + Math.random() * 1000) + '">');

	_window.onresize = function(evt) {
		$('#cageIFrame').html('.cageIFrame {height:' + (_window.innerHeight - (Facebook.bluebarHidden === true ? 1 : 34)) + 'px !important;}');
	};

	$('#contentArea').css('backgroundColor', '#000');
	$('#cageIFrame').html('.cageIFrame {height:' + (_window.innerHeight - (Facebook.bluebarHidden === true ? 1 : 34)) + 'px !important;}');
	$('#iframe_canvas').addClass('cageIFrame').attr('scrolling', 'yes');

}
