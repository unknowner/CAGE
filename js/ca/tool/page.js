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
			var _n = _t.replace(/src=/g, 'nosrc=');
			return _n;
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
			setTimeout(function() {
				var start = new Date();
				tools.Page.pages[_page]();
				console.log('Time to mod', _page, ':', (new Date() - start));
			}, 0);
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
	// tools.Functions.addToCANav('mainMenu_home', 'Main', 'specialmembership.php', 'Crusaders');
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
	if ($('form').find('input[name="bqh"]').filter(":first").length > 0) {
		CastleAge.bqh = $('form').find('input[name="bqh"]').filter(":first").val();
	}

	// Favour points
	$('#cageFavorPoints').text($('#main_bn div[style*="persistent_bar_oracle.gif"]').text().trim());

	// remove CA:HOD ad, etc...
	$('div > a > img.imgButton[src*="/graphics/iphone_cross_promo.jpg"]').parent().parent().remove();
	$('a[href*="apps.facebook.com/castle_hod/?xprom=cax"]').parents('div:first').remove();
	if ($('#globalContainer > div:first').height() == 80) {
		$('#globalContainer > div:first').hide();
	}

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
			var $data = $($.parseHTML(noSrc(data), true));
			startAllTimers();
			console.log('ajaxPageDone:', div);
			if (div === 'globalContainer') {
				var _abc = $('#app_body_container');
				$('#main_bntp').replaceWith(noNoSrc($('#main_bntp', $data)));
				_abc.empty().append(noNoSrc($('#app_body_container', $data)).html()).append(noNoSrc($data.filter('div[id]:not(.game)'))).show();
				// update stats
				// $('#mainHeaderTabs').replaceWith(noNoSrc($('#mainHeaderTabs', $data)).detach());
				$('#main_sts_container').html(noNoSrc($('#main_sts_container', $data)).html());
				$('#cageFavorPoints').text(/\d+/.exec($('#persistHomeFPPlateOpen', $data).text())[0]);
				_abc.append(noNoSrc($data.filter('script')));

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
			setTimeout(function() {
				// add link to profile pics
				$('#app_body_container img').filter('[nosrc*="//graph.facebook.com/"]').each(function(_i, _e) {
					var _fbProfilePic = $(_e), _uid = /\/\/graph\.facebook\.com\/(\d+)\/picture/g.exec(_fbProfilePic.attr('nosrc'));
					if (_uid !== null && _uid.length === 2) {
						_fbProfilePic.attr({
							'class' : 'cageProfileLink',
							'uid' : _uid[1],
							'onclick' : 'ajaxLinkSend(\'globalContainer\', \'keep.php?casuser=' + _uid[1] + '\'); return false;'
						});
					}
				});
			}, 1);
			_stats = _stam = _ener = heal = null;
			$('#AjaxLoadIcon').fadeOut();
		} else {
			$('#AjaxLoadIcon').append('<div id="cageLoadError">ERROR LOADING DATA</div>').delay(2000).fadeOut(function() {
				$('#cageLoadError').remove();
			});
		}
		$data = data = div = anchor = null;
	};
};
tools.Page.ajaxLinkSend = function() {
	ajaxLinkSend = function(div, url, addparams) {
		console.log('ajaxLinkSend: div=' + div + " - url=" + url);
		$('body').animate({
			scrollTop : 0
		}, 'slow');
		friend_browse_offset = 0;
		reset_raid_lst();
		pageCache = {};
		ajaxPerforming = true;
		$('#AjaxLoadIcon').fadeIn();
		if (!url) {
			url = 'index.php?adkx=2';
		}
		var params = {
			ajax : 1,
			signed_request : $('#signed_request').attr('value')
		}, url_key = url;
		
		if (addparams !== undefined) {
			$.extend(params, addparams);
		}
		
		if (url.indexOf('?') !== -1) {
			url_key = url.substring(0, url.indexOf('?'));
		}
		setPageURL(url_key);
		$.ajax({
			url : url,
			data : params,
			type : 'POST',
			success : function(data, textStatus, jqXHR) {
				var begin = jqXHR.responseText.slice(0, 150);
				var end = jqXHR.responseText.slice(jqXHR.responseText.length - (jqXHR.responseText.length < 150 ? jqXHR.responseText.length : 150));
				if (jqXHR === undefined || begin.indexOf('top.location.href') >= 0 || end.indexOf('top.location.href') >= 0) {
					var rstr;
					if (begin.indexOf('top.location.href') >= 0) {
						rstr = begin;
					} else {
						rstr = end;
					}
					var redirect = /(?:castle_age\/)(.*\.php)/.exec(rstr);
					if (redirect.length == 2) {
						ajaxLinkSend(div, redirect[1]);
						$('#AjaxLoadIcon').append('<div id="cageLoadError">Redirecting...</div>').delay(1000).fadeOut(function() {
							$('#cageLoadError').remove();
						});
					} else {
						$('#AjaxLoadIcon').append('<div id="cageLoadError">ERROR LOADING DATA</div>').delay(2000).fadeOut(function() {
							$('#cageLoadError').remove();
						});
					}
				} else {
					ajaxPageDone(jqXHR.responseText, div);
				}
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
				console.log('data.length:' + data.length);
				console.log('textStatus:' + textStatus);
				console.log('jqXHR:' + jqXHR);
				ajaxPageDone(jqXHR.responseText, div, anchor);
			}
		});
	};
};
