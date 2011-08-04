// CAGE stuff working on facebook site
com.initContentScript(com.port.facebook);

$(document.body).css({
	'backgroundColor': '#000',
	'overflowY' : 'hidden'
});
$('#contentArea').css({
	'width': 1005
});
$('#pagelet_canvas_footer_content').hide();
$('#contentCol').css('paddingTop', 0);
$('div.fixedAux').hide();
$('#contentCol').css('backgroundColor', '#000');
$('#pageHead').css({
	'position': 'fixed',
	'zIndex': 1
});
$('#blueBar').css({
	'position': 'fixed',
	'zIndex': 1
});
$('#iframe_canvas').css({
	'marginBottom': -3,
	'position' : 'relative'
});
$('#bottomContent').hide();
$('#app_content_46755028429').css('overflow', 'visible');

window.onresize = function (evt) {

	$('#iframe_canvas').height(window.innerHeight - 43);
	com.send(com.task.resize, com.port.castleAge, {
		height : window.innerHeight - 43
	});

};