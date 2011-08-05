new tool('Page');
new tool('Page');
tools['Page'].runtime = {};
tools['Page'].init = function() {
	addFunction(tools['Page'].get_cached_ajax, null, true, true);
	addFunction(tools['Page'].ajaxLinkSend, null, true, true);
	addFunction(tools['Page'].ajaxFormSend, null, true, true);
	//addFunction(tools['Page'].swapElementClass, null, true, true);
	// Do stuff after page loaded
	customEvent('PageURL', function() {
		var _page = $('#PageURL').val();
		console.log()
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
			to : _value,
		});
	});
};
tools['Page'].loadPage = function(_page) {
	console.log('Loadpage:' + _page );
	addFunction( function(_data) {
		//get_cached_ajax(_data._page + '?signed_request=' + $('#signed_request').val(), _data._type ? _data._type : 'cache_body');
		ajaxLinkSend('globalContainer', _data);
	}, JSON.stringify(_page), true, true);
};
/*
 tools['Page'].swapElementClass = function() {
 swapElementClass = function(elem_id, classname) {
 $('#' + elem_id).removeAttr('class').addClass(classname);
 ////fireSetSize();
 }
 };*/
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
				document.getElementById('app_body_container').innerHTML = data;
				FB.XFBML.parse(document.getElementById('app_body_container'));
			}
			firePageURL();
			$('body').animate({
				scrollTop : 0
			}, 'slow');//fireScroll(0);
			//fireSetSize();
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
						if(data.lastIndexOf('<fb:') == -1) {
							$('#app_body_container').html(data);

						} else {
							document.getElementById('app_body_container').innerHTML = data;
							FB.XFBML.parse(document.getElementById('app_body_container'));
						}
					} else {
						if(data.lastIndexOf('<fb:') == -1) {
							$('#globalContainer').html(data);
						} else {
							document.getElementById('globalContainer').innerHTML = data;
							FB.XFBML.parse(document.getElementById('globalContainer'));
						}
					}
					firePageURL();
					$('body').animate({
						scrollTop : 0
					}, 'slow');//fireScroll(0);
					//fireSetSize();
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
				ajaxPerforming = false;
				$('#AjaxLoadIcon').hide();
				if(data.lastIndexOf('<fb:') == -1) {
					$('#' + div).html(data);
				} else {
					document.getElementById(div).innerHTML = data;
					FB.XFBML.parse(document.getElementById(div));
				}
				firePageURL();
				$('body').animate({
					scrollTop : 0
				}, 'slow');//fireScroll(0);
				//fireSetSize();
				centerPopups();
			}
		});
		scrollToElement('#main_anchor');
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
				if(data.lastIndexOf('<fb:') == -1) {
					$('#' + div).html(data);
				} else {
					document.getElementById(div).innerHTML = data;
					FB.XFBML.parse(document.getElementById(div));
				}
				firePageURL();
				$('body').animate({
					scrollTop : 0
				}, 'slow');//fireScroll(0);
				//fireSetSize();
				centerPopups();
			}
		});
		scrollToElement('#' + anchor);
	};
};