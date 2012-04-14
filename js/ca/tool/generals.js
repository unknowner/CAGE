tool('General');

tools.General.current = null;
tools.General.runtime = {};

// settings
tools.General.settings = function() {
	tools.General.runtimeUpdate();
	tools.Settings.heading(language.generalsSetName);
	tools.Settings.onoff(language.generalsSetFavOnlyAction, tools.General.runtime.onlyFavourites, 'onlyFavouritesGenerals', tools.General.runtimeUpdate);
	tools.Settings.onoff(language.generalsSetFixHeight, tools.General.runtime.generalsSetFixHeight, 'generalsSetFixHeight', tools.General.runtimeUpdate);
};
tools.General.generalsSetFixHeight = function() {
	if(tools.General.runtime.generalsSetFixHeight) {
		$('#cageAllGenerals').css({
			'overflow' : 'auto',
			'maxHeight' : 208,
			'width' : 719
		});
	} else {
		$('#cageAllGenerals').css({
			'overflow' : '',
			'maxHeight' : '',
			'width' : ''
		});
	}
};
tools.General.runtimeUpdate = function() {
	if(!tools.General.runtime) {
		tools.General.runtime = {};
	}
	tools.General.runtime.generalsSetFixHeight = item.get('generalsSetFixHeight', false);
	tools.General.generalsSetFixHeight();
	tools.General.runtime.onlyFavourites = item.get('onlyFavouritesGenerals', false);

	tools.General.runtime.favList = item.get('favList', 'Favorites');
	tools.General.runtime.favList = tools.General.runtime.favList == 'undefined' ? 'Favorites' : tools.General.runtime.favList;
	tools.General.runtime.favLists = item.get('favLists', false);
	tools.General.runtime.favorites = item.get('favFavorites', {
		'Favorites' : []
	});
	if(!tools.General.runtime.general) {
		tools.General.runtime.general = {};
	}
	if(tools.General.runtime.favLists == false) {
		tools.General.runtime.favLists = ['Favorites'];
		if(item.get('favouriteGenerals', false) !== false) {
			tools.General.runtime.favorites.Favorites = item.get('favouriteGenerals', []);
		}
		item.set('favList', 'Favorites');
		item.set('favLists', ['Favorites']);
		item.set('favFavorites', tools.General.runtime.favorites);
	}

};
//get current general from CA
tools.General.get = function() {
	if($('div[style*="graphics/hot_container.gif"]').length > 0) {
		var _old = tools.General.current, _i = $('#main_bn div > img[style="width:24px;height:24px;"]');
		tools.General.current = $('div[style*="graphics/hot_container.gif"] > div:first').text().trim();
		setTimeout(function() {
			if(_i.length > 0) {
				$('#cageGeneralEquipment').empty().append(_i);
			}
		}, 100);
		if(_old !== tools.General.current) {
			$('#cageGeneralImageCharge').remove();
			$('#cageGeneralImage, #cagegeneralname, #cageGeneralDefense').fadeOut('slow');
			$('#cageGeneralAttack').fadeOut('slow', function() {
				tools.General.set();
			});
		}
	}
};
// Set general image & name
tools.General.set = function() {
	var _g = tools.General.runtime.general[tools.General.current];
	$('#cageGeneralName').text(_g.name);
	$('#cageGeneralAttack').text(_g.attack);
	$('#cageGeneralDefense').text(_g.defense);
	$('#cageGeneralText').text(_g.text);
	$('#cageGeneralImageCharge').remove();
	if(_g.charge) {
		var _cool = _g.cooldown * 60 - (_g.cooldown * _g.charge / 10 * 6);
		$('#cageGeneralImageContainer').append('<div id="cageGeneralImageCharge"><div style="width:' + _g.charge + '%;"></div><span>' + (_g.charge == 100 ? 'Charge!' : Math.floor((_cool - (_cool % 60)) / 60) + ':' + Math.floor((_cool % 60)) + '</span></div>'))
	}
	$('#cageGeneralImage').attr('src', _g.image);
	$('#cageGeneralImage, #cageGeneralName, #cageGeneralDefense, #cageGeneralAttack').fadeIn('slow');
};
// Set General by name
tools.General.setByName = function(_name, _callback) {
	if(_name !== tools.General.current) {
		$('#cageGeneralImageCharge').remove();
		var _g = tools.General.runtime.general[_name];
		if(_g !== null) {
			$('#cageGeneralImage, #cagegeneralname, #cageGeneralDefense, #cageGeneralAttack').fadeOut('slow');
			get('generals.php?item=' + _g.item + '&itype=' + _g.itype + '&bqh=' + CastleAge.bqh, function(_data) {
				var _i = $(_data).find('#main_bn div > img[style="width:24px;height:24px;"]');
				if($('div.generalContainerBox:first').length == 1) {
					$('div.generalContainerBox:first').next('div').replaceWith($(_data).find('div.generalContainerBox:first').next('div'))
				}
				setTimeout(function() {
					if(_i.length > 0) {
						$('#cageGeneralEquipment').empty().append(_i);
					}
				}, 100);
				tools.Stats.update($('#main_sts', _data));
				tools.General.parsePage(_data);
				tools.General.current = _name;
				tools.General.set();
				if(_callback !== undefined) {
					_callback();
				}
			});
		}
	}
};
// update generals object
tools.General.update = function() {
	if(CastleAge.signed_request !== null) {
		if($('div.generalContainerBox:first').length == 1) {
			tools.General.parsePage();
		} else {
			get('generals.php', function(_data) {
				tools.General.parsePage(_data);
			});
		}
	} else {
		window.setTimeout(tools.General.update, 100);
	}
};
tools.General.lists = function() {
	var _list = $('#cageSelectorList');
	$.each(tools.General.runtime.favLists, function(_i, _e) {
		var _attr = {
			value : _i
		}
		if(_e === tools.General.runtime.favList) {
			_attr.selected = "selected"
		}
		_list.append($('<option>', _attr).text(_e));
	});
	_list.change(function() {
		console.log('selected...', $('option:selected', this).text());
		tools.General.runtime.favList = $('option:selected', this).text();
		item.set('favList', tools.General.runtime.favList);
		tools.General.renderFavs();
	}).change();
};
tools.General.parsePage = function(_data) {
	_data = _data ? $(_data) : $('#app_body');
	_data.find('table.layout div.general_pic_div3').each(function(i, e) {
		var $_this = $(this), $_image = $('form:has(input[name="item"]) input.imgButton', e), $_general = $_this.parent(), _name = $_general.children('div.general_name_div3:first').text().trim(), _stats = $_general.find('div.generals_indv_stats_padding'), _charge = $_this.find('div[style*="gen_chargebarsmall.gif"]:last'), _gtext = $_general.children('div:last').children('div');
		tools.General.runtime.general[_name] = {
			name : _name,
			image : $_image.attr('src'),
			item : $_this.find('input[name="item"]').attr('value'),
			itype : $_this.find('input[name="itype"]').attr('value'),
			attack : $_this.next('div:first').children('div:eq(0)').text().trim(),
			defense : $_this.next('div:first').children('div:eq(1)').text().trim(),
			text : _gtext.html(_gtext.html().replace(/<br>/g, ' ')).text().trim(),
			level : $_general.find('div:contains("Level"):last').text().trim()
		};
		if(_charge.length > 0) {
			tools.General.runtime.general[_name].charge = Math.round(parseInt(_charge.css('width').replace('px', ''), 10) / (_charge.parent().css('width') == '0px' ? 1 : 1.12), 2);
			tools.General.runtime.general[_name].cooldown = /\d+(?= Hour cooldown)/ig.exec(tools.General.runtime.general[_name].text)[0];
		}
	});
	$('#cageGeneralSelector').html('<span id="cageSelectorInfo" class="ui-state-active ui-corner-left"></span><select id="cageSelectorList"></select><div id="cageFavoriteGenerals"></div><div id="cageAllGenerals"></div>');
	var _names = [];
	$.each(tools.General.runtime.general, function(_i, _e) {
		_names.push(_e.name);
	});
	_names.sort();
	for(var i = 0, len = _names.length; i < len; i++) {
		var _e = tools.General.runtime.general[_names[i]];
		$('#cageAllGenerals').append($('<div>').append($('<img src="' + _e.image + '" alt="' + _e.name + '" />').click(function() {
			tools.General.setByName($(this).attr('alt'));
			$('#cageGeneralSelector').slideToggle('slow');
		}).hover(function() {
			var _general = tools.General.runtime.general[$(this).attr('alt')];
			$('#cageSelectorInfo').html(_general.name + ' (' + _general.level + ') <img src="http://image4.castleagegame.com/graphics/icon_atk.gif" style="height:12px;"/> ' + _general.attack + ' <img src="http://image4.castleagegame.com/graphics/icon_def.gif" style="height:12px;"/> ' + _general.defense + ' - ' + _general.text);
		}, function() {
			$('#cageSelectorInfo').html('');
		})).append($('<img src="' + getPath('img/fav.png') + '" alt="' + _e.name + '" />').hover(tools.General.hoverAddIn, tools.General.hoverAddOut).click(tools.General.clickAdd)));
		if(_e.charge) {
			$('#cageAllGenerals div:last').append('<div class="cageCharge" style="height:' + Math.max(10, _e.charge) + '%;' + (_e.charge < 100 ? '' : 'background-color:#4F4;') + '"></div>');
		}
	}
	tools.General.lists();
	tools.General.renderFavs();
	tools.General.get();
	tools.General.generalsSetFixHeight();
};
tools.General.renderFavs = function() {
	$('#cageAllGenerals > div').show();
	$('#cageSelectorList').val()
	if(tools.General.runtime.favorites[tools.General.runtime.favList] && tools.General.runtime.favorites[tools.General.runtime.favList].length > 0) {
		var _tempFav = tools.General.runtime.favorites[tools.General.runtime.favList];
		$('#cageFavoriteGenerals').html('');
		for(var i = 0, len = _tempFav.length; i < len; i++) {
			$('#cageAllGenerals > div > img[alt="' + _tempFav[i] + '"]').parent().hide().clone(true, true).appendTo('#cageFavoriteGenerals').show().find('img:last').unbind('click hover').click(tools.General.clickRemove).hover(tools.General.hoverRemoveIn, tools.General.hoverRemoveOut);
		}
	} else {
		$('#cageFavoriteGenerals').html('');
	}
}
tools.General.clickAdd = function() {
	tools.General.runtime.favorites[tools.General.runtime.favList].push($(this).attr('alt'));
	console.log('clickAdd:', tools.General.runtime.favorites);
	item.set('favFavorites', tools.General.runtime.favorites);
	$(this).mouseleave().parent().hide().clone(true, true).appendTo('#cageFavoriteGenerals').show().find('img:last').unbind('click hover').click(tools.General.clickRemove).hover(tools.General.hoverRemoveIn, tools.General.hoverRemoveOut);
	$('#cageFavsList').change();
};
tools.General.clickRemove = function() {
	var _name = $(this).attr('alt');
	tools.General.runtime.favorites[tools.General.runtime.favList].splice(tools.General.runtime.favorites[tools.General.runtime.favList].indexOf(_name), 1);
	item.set('favFavorites', tools.General.runtime.favorites);
	$(this).parent().hide().remove();
	$('#cageAllGenerals img[alt="' + _name + '"]:first').parent().show();
	$('#cageFavsList').change();
};
tools.General.hoverAddIn = function() {
	$('#cageSelectorInfo').html('Add ' + $(this).attr('alt') + ' to favourites');
	$(this).attr('src', getPath('img/favadd.png'));
};
tools.General.hoverAddOut = function() {
	$('#cageSelectorInfo').html('');
	$(this).attr('src', getPath('img/fav.png'));
};
tools.General.hoverRemoveIn = function() {
	$('#cageSelectorInfo').html('Remove ' + $(this).attr('alt') + ' from favourites');
	$(this).attr('src', getPath('img/favdel.png'));
};
tools.General.hoverRemoveOut = function() {
	$('#cageSelectorInfo').html('');
	$(this).attr('src', getPath('img/fav.png'));
};
// show/hide generals
tools.General.showAll = function() {
	var _speed = 'slow';
	if(tools.General.runtime.onlyFavourites == true) {
		$('#cageAllGenerals').hide();
		_speed = 'fast';
	} else {
		$('#cageAllGenerals').show();
	}
	$('#cageGeneralSelector').slideToggle(_speed);
}
// init general tool
tools.General.init = function() {
	tools.General.runtimeUpdate();
	var _elm = {
		general : '<div id="cageGeneralContainer"></div>',
		generalImageContainer : '<div id="cageGeneralImageContainer"></div>',
		generalStatsDiv : '<div id="cageGeneralStats">',
		generalImage : '<img id="cageGeneralImage"/>',
		generalName : '<span id="cageGeneralName"></span><hr style="margin:0;>',
		generalValues : '<div id="cageGeneralEquipment"></div><div id="cageGeneralAttDiv"><img src="http://image4.castleagegame.com/graphics/icon_atk.gif" id="cageGeneralAttImg" /><span id="cageGeneralAttack"></span></div><div id="cageGeneralDefDiv"><img src="http://image4.castleagegame.com/graphics/icon_def.gif" id="cageGeneralDefImg" /><span id="cageGeneralDefense"></span></div>',
		generalText : '<div id="cageGeneralText"></div>',
		generalSelector : '<div id="cageGeneralSelector" class="ui-widget-content ui-corner-bottom">',
	}
	$('#cageContainer').append(_elm.general).prepend(_elm.generalSelector);
	$('#cageSidebarHeader').append($(_elm.generalImageContainer).append(_elm.generalName).append(_elm.generalValues).append(_elm.generalImage)).append($(_elm.generalStatsDiv).append(_elm.generalText));
	$('#cageGeneralImage').click(function() {
		if(tools.General.runtime.onlyFavourites == true) {
			$('#cageAllGenerals').hide();
		} else {
			$('#cageAllGenerals').show();
		}
		$('#cageGeneralSelector').slideToggle('slow');
	}).hover(function() {
		$('#cageGeneralStats').stop().show().animate({
			'opacity' : 0.8,
			'top' : 166
		}, 'slow');
	}, function() {
		$('#cageGeneralStats').stop().animate({
			'opacity' : 0,
			'top' : 5,
		}, 'slow', function() {
			$(this).hide()
		});
	});
	tools.General.update();
};
