tool('Class');

tools.Class.init = function() {
	tools.Class.runtimeUpdate();
	$('#cageContainer').append('<div id="cageClassContainer"><div id="cageClassSelected">ACTIVE</div><div id="cageClasses" style="width:603px;height:50px;background-image:url(http://image4.castleagegame.com/graphics/g_char_selectchar_plate.gif);"></div><div id="cageClassPower"></div><div id="cageClassSave"></div></div>');
	signedGet('guild_class_power_equipment.php', function(_data) {
		var _data2 = _data;
		_data = $($.parseHTML(noSrc(_data)));
		var _class = /g_char_header_(\w+).jpg/.exec(_data.find('div[id="guildv2_class_top"]:first div[style*="graphics/g_char_header_"]:first').css('backgroundImage'))[1];
		CastleAge.inGuild = _data.find('table.layout a[href*="apps.facebook.com/castle_age/guildv2_home.php"]').length > 0 ? true : false;
		tools.Class.runtime.classSet = _class;
		$('#cageSidebarStats').append($('<div id="cageStatsClass" class="cageSidebarStat"><div>' + _class[0].toUpperCase() + _class.slice(1) + '</div><span></span></div>')).append($('<button id="cageClassLogo" title="Choose class and powers" style="background-image:url(\'http://image4.castleagegame.com/graphics/class_' + _class + '.gif\')"></button>').click(function() {
			$('#cageClassLogo').css({
				'cursor' : 'wait',
				'backgroundImage' : 'url(\'http://image4.castleagegame.com/graphics/shield_wait.gif\')'
			}).attr('disabled', 'disabled');
			tools.Class.start();
		}));
		tools.Class.statsPowerImages(_data2);
	});
};

tools.Class.runtimeUpdate = function() {
	tools.Class.runtime = {
		powersEquip : [],
		powersOwn : {},
		classId : null,
		classes : {
			1 : 'warrior',
			2 : 'rogue',
			3 : 'mage',
			4 : 'cleric'
		},
		classSet : null
	};
};

tools.Class.start = function() {
	signedGet('guild_class_power_equipment.php', function(_data) {
		tools.Class.statsPowerImages(_data);
		tools.Class.showClass(_data);
	});
};

tools.Class.done = function() {
	$('#cageClassPower div.cageClassPowerSelector').slideUp('fast').empty();
	$('#cageClassContainer').animate({
		'top' : -500
	}, 'slow', function() {
		$(this).hide();
	});
	$('#cageClassLogo').css({
		'cursor' : 'pointer',
		'backgroundImage' : 'url(\'http://image4.castleagegame.com/graphics/class_' + tools.Class.runtime.classSet + '.gif\')'
	}).removeAttr('disabled');
};

