// Land
tools['Page'].runtime['land.php'] = function() {

	console.log('Page: land.php');
	//Reverse buy order (10-1)
	$('#section_land form[id^="prop_"]').each(function() {
		$(this).find('select:first').html('<option value="10">10</option><option value="5">5</option><option value="1">1</option>');
	});
};
