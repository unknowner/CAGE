// guild shop festival stuff
tools.Page.runtime['guild_shop.php'] = function () {
	console.log('Page: guild_shop.php');
	var $_img = $('img[src*="hero_result_button_recruit_25.jpg"]');
	var _promoId = /promo_id=.+/.exec($_img.attr('onclick'))[0];
	var _itemName = /(the item )(.+)( in Castle)/.exec($_img.attr('onclick'))[2];
	$_img.attr('onclick', '').click( function () {
		addFunction( function (_item) {
			FB.api('/me', function (response) {
				showRequestForm('Castle Age', encodeURI(response.first_name) + ' ' + encodeURI(response.last_name) + ' needs your help to unlock the item ' + _item.name  + ' in Castle Age. Click confirm to help ' + encodeURI(response.first_name) + ' ' + encodeURI(response.last_name) + ' out!', 'abc=123', 'act=popup_guild_promo_create&' + _item.promoId);
			});
		}, JSON.stringify({name : _itemName, promoId : _promoId}), true, true);
	});
};
