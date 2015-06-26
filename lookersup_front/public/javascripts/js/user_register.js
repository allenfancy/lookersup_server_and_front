require.config({
	
	baseUrl : '../tools/v2',
    paths : {
    	"jquery" : "http://static01.inboundmarketing.cn/ibdmkt/v2/js/jquery-1.10.2.min",
    	 "jquery-cookie" : "http://static01.inboundmarketing.cn/ibdmkt/v2/js/jquery.cookie",
    	 "moment" : "http://static01.inboundmarketing.cn/ibdmkt/v2/lib/moment/min/moment.min",
    	 "data":"data"
    	
    }
});
/*require 引进js文件并执行*/
require(["user_register_define"]);