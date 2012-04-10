new tool('Sidebar');

tools.Sidebar.button = {

	add : function(_id, _text, _call) {
		$('#cageSidebarTools').append($('<button id="' + _id + '" class="cageToolButton">' + _text + '</button>').button({
			icons : {
				primary : "ui-icon-play"
			}
		}).removeClass('ui-corner-all').click(_call));
	},
	enable : function(_id) {
		$('#' + _id).button("option", "disabled", false).removeClass('ui-state-hover');
		$('#' + _id + 'WaitImg').fadeOut('slow', function() {
			$(this).remove();
		});
	},
	disable : function(_id) {
		$('#' + _id).before('<img id="' + _id + 'WaitImg" style="height: 14px;position: relative;margin-bottom: -20px;z-index: 2;margin-top: 4px;left: 7px;" src="http://image4.castleagegame.com/graphics/shield_wait.gif">').button("option", "disabled", true);
	}
};
