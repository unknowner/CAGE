new tool('General');

tools['General'].current = null;
tools['General'].general = {};
//get current general from CA and set it in fb ui
tools['General'].get = function() {
	if($('#equippedGeneralContainer div.general_name_div3').length > 0) {
		tools['General'].current = $('#equippedGeneralContainer div.general_name_div3').text().trim();
		com.send(com.task.general, com.port.facebook, JSON.stringify({
			name : tools['General'].current,
			img : $('#equippedGeneralContainer img').attr('src')
		}));
	}
};
// Set general image & name in fb ui
tools['General'].set = function(_general) {
	_general = JSON.parse(_general);
	$('#cageGeneralImage').attr('src', _general.img);
	$('#cageGeneralName').text(_general.name);
};
// Set General by name
tools['General'].setByName = function(_name, _callback) {
	var _g = tools['General'].general[_name];
	if(_g !== null) {
		$.get('generals.php?item=' + _g.item + '&itype=' + _g.itype + '&bqh=' + CastleAge.bqh + '&signed_request=' + CastleAge.signed_request, function() {
			tools['General'].current = _name;
			com.send(com.task.general, com.port.facebook, JSON.stringify({
				name : _name,
				img : _g.image
			}));
			if(_callback !== undefined) {
				_callback();
			}
		});
	}
};
// init general tool @fb
tools['General'].init[com.port.facebook] = function() {
	$('#cageGeneralImage').click(function() {
		com.send(com.task.loadPage, com.port.castleAge, '"generals.php"');
	});
}
// update generals object
tools['General'].update = function() {
	$.get('generals.php?signed_request=' + CastleAge.signed_request, function(_data) {
		tools['General'].general = {};
		$('div.generalSmallContainer2 div.general_pic_div3', _data).each(function(i, e) {
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
	});
};
