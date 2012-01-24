// demi
tools['Page'].runtime['symbols.php'] = function () {
	
	$('div.indexRightCol:has(img[src*="/newiphone_ad_facebook.jpg"])').remove();
	$('div.indexRightCol').parent().prepend($('div.indexRightCol:last').detach());
	
};
