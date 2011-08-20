// CAGE stuff working on facebook site
Facebook = {
	started: false
};

com.initContentScript(com.port.facebook);

$('head').append('<style type="text/css" id="cageIFrame">');

window.onresize = function (evt) {

	$('#cageIFrame').html('.cageIFrame {height:' + (window.innerHeight - 34) + 'px !important;}');

};