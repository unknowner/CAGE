// page


var page = {
		
	get : function(_page, _callback){
		$.get(_page,function(_data){_callback(_data);});
	}
		
};
