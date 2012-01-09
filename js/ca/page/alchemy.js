// Alchemy
tools['Page'].runtime['alchemy.php'] = function() {

	// remove some stuff
	$('div.alchemySpaceRecipe, div.alchemySpaceClass, div.alchemySpaceMonster, div.alchemySpaceQuest').remove();

	//Ingridents
	$('div.statsTTitle_inc').css('paddingLeft', '36px !important').prepend($('<img src="http://image4.castleagegame.com/graphics/class_button_minus.jpg">').css({
		'borderRadius' : 4,
		'position' : 'absolute',
		'marginLeft' : -31,
		'marginTop' : -3
	}));
	$('div.statsTMain').css({
		'overflow' : 'hidden',
		'display' : 'none'
	});
	$('div.statsTTitle').css({
		'cursor' : 'pointer',
	}).toggle(function() {
		$('div.statsTTitle_inc > img:first').attr('src', 'http://image4.castleagegame.com/graphics/class_button_plus.jpg');
		$('div.statsTMain').css({
			'display' : 'block'
		});
	}, function() {
		$('div.statsTTitle_inc > img:first').attr('src', 'http://image4.castleagegame.com/graphics/class_button_minus.jpg');
		$('div.statsTMain').css({
			'display' : 'none'
		});
	});
	$('div.ingredientUnit').css({
		'height' : 60,
		'width' : 60,
		'padding' : 2
	}).find('img').addClass('ui-corner-all');
	$('div.ingredientUnit').find('> div:first').attr('style', '').end().find('> div:last').addClass('itemNumbers');

	//Receipts
	$('td.statsTMainback').width(686);
	$('div.recipeImgContainer').parent().css('height', 80);
	$('div.recipeImgContainer').find('img').addClass('ui-corner-all');
	$('div.recipeImgContainer').parent().find('> div:contains(x)').addClass('alchemyItemNum');
	$('div.recipeImgContainer.missing').addClass('ui-corner-all').find('img').addClass('ui-corner-all');
	$('div.recipeImgContainer.missing').parent().find('> div:contains(x)').addClass('alchemyItemNum');
	// Quest recipe
	$('div.recipeImgContainer').parent().find('> strong:contains(" of ")').addClass('alchemyItemNum');
	$('div.recipeImgContainer.missing').addClass('ui-corner-all').find('img').addClass('ui-corner-all');
	$('div.recipeImgContainer.missing').parent().find('> strong:contains(" of ")').addClass('alchemyItemNum');

	//Hide incomplete recipes
	$('div.statsT1:first').css('overflow', 'visible').append($('<div id="cageHideReceipe"><img src="http://image4.castleagegame.com/graphics/class_button_minus.jpg"><span>Hide incomplete receipts</span></div>').toggle(function() {
		$('div.alchemyRecipeBackMonster:has(div.missing), div.alchemyQuestBack:has(div.missing), div.alchemyRecipeBackClass:has(div.missing), div.alchemyRecipeBack:has(div.missing)').hide();
		$('#cageHideReceipe > img').attr('src', 'http://image4.castleagegame.com/graphics/class_button_plus.jpg');
	}, function() {
		$('div.alchemyRecipeBackMonster:has(div.missing), div.alchemyQuestBack:has(div.missing), div.alchemyRecipeBackClass:has(div.missing), div.alchemyRecipeBack:has(div.missing)').css('display', '');
		$('#cageHideReceipe > img').attr('src', 'http://image4.castleagegame.com/graphics/class_button_minus.jpg');
	}));
};
