// Army
tools['Page'].runtime['army_member.php'] = function() {

	console.log('Page: army_member.php');

	// army filler stuff
	$('div:contains("Current Army Size"):last').css({
		'width' : 160,
		'paddingTop' : 3
	}).next().css('fontSize', 17);
	$('div:contains("The Following People Have Joined Your Army."):last').text($('div:contains("The Following People Have Joined Your Army."):last').text().trim() + 'Want me to check if you\'re missing some soldiers?').css({
		'textAlign' : 'left',
		'paddingLeft' : 35,
		'width' : 450
	}).append(' <a onclick="javascript:fireStartFillArmy();" style="font-size:20px;cursor:pointer;">Fill Army!</a>');

};
