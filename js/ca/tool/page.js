tool('Page');
tools.Page.runtime = {};
tools.Page.runtime.addOn = {};
tools.Page.pages = {};
tools.Page.init = function() {
	addFunction(tools.Page.get_cached_ajax, null, true, true);
	addFunction(tools.Page.ajaxLinkSend, null, true, true);
	addFunction(tools.Page.ajaxFormSend, null, true, true);
	addFunction(tools.Page.ajaxSkip, null, true, true);
	addFunction(tools.Page.ajaxPageDone, null, true, true);
	// some utilites
	addFunction(function() {
		noSrc = function(_t) {
			var _re = new RegExp('src=', 'gi');
			_t = _t.replace(_re, 'nosrc=');
			return _t;
		};
		noNoSrc = function(_jqo) {
			_jqo.find('input[nosrc], img[nosrc]').each(function() {
				var $t = $(this);
				$t.attr('src', $t.attr('nosrc')).removeAttr('nosrc');
			});
			return _jqo;
		};
	}, null, true, true);

	// Do stuff after page loaded
	customEvent('PageURL', function(_evt) {
		var _page = $('#PageURL').val();
		tools.Page.allPages();
		if (tools.Page.pages[_page]) {
			var start = new Date();
			tools.Page.pages[_page]();
			console.log('Time to mod', _page, ':', (new Date() - start));
		}
		tools.General.get();
	});
};
tools.Page.settings = function() {
	console.log(tools.Page.runtime);
};
// All Pages
tools.Page.allPages = function() {

	// Execute add ons from tools
	$.each(tools.Page.runtime.addOn, function(_i, _e) {
		_e();
	});
	// delayed stuff
	setTimeout(function() {
		// chat pos
		$('#collapsedGuildChat').css('left', '');
		$('#expandedGuildChat').css('left', '');
	}, 250);
	// repos CA menu & add stuff
	tools.Functions.addToCANav('mainMenu_home', 'Main', 'specialmembership.php', 'Crusaders');
	tools.Functions.addToCANav('mainMenu_monster', 'Public List', 'army_news_feed.php', 'Live feed');
	tools.Functions.addToCANav('mainMenu_battle', 'War Rank', 'raid.php', 'Raid');
	tools.Functions.addCAGEToCANav('mainMenu_home', 'Crusaders', function() {
		$('#app_body').html('<iframe id="cageBlogiFrame" src="http://cagenhancer.blogspot.com/?CAGE=FB">');
		$('#cageBlogiFrame').height($('body').height() - 100);
	}, 'CAGE - Blog');
	$('div.mainMenu').unwrap().unwrap().parent().addClass('cageCAMenu').find('ul > li > ul').each(function() {
		$(this).attr('cage', $(this).height()).css('height', 0);
	});
	// If found update bqh
	if ($('form').find('input[name="bqh"]:first').length > 0) {
		CastleAge.bqh = $('form input[name="bqh"]:first').val();
	}

	// Favour points
	$('#cageFavorPoints').text($('#main_bn div[style*="persistent_bar_oracle.gif"]').text().trim());

	// Stats
	$('#main_sts').css('background', $('#main_bn').css('backgroundImage'));
	window.setTimeout(function() {
		$('#main_sts_container').css('background', $('#main_sts').css('backgroundImage'));
	}, 1000);

	// remove CA:HOD ad, etc...
	$('div > a > img.imgButton[src*="/graphics/iphone_cross_promo.jpg"]').parent().parent().remove();
	$('a[href*="apps.facebook.com/castle_hod/?xprom=cax"]').parents('div:first').remove();
	if ($('#globalContainer > div:first').height() == 80) {
		$('#globalContainer > div:first').hide();
	}

	// xp to next lvl and lvl bar fix
	var _xpwidth = /\d+/.exec($('#st_5 > div:first > div > div')[0].style.width)[0];
	if (_xpwidth !== null) {
		$('#st_5').find('div:first > div > div').css('width', parseInt(_xpwidth, 10) / 126 * 100 + '%');
	}
	if ($('#st_2_5').find('strong:contains("to")').length == 0 && /\d+\/(\d+)/.exec($('#st_2_5 strong').text()) !== null) {
		$('#st_2_5').find('strong').text(/\d+/.exec($('#st_5').attr('title'))[0] + ' to ' + /\d+\/(\d+)/.exec($('#st_2_5').find('strong').text())[1]);
	}
	_xpwidth = null;
	// reworkin results
	if ($('div.results').length > 0) {
		$('div.results').attr('style', '');
		$('#results_main_wrapper').addClass('resultsmainwrapper').prepend('<img id="cageCloseResult" src="http://image4.castleagegame.com/graphics/popup_close_button.png">').children('br').remove();
		$('#cageCloseResult').click(function() {
			$(this).unbind('click').css({
				'width' : 18,
				'top' : 2,
				'right' : 3
			}).attr('src', 'http://image4.castleagegame.com/graphics/shield_wait.gif');
			$('#results_main_wrapper').slideUp('slow', function() {
				$(this).remove();
			});
		});
		// remove some stuff
		$('#hinvite_help, #nvbar_table').empty();
		// fix some results eg out of stamina general image
		$('span.result_body:contains("Allocate skill points to Max")').find('img:first').css('width', 160);
		// closing results
		$('div.results:has(img[src$="help_close_x.gif"])').each(function(_index, _element) {
			var $_element = $(_element);
			var $_img = $('img[src$="help_close_x.gif"]', _element);
			var _close = /(?:, ')(.+?close_result=.+?)(')/.exec($_img.parent('a').attr('onclick'))[1];
			$_img.remove();
			$('#cageCloseResult').click(function() {
				$(this).unbind('click').css({
					'width' : 18,
					'top' : 2,
					'right' : 3
				}).attr('src', 'http://image4.castleagegame.com/graphics/shield_wait.gif');
				post(_close, function() {
					$_element.slideUp('slow', function() {
						$_element.remove();
						$('#results_main_wrapper').hide();
					});
				});
			}).css('cursor', 'pointer');
		});
	}

	// fix loader
	$('#AjaxLoadIcon').removeClass('shield_wait');
	// Random popups (quests etc.)
	$('div.result_popup_message').css('left', '');
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
		if (url.indexOf('?') !== -1) {
			url_key = url.substring(0, url.indexOf('?'));
		}
		console.log(url_key + '-' + _oldurl);
		setPageURL(url_key);
		if (get_type === 'cache_body' && pageCache[url_key]) {
			if (pageCache[url_key].lastIndexOf('<fb:') === -1) {
				$('#app_body_container').html(pageCache[url_key]);
			} else {
				$('#app_body_container').html(data);
				FB.XFBML.parse(document.getElementById('app_body_container'));
				console.log('parse');
				FB.XFBML.parse();
			}
			firePageURL();
			if (url_key !== _oldurl) {
				$('body').animate({
					scrollTop : 0
				}, 'slow');
			}
		} else {
			if (get_type === 'get_page') {
				stopTimers = true;
				pageCache[url_key] = null;
			} else if (get_type === 'destroy_all_get_page') {
				stopTimers = true;
				pageCache = {};
			}
			var params = 'ajax=1&signed_request=' + $('#signed_request').attr('value');
			if ((get_type === 'cache_body') || (get_type === 'get_body')) {
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
					if ((get_type === 'cache_body') || (get_type === 'get_body')) {
						$('#app_body_container').html(data);
					} else {
						$('#globalContainer').html(data);
					}
					setTimeout(FB.XFBML.parse, 1, [
						document.getElementById('globalContainer')
					]);
					startAllTimers();
					firePageURL();
					centerPopups();
				}
			});
		}
	};
};
tools.Page.ajaxPageDone = function() {
	ajaxPageDone = function(data, div, anchor) {
		stopTimers = false;
		ajaxPerforming = false;
		if (/<script type="text\/javascript">\stop.location.href = "http:\/\/apps.facebook.com\/castle_age\/.*.php";\s<\/script>/.test(data.substr(data.length < 200 ? 0 : data.length - 300)) === false) {
			$data = $(noSrc(data));
			data = null;
			console.log('ajaxPageDone:', div);
			if (div === 'globalContainer') {
				var _abc = $('#app_body_container'), _sts = $data.find('#main_sts');
				_sts.html(_sts.html().replace(/more/g, ''));
				$('#main_sts').replaceWith(noNoSrc(_sts));
				$('#main_bntp').replaceWith(noNoSrc($data.find('#main_bntp')));
				$('#app_body_container').hide().empty().append(noNoSrc($data.find('#app_body_container')).html()).append(noNoSrc($data.filter('div[id]:not(.game)'))).show();
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
				$('#' + div).html(noNoSrc($data));
			}
			centerPopups();
			if (anchor) {
				$('#' + anchor).animate({
					scrollTop : 0
				}, 'slow');
			}
			startAllTimers();
			setTimeout(function() {
				FB.XFBML.parse(document.getElementById('globalContainer'));
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
		if (!url) {
			url = 'index.php?adkx=2';
		}
		var params = 'ajax=1&signed_request=' + $('#signed_request').attr('value'), url_key = url;
		if (url.indexOf('?') !== -1) {
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
		if (!anchor) {
			$('body').animate({
				scrollTop : 0
			}, 'slow');
		}
		stopTimers = true;
		var params = $(formElement).serialize();
		params += '&ajax=1&signed_request=' + $('#signed_request').attr('value');
		pageCache = {};
		if (!url) {
			url = 'index.php?adkx=7';
		}
		var url_key = url, _oldurl = $('#PageURL').val();
		if (url.indexOf('?') !== -1) {
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
