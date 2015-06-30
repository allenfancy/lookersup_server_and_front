define([ "jquery","data" ],function($,dar) {

	var dar = dar;
	var model = {};
	var username = $('#username').val();
	
	$.when(dar.getEntityByName('user/getByName', username)).then(function(data){
		model.user = data.result;
		alert(model.user);
		$.cookie("nickname",data.result.nickName, 30);
	});
});