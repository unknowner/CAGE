// Add function to content site
function addFunction(_func, _arg, _run, _once) {
	var script = document.createElement('script');
	script.textContent = ( _run ? '(' : '') + _func + ( _run ? ')(' + _arg + ');' : ';');
	document.body.appendChild(script);
	if(_once) {
		document.body.removeChild(script);
	}
}

// http://www.foliotek.com/devblog/jquery-custom-selector-for-selecting-elements-by-exact-text-textequals/
$.expr[':'].textEquals = function(a, m) {
	return $(a).text().match("^" + m[3] + "$");
};
// http://wowmotty.blogspot.com/2010/05/jquery-selectors-adding-contains-exact.html
$.extend($.expr[':'], {
	containsExact : function(a, i, m) {
		return $.trim(a.innerHTML.toLowerCase()) === m[3].toLowerCase();
	},
	containsExactCase : function(a, i, m) {
		return $.trim(a.innerHTML) === m[3];
	},
	containsRegex : function(a, i, m) {
		var regreg = /^\/((?:\\\/|[^\/])+)\/([mig]{0,3})$/, reg = regreg.exec(m[3]);
		return RegExp(reg[1], reg[2]).test($.trim(a.innerHTML));
	}
});
// Return Array with unique values
function unique(_array, _tostring) {
	var o = {}, i, l = _array.length, r = [];
	for( i = 0; i < l; i += 1) {
		o[_array[i]] = _array[i];
	}
	if(_tostring) {
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

// removes all items that are listed more than once
function removeDuplicates(_array) {
	var _uniques = [], _dupl = [], _i = 0;
	for(i; i <= _array.length; i++) {
		var v = _array[i];
		console.log(i + '-' + v);
		if(_array.lastIndexOf(v) > i || _dupl.indexOf(v) > -1) {
			_dupl.push(v);
		} else {
			_uniques[_uniques.length] = v;
		}
	}

	return $.grep(_uniques, function(n, i) {
		return (n);
	});
}

//shortcut to jQuery get with signed request
function get(_url, _callback) {
	$.get(_url + (_url.indexOf('?') > -1 ? '&' : '?') + 'signed_request=' + CastleAge.signed_request, _callback);
}

//shortcut to jQuery post with signed request
function post(_url, _callback) {
	$.post(_url + (_url.indexOf('?') > -1 ? '&' : '?') + 'signed_request=' + CastleAge.signed_request, _callback);
}

//http://note19.com/2007/05/27/javascript-guid-generator/
function S4() {
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function guid() {
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}