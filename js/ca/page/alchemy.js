// Alchemy
tools.Page.runtime['alchemy.php'] = function() {

	//Ingredients & Recipes
	var _ingredients = {};
	$('div.ingredientUnit').each(function(_i, _e) {
		_e = $(_e);
		_e.css({
			'height' : 60,
			'width' : 60,
			'padding' : 2
		}).find('>div:first').attr('style', '');
		//var _img = $('img', _e),
		var _count = $('div:eq(1)', _e);
		//_img.addClass('ui-corner-all');
		_count.text(_count.text().replace('x', '')).addClass('itemNumbers');
		_ingredients[$('img', _e).addClass('ui-corner-all').attr('src')] = parseInt(_count.text(), 10);
	});
	//Recipes
	$('td.statsTMainback').width(686);
	window.setTimeout(function() {
		$('div.recipeImgContainer').each(function(_i, _e) {
			_e = $(_e);
			_e.addClass('ui-corner-all').find('img').addClass('ui-corner-all').end().parent().css('height', 80);
			var _count = $(_e).parent().find('> div:contains(x)');
			if(_count.length === 0) {
				_e.parent().find('> strong:contains(" of ")').addClass('alchemyItemNum');
			} else {
				var _need = parseInt(_count.text().replace('x', ''), 10), _have = 0;
				if(_ingredients[$('>img', _e).attr('src')]) {
					_have = _ingredients[$('>img', _e).attr('src')];
					_have = _have > _need ? _need : _have;
				}
				_count.text(_have + '/' + _need).addClass('alchemyItemNum');
			}
		});
		_ingredients = null;
	}, 10);
	//Hide incomplete recipes
	$('div.statsT1:first').css('overflow', 'visible').append($('<div id="cageHideRecipe"><img src="http://image4.castleagegame.com/graphics/class_button_minus.jpg"><span>Hide incomplete recipes</span></div>').toggle(function() {
		$('div.alchemyRecipeBackMonster:has(div.missing), div.alchemyQuestBack:has(div.missing), div.alchemyRecipeBackClass:has(div.missing), div.alchemyRecipeBack:has(div.missing)').hide();
		$('#cageHideRecipe > img').attr('src', 'http://image4.castleagegame.com/graphics/class_button_plus.jpg');
		item.set('cagePageAlchemyHideIncomplete', true);
	}, function() {
		$('div.alchemyRecipeBackMonster:has(div.missing), div.alchemyQuestBack:has(div.missing), div.alchemyRecipeBackClass:has(div.missing), div.alchemyRecipeBack:has(div.missing)').css('display', '');
		$('#cageHideRecipe > img').attr('src', 'http://image4.castleagegame.com/graphics/class_button_minus.jpg');
		item.set('cagePageAlchemyHideIncomplete', false);
	}));
	if(item.get('cagePageAlchemyHideIncomplete', true) === true) {
		$('#cageHideRecipe').click();
	}

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
		'cursor' : 'pointer'
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
	// remove some stuff
	$('div.alchemySpaceRecipe, div.alchemySpaceClass, div.alchemySpaceMonster, div.alchemySpaceQuest').remove();

};
