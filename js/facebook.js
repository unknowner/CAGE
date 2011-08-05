// CAGE stuff working on facebook site
com.initContentScript(com.port.facebook);

$('head').append('<style type="text/css" id="cageIFrame">')

window.onresize = function (evt) {

	$('#cageIFrame').html('.cageIFrame {height:' + (window.innerHeight - 34) + 'px !important;}');
	//$('#iframe_canvas').height(window.innerHeight - 35);
	/*com.send(com.task.resize, com.port.castleAge, {
		height : window.innerHeight - 35
	});*/

};