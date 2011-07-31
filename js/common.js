// Add function to content site
function addFunction(_func, _arg, _run, _once) {
	var script = document.createElement('script');
	script.textContent = (_run ? '(' : '') + _func + (_run ? ')(' + _arg + ');' : ';');
	document.body.appendChild(script);
	if (_once) {
		document.body.removeChild(script);
	}
}

// Return Array with unique values
function unique(_array, _tostring) {
	var o = {}, i, l = _array.length, r = [];
	for(i=0; i<l;i+=1) {
		o[_array[i]] = _array[i];
	}
	if (_tostring) {
		for(i in o) {
			r.push(o[i].toString());
		}
	} else {
		for(i in o) {
			r.push(o[i]);
		}
	}
	return r;
}

// removes all items that are listet more than once
function removeDuplicates(_array) {
	var _uniques = [];
	var _dupl = [];
	for (var i = 0; i <= _array.length; i++) {
		var v = _array[i]
		console.log(i +'-' + v);
		if (_array.lastIndexOf(v) > i || _dupl.indexOf(v) > -1) {
			_dupl.push(v);
		} else {
			_uniques[_uniques.length] = v;
		}
	}

	return  $.grep(_uniques, function(n,i) {
		return(n);
	});;
}

function setCASize(_scrollTo) {
	
	/*addFunction( function(_scrollTo) {
		FB.Canvas.setSize({
			height:$(document.body).height()
		});
		if(_scrollTo !== undefined) {
			fireScroll(_scrollTo);
		}
	}, _scrollTo, true, true);
	*/
}
