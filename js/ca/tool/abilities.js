new tool('Abilities');

tools.Abilities.start = function() {

	get('guild_class.php', function(_data) {

		customEvent('AbilityChanged', function() {
			tools.Abilities.done();
		});

		$('#cageAbilitiesContainer').html($('div[id^="expanded_power_"]', _data).html()).find('> div:last').empty().attr('onclick', '');

		addFunction(function() {

			window['showItemPopup'] = function(button_id, parent, x_offset, y_offset) {
				var elem = $('#' + button_id);
				move_box(parent, elem, x_offset - 75, y_offset - 100);
				elem.show();
			};
			window['classPowers'] = {
				'1' : [],
				'2' : [],
				'3' : [],
				'4' : []
			};

			window['pickPower'] = function(class_id, cat, id, js_string_var) {

				console.log(class_id + '-' + cat + '-' + id + '-' + js_string_var);

				var max_class_slots = $('div[id^="free_slot_"]').length;
				var class_power_elem = $('#class_power_' + class_id + '_' + cat + '_' + id);

				if(class_power_elem && classPowers[class_id].length < max_class_slots) {

					var big_img = $('#large_image_' + class_id + '_' + cat + '_' + id);
					var gray_img = $('#gray_image_' + class_id + '_' + cat + '_' + id);

					big_img.css('display', 'none');
					gray_img.css('display', 'block');
					class_power_elem.css('display', 'block');

					classPowers[class_id].push({
						'cat' : cat,
						'id' : id
					});

					for(var i = 0; i < max_class_slots; i++) {
						var freeSlotElem = $('#free_slot_' + class_id + '_' + i);
						freeSlotElem.css('display', 'block');
					}

					for(var i = 0; i < classPowers[class_id].length; i++) {
						var freeSlotElem = $('#free_slot_' + class_id + '_' + i);
						freeSlotElem.css('display', 'none');
					}

				}
			}
			window['unpickPower'] = function(class_id, cat, id) {

				console.log('unpickPower');
				var class_power_elem = $('#class_power_' + class_id + '_' + cat + '_' + id);
				var max_class_slots = $('div[id^="free_slot_"]').length;
				if(class_power_elem) {
					var big_img = $('#large_image_' + class_id + '_' + cat + '_' + id);
					var gray_img = $('#gray_image_' + class_id + '_' + cat + '_' + id);

					big_img.css('display', 'block');
					gray_img.css('display', 'none');
					class_power_elem.css('display', 'none');

					var counter = 0;
					var newClassPowers = [];
					for(var i = 0; i < classPowers[class_id].length; i++) {
						var unpickedPower = classPowers[class_id][i];

						if(unpickedPower['id'] != id || unpickedPower['cat'] != cat) {
							newClassPowers.push(unpickedPower);
						}

					}
					classPowers[class_id] = newClassPowers;

					for(var i = 0; i < max_class_slots; i++) {
						var freeSlotElem = $('#free_slot_' + class_id + '_' + i);
						freeSlotElem.css('display', 'block');
					}

					for(var i = 0; i < classPowers[class_id].length; i++) {
						var freeSlotElem = $('#free_slot_' + class_id + '_' + i);
						freeSlotElem.css('display', 'none');
					}

				}
			}
			window['equip_send'] = function(class_id) {
				console.log(class_id);
				friend_browse_offset = 0;
				reset_raid_lst();
				stopTimers = true;

				var class_equips = classPowers[class_id];
				if(class_equips.length == 0)
					class_equips = false;
				params = {}
				params['ajax'] = 1;
				params['class_id'] = class_id;
				params['class_equips'] = class_equips;
				params['signed_request'] = $('#signed_request').attr('value');
				console.log(params);
				pageCache = {};
				ajaxPerforming = true;
				showLoaderIfAjax();

				$.ajax({
					url : 'guild_class.php',
					context : document.body,
					data : params,
					type : 'POST',
					success : function(data) {
						stopTimers = false;
						ajaxPerforming = false;
						$('#AjaxLoadIcon').hide();
						$('#cageAbilitiesContainer').show().animate({
							'top' : -300
						}, 'slow', function() {
							$(this).empty();
							fireAbilityChanged();
						});
					}
				});
			};
		}, null, true, false);
		addFunction(function() {
			$('img[src*="class_cancelnew.jpg"]').parent().click(function() {
				$('#cageAbilitiesContainer').show().animate({
					'top' : -300
				}, 'slow', function() {
					$(this).empty();
					fireAbilityChanged();
				});
			});
		}, null, true, true);

		$('div.imgButton[id^="large_image_"]').parent().css('cssText', 'float:left;padding:8px;');
		$('#cageAbilitiesContainer').animate({
			'top' : 52
		}, 'slow');
	});
};

tools.Abilities.done = function() {
	tools.Abilities.fbButton.enable();
};
tools.Abilities.init = function() {
	$('#cageContainer').append('<div id="cageAbilitiesContainer" class="ui-corner-br ui-widget-content"></div>');
	tools.Abilities.fbButton.add(language.abilitiesButton, function() {
		tools.Abilities.fbButton.disable();
		tools.Abilities.start();
	});
};
