var item = {
	get : function(_name, _default) {
		if (localStorage[CastleAge.userId + '_' + _name] !== undefined && localStorage[CastleAge.userId + '_' + _name] !== null) {
			return JSON.parse(localStorage[CastleAge.userId + '_' + _name]);
		} else {
			return _default;
		}
	},
	set : function(_name, _value) {
		localStorage[CastleAge.userId + '_' + _name] = JSON.stringify(_value);
	},
	del : function(_name) {
		localStorage.remove(CastleAge.userId + '_' + _name);
	}
};
// Notes
function note(_h, _m) {
	if (tools.cage.runtime.showNotes == 'true' || tools.cage.runtime.showNotes == true) {
		com.note(_h, _m);
	}
}

// Add custom event to content site and listener to content_script
function customEvent(_event, _function) {

	addFunction(function() {
		var _arg = arguments[0].event;
		// fire the event opt. with data
		window[('fire' + _arg)] = function(_data) {
			if (_data !== undefined) {
				$('#' + _arg).val(JSON.stringify(_data));
			}
			console.log('fire customEvent: ', _arg);
			var customEvent = document.createEvent('Event');
			customEvent.initEvent(_arg, true, true);
			document.getElementById(_arg).dispatchEvent(customEvent);
			customEvent = null;
		};
		// set data for the event
		window[('set' + _arg)] = function(_data) {
			console.log('set customEvent:' + _arg + ' > ', _data);
			$('#' + _arg).val(_data);
		};
		// remove the event and the div
		window[('remove' + _arg)] = function(_data) {
			$('#' + _arg).unbind(_event).remove();
		};
	}, JSON.stringify({
		event : _event
	}), true, true);
	$(document.body).append($('<input type="hidden" id="' + _event + '" value="" />').bind(_event, _function));

}

// http://forum.jquery.com/topic/beginner-function-toggle-deprecated-what-to-use-instead 
$.fn.toggleClick = function() {
	var functions = arguments;
	return this.click(function() {
		var iteration = $(this).data('iteration') || 0;
		// console.log(iteration)
		functions[iteration].apply(this, arguments);
		iteration = (iteration + 1) % functions.length;
		$(this).data('iteration', iteration);
	});
};
