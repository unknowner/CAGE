var item = {
	get : function(_name, _default) {
		console.log(CastleAge.userId);
		if (localStorage[CastleAge.userId + '_' + _name] !== undefined) {
			return localStorage[CastleAge.userId + '_' + _name];
		} else {
			return _default;
		}
	},
	set : function(_name, _value) {
		localStorage[CastleAge.userId  + '_' + _name] = _value;
	},
	del : function(_name) {
		localStorage.remove(CastleAge.userId  + '_' + _name);
	}
};

// Add custom event to centent site and listener to content_script
function customEvent(_event, _function) {

	addFunction( function () {
		var _arg = arguments[0].event;

		// fire the event opt. with data
		window[('fire' + _arg)] = function (_data) {
			if (_data !== undefined) {
				$('#' + _arg).val(_data);
				//window[('set' + _arg)](_data);
			}
			console.log('fire val:' + $('#' + _arg).val());
			var customEvent = document.createEvent('Event');
			customEvent.initEvent(_arg, true, true);
			document.getElementById(_arg).dispatchEvent(customEvent);
		};
		// set data for the event
		window[('set' + _arg)] = function (_data) {
			console.log('set:' + _arg + ' > ' + _data);
			$('#' + _arg).val(_data);
		};
		// remove the event and the div
		window[('remove' + _arg)] = function (_data) {
			$('#' + _arg).unbind(_event).remove();
		};
	}, JSON.stringify({
		event: _event
	}), true, true);
	$(document.body).append($('<input type="hidden" id="' + _event + '" value="" />').bind(_event, _function));

}