tools.Class.showClass = function(_data) {
	_data = $($.parseHTML(noSrc(_data)));
	tools.Class.runtimeUpdate();
	$('#cageClasses, #cageClassPower, #cageClassSave, #cageClassPowerSelector').empty();
	$('#cageClassContainer').show();
	// Get current class and setup class selector
	tools.Class.runtime.classId = parseInt(_data.find('input[name="class_id"]').val(), 10);
	tools.Class.runtime.classSet = tools.Class.runtime.classes[tools.Class.runtime.classId];
	$.each(tools.Class.runtime.classes, function() {
		var _set = this.toString(), _img = $('<img id="cageClassImg' + _set + '" src="http://image4.castleagegame.com/graphics/g_char_select' + _set + '.jpg">');
		if (_set === tools.Class.runtime.classSet) {
			$('#cageClasses').append(_img.css({
				'opacity' : 0,
				'cursor' : 'default'
			}).fadeTo('slow', 1));
			$('#cageClasses').append(_img);
			$('#cageClassSelected').text('Active').animate({
				'left' : _img.position().left
			}, 'slow');
		} else {
			_img.click(function() {
				$('div.cageClassPowerSlot *, #cageClasses > img, #cageClassPowerSelector').fadeOut('slow');
				$('#cageClassPower').show('slow');
				$('#cageClassSelected').text('Changing...');
				tools.Class.changeClass(_set);
			}).hover(function() {
				$(this).stop().animate({
					'opacity' : 1
				}, 'slow');
			}, function() {
				$(this).stop().animate({
					'opacity' : 0
				}, 'slow');
			});
			$('#cageClasses').append(_img);
		}
	});

	$('#cageClassPower').append((new Array(1 + parseInt(_data.find('#guild_class_max_slots').val(), 10))).join('<div class="cageClassPowerSlots"><div class="cageClassPowerSlot"><div class="cageClassPowerSelector"></div></div></div>'));
	$('#cageClassPower').append((new Array(1 + (6 - parseInt(_data.find('#guild_class_max_slots').val(), 10)))).join('<img src="http://image4.castleagegame.com/graphics/g_char_power_locked.gif">'));
	// available powers
	tools.Class.runtime.powersOwn = {};
	_data.find('input[id^="slot_image_"]').each(function() {
		var _key = /\d+_\d+_\d+/.exec($(this).attr('id'))[0];
		tools.Class.runtime.powersOwn[_key] = {
			small : 'http://image4.castleagegame.com/graphics/' + $(this).val(),
			big : $(this).next('div.imgButton').find('img').attr('nosrc')
		};
	});
	// equipped powers
	_data.find('div[id^="open_power_slot"]').each(function(_index) {
		var _oc = $('div:first', this).attr('onClick'), _t, _e;
		if (_oc !== undefined) {
			_t = _oc.match(/\d+/g), _e = _t[0] + '_' + _t[1] + '_' + _t[2];
		} else {
			_e = '';
		}
		tools.Class.runtime.powersEquip.push(_e);
		$('div.cageClassPowerSlot:eq(' + _index + ')').append($('<img src="' + (_e == '' ? 'http://image4.castleagegame.com/graphics/g_char_power_blank.gif' : tools.Class.runtime.powersOwn[_e].small) + '">').data('power', _e).click(function() {
			var _this = $(this), _pow = $('div.cageClassPowerSelector', _this.parent());
			if (_pow.data('show') !== true) {
				$('#cageClassPower div.cageClassPowerSelector').each(function() {
					$(this).data('show', false).slideUp('fast').empty();
				});
				_pow.data('show', true).empty().append($('<img src="http://image4.castleagegame.com/graphics/g_char_power_blank.gif">').click(function() {
					_this.data('power', '');
					tools.Class.runtime.powersEquip[_this.data('slot')] = '';
					_pow.slideUp('fast').data('show', false).empty();
					_this.attr('src', 'http://image4.castleagegame.com/graphics/g_char_power_blank.gif');
				}));
				$.each(tools.Class.runtime.powersOwn, function(_i) {
					if (tools.Class.runtime.powersEquip.indexOf(_i) == -1) {
						_pow.append('<div class="cageClassPowerText">' + _data.find('#item_desc_' + _i).text().trim() + '</div>').append($('<img src="' + tools.Class.runtime.powersOwn[_i].big + '">').data('equip', _i).hover(function() {
							$(this).prev('div:first').stop(true).animate({
								'opacity' : .8
							}, 'slow');
						}, function() {
							$(this).prev('div:first').stop(true).animate({
								'opacity' : 0
							}, 'slow');
						}).click(function() {
							tools.Class.runtime.powersEquip[_this.data('slot')] = $(this).data('equip');
							_this.attr('src', tools.Class.runtime.powersOwn[$(this).data('equip')].small);
							_pow.slideUp('fast').data('show', false).empty();
						}));
					}
				});
				_pow.slideDown('fast');
			} else {
				_pow.slideUp('fast').data('show', false).empty();
			}
		}).fadeTo('slow', 1));
		$('div.cageClassPowerSlot img:last').data('slot', _index);
	});
	// save
	$('#cageClassSave').append($('<div style="cursor:pointer;display:inline-block;width:125px;overflow:hidden;background-image:url(http://image4.castleagegame.com/graphics/class_savenew.jpg);"><img style="opacity:0" src="http://image4.castleagegame.com/graphics/class_savenew_rollover.jpg"></div>').click(function() {
		$('#cageClassSelected').text('Saving...');
		signedGet('guild_class_power_equipment.php?action=class_power_equipment&class_id=' + tools.Class.runtime.classId + '&equipment=' + tools.Class.runtime.powersEquip.filter(function(e) {
			return e;
		}).join(';'), function(_data) {
			tools.Class.statsPowerImages(_data);
			tools.Class.done();
		});
	}).hover(function() {
		$('img', this).stop().animate({
			'opacity' : 1
		}, 'slow');
	}, function() {
		$('img', this).stop().animate({
			'opacity' : 0
		}, 'slow');
	}));
	// cancel
	$('#cageClassSave').append($('<div style="cursor:pointer;display:inline-block;width:133px;overflow:hidden;background-image:url(http://image4.castleagegame.com/graphics/class_cancelnew.jpg);"><img style="opacity:0" src="http://image4.castleagegame.com/graphics/class_cancelnew_rollover.jpg"></div>').click(tools.Class.done).hover(function() {
		$('img', this).stop().animate({
			'opacity' : 1
		}, 'slow');
	}, function() {
		$('img', this).stop().animate({
			'opacity' : 0
		}, 'slow');
	}));

	$('#cageClassContainer').animate({
		'top' : 99
	}, 'slow');
};

tools.Class.changeClass = function(_class) {
	$('#cageClassLogo').css({
		'cursor' : 'wait',
		'backgroundImage' : 'url(\'http://image4.castleagegame.com/graphics/shield_wait.gif\')'
	}).attr('disabled', 'disabled');
	signedGet('guild_class_power_equipment.php?action=chooseClass&' + _class + '=' + _class, function(_data) {
		tools.Class.runtime.classSet = tools.Class.runtime.classes[_class];
		tools.Class.statsPowerImages(_data);
		$('#cageStatsClass div:last').text(_class[0].toUpperCase() + _class.slice(1));
		tools.Class.showClass(_data);
	});
};

tools.Class.statsPowerImages = function(_data) {
	_data = $($.parseHTML(noSrc(_data)));
	$('#cageStatsClass span img').remove();
	_data.find('div[id^="open_power_slot_"] img').each(function() {
		$('#cageStatsClass span').append($('<img src="' + $(this).attr('nosrc') + '">').hover(function() {
			$(this).stop(true).animate({
				'height' : 45,
				'marginBottom' : 4,
				'marginLeft' : -8,
				'marginRight' : -8
			}, 'fast').css('zIndex', 1);
		}, function() {
			$(this).stop(true).animate({
				'height' : 20,
				'marginBottom' : 0,
				'marginLeft' : 0,
				'marginRight' : 0
			}, 'fast').css('zIndex', 0);
		}));
	});
};
