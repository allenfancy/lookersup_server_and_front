({
  appDir : '../public/v2',
  baseUrl : 'js',
  dir : '../public-built/v2',
  optimizeCss : 'standard',
  fileExclusionRegExp : /^\./,
  removeCombined : true,
  paths : {
    "jquery" : "http://static01.inboundmarketing.cn/ibdmkt/v2/js/jquery-1.10.2.min",
    "jquery-migrate" : "http://static01.inboundmarketing.cn/ibdmkt/v2/js/jquery-migrate.min",
    "jquery-ui" : "http://static01.inboundmarketing.cn/gebo/lib/jquery-ui/jquery-ui-1.10.0.custom.min",
    "jquery-cookie" : "http://static01.inboundmarketing.cn/ibdmkt/v2/js/jquery.cookie",
    "bootstrap" : "http://static01.inboundmarketing.cn/ibdmkt/v2/lib/bootstrap/js/bootstrap.min",
    "jqx-yxb" : "http://static01.inboundmarketing.cn/ibdmkt/v2/lib/jqwidgets/jqx.yxb.20150227",
    "yxb-validate" : "yxb-validate.min",
    "baiduTemplate" : "http://static01.inboundmarketing.cn/baidu/baiduTemplate",
    "opportunityDetail" : "opportunityDetail",
    "editable" : "http://static01.inboundmarketing.cn/ibdmkt/v2/lib/x-editable/test/bootstrap-editable-b3",
    "autosize" : "http://static01.inboundmarketing.cn/gebo/js/forms/jquery.autosize.min",
    "moment" : "http://static01.inboundmarketing.cn/ibdmkt/v2/lib/moment/min/moment.min",
    "sticky" : "http://static01.inboundmarketing.cn/gebo/lib/sticky/sticky.min",
    "common" : "common1",
    "contractDetail" : "contractDetail1",
    "customerDetail" : "customerDetail1",
    "data" : "data1"
  },
  shim : {
    "yxb-validate" : [ "jquery" ],
    "jquery-ui" : [ "jquery" ],
    "jquery-cookie" : [ "jquery" ],
    "jquery-migrate" : [ "jquery" ],
    "bootstrap" : {
      deps : [ "jquery" ],
      init : function() {
        var bstooltip = $.fn.tooltip.noConflict();
        $.fn.bstooltip = bstooltip;
      }
    },
    "jqx-yxb" : {
      deps : [ "jquery" ],
      init : function() {
        $.jqx.theme = "yxb";
      }
    },
    "editable" : [ "jquery" ],
    "autosize" : [ "jquery" ],
    "moment" : {
      deps : [ "jquery" ],
      init : function() {
        moment.locale('zh-cn');
      }
    },
    "sticky" : [ "jquery" ],
    "customerDetail" : [ "common", "editable", "autosize" ],
    "opportunityDetail" : [ "common", "editable", "autosize" ],
  },
  modules : [ {
    name : 'contract'
  }, {
    name : 'content'
  } ]
})
