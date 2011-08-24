new tool('Page');
new tool('Page');
tools['Page'].runtime = {};
tools['Page'].init = function() {
	addFunction(tools['Page'].get_cached_ajax, null, true, true);
	addFunction(tools['Page'].ajaxLinkSend, null, true, true);
	addFunction(tools['Page'].ajaxFormSend, null, true, true);
	addFunction(tools['Page'].ajaxSkip, null, true, true);
	// Do stuff after page loaded
	customEvent('PageURL', function() {
		var _page = $('#PageURL').val();
		tools['General'].get();
		tools['Page'].runtime['allPages']();
		if(tools['Page'].runtime[_page]) {
			tools['Page'].runtime[_page]();
		}
	});
	// scroll to
	customEvent('Scroll', function() {
		var _value = $('#Scroll').val();
		com.send(com.task.scroll, com.port.facebook, {
			to : _value
		});
	});
};
tools['Page'].loadPage = function(_page) {
	console.log('Loadpage:' + _page);
	addFunction(function(_data) {
		ajaxLinkSend('globalContainer', _data);
	}, JSON.stringify(_page), true, true);
};
tools['Page'].ajaxSkip = function() {
	ajaxSkip = function(div, url) {
		ajaxLinkSend(div, (url + (url.indexOf('?') > -1 ? '&' : '?') + 'ajax=1&skip=1'));
	}
};
tools['Page'].get_cached_ajax = function() {
	get_cached_ajax = function(url, get_type) {
		// just_body_cache
		var url_key = url;
		if(url.indexOf('?') != -1) {
			url_key = url.substring(0, url.indexOf('?'));
		}
		setPageURL(url_key);
		if(get_type == 'cache_body' && pageCache[url_key]) {
			if(pageCache[url_key].lastIndexOf('<fb:') == -1) {
				$('#app_body_container').html(pageCache[url_key]);
			} else {
				$('#app_body_container').html(data);
				FB.XFBML.parse(document.getElementById('app_body_container'));
				console.log('parse');
				FB.XFBML.parse();
			}
			firePageURL();
			$('body').animate({
				scrollTop : 0
			}, 'slow');
		} else {
			if(get_type == 'get_page') {
				stopTimers = true;
				pageCache[url_key] = null;
			} else if(get_type == 'destroy_all_get_page') {
				stopTimers = true;
				pageCache = {};
			}
			var params = 'ajax=1';
			params += '&signed_request=' + $('#signed_request').attr('value');
			if((get_type == 'cache_body') || (get_type == 'get_body')) {
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
					/*
					 * if (cageCAGE.cache.UseImageServer &&
					 * cageCAGE.cache.ImageServer.length > 0) { data =
					 * data .replace(
					 * /(http:\/\/image4\.castleagegame\.com\/graphics.*?)(?=\/\w*?\.\w{3})/g,
					 * cageCAGE.cache.ImageServer); }
					 */
					stopTimers = false;
					ajaxPerforming = false;
					$('#AjaxLoadIcon').hide();
					if((get_type == 'cache_body') || (get_type == 'get_body')) {
						$('#app_body_container').html(data);
					} else {
						$('#globalContainer').html(data);
					}
					FB.XFBML.parse(document.getElementById('globalContainer'));
					firePageURL();
					$('body').animate({
						scrollTop : 0
					}, 'slow');
					centerPopups();
				}
			});
		}
	};
};
tools['Page'].done = function(_url, _div) {
	console.log('page done');
};
tools['Page'].ajaxLinkSend = function() {
	ajaxLinkSend = function(div, url) {
		$('body').animate({
			scrollTop : 0
		}, 'slow');
		console.log(div);
		friend_browse_offset = 0;
		reset_raid_lst();
		pageCache = {};
		ajaxPerforming = true;
		showLoaderIfAjax();
		var params = 'ajax=1';
		params += '&signed_request=' + $('#signed_request').attr('value');
		if(!url) {
			url = 'index.php?adkx=2';
		}
		var url_key = url;
		if(url.indexOf('?') != -1) {
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
					// check login status
					cookie : true,
					// enable cookies to allow the server to access the
					// session
					xfbml : true
					// parse XFBML
				});
				ajaxPerforming = false;
				$('#AjaxLoadIcon').hide();
				if(data.lastIndexOf('<fb:') == -1) {
					console.log('no xfbml');
					$('#' + div).html(data);
				} else {
					//document.getElementById(div).innerHTML = data;
					console.log('parse xfbml');
					$('#' + div).html(data);
					//FB.XFBML.parse(document.getElementById(div));
					FB.XFBML.parse();
				}
				firePageURL();
				centerPopups();
			}
		});
		scrollToElement('#main_anchor');

		//FB.Canvas.setAutoResize();
	};
};
tools['Page'].ajaxFormSend = function(div, url, formElement, anchor) {
	ajaxFormSend = function(div, url, formElement, anchor) {
		friend_browse_offset = 0;
		if(!anchor) {
			anchor = 'main_anchor';
		}
		stopTimers = true;
		params = $(formElement).serialize();
		params += '&ajax=1';
		params += '&signed_request=' + $('#signed_request').attr('value');
		pageCache = {};
		if(!url) {
			url = 'index.php?adkx=7';
		}
		var url_key = url;
		if(url.indexOf('?') != -1) {
			url_key = url.substring(0, url.indexOf('?'));
		}
		setPageURL(url_key);
		ajaxPerforming = true;
		showLoaderIfAjax();
		$.ajax({
			url : url,
			context : document.body,
			data : params,
			type : 'POST',
			success : function(data) {
				/*
				 * if (cageCAGE.cache.UseImageServer &&
				 * cageCAGE.cache.ImageServer.length > 0) { data = data
				 * .replace(
				 * /(http:\/\/image4\.castleagegame\.com\/graphics.*?)(?=\/\w*?\.\w{3})/g,
				 * cageCAGE.cache.ImageServer); }
				 */
				stopTimers = false;
				ajaxPerforming = false;
				$('#AjaxLoadIcon').hide();
				$('#' + div).html(data);
				FB.XFBML.parse(document.getElementById(div));
				firePageURL();
				$('body').animate({
					scrollTop : 0
				}, 'slow');
				centerPopups();
			}
		});
		scrollToElement('#' + anchor);
	};
};
