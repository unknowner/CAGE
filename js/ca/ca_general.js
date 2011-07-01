var general = {

	current : null,

	get : function() {

		if ($('#equippedGeneralContainer div.general_name_div3').length > 0) {
			general.current = $('#equippedGeneralContainer div.general_name_div3')
					.text().trim();
			com.send(com.task.general, com.port.facebook, JSON.stringify({
				name : general.current,
				img : $('#equippedGeneralContainer img').attr('src')
			}));
		}

	},

	update : function() {

		if ($('#equippedGeneralContainer div.general_name_div3').length > 0
				&& $('#equippedGeneralContainer div.general_name_div3').text().trim() !== general.current) {
			general.get();
		}

	}

};