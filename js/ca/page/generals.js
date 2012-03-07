// generals
tools['Page'].runtime['generals.php'] = function() {

	console.log('Page: generals.php');
	window.setTimeout(tools['General'].parsePage, 50);

	var $help = $('div.generalHelp:first'), _hr = '<hr style="width: 656px;border: 1px solid #8C562A;margin-right: 33px;">', _favs = '<div style="height:120px;padding:5px;position:relative;float:left"><div style="width:190px;float:left"><select size="5" id="cageFavsList"></select><input type="text" id="cageEditFavName"><input type="button" id="cageEditAddFav" class="cageFavsButton" value="+"><input type="button" id="cageEditDelFav" class="cageFavsButton" value="-"></div><div id="cageFavsDisplay"></div></div>';

	$help.empty().removeClass('generalHelp').css({
		'height' : 160
	}).append(_hr).append(_favs).append(_hr);

	var _list = $('#cageFavsList');

	$.each(tools.General.runtime.favLists, function(_i, _e) {
		console.log(_i, _e);
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
		$('#cageEditFavName').val(tools.General.runtime.favList);
		var _displ = $('#cageFavsDisplay');
		_displ.empty();
		$.each(tools.General.runtime.favorites[tools.General.runtime.favList], function() {
			_displ.append('<div><img src="' + tools.General.runtime.general[this].image + '"><img src="' + getPath('img/favdel.png') + '" alt="' + tools.General.runtime.general[this].name + '"/></div>');
		});
		$('div > img:last-child', _displ).each(function() {
			$(this).click(function() {
				tools.General.runtime.favorites[tools.General.runtime.favList].splice(tools.General.runtime.favorites[tools.General.runtime.favList].indexOf($(this).attr('alt')), 1);
				item.set('favLists', tools.General.runtime.favLists);
				console.log($(this).attr('alt'));
				$('#cageFavsList').change();
				tools.General.renderFavs();
			});
		});
		tools.General.renderFavs();
	}).change();
	// Add fav list
	$('#cageEditAddFav').click(function() {
		var _name = $('#cageEditFavName').val();
		if(_name !== 'Favorites' && _name !== undefined && _name.length !== 0 && tools.General.runtime.favorites[_name] === undefined) {
			tools.General.runtime.favorites[_name] = [];
			item.set('favFavorites', tools.General.runtime.favorites);
			tools.General.runtime.favLists.push(_name);
			item.set('favLists', tools.General.runtime.favLists);
			tools.General.runtime.favList = _name;
			item.set('favList', tools.General.runtime.favList);
			$('#cageFavsList').append($('<option>', {
				value : tools.General.runtime.favLists.length,
				selected : 'selected'
			}).text(_name)).change();
			tools.General.renderFavs();
		}
	});
	// remove fav list
	$('#cageEditDelFav').click(function() {
		var _name = $('#cageEditFavName').val();
		console.log(_name);
		if(_name !== 'Favorites' && _name !== undefined && _name.length !== 0) {
			$('option:selected').remove();
			delete tools.General.runtime.favorites[_name];
			tools.General.runtime.favLists.splice(tools.General.runtime.favLists.indexOf(_name), 1);
			item.set('favLists', tools.General.runtime.favLists);
			tools.General.runtime.favList = $('option:selected', this).text();
			item.set('favList', tools.General.runtime.favList);
			$("#cageFavsList").prop("selectedIndex", 0).change();
			tools.General.renderFavs();
		}
	});
	// add to favs from generals page
	$('div.generalSmallContainer1').each(function() {
		$('div.general_name_div3', this).prepend($('<img style="cursor:pointer;position:absolute;padding:1px;" src="' + getPath('img/favadd.png') + '" alt="' + $('div.general_name_div3_padding', this).text().trim() + '"/>').click(function() {
			if(tools.General.runtime.favorites[tools.General.runtime.favList].indexOf($(this).attr('alt')) == -1) {
				tools.General.runtime.favorites[tools.General.runtime.favList].push($(this).attr('alt'));
				item.set('favFavorites', tools.General.runtime.favorites);
				var _displ = $('#cageFavsDisplay');
				_displ.empty();
				$.each(tools.General.runtime.favorites[tools.General.runtime.favList], function() {
					_displ.append('<div><img title="' + this + '" src="' + tools.General.runtime.general[this].image + '">');
					$('div:last', _displ).append('<img src="' + getPath('img/favdel.png') + '" alt="' + tools.General.runtime.general[this].name + '"/></div>').click(function() {
						tools.General.runtime.favorites[tools.General.runtime.favList].splice(tools.General.runtime.favorites[tools.General.runtime.favList].indexOf($(this).attr('alt')), 1);
						item.set('favLists', tools.General.runtime.favLists);
						console.log($(this).attr('alt'));
						$('#cageFavsList').change();
						tools.General.renderFavs();
					});
				});
				tools.General.renderFavs();
			}
		}));
	});
};
