new tool('Page');

tools['Page'].cache = {};

tools['Page'].addEvent = function(_event, _function) {

	com.addFunction(function() {
		var _arg = arguments[0].event;
		window[('fire' + _arg)] = function(_data) {
			if (_data) {
				$('#' + _arg).html(_data);
			}
			var customEvent = document.createEvent('Event');
			customEvent.initEvent(_arg, true, true);
			document.getElementById(_arg).dispatchEvent(customEvent);
		};

		window[('set' + _arg)] = function(_data) {
			$('#' + _arg).html(_data);
		};

	}, JSON.stringify({
		event : _event
	}), true, true);

	$(document.body).append(
			$('<div id="' + _event + '"></div>').bind(_event, _function));

};

tools['Page'].init[com.port.castleAge] = function() {

	com.addFunction(tools['Page'].get_cached_ajax, null, true, true);
	com.addFunction(tools['Page'].ajaxLinkSend, null, true, true);
	com.addFunction(tools['Page'].ajaxFormSend, null, true, true);

	tools['Page'].addEvent('PageURL', function() {
		var _value = $('#PageURL').text();
		tools['General'].update();
		tools['Page'].cache['allPages']();
		if (tools['Page'].cache[_value]) {
			tools['Page'].cache[_value]();
		}
	});

	tools['Page'].addEvent('Scroll', function() {
		console.log(arguments[0]);
		var _value = $('#Scroll').text();
		com.send(com.task.scroll, com.port.facebook, {
			to : _value,
		});
	});

};

tools['Page'].get_cached_ajax = function() {

	get_cached_ajax = function(url, div) {
		// just_body_cache
		console.log('cage get_cached_ajax');
		var url_key = url;
		if (url.indexOf('?') != -1) {
			url_key = url.substring(0, url.indexOf('?'));
		}
		setPageURL(url_key);

		if (get_type == 'cache_body' && pageCache[url_key]) {
			if (pageCache[url_key].lastIndexOf('<fb:') == -1) {
				$('#app_body_container').html(pageCache[url_key]);
				firePageURL();
			} else {
				document.getElementById('app_body_container').innerHTML = data;
				FB.XFBML.parse(document.getElementById('app_body_container'));
				firePageURL();
			}
		} else {

			if (get_type == 'get_page') {
				stopTimers = true;
				pageCache[url_key] = null;
			} else if (get_type == 'destroy_all_get_page') {
				stopTimers = true;
				pageCache = {};
			}
			var params = 'ajax=1';
			params += '&signed_request=' + $('#signed_request').attr('value');

			if ((get_type == 'cache_body') || (get_type == 'get_body')) {
				params += '&get_type=body';
			}

			ajaxPerforming = true;
			showLoaderIfAjax();

			$
					.ajax({
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
							if ((get_type == 'cache_body')
									|| (get_type == 'get_body')) {

								if (data.lastIndexOf('<fb:') == -1) {
									$('#app_body_container').html(data);
									firePageURL();
								} else {
									document
											.getElementById('app_body_container').innerHTML = data;
									FB.XFBML
											.parse(document
													.getElementById('app_body_container'));
									firePageURL();
								}
								fireScroll(0);

							} else {

								if (data.lastIndexOf('<fb:') == -1) {
									$('#globalContainer').html(data);
									firePageURL();
								} else {
									document.getElementById('globalContainer').innerHTML = data;
									FB.XFBML.parse(document
											.getElementById('globalContainer'));
									firePageURL();
								}
								fireScroll(0);
							}
							centerPopups();
						}
					});
		}
		fireScroll(0);
	};
};

tools['Page'].done = function(_url, _div) {

	console.log('page done');
	$('body, html').animate({
		scrollTop : 0
	}, 'slow');

};

tools['Page'].ajaxLinkSend = function() {

	ajaxLinkSend = function(div, url) {
		console.log('cage ajaxLinkSend');
		friend_browse_offset = 0;
		reset_raid_lst();

		pageCache = {};
		ajaxPerforming = true;

		showLoaderIfAjax();

		var params = 'ajax=1';
		params += '&signed_request=' + $('#signed_request').attr('value');

		if (!url) {
			url = 'index.php?adkx=2';
		}
		var url_key = url;
		if (url.indexOf('?') != -1) {
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

				if (data.lastIndexOf('<fb:') == -1) {
					$('#' + div).html(data);
					firePageURL();
				} else {
					document.getElementById(div).innerHTML = data;
					FB.XFBML.parse(document.getElementById(div));
					firePageURL();
				}
				fireScroll(0);
				centerPopups();
			}
		});

		scrollToElement('#main_anchor');

		FB.init({
			appId : '46755028429',
			status : true, // check login status
			cookie : true, // enable cookies to allow the server to access the
			// session
			xfbml : true
		// parse XFBML
		});
		FB.Canvas.setAutoResize();
	};

};

tools['Page'].ajaxFormSend = function(div, url, formElement, anchor) {

	ajaxFormSend = function(div, url, formElement, anchor) {
		console.log('cage ajaxFormSend');
		friend_browse_offset = 0;

		if (!anchor) {
			anchor = 'main_anchor';
		}

		stopTimers = true;

		params = $(formElement).serialize();
		params += '&ajax=1';
		params += '&signed_request=' + $('#signed_request').attr('value');

		pageCache = {};
		if (!url) {
			url = 'index.php?adkx=7';
		}
		var url_key = url;
		if (url.indexOf('?') != -1) {
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
				if (data.lastIndexOf('<fb:') == -1) {
					$('#' + div).html(data);
					firePageURL();
				} else {
					document.getElementById(div).innerHTML = data;
					FB.XFBML.parse(document.getElementById(div));
					firePageURL();
				}
				fireScroll(0);
				centerPopups();
			}
		});

		scrollToElement('#' + anchor);
	};

};
