new tool('Monster');

tools.Monster.start = function() {
	$('#cageMonterContainer').show().animate({
		'top' : 110
	}, 'slow', tools.Monster.done);

};

tools.Monster.done = function() {
	$('#cageMonterContainer').animate({
		'top' : -110-$(this).css('height')+10,
	}, 'slow');
	tools.Monster.fbButton.enable();

};

tools.Monster.init = function() {

	$('#cageContainer').append('<div id="cageMonterContainer" class="ui-corner-bottom ui-widget-content"></div>');
	tools.Monster.fbButton.add(language.MonsterButton, function() {
		tools.Monster.fbButton.disable();
		tools.Monster.start();
	});
};
