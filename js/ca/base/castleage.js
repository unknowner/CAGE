new tool('castleage');

tools.castleage.settings = function() {
	tools.castleage.runtimeUpdate();
	tools.Settings.heading('Castle Age');
	tools.Settings.text(language.cAgeheadText);
	tools.Settings.onoff(language.cAgeSidebarGuildChat, tools.castleage.runtime.sidebarGuildChat, 'sidebarGuildChat', function() {
		tools.castleage.runtime.sidebarGuildChat = !tools.castleage.runtime.sidebarGuildChat;
		tools.castleage.sidebarGuildChat();
	});
	tools.Settings.onoff(language.cAgeScrollGuildChat, tools.castleage.runtime.scrollGuildChat, 'scrollGuildChat', function() {
		tools.castleage.runtime.scrollGuildChat = !tools.castleage.runtime.scrollGuildChat;
		tools.castleage.scrollGuildChat();
	});
	tools.Settings.onoff(language.cAgeNoResults, tools.castleage.runtime.battleResults, 'castleageBattleResults', function() {
		tools.castleage.runtime.battleResults = !tools.castleage.runtime.battleResults;
		tools.castleage.results();
	});
	tools.Settings.onoff(language.cAgeNoHourly, tools.castleage.runtime.hourly, 'castleageHourly', function() {
		tools.castleage.runtime.hourly = !tools.castleage.runtime.hourly;
		tools.castleage.results();
	});
	tools.Settings.onoff(language.cAgeNoUpgrade, tools.castleage.runtime.upgrade, 'castleageUpgrade', function() {
		tools.castleage.runtime.upgrade = !tools.castleage.runtime.upgrade;
		tools.castleage.results();
	});
	tools.Settings.onoff('Mac background hack', tools.castleage.runtime.macBGFix, 'macBGFix', function() {
		tools.castleage.runtime.macBGFix = !tools.castleage.runtime.macBGFix;
		tools.castleage.macBGFix();
	});
};

tools.castleage.runtimeUpdate = function() {
	if (!tools.castleage.runtime) {
		tools.castleage.runtime = {};
	}
	tools.castleage.runtime.battleResults = item.get('castleageBattleResults', false);
	tools.castleage.runtime.hourly = item.get('castleageHourly', false);
	tools.castleage.runtime.upgrade = item.get('castleageUpgrade', false);
	tools.castleage.results();
	tools.castleage.runtime.sidebarGuildChat = item.get('sidebarGuildChat', false);
	tools.castleage.sidebarGuildChat();
	tools.castleage.runtime.scrollGuildChat = item.get('scrollGuildChat', true);
	tools.castleage.scrollGuildChat();
	tools.castleage.runtime.macBGFix = item.get('macBGFix', false);
	tools.castleage.macBGFix();
};

