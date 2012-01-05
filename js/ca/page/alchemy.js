// Alchemy
tools['Page'].runtime['alchemy.php'] = function() {

	//Ingridents
	$('div.ingredientUnit').css({
		'height' : 60,
		'width' : 60,
		'padding' : 2
	}).find('img').addClass('ui-corner-all');
	$('div.ingredientUnit').find('> div:first').attr('style', '').end().find('> div:last').addClass('itemNumbers');

	//Receipts
	$('div.alchemyRecipeBackMonster_inc table td:first > div > div:has(div.recipeImgContainer)').css('height', 80);
	$('div.recipeImgContainer').find('img').addClass('ui-corner-all');
	$('div.recipeImgContainer').parent().find('> div:contains(x)').addClass('alchemyItemNum');
	$('div.recipeImgContainer.missing').addClass('ui-corner-all').find('img').addClass('ui-corner-all');
	$('div.recipeImgContainer.missing').parent().find('> div:contains(x)').addClass('alchemyItemNum');
	
};
