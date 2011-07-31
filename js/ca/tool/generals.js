new tool('General');

tools['General'].current = null;
tools['General'].general = {};
//get current general from CA and set it in fb ui
tools['General'].get = function() {
	if($('#equippedGeneralContainer div.general_name_div3').length > 0) {
		tools['General'].current = $('#equippedGeneralContainer div.general_name_div3').text().trim();
		tools['General'].set();
	}
};
// Set general image & name in fb ui
tools['General'].set = function(_general) {
	$('#cageGeneralImage').attr('src', tools['General'].general[tools['General'].current].image);
	$('#cageGeneralName').text(tools['General'].current);
};
// Set General by name
tools['General'].setByName = function(_name, _callback) {
	var _g = tools['General'].general[_name];
	if(_g !== null) {
		$.get('generals.php?item=' + _g.item + '&itype=' + _g.itype + '&bqh=' + CastleAge.bqh + '&signed_request=' + CastleAge.signed_request, function() {
			tools['General'].current = _name;
			tools['General'].set();
			if(_callback !== undefined) {
				_callback();
			}
		});
	}
};
// init general tool @fb
tools['General'].init = function() {
	$('#cageGeneralImage').click( function() {
		tools['Page'].loadPage('generals.php');
	});
	tools['General'].update();
}
// update generals object
tools['General'].update = function() {
	if(CastleAge.signed_request !== null) {
		$.get('generals.php?signed_request=' + CastleAge.signed_request, function(_data) {
			tools['General'].general = {};
			$('div.generalSmallContainer2 div.general_pic_div3', _data).each( function(i, e) {
				var $_this = $(this);
				var $_image = $('form:has(input[name="item"]) input.imgButton', e);
				var $_general = $_image.parents('div.generalSmallContainer2:first');
				var _image = $_image.attr('src');
				var _name = $_general.children('div.general_name_div3:first').text().trim();
				var _item = $_this.parent().find('input[name="item"]').attr('value');
				var _itype = $_this.parent().find('input[name="itype"]').attr('value');
				var _text = $_general.children('div:last').children('div').html().trim().replace(/<br>/g, ' ');
				var _stats = $_general.find('div.generals_indv_stats_padding');
				var _att = _stats.children('div:eq(0)').text().trim();
				var _def = _stats.children('div:eq(1)').text().trim();
				tools['General'].general[_name] = {
					name : _name,
					image : _image,
					item : _item,
					itype : _itype,
					attack : _att,
					defense : _def,
					text : _text
				};
			});
			tools['General'].get();
		});
	} else {
		window.setTimeout(tools['General'].update, 100);
	}
};