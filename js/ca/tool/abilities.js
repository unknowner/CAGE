new tool('Abilities');

tools['Abilities'].runtime = {};

tools['Abilities'].runtime.general = null;

tools['Abilities'].start = function() {

};
tools['Abilities'].equip_send = function(class_id) {
	
	friend_browse_offset = 0;
	reset_raid_lst();
	stopTimers = true;

	var class_equips = classPowers[class_id];
	if(class_equips.length == 0)
		class_equips = false;
	params = {}
	params['ajax'] = 1;
	params['class_id'] = class_id;
	params['class_equips'] = class_equips;
	params['signed_request'] = $('#signed_request').attr('value');
	pageCache = {};
	ajaxPerforming = true;
	showLoaderIfAjax();

	$.ajax({
		url : 'guild_class.php',
		context : document.body,
		data : params,
		type : 'POST',
		success : function(data) {
			stopTimers = false;
			ajaxPerforming = false;
			$('#AjaxLoadIcon').hide();
			$('#').slideUp('fast');
			//$('#globalContainer').html(data);
			//centerPopups();
		}
	});

};

tools['Abilities'].done = function() {
	tools['Abilities'].fbButton.enable();
};
tools['Abilities'].init = function() {
	tools['Abilities'].fbButton.add(chrome.i18n.getMessage("buttonAbilities"), function() {
		tools['Abilities'].fbButton.disable();
		tools['Abilities'].start();
	});
};
