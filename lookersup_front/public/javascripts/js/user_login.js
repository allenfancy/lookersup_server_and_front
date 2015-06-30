require.config({
	urlArgs : 'v=20150629',
	baseUrl : '../tools/v2',
    paths : {
    	"jquery" : "lib/jquery-2.1.1.min",
    	 "jquery-cookie" : "lib/jquery.cookie",
    	 "data":"lib/data"
    },
  /* shim : {
    	"jquery":["jquery"],
        "jquery-cookie" : [ "jquery" ]
    }*/
        
});

/*require 引进js文件并执行*/
require(["user_login_define"]);