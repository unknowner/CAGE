// Alchemy
tools.Page.runtime['alchemy.php'] = function() {

	// CSS stuff
	$('div.statsT2 div.statsTTitle_inc').text($('div.statsT2 div.statsTTitle_inc').text().toLowerCase());
	$('div.ingredientUnit').children('div').attr('style', '');
	$('div.recipeImgContainer').parent().css('height', 80);
	$('div.statsTTitle_inc').css({
		'font-family' : 'sans-serif',
		'text-transform' : 'capitalize',
		'padding' : '6px 0 0 37px',
		'text-decoration' : 'none',
		'text-shadow' : '1px 1px 1px white'
	});
	$('div.statsTMain').css('display', 'none');
	// Add hide & pin
	$('div.statsT2 div.statsTTitle_inc').prepend($('<img src="http://image4.castleagegame.com/graphics/class_button_plus.jpg">').css({
		'borderRadius' : 4,
		'position' : 'absolute',
		'marginLeft' : -31,
		'marginTop' : -2
	})).append($('<div id="cageHideRecipe"><img src="http://image4.castleagegame.com/graphics/boss_lotus_help2.gif"><span></span><span>Hide incomplete recipes</span></div>').toggle(function() {
		$('#recipe_list').find('div.alchemyRecipeBackMonster:has(div.missing), div.alchemyQuestBack:has(div.missing), div.alchemyRecipeBackClass:has(div.missing), div.alchemyRecipeBack:has(div.missing)').addClass('cageHideIncomplete');
		$('#cageHideRecipe').find('span:first').html('&#10003').end().children('img').attr('src', 'http://image4.castleagegame.com/graphics/boss_lotus_help3.gif');
		item.set('cagePageAlchemyHideIncomplete', true);
	}, function() {
		$('#recipe_list').find('div.alchemyRecipeBackMonster:has(div.missing), div.alchemyQuestBack:has(div.missing), div.alchemyRecipeBackClass:has(div.missing), div.alchemyRecipeBack:has(div.missing)').removeClass('cageHideIncomplete');
		$('#cageHideRecipe').find('span:first').html('').end().children('img').attr('src', 'http://image4.castleagegame.com/graphics/boss_lotus_help2.gif');
		item.set('cagePageAlchemyHideIncomplete', false);
	}));
	$('div.statsTTitle').css({
		'cursor' : 'pointer'
	}).toggle(function() {
		$('div.statsTTitle_inc > img:first').attr('src', 'http://image4.castleagegame.com/graphics/class_button_minus.jpg');
		$('div.statsTMain').css('display', 'block');
	}, function() {
		$('div.statsTTitle_inc > img:first').attr('src', 'http://image4.castleagegame.com/graphics/class_button_plus.jpg');
		$('div.statsTMain').css('display', 'none');
	});

	setTimeout(function() {
		var _ingredients = {}, $ingredientUnit = $('div.ingredientUnit');
		$ingredientUnit.each(function(_i, _e) {
			_e = $(_e);
			var _count = _e.find('div:eq(1)');
			_count.text(_count.text().replace('x', ''));
			_ingredients[_e.find('img').attr('src')] = parseInt(_count.text(), 10);
			_count = null;
		});
		//Recipes
		$('td.statsTMainback').width(686);
		$('div.recipeImgContainer').each(function(_i, _e) {
			_e = $(_e);
			var _count = _e.parent().find('> div:contains(x)');
			_count.addClass('alchemyItemNum2');
			if(_count.length === 0) {
				_e.parent().find('> strong:contains(" of ")').addClass('alchemyItemNum2');
			} else {
				var _need = parseInt(_count.text().replace('x', ''), 10), _have = 0;
				if(_ingredients[_e.children('img:first').attr('src')]) {
					_have = _ingredients[_e.children('img:first').attr('src')];
					_have = _have > _need ? _need : _have;
				}
				_count.text(_have + '/' + _need);
			}
		});
		_ingredients = $ingredientUnit = null;
	}, 50);
	// pinned
	$('#recipe_list td.statsTMainback').children('div:not(:last)').prepend('<div class="cagePinItem"><img src="http://image4.castleagegame.com/graphics/boss_lotus_help2.gif"><span></span><span>Pin item</span></div>');
	$('div.cagePinItem').click(function() {
		var $this = $(this), _storedPinned = item.get('cagePageAlchemyPinned', []), _alch = $this.parent().find('.recipeTitle').contents().first().text().trim(), _index = _storedPinned.indexOf(_alch);
		console.log(_alch);
		if(_index === -1) {
			_storedPinned.push(_alch);
			item.set('cagePageAlchemyPinned', _storedPinned);
			var _c = $this.parent().clone(true);
			console.log(_c);
			_c.removeClass('cageHideIncomplete').addClass('cagePinedItemContainer').find('img[src="http://image4.castleagegame.com/graphics/boss_lotus_help2.gif"]').attr('src', 'http://image4.castleagegame.com/graphics/boss_lotus_help3.gif');
			_c.find('span:first').html('&#10003').end().find('span:last').text('Unpin item');
			$('#cagePinnedItems').append(_c);
			$this.parent().addClass('cageHidePinnedItem');
		} else {
			_storedPinned.splice(_index, 1);
			item.set('cagePageAlchemyPinned', _storedPinned);
			$this.parent().remove();
			$('#recipe_list td.statsTMainback').children('div').find('.recipeTitle:contains(' + _alch + ')').parent().parent().removeClass('cageHidePinnedItem');
		}
	});
	$('#recipe_list').before($('<div id="cagePinnedItems" style="margin: 10px 16px -16px 10px;"></div>').css({
		'max-height' : 375,
		'overflowY' : 'auto',
		'overflowX' : 'hidden',
		'background' : 'rgba(0,0,0,0.5)',
		'padding' : 12,
		'margin' : '10px 0 0 0',
		'width' : 693,
		'boxShadow' : '0 0 10px #000, 0 0 10px #000 inset',
		'borderRadius' : 15,
		'position' : 'relative'
	}));
	var _storedPinned = item.get('cagePageAlchemyPinned', []), _storedNew = [];
	$('#recipe_list td.statsTMainback').children('div').each(function(_i, _e) {
		var $this = $(this), $title = $this.find('.recipeTitle');
		if(_storedPinned.indexOf($title.contents().first().text().trim()) >= 0) {
			_storedNew.push(_storedPinned[_storedPinned.indexOf($title.contents().first().text().trim())]);
			var _c = $this.clone(true);
			_c.removeClass('cageHideIncomplete').addClass('cagePinedItemContainer').find('img[src="http://image4.castleagegame.com/graphics/boss_lotus_help2.gif"]').attr('src', 'http://image4.castleagegame.com/graphics/boss_lotus_help3.gif');
			$('#cagePinnedItems').append(_c);
			$this.addClass('cageHidePinnedItem');
		}
	});
	item.set('cagePageAlchemyPinned', _storedNew);
	_storedPinned = _storedNew = null;

	// remove some stuff
	$('div.alchemySpaceRecipe, div.alchemySpaceClass, div.alchemySpaceMonster, div.alchemySpaceQuest').remove();

	if(item.get('cagePageAlchemyHideIncomplete', true) === true) {
		$('#cageHideRecipe').click();
	}
};
