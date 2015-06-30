define([ "jquery", "jquery-cookie"], function($) {
	
  var getPath = function(bname) {
    if (bname.indexOf("/") === 0) {
      return bname;
    }
    return "/lookersup_server_web/lookersup/" + bname;
  }
  
  $.msg = function(msg, success, position) {
	    if (typeof success === 'string') {
	      success = 'st-' + success;
	    } else if (typeof success === 'boolean') {
	      success = success ? "st-success" : "st-error";
	    } else {
	      success = 'st-info';
	    }
	    alert (msg);
  };
  var dar = {
    server : "http://localhost:8080",
    uname : $.cookie('nickname'),
    cache : {},
    saveOptions : {
      contentType : "application/json",
      processData : false,
      type : "post",
      dataType : "json",
      nickname:$.cookie('nickname')
    },
  
    //bname ：baseName模块的名字
    pageEntity : function(bname, params) {
      var $this = this, d = $.Deferred();
      if (params && $.isArray(params.extrafilters)) {
        params.extrafilters = JSON.stringify(params.extrafilters);
      }
      $.ajax({
        url : $this.server + getPath(bname) + "/list/page",
        data : params,
        dataType : "json"
      }).success(function(data) {
        if (data.status === 0) {
          d.resolve(data);
        } else {
          $.ajaxError(data);
          d.reject();
        }
      }).fail(function() {
        $.msg('系统忙，请稍后再试。', false);
        d.reject();
      });
      return d.promise();
    },
    listEntity : function(bname, params) {
      var $this = this, d = $.Deferred();
      $.ajax({
        url : dar.server + getPath(bname) + "/list",
        data : params || {
          content : '',
          fields : [ 'name' ]
        },
        dataType : "json"
      }).then(function(data) {
        if (data.status === 0) {
          d.resolve(data);
        } else {
          $.ajaxError(data);
          d.reject();
        }
      });
      return d.promise();
    },
    saveEntity : function(bname, obj) {
      var $this = this, d = $.Deferred();
      $.ajax($.extend({
        url : $this.server + getPath(bname),
        data : JSON.stringify(obj)
      }, $this.saveOptions)).success(function(data) {
        if (data.status === 0) {
          d.resolve(data);
        } else {
          $.ajaxError(data);
          d.reject(data);
        }
      }).fail(function() {
        $.msg('系统忙，请稍后再试。', false);
        d.reject();
      });
      return d.promise();
    },
    removeEntity : function(bname, objs) {
      var $this = this, d = $.Deferred();
      var data = ($.isArray(objs) ? (JSON.stringify(objs)) : ('[' + JSON.stringify(objs) + ']'));
      $.ajax({
        url : $this.server + getPath(bname) + "/list/delete",
        contentType : "application/json",
        processData : false,
        type : "delete",
        dataType : "json",
        data : data   
      }).success(function(data) {
        if (data.status === 0) {
          $.msg("删除成功！", true);
          d.resolve(data);
        } else {
          $.ajaxError(data);
          d.reject();
        }
      }).fail(function() {
        $.msg('系统发生未知异常', false);
        d.reject();
      });
      return d.promise();
    },
    getEntity : function(bname, id, refreshCache) {
      var $this = this;
      var cacheKey = [ bname, id ];
    //  var d = refreshCache ? undefined : getValue($this.cache, cacheKey);
      if (d === undefined) {
        d = $.Deferred();
        $.ajax({
          url : dar.server + getPath(bname) + "/" + id,
          type : "get",
          dataType : "json"
        }).success(function(data) {
          if (data.status === 0) {
            d.resolve(data);
          } else {
            $.ajaxError(data);
            d.reject();
          }
        }).fail(function() {
          $.msg('系统忙，请稍后再试。', false);
          d.reject();
        });
       
      }
      return d.promise();
    },
    getEntityByName : function(bname, uname, refreshCache) {
        var $this = this;
        var cacheKey = [ bname, uname];
       // var d = refreshCache ? undefined : getValue($this.cache, cacheKey);
        var d ;
        if (d === undefined) {
          d = $.Deferred();
          $.ajax({
            url : dar.server + getPath(bname) + "/" + uname,
            type : "get",
            dataType : "json"
          }).success(function(data) {
            if (data.status === 0) {
              d.resolve(data);
            } else {
              $.ajaxError(data);
              d.reject();
            }
          }).fail(function() {
            $.msg('系统忙，请稍后再试。', false);
            d.reject();
          });
        }
        return d.promise();
      },
    updateEntity : function(bname, id, fields) {
      var $this = this, d = $.Deferred();
      var data = ($.isArray(fields) ? (JSON.stringify(fields)) : ('[' + JSON.stringify(fields) + ']'));
      $.ajax({
        url : $this.server + getPath(bname) + '/' + id + '/fields',
        contentType : "application/json",
        processData : false,
        type : "post",
        dataType : "json",
        data : data
      }).success(function(data) {
        if (data.status === 0) {
          d.resolve(data);
        } else {
          $.ajaxError(data);
          d.reject(data);
        }
      }).fail(function() {
        $.msg('系统忙，请稍后再试。', false);
        d.reject();
      });
      return d.promise();
    }
  }
  return dar;
});
