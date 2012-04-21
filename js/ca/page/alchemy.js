// Alchemy
tools.Page.runtime['alchemy.php'] = function() {

	// CSS stuff
	$('div.statsT2 div.statsTTitle_inc').css({
		'fontFamily' : 'sans-serif',
		'textTransform' : 'capitalize',
		'padding' : '6px 0 0 37px',
		'textDecoration' : 'none',
		'textShadow' : '1px 1px 1px white'
	}).text($('div.statsT2 div.statsTTitle_inc').text().toLowerCase());
	$('#recipe_list div.imgButton').css({
		'marginTop' : 30
	}).children('input').css('height', 50);
	$('div.statsTMain').css({
		'overflow' : 'hidden',
		'display' : 'none'
	});
	$('div.ingredientUnit').css({
		'height' : 60,
		'width' : 60,
		'padding' : 2
	}).children('div').attr('style', '').children('img').addClass('ui-corner-all');
	$('div.recipeImgContainer').addClass('ui-corner-all').find('img').addClass('ui-corner-all').end().parent().css('height', 80);

	// Add hide & pin
	$('div.statsT2 div.statsTTitle_inc').prepend($('<img src="http://image4.castleagegame.com/graphics/class_button_plus.jpg">').css({
		'borderRadius' : 4,
		'position' : 'absolute',
		'marginLeft' : -31,
		'marginTop' : -2
	})).append($('<div id="cageHideRecipe"><img src="http://image4.castleagegame.com/graphics/boss_lotus_help2.gif"><span>Hide incomplete recipes</span></div>').toggle(function() {
		$('#recipe_list').find('div.alchemyRecipeBackMonster:has(div.missing), div.alchemyQuestBack:has(div.missing), div.alchemyRecipeBackClass:has(div.missing), div.alchemyRecipeBack:has(div.missing)').hide();
		$('#cageHideRecipe > img').attr('src', 'http://image4.castleagegame.com/graphics/boss_lotus_help3.gif');
		item.set('cagePageAlchemyHideIncomplete', true);
	}, function() {
		$('#recipe_list').find('div.alchemyRecipeBackMonster:has(div.missing), div.alchemyQuestBack:has(div.missing), div.alchemyRecipeBackClass:has(div.missing), div.alchemyRecipeBack:has(div.missing)').css('display', '');
		$('#cageHideRecipe > img').attr('src', 'http://image4.castleagegame.com/graphics/boss_lotus_help2.gif');
		item.set('cagePageAlchemyHideIncomplete', false);
	}));
	$('div.statsTTitle').css({
		'cursor' : 'pointer'
	}).toggle(function() {
		$('div.statsTTitle_inc > img:first').attr('src', 'http://image4.castleagegame.com/graphics/class_button_minus.jpg');
		$('div.statsTMain').css({
			'display' : 'block'
		});
	}, function() {
		$('div.statsTTitle_inc > img:first').attr('src', 'http://image4.castleagegame.com/graphics/class_button_plus.jpg');
		$('div.statsTMain').css({
			'display' : 'none'
		});
	});

	setTimeout(function() {
		var _ingredients = {}, $ingredientUnit = $('div.ingredientUnit');
		$ingredientUnit.find('div:eq(1)').addClass('itemNumbers')
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
			_count.addClass('alchemyItemNum');
			if(_count.length === 0) {
				_e.parent().find('> strong:contains(" of ")').addClass('alchemyItemNum');
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
		// pinned

		$('#recipe_list td.statsTMainback').children('div').prepend('<div class="cagePinItem"><img src="http://image4.castleagegame.com/graphics/boss_lotus_help2.gif"><span>Pin item</span></div>');
		$('div.cagePinItem').click(function() {
			var _storedPinned = item.get('cagePageAlchemyPinned', []), _alch = $(this).parent().find('img:last').attr('title'), _index = _storedPinned.indexOf(_alch);
			console.log('_alch', _alch);
			if(_index === -1) {
				_storedPinned.push(_alch);
				item.set('cagePageAlchemyPinned', _storedPinned);
				var _c = $(this).parent().clone(true);
				_c.css({
					'display' : 'block',
					'boxShadow' : '0 5px 10px #000',
					'borderRadius' : 15,
					'border' : '1px outset',
					'position' : 'relative'
				}).find('.cagePinItem').css({
					'right' : 32
				}).find('img').attr('src', 'http://image4.castleagegame.com/graphics/boss_lotus_help3.gif');
				$('#cagePinnedItems').append(_c);
				$(this).parent().addClass('cageHideItem');
			} else {
				_storedPinned.splice(_index, 1);
				item.set('cagePageAlchemyPinned', _storedPinned);
				$(this).parent().remove();
				console.log('remove:', _alch);
				console.log($('#recipe_list td.statsTMainback').children('div').has('img:last[title=' + _alch + ']'));
				$('#recipe_list td.statsTMainback').children('div').has('img[title="' + _alch + '"]').removeClass('cageHideItem');
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
		var _storedPinned = item.get('cagePageAlchemyPinned', []);
		$('#recipe_list td.statsTMainback').children('div').each(function(_i, _e) {
			var $this = $(this);
			if(_storedPinned.indexOf($this.find('img:last').attr('title')) >= 0) {
				var _c = $this.clone(true);
				_c.css({
					'display' : 'block',
					'boxShadow' : '0 5px 10px #000',
					'borderRadius' : 15,
					'border' : '1px outset',
					'position' : 'relative'
				}).find('.cagePinItem').css({
					'right' : 32
				}).find('img').attr('src', 'http://image4.castleagegame.com/graphics/boss_lotus_help3.gif');
				$('#cagePinnedItems').append(_c);
				$this.addClass('cageHideItem');
			}
		});
		_storedPinned = null;
	}, 100);

	// remove some stuff
	$('div.alchemySpaceRecipe, div.alchemySpaceClass, div.alchemySpaceMonster, div.alchemySpaceQuest').remove();

	if(item.get('cagePageAlchemyHideIncomplete', true) === true) {
		$('#cageHideRecipe').click();
	}
};
