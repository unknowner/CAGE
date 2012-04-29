// Conquest battle
tools.Page.pages['guildv2_conquest_command.php'] = function() {

	console.log('Page: guildv2_conquest_command.php');
	tools.Monster.runtime.conquestLands = item.get('cageMonsterConquestLands', {});
	$('div > a:has(img[src$="graphics/war_btn_attack.jpg"])').each(function() {
		var _href = $(this).attr('href');
		_href = _href.substring(_href.lastIndexOf('/') + 1);
		var _list = $('<label class="cageConqKeepListLabel">Monster list<input ' + (tools.Monster.runtime.conquestLands[_href] === true ? 'checked=checked' : '') + ' style="position:relative;top:2px;cursor:pointer;" type="checkbox"></label>').click(function() {
			tools.Monster.runtime.conquestLands[_href] = $('input', this).prop("checked");
			item.set('cageMonsterConquestLands', tools.Monster.runtime.conquestLands);
		});
		$(this).before(_list);
	});
};