tools.castleage.init = function() {
	tools.castleage.runtimeUpdate();
	// chat in sidebar button > guild logo in expanded chat
	$('#cageSidebarChat').resizable({
		handles : 's',
		stop : function() {
			$('#chatGuildChat').scrollTop($('#chatGuildChat div').length * 1000);
		}
	}).after('<div id="chatGuildChatSizeHandle"><hr></div>');
	$('#guildChatActiveMembers').parent().css({
		'padding' : '11px 0 0 3px',
		'fontSize' : 10,
		'cursor' : 'pointer'
	}).html('Chat to sidebar<span id="guildChatActiveMembers"></span>').click(function() {
		tools.castleage.runtime.sidebarGuildChat = !tools.castleage.runtime.sidebarGuildChat;
		item.set('sidebarGuildChat', tools.castleage.runtime.sidebarGuildChat);
		tools.castleage.sidebarGuildChat();
	});
	$('#chatHeader img:first').attr('title', 'Move guild chat to sidebar and back.').css('cursor', 'pointer').click(function() {
		tools.castleage.runtime.sidebarGuildChat = !tools.castleage.runtime.sidebarGuildChat;
		item.set('sidebarGuildChat', tools.castleage.runtime.sidebarGuildChat);
		tools.castleage.sidebarGuildChat();
	});
};
tools.castleage.macBGFix = function() {
	if (tools.castleage.runtime.macBGFix) {
		tools.Page.runtime.addOn['tools.castleage.macBGFix'] = function() {
			setTimeout(function() {
				$('#app_body div').each(function(_i, _e) {
					if ($(this).css('backgroundImage') !== "none") {
						$(this).css('backgroundImage', $(this).css('backgroundImage'));
					}
					;
				});
			}, 100);
		};
	} else {
		if (tools.Page.runtime.addOn['tools.castleage.macBGFix']) {
			tools.Page.runtime.addOn['tools.castleage.macBGFix'] = null;
		}
	}

};
tools.castleage.sidebarGuildChat = function() {
	if (tools.castleage.runtime.sidebarGuildChat === true) {
		$('#cageSidebarChat').append($('#chatGuildChat').detach()).append($('#chatGuildChatTextBox').detach()).show();
		$('#chatGuildChat').addClass('chatGuildChatSidebar').css('height', '100%');
		$('#chatGuildChatContainer').addClass('chatGuildChatContainerSidebar');
		$('#chatGuildChatTextBox').addClass('chatGuildChatTextBoxSidebar').find('input:last').attr('src', 'http://image4.castleagegame.com/graphics/button_arrow_right.gif');
		$('#expandedGuildChat').css('height', 65);
		$('#chatGuildChatSizeHandle').show();
	} else {
		$('#cageSidebarChat').hide();
		$('#expandedGuildChat').css('height', 306).append($('#chatGuildChat').detach()).append($('#chatGuildChatTextBox').detach());
		$('#chatGuildChat').removeClass('chatGuildChatSidebar').css('height', 200);
		$('#chatGuildChatContainer').removeClass('chatGuildChatContainerSidebar');
		$('#chatGuildChatTextBox').removeClass('chatGuildChatTextBoxSidebar').find('input:last').attr('src', 'http://image4.castleagegame.com/iphone/graphics/ch_button_send.jpg');
		$('#chatGuildChatSizeHandle').hide();
	}
	$('#chatGuildChat').scrollTop($('#chatGuildChat div').length * 20);
};
tools.castleage.scrollGuildChat = function() {
	if (tools.castleage.runtime.scrollGuildChat === true) {
		$('#chatGuildChat').bind('DOMNodeInserted', function() {
			$('#chatGuildChat').scrollTop($('#chatGuildChat div').length * 20);
		});
	} else {
		$('#chatGuildChat').unbind('DOMNodeInserted');
	}
};
tools.castleage.results = function() {
	if (tools.castleage.runtime.battleResults || tools.castleage.runtime.hourly) {
		tools.Page.runtime.addOn['tools.castleage.results'] = function() {
			var _re = [];
			if (tools.castleage.runtime.battleResults) {
				_re.push('You have now won a total');
			}
			if (tools.castleage.runtime.hourly) {
				_re.push('Dwarven Miner - |Your treasury is flourishing in Castle Age|Your potion is not ready yet');
			}
			if (tools.castleage.runtime.upgrade) {
				_re.push('You just upgraded your');
			}

			var _reg = new RegExp(_re.join('|'), "g");
			$('#results_main_wrapper div.results').each(function() {
				if ($(this).text().match(_reg) !== null) {
					console.log('REMOVED BR');
					$(this).remove();
				}
			});
			if ($('#results_main_wrapper div.results').length == 0) {
				$('#results_main_wrapper div.results').hide();
			}
		};
	} else {
		if (tools.Page.runtime.addOn['tools.castleage.results']) {
			tools.Page.runtime.addOn['tools.castleage.results'] = null;
		}
	}
};
