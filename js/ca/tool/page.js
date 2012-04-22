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
		tools.Page.runtime.allPages();
		if(tools.Page.runtime[_page]) {
			var start = new Date();
			tools.Page.runtime[_page]();
			console.log('Time to mod', _page, ':', (new Date() - start));
		}
		tools.General.get();
	});
};
tools.Page.settings = function() {
	console.log(tools.Page.runtime);
};
tools.Page.loadPage = function(_page) {
	console.log('Loadpage:' + _page);
	addFunction(function(_data) {
		ajaxLinkSend('globalContainer', _data);
		return false;
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
	ajaxPageDone = function(data, div, anchor) {
		var start1 = new Date();
		stopTimers = false;
		ajaxPerforming = false;
		if(/<script type="text\/javascript">\stop.location.href = "http:\/\/apps.facebook.com\/castle_age\/.*.php";\s<\/script>/.test(data.substr(data.length < 200 ? 0 : data.length - 300)) === false) {
			$data = $(data);
			data = null;
			console.log('ajaxPageDone:', div);
			if(div === 'globalContainer') {
				var _abc = $('#app_body_container'), start1 = new Date(), _sts = $data.find('#main_sts');
				_sts.html(_sts.html().replace(/more/g, ''));
				$('#main_sts')[0].innerHTML = _sts[0].innerHTML;
				$('#main_bntp')[0].innerHTML = $data.find('#main_bntp')[0].innerHTML;
				var start2 = new Date();
				$('#app_body_container').hide().empty().append($data.find('#app_body_container').html()).append($data.filter('div[id]:not(.game)')).show();
				// update stats
				var _stats = $('#main_sts'), _stam = $('#stamina_current_value'), _ener = $('#energy_current_value'), _heal = $('#health_current_value');
				$('#gold_current_value').text('$' + _stats.find('#gold_current_value_amount').val().replace(/(\d)(?=(\d{3})+\b)/g, '$1,'));
				_stam.text(_stats.find('#stamina_current_value_amount').val());
				_stam.next('span').text($('#stamina_current_max').val());
				_ener.text(_stats.find('#energy_current_value_amount').val());
				_ener.next('span').text($('#energy_current_max').val());
				_heal.text(_stats.find('#health_current_value_amount').val());
				_heal.next('span').text($('#health_current_max').val());
				_abc.append($data.filter('script'));
				firePageURL();
				centerPopups();
				startAllTimers();
				script = $data = null;
			} else {
				$('#' + div).html($data.html());
			}
			centerPopups();
			if(anchor) {
				$('#' + anchor).animate({
					scrollTop : 0
				}, 'slow');
			}
			startAllTimers();
			setTimeout(function() {
				FB.XFBML.parse(document.getElementById(div));
			}, 1);
			_stats = _stam = _ener = heal = null;
			$('#AjaxLoadIcon').fadeOut();
		} else {
			$('#AjaxLoadIcon').append('<div id="cageLoadError">ERROR LOADING DATA</div>').delay(2000).fadeOut(function() {
				$('#cageLoadError').remove();
			});
		}
		data = div = anchor = null;
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
		$('#AjaxLoadIcon').fadeIn();
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
			data : params,
			type : 'POST',
			success : function(data, textStatus, jqXHR) {
				FB.init({
					appId : '46755028429',
					status : true,
					cookie : true,
					xfbml : true
				});
				ajaxPageDone(jqXHR.responseText, div);
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
		var params = $(formElement).serialize();
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
		$('#AjaxLoadIcon').fadeIn();
		$.ajax({
			url : url,
			data : params,
			type : 'POST',
			success : function(data, textStatus, jqXHR) {
				ajaxPageDone(jqXHR.responseText, div, anchor);
			}
		});
	};
};
