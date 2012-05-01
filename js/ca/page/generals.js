// generals
tools.Page.pages['generals.php'] = function() {

	console.log('Page: generals.php');

	$('#generalContainerBox2').prepend('<div style="position:relative;float:left;left:19px;"><div style="width:210px;float:left"><select size="99" id="cageFavsList"></select><input type="text" id="cageEditFavName"><input type="button" id="cageEditAddFav" class="cageFavsButton" value="+"><input type="button" id="cageEditDelFav" class="cageFavsButton" value="-"></div><div id="cageFavsDisplayContainer"><div id="cageFavsDisplay"></div></div></div>');
	var _list = $('#cageFavsList');
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
		$('#cageSelectorList').val($(this).find('option:selected').val());
		tools.General.runtime.favList = $(this).find('option:selected').text();
		item.set('favList', tools.General.runtime.favList);
		$('#cageEditFavName').val(tools.General.runtime.favList);
		var _displ = $('#cageFavsDisplay'), _dispAppend = '';
		_displ.empty();
		$.each(tools.General.runtime.favorites[tools.General.runtime.favList], function() {
			_dispAppend += '<div class="ui-state-default" style="background-image:url(\'' + tools.General.runtime.general[this].image + '\');"><img src="' + getPath('img/favdel.png') + '" alt="' + tools.General.runtime.general[this].name + '"/></div>';
		});
		_displ.append(_dispAppend);
		_displ.find('div > img:last-child').each(function() {
			$(this).click(function() {
				tools.General.runtime.favorites[tools.General.runtime.favList].splice(tools.General.runtime.favorites[tools.General.runtime.favList].indexOf($(this).attr('alt')), 1);
				item.set('favFavorites', tools.General.runtime.favorites);
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
			$('#cageSelectorList').append($('<option>', {
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
			tools.General.runtime.favorites[_name] = null;
			tools.General.runtime.favLists.splice(tools.General.runtime.favLists.indexOf(_name), 1);
			item.set('favLists', tools.General.runtime.favLists);
			tools.General.runtime.favList = $('option:selected', this).text();
			item.set('favList', tools.General.runtime.favList);
			$("#cageFavsList").prop("selectedIndex", 0).change();
			tools.General.renderFavs();
		}
	});
	// add to favs from generals page
	$('div.generalSmallContainer2').each(function() {
		$('div.general_name_div3', this).prepend($('<img style="cursor:pointer;position:absolute;padding:1px;" src="' + getPath('img/favadd.png') + '" alt="' + $('div.general_name_div3_padding', this).text().trim() + '"/>').click(function() {
			if(tools.General.runtime.favorites[tools.General.runtime.favList].indexOf($(this).attr('alt')) == -1) {
				tools.General.runtime.favorites[tools.General.runtime.favList].push($(this).attr('alt'));
				item.set('favFavorites', tools.General.runtime.favorites);
				var _displ = $('#cageFavsDisplay');
				_displ.empty();
				$.each(tools.General.runtime.favorites[tools.General.runtime.favList], function() {
					_displ.append($('<div>').addClass('ui-state-default').css('backgroundImage', 'url(\'' + tools.General.runtime.general[this].image + '\')').append($('<img>').attr({
						'src' : getPath('img/favdel.png'),
						'alt' : tools.General.runtime.general[this].name
					}).click(function() {
						tools.General.runtime.favorites[tools.General.runtime.favList].splice(tools.General.runtime.favorites[tools.General.runtime.favList].indexOf($(this).attr('alt')), 1);
						item.set('favFavorites', tools.General.runtime.favorites);
						$('#cageFavsList').change();
						tools.General.renderFavs();
					})));
				});
				tools.General.renderFavs();
			}
		}));
	});
	$('#cageFavsDisplayContainer').resizable({
		grid : [481, 57],
		handles : 's',
		maxWidth : 481,
		minWidth : 481,
		resize : function(event, ui) {
			$('#cageFavsDisplay').height($(this).height() - 8);
		}
	});
	$('#cageFavsDisplay').sortable({
		update : function() {
			var _names = [];
			$('#cageFavsDisplay').find('img:[alt]').each(function() {
				_names.push($(this).attr('alt'));
			});
			tools.General.runtime.favorites[tools.General.runtime.favList] = _names;
			item.set('favFavorites', tools.General.runtime.favorites);
			$('#cageFavsList').change();
			tools.General.renderFavs();
		},
		containment : 'parent',
		revert : 200,
		placeholder : 'ui-state-active',
		forcePlaceholderSize : true,
		tolerance : 'pointer'
	});
	//Update generals data
	tools['General'].parsePage()
};
