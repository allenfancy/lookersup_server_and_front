
app.get('/register',function(req,res){
	console.log('进来注册..');
	res.render('user/register',{
		layout : false,
		title:'注册'
	});
});

app.get('/login',function(req,res){
	console.log('进来登陆了..');
	res.render('user/login',{
		layout : false,
		title:'登陆'
	});
});

app.get('/',function(req,res){
	console.log(req.headers.cookie.nickname);
	console.log('进来主界面了..');
	res.render('home',{
		layout : false,
		title:'主页'
	});
});