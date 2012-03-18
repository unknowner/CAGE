// Conquest battle
tools['Page'].runtime['guildv2_conquest_command.php'] = function() {

	console.log('Page: guildv2_conquest_command.php');
	$('div > a:has(img[src$="graphics/war_btn_attack.jpg"])').each(function() {
		var _href = $(this).attr('href');
		_href = _href.substring(_href.lastIndexOf('/') + 1);
		$(this).before($('<label class="cageConqKeepListLabel">Monster list<input style="position:relative;top:2px;cursor:pointer;" type="checkbox"></label>').click(function() {
			tools.Monster.runtime.conquestLands[_href] = $('input', this).prop("checked");
		}));
	});
};
