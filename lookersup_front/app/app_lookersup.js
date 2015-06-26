
app.get('/register',function(req,res){
	console.log('进来注册..');
	res.render('user/register',{
		layout : false,
		title:'注册'
	});
});