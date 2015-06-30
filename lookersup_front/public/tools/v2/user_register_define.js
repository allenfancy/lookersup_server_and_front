define([ "jquery","data" ],function($,dar) {
	
	var dar = dar;
	$('#user_register').click(function() {
		var username = $('#username').val();
		var nickname = $('#nickname').val();
		var password = $('#password').val();
		var repassword = $('#confirmpwd').val();
		if (password !== repassword) {
			alert("俩次密码输入不正确");
			return;
		}
		var user = {"name":username,"nickname":nickname,"password":password};
		$.ajax({
			url : "http://localhost:8080/lookersup_server_web/lookersup/user/add.html",
			contentType:"application/json",
			async : false,
			type : 'POST',
			dataType:"json",
			timeout : 5000,
			data:JSON.stringify(user),
			processData:false,
			success : function(data) {
				alert('success');
			},
			error : function(data) {
				alert('error');
				}
			});
		});	
});