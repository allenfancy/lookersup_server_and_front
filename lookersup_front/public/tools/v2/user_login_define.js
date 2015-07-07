define([ "jquery","jquerysession","data" ],function($,session,dar) {

	var dar = dar;
	var model = {};
	var session = session;
	var username = $('#username').val();
	$('#user_login').click(function(){
		$.when(dar.getEntityByName('user/getByName', username)).then(function(data){
			model.user = data.result;
			alert(model.user);
			$.session.set('username',model.user.name);
			$.session.set('userId',model.user.id);
			$.cookie("uname",data.result.nickName, 30);
			window.location.href="/"
		});
	})
		
	
	
});