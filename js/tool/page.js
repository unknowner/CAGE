new tool('Page');

tools['Page'].cache = {};

tools['Page'].init[com.port.castleAge] = function() {

	com.addFunction(tools['Page'].get_cached_ajax, null, true, true);
	com.addFunction(tools['Page'].ajaxLinkSend, null, true, true);
	com.addFunction(tools['Page'].ajaxFormSend, null, true, true);

	com.addFunction(function pageUrlEvent() {
		var customEvent = document.createEvent('Event');
		customEvent.initEvent('cagePageURL', true, true);
		document.getElementById('cagePageURL').dispatchEvent(customEvent);
	});

	$(document.body).append(
			$('<div id="cagePageURL"></div>').bind('cagePageURL', function() {
				tools['Page'].cache['allPages']();
				if(tools['Page'].cache[$('#cagePageURL').html()]){
					tools['Page'].cache[$('#cagePageURL').html()]();
				}
			}));

};

tools['Page'].get_cached_ajax = function() {

	get_cached_ajax = function(url, div) {
		// just_body_cache
		console.log('cage get_cached_ajax');
		var url_key = url;
		if (url.indexOf('?') != -1) {
			url_key = url.substring(0, url.indexOf('?'));
		}
		$('#cagePageURL').html(url_key);

		if (get_type == 'cache_body' && pageCache[url_key]) {
			if (pageCache[url_key].lastIndexOf('<fb:') == -1) {
				$('#app_body_container').html(pageCache[url_key]);
				pageUrlEvent();
			} else {
				document.getElementById('app_body_container').innerHTML = data;
				FB.XFBML.parse(document.getElementById('app_body_container'));
				pageUrlEvent();
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

			$.ajax({
				url : url,
				context : document.body,
				data : params,
				type : 'POST',
				success : function(data) {
					/*
					 * if (cageCAGE.cache.UseImageServer &&
					 * cageCAGE.cache.ImageServer.length > 0) { data = data .replace(
					 * /(http:\/\/image4\.castleagegame\.com\/graphics.*?)(?=\/\w*?\.\w{3})/g,
					 * cageCAGE.cache.ImageServer); }
					 */
					stopTimers = false;
					ajaxPerforming = false;
					$('#AjaxLoadIcon').hide();
					if ((get_type == 'cache_body') || (get_type == 'get_body')) {

						if (data.lastIndexOf('<fb:') == -1) {
							$('#app_body_container').html(data);
							pageUrlEvent();
						} else {
							document.getElementById('app_body_container').innerHTML = data;
							FB.XFBML.parse(document.getElementById('app_body_container'));
							pageUrlEvent();
						}
						cage.loadDone(url);

					} else {

						if (data.lastIndexOf('<fb:') == -1) {
							$('#globalContainer').html(data);
							pageUrlEvent();
						} else {
							document.getElementById('globalContainer').innerHTML = data;
							FB.XFBML.parse(document.getElementById('globalContainer'));
							pageUrlEvent();
						}
						;
						// tools['Page'].done(_url);
					}
					centerPopups();
				}
			});
		}
		scrollToElement('#main_anchor');
	};
};

tools['Page'].done = function(_url, _div) {

	console.log('page done');
	/*
	 * cage_pages['allPages'].script(); cage_pages['allPages'].data(); _url =
	 * _url.indexOf('?') == -1 ? _url : _url.substring(0, _url.indexOf('?'));
	 * cagePage.reassign(); cageStats.reassign(); cageStats.work(); if
	 * (cage_pages[_url]) { if (cage_pages[_url].data) { cage_pages[_url].data(); }
	 * if (cage_pages[_url].script) { cage_pages[_url].script(); } } if (_div &&
	 * _div === 'globalContainer') {
	 * $jQ('#CAGEStats_gold').text($jQ('#gold_current_value').text());
	 * $jQ('#CAGEStats_energy > span.current').text(
	 * $jQ('#energy_current_value').text()); $jQ('#CAGEStats_health >
	 * span.current').text( $jQ('#health_current_value').text());
	 * $jQ('#CAGEStats_stamina > span.current').text(
	 * $jQ('#stamina_current_value').text()); $jQ('#CAGEStats_energy >
	 * span.max').text( $jQ('#energy_current_value').next().text());
	 * $jQ('#CAGEStats_health > span.max').text(
	 * $jQ('#health_current_value').next().text()); $jQ('#CAGEStats_stamina >
	 * span.max').text( $jQ('#stamina_current_value').next().text()); }
	 * cageGenerals.changeToCurrent();
	 */
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
		$('#cagePageURL').html(url_key);

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
					pageUrlEvent();
				} else {
					document.getElementById(div).innerHTML = data;
					FB.XFBML.parse(document.getElementById(div));
					pageUrlEvent();
				}
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
		$('#cagePageURL').html(url_key);

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
				 * cageCAGE.cache.ImageServer.length > 0) { data = data .replace(
				 * /(http:\/\/image4\.castleagegame\.com\/graphics.*?)(?=\/\w*?\.\w{3})/g,
				 * cageCAGE.cache.ImageServer); }
				 */
				stopTimers = false;
				ajaxPerforming = false;
				$('#AjaxLoadIcon').hide();
				if (data.lastIndexOf('<fb:') == -1) {
					$('#' + div).html(data);
					pageUrlEvent();
				} else {
					document.getElementById(div).innerHTML = data;
					FB.XFBML.parse(document.getElementById(div));
					pageUrlEvent();
				}
				// tools['Page'].done(url, div);
				centerPopups();
			}
		});

		scrollToElement('#' + anchor);
	};

};
