tool('Page');
tools.Page.runtime = {};
tools.Page.init = function() {
	addFunction(tools.Page.get_cached_ajax, null, true, true);
	addFunction(tools.Page.ajaxLinkSend, null, true, true);
	addFunction(tools.Page.ajaxFormSend, null, true, true);
	addFunction(tools.Page.ajaxSkip, null, true, true);
	addFunction(tools.Page.ajaxPageDone, null, true, true);
	// Do stuff after page loaded
	customEvent('PageURL', function(_evt) {
		var _page = $('#PageURL').val();
		if(tools.Page.runtime[_page]) {
			tools.Page.runtime[_page]();
		}
		tools.Page.runtime.allPages();
		tools.General.get();
	});
};

tools.Page.loadPage = function(_page) {
	console.log('Loadpage:' + _page);
	addFunction(function(_data) {
		ajaxLinkSend('globalContainer', _data);
	}, JSON.stringify(_page), true, true);
};

tools.Page.ajaxSkip = function() {
	ajaxSkip = function(div, url) {
		ajaxLinkSend(div, (url + (url.indexOf('?') > -1 ? '&' : '?') + 'ajax=1&skip=1'));
	};
};
tools.Page.get_cached_ajax = function() {
	get_cached_ajax = function(url, get_type) {
		$('body').animate({
			scrollTop : 0
		}, 'slow');
		// just_body_cache
		var url_key = url, _oldurl = $('#PageURL').val();
		if(url.indexOf('?') !== -1) {
			url_key = url.substring(0, url.indexOf('?'));
		}
		console.log(url_key + '-' + _oldurl);
		setPageURL(url_key);
		if(get_type === 'cache_body' && pageCache[url_key]) {
			if(pageCache[url_key].lastIndexOf('<fb:') === -1) {
				$('#app_body_container').html(pageCache[url_key]);
			} else {
				$('#app_body_container').html(data);
				FB.XFBML.parse(document.getElementById('app_body_container'));
				console.log('parse');
				FB.XFBML.parse();
			}
			firePageURL();
			if(url_key !== _oldurl) {
				$('body').animate({
					scrollTop : 0
				}, 'slow');
			}
		} else {
			if(get_type === 'get_page') {
				stopTimers = true;
				pageCache[url_key] = null;
			} else if(get_type === 'destroy_all_get_page') {
				stopTimers = true;
				pageCache = {};
			}
			var params = 'ajax=1&signed_request=' + $('#signed_request').attr('value');
			if((get_type === 'cache_body') || (get_type === 'get_body')) {
				params += '&get_type=body';
			}
			ajaxPerforming = true;
			showLoaderIfAjax();
			$.ajax({
				url : url,
				context : document.body,
				data : params,
				type : 'POST',
				success : function(data) {
					stopTimers = false;
					ajaxPerforming = false;
					$('#AjaxLoadIcon').hide();
					if((get_type === 'cache_body') || (get_type === 'get_body')) {
						$('#app_body_container').html(data);
					} else {
						$('#globalContainer').html(data);
					}
					startAllTimers();
					FB.XFBML.parse(document.getElementById('globalContainer'));
					firePageURL();
					centerPopups();
				}
			});
		}
	};
};
tools.Page.ajaxPageDone = function() {
	ajaxPageDone = function(div, data, anchor) {
		stopTimers = false;
		ajaxPerforming = false;
		$('#main_bntp, #nvbar_div_end, #hinvite_help', data).remove();
		$('#nvbar_table', data).empty();
		$('#main_bntp, #nvbar, #nvbar_div_end, #hinvite_help', data).remove();
		if(div === 'globalContainer') {
			$('#main_sts').html($('#main_sts', data).html());
			$('#app_body_container').html($('#app_body_container', data).html());
		} else {
			$('#' + div).html(data);
		}
		firePageURL();
		centerPopups();
		$('#AjaxLoadIcon').hide('fast');
		if(anchor) {
			$('#' + anchor).animate({
				scrollTop : 0
			}, 'slow');
		}
		startAllTimers();
		FB.XFBML.parse(document.getElementById(div));
		data = null;
	};
};
tools.Page.ajaxLinkSend = function() {
	ajaxLinkSend = function(div, url) {
		$('body').animate({
			scrollTop : 0
		}, 'slow');
		console.log('ajaxLinkSend div:', div, ' - url:', url);
		friend_browse_offset = 0;
		reset_raid_lst();
		pageCache = {};
		ajaxPerforming = true;
		showLoaderIfAjax();
		if(!url) {
			url = 'index.php?adkx=2';
		}
		var params = 'ajax=1&signed_request=' + $('#signed_request').attr('value'), url_key = url, _oldurl = $('#PageURL').val();
		if(url.indexOf('?') !== -1) {
			url_key = url.substring(0, url.indexOf('?'));
		}
		setPageURL(url_key);
		$.ajax({
			url : url,
			context : document.body,
			data : params,
			type : 'POST',
			success : function(data) {
				FB.init({
					appId : '46755028429',
					status : true,
					cookie : true,
					xfbml : true
				});
				ajaxPageDone(div, data);
				data = undefined;
			}
		});
	};
};
tools.Page.ajaxFormSend = function() {
	ajaxFormSend = function(div, url, formElement, anchor) {
		friend_browse_offset = 0;
		if(!anchor) {
			$('body').animate({
				scrollTop : 0
			}, 'slow');
		}
		stopTimers = true;
		params = $(formElement).serialize();
		params += '&ajax=1';
		params += '&signed_request=' + $('#signed_request').attr('value');
		pageCache = {};
		if(!url) {
			url = 'index.php?adkx=7';
		}
		var url_key = url, _oldurl = $('#PageURL').val();
		if(url.indexOf('?') !== -1) {
			url_key = url.substring(0, url.indexOf('?'));
		}
		console.log(url_key + '-' + _oldurl);
		setPageURL(url_key);
		ajaxPerforming = true;
		showLoaderIfAjax();
		$.ajax({
			url : url,
			context : document.body,
			data : params,
			type : 'POST',
			success : function(data) {
				ajaxPageDone(div, data, anchor);
				data = undefined;
			}
		});
		scrollToElement('#' + anchor);
	};
};
