new tool('Gifter');

tools['Gifter'].runtime = {};

tools['Gifter'].update = function() {
console.log('update');
console.log(item.get('CAGEsendGiftTo'));
	tools['Gifter'].runtime['sendGiftTo'] = item.get('CAGEsendGiftTo', new Array());
	if(tools['Gifter'].runtime['sendGiftTo'].indexOf(',') !== -1){
		tools['Gifter'].runtime['sendGiftTo'] = tools['Gifter'].runtime['sendGiftTo'].split(',');
	}
	tools['Gifter'].runtime['requests'] = [];

	console.log(tools['Gifter'].runtime['sendGiftTo']);

	//prepare update event to receive userids and request ids
	customEvent('GiftRequests', function() {

		var _gifts = JSON.parse($('#GiftRequests').val());
		console.log(_gifts);
		if(_gifts) {
			$.each(_gifts.data, function(_i, _e) {
				if($.inArray(_e.from.id, tools['Gifter'].runtime['sendGiftTo']) == -1) {
					tools['Gifter'].runtime['sendGiftTo'].push(_e.from.id);
				}
				tools['Gifter'].runtime['requests'].push(_e.id);
			});
			console.log(tools['Gifter'].runtime['sendGiftTo']);
			item.set('CAGEsendGiftTo', tools['Gifter'].runtime['sendGiftTo'].join(','));
		}
		com.send(com.task.fbButtonEnable, com.port.facebook, 'Gifter');
	});
	addFunction( function() {
		FB.api('/me/apprequests/', function (_response) {
			fireGiftRequests(JSON.stringify(_response));
		}	);
	}, null, true, true);
};
tools['Gifter'].start[com.port.castleAge] = function () {
	console.log('starting...');
	console.log(tools['Gifter'].runtime['sendGiftTo']);
	console.log(tools['Gifter'].runtime['requests']);
};
tools['Gifter'].init[com.port.facebook] = function () {
	tools['Gifter'].fbButton.add(chrome.i18n.getMessage("buttonGifter"), function () {
		tools['Gifter'].fbButton.disable();
		com.send(com.task.startGifter, com.port.castleAge, null);
	});
	tools['Gifter'].fbButton.disable();
	com.send(com.task.updateGifter, com.port.castleAge);
};
/*tools['Gifter'].xxxxx[com.port.castleAge] = function (_giftIds) {

 console.log('line 5:' + localStorage['cageGiftId']);

 console.log('line 9:' + _giftIds);
 var _ids = localStorage['cageGiftId'] == null ? [] : localStorage['cageGiftId'].indexOf(',') > -1 ? localStorage['cageGiftId'].split(',') : $.makeArray(localStorage['cageGiftId']);
 console.log('line 12:' + _ids);

 addFunction(unique);
 addFunction(removeDuplicates);

 addFunction( function(_giftData) {
 console.log(_giftData);
 console.log(_giftData.newGifts);
 if(_giftData.newGifts != null || _giftData.newGifts != '') {
 console.log('checking requests...');
 FB.api('/me/apprequests/?request_ids=' + _giftData.newGifts, function (_response) {
 console.log(_response);
 if(_response.data.length > 0) {
 $.each(_response, function(i,e) {
 console.log(e);
 console.log('request:' + e.data.id + ' - from: ' + e.data.from.id);
 if (e.data.from.id && e.data.from.id.length > 0) {
 console.log('add id: ' + e.data.from.id);
 _giftData.storage.push(e.data.from.id);
 }
 });
 localStorage['cageGiftId'] = unique(_giftData.storage).join(',');
 console.log('line 36: ' + unique(_giftData.storage));
 }
 });;
 }

 showRequestForm = function(tit, msg, track, request_params) {
 var _ui = {
 method: 'apprequests',
 message: msg,
 data: track,
 title: tit
 };

 if(localStorage['cageGiftId'] !== null ) {
 _ui.filters = ['all', 'app_users', 'app_non_users',{
 name: 'CAGE',
 user_ids: $.makeArray(localStorage['cageGiftId'].split(','))
 }];
 }
 console.log(_ui);
 FB.ui(_ui, function(result) {
 // fixes infinite looping for popup window if u close it before it is done loading
 $('.fb_dialog_iframe').each( function() {
 $(this).remove();
 });
 if (result && result.request_ids) {

 var request_id_string = String(result.request_ids);
 var request_id_array = request_id_string.split(',');
 var request_id_count = request_id_array.length;

 // get all ids from sent gifts and remove them from the list
 var ids = result.request_ids;
 var _batch = [];
 for (var i = 0; i < ids.length; i++) {
 _batch.push({
 "method": "get",
 "relative_url": ids[i]
 });
 }
 if (_batch.length > 0) {
 FB.api('/', 'POST', {
 batch: _batch
 }, function (res) {
 var _sentTo = [];
 var _store = $.makeArray(localStorage['cageGiftId'].split(','));
 for (var j = 0; j < res.length; j++) {
 body = res[j].body;
 var myObject = eval('(' + body + ')');
 if(_store.indexOf(myObject.to.id) > -1) {
 _sentTo.push(myObject.to.id);
 }
 }
 console.log(_sentTo);
 console.log(_store);
 if(localStorage['cageGiftId'] !== null ) {
 console.log("not null");
 _store = _store.concat(_sentTo).
 join(',');
 } else {
 console.log("null");
 _store = _sentTo;
 }
 localStorage['cageGiftId'] = removeDuplicates(_store).join(',');
 console.log('clear');
 console.log(localStorage['cageGiftId']);
 });
 }

 var params = 'ajax=1';
 params += '&signed_request=' + $('#signed_request').val();
 $.ajax({
 url: 'request_handler.php?'+request_params+'&request_ids='+result.request_ids,
 context: document.body,
 data: params,
 type: 'POST',

 success: function(data) {
 var return_message = request_id_count + ' request' + (request_id_count == 1 ? '' : 's') + ' sent!';
 document.getElementById('results_container').innerHTML = return_message;
 FB.XFBML.parse(document.getElementById('results_container'));
 $('#results_container').show();
 //alert('Requests Sent');
 }
 }
 );
 }
 }
 );
 }
 }, JSON.stringify({
 storage : _ids,
 newGifts : _giftIds
 }), true, true);
 };*/