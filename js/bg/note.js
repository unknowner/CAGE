$(function() {
	var data = JSON.parse(window.location.hash.substr(1));
	console.log(data);
	$('#title').text(data.title);
	$('#message').html(data.message);
	console.log($('#title'));
	console.log($('#message'));
});
