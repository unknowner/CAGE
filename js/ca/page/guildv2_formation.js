// Goblin Emporium
tools.Page.runtime['guildv2_formation.php'] = function() {

	console.log('Page: guildv2_formation.php');
	var $mid = $('#guildv2_formation_middle'), _member = {}, $change = $mid.find('div[style*="/graphics/war_select_divider.jpg"]');

	// add saving
	$change.nextAll().remove();
	$change.find('a').replaceWith($('<input style="margin-top:9px;" type="image" style="cursor:pointer;" id="cageSaveFormation" src="http://image4.castleagegame.com/graphics/war_select_button_accept.gif">').click(function() {
		$(this).attr('disabled', 'disabled').attr('src', 'http://image4.castleagegame.com/graphics/war_select_button_accept_2.gif').css('cursor', 'wait');
		var _gate = {}
		$('div[id^="cageGate"]').each(function(_i, _e) {
			var _temp = [], _children = $(_e).children('div.cageGuildMember').toArray();
			for(var i = 0; i < _children.length; i++) {
				_temp.push($(_children[i]).data('id'));
			};
			_gate[_i] = _temp;
		});
		console.log(_gate);
		var params = {
			'ajax' : 1,
			'select_formation' : 1,
			'sector_1_map_in' : _gate[0],
			'sector_2_map_in' : _gate[1],
			'sector_3_map_in' : _gate[2],
			'sector_4_map_in' : _gate[3],
			'signed_request' : CastleAge.signed_request
		};
		$.ajax({
			url : 'guildv2_formation.php',
			data : params,
			type : 'POST',
			success : function(data) {
				$('#cageSaveFormation').attr('src', 'http://image4.castleagegame.com/graphics/war_select_button_accept.gif').css('cursor', 'pointer').removeAttr('disabled');
			}
		});

	}));
	// get members
	$mid.find('div[id^="selected_formation_"]').each(function(_i, _e) {
		_member[/\d+$/.exec($(this).attr('id'))[0]] = {
			name : $(_e).text().trim().replace(', lvl ', ' (') + ')',
			gate : parseInt(/\d/.exec($(this).attr('id'))[0], 10),
			img : $(_e).find('img').attr('src')
		};
	});
	//clear gates
	$mid.find('div[style*="/graphics/formation_section_back.jpg"]').each(function(_i, _e) {
		$(_e).css({
			'fontSize' : 12,
			'padding' : '',
			'height' : '',
			'width' : 170,
			'backgroundImage' : 'url(\'http://image4.castleagegame.com/graphics/guild_feed_rightheader.gif\')',
			'backgroundSize' : '170px 33px'
		}).children('div:eq(0)').css({
			'padding' : '5px 0 0 0',
			'width' : 170,
			'height' : 25,
			'color' : '#fff'
		}).next().css({
			'margin' : 0,
			'backgroundImage' : 'url(\'http://image4.castleagegame.com/graphics/guild_feed_rightsubheader.gif\')',
			'width' : 170,
			'border' : 0,
			'height' : 9,
			'backgroundSize' : '170px 11px'
		}).next().empty().attr({
			'id' : 'cageGate' + (_i + 1),
			'class' : 'cageMemberList'
		}).css({
			'height' : '',
			'minHeight' : 503

		}).after('<div class="cageMemberListFooter"><img src="http://image4.castleagegame.com/graphics/guild_feed_rightsubbottom.gif"></div>');
	});
	// append members
	$.each(_member, function(_i, _e) {
		$('#cageGate' + _e.gate).append($('<div class="cageGuildMember"><img src="' + _e.img + '"><span>' + _e.name + '</span></div>').data('id', parseInt(_i, 10)));
	});
	// add sorting
	$('div[id^="cageGate"]').each(function(_i, _e) {
		$(_e).sortable({
			revert : 200,
			placeholder : 'cageGuildMemberPlaceHolder',
			forcePlaceholderSize : true,
			connectWith : 'div.cageMemberList',
			receive : function(event, ui) {
				if($(this).children().length > 25) {
					//ui.sender: will cancel the change.
					//Useful in the 'receive' callback.
					$(ui.sender).sortable('cancel');
				}
			}
		}).disableSelection();
	});
};
