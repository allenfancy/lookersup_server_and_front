define([ "jquery", "jquery-cookie", "common" ], function($) {
  var s = {
    uid : $.cookie('uid'),
    uname : $.cookie('uname'),
  }
  window.UniqIndexedList = function(indexField) {
    this._items = new Array();
    this._keys = {};
    this.indexField = indexField;
    this.length = 0;

    this.add = function(v) {
      var k = (v !== undefined ? v[indexField] : undefined);
      if (k === undefined) {
        return false;
      }
      var index = this._keys[k];
      if (index === undefined) {
        this._items.push(v);
        this._keys[k] = this.length++;
      } else {
        this._items[index] = v;
      }
      return true;
    }

    this.addAll = function(vs) {
      if (vs instanceof Array) {
        for ( var i in vs) {
          this.add(vs[i]);
        }
      } else {
        this.add(vs);
      }
    }

    this.get = function(indexField) {
      return this._items[this._keys[indexField]];
    }

    this.each = function(callback) {
      var value, i = 0, length = this.length;
      for (; i < length; i++) {
        value = callback.call(this._items[i], i, this._items[i]);
        if (value === false) {
          break;
        }
      }
    }

    this.map = function(callback, arg) {
      var value, i = 0, length = this.length, ret = [];
      for (; i < length; i++) {
        value = callback(this._items[i], i, arg);
        if (value != null) {
          ret[ret.length] = value;
        }
      }
      return [].concat(ret);
    }

    this.clear = function() {
      this._items = new Array();
      this._keys = {};
      this.length = 0;
    }
  }
  var dar = function(server) {
    this.server = server;
    this.items = {};
    this.filters = {};
    this.members = new UniqIndexedList('id');
    this.dataList = new UniqIndexedList('id');
    this.formList = new UniqIndexedList('id');
    this.saveOptions = {
      contentType : "application/json",
      processData : false,
      type : "post",
      async : true,
      dataType : "json",
      headers : {
        sat : s.sat
      },
      success : function(data) {
        if (data !== 0) {
          $.ajaxError(data);
        }
      }
    }
    this.page = function(bname, params) {
      var $this = this, d = $.Deferred();
      $.ajax({
        url : $this.server + "/contact/crm/" + bname + "/list/page",
        data : params,
        headers : {
          sat : s.sat
        }
      }).then(function(data) {
        if (data.status === 0) {
          d.resolve(data);
        } else {
          $.ajaxError(data);
          d.reject();
        }
      });
      return d;
    }
    this.save = function(bname, item, options) {
      var $this = this;
      $.ajax($.extend({
        url : $this.server + "/contact/crm/" + bname,
        data : JSON.stringify(item)
      }, $this.saveOptions, options));
    }
    this.remove = function(bname, objs, options) {
      var $this = this;
      var data = ($.isArray(objs) ? (JSON.stringify(objs)) : ('[' + JSON.stringify(objs) + ']'));
      $.ajax($.extend({
        url : $this.server + "/contact/crm/" + bname + "/list/delete",
        contentType : "application/json",
        processData : false,
        type : "delete",
        async : true,
        dataType : "json",
        data : data,
        headers : {
          sat : s.sat
        },
        success : function(data) {
          if (data !== 0) {
            $.ajaxError(data);
          } else {
            $.msg("删除成功！", true);
          }
        }
      }, options));
    }
    this.update = function(bname, id, fields) {
      var $this = this, d = $.Deferred();
      var data = ($.isArray(fields) ? (JSON.stringify(fields)) : ('[' + JSON.stringify(fields) + ']'));
      $.ajax({
        url : $this.server + '/contact/crm/' + bname + '/' + id + '/fields',
        contentType : "application/json",
        processData : false,
        type : "post",
        dataType : "json",
        headers : {
          sat : s.sat
        },
        data : data
      }).then(function(data) {
        if (data.status === 0) {
          $.msg("保存成功！", true);
          d.resolve();
        } else {
          d.reject(data.msg || '系统发生未知异常');
        }
      }, function() {
        $.msg('网络异常，请稍后再试！', false);
        d.reject('网络异常，请稍后再试！');
      });
      return d.promise();
    }

    this.updateCustomer = function(id, fields) {
      var $this = this, d = $.Deferred();
      var data = ($.isArray(fields) ? (JSON.stringify(fields)) : ('[' + JSON.stringify(fields) + ']'));
      $.ajax({
        url : $this.server + '/contact/crm/customer/' + id + '/modifyCustomer',
        contentType : "application/json",
        processData : false,
        type : "put",
        dataType : "json",
        headers : {
          sat : s.sat
        },
        data : data
      }).then(function(data) {
        if (data.status === 0) {
          $.msg("保存成功！", true);
          d.resolve();
        } else {
          d.reject(data.msg || '系统发生未知异常');
        }
      }, function() {
        $.msg('网络异常，请稍后再试！', false);
        d.reject('网络异常，请稍后再试！');
      });
      return d.promise();
    }
    
    
    this.getObjs = function(bname, params, success) {
      var $this = this;
      $.ajax({
        url : $this.server + '/contact/crm/' + bname + '/list/page',
        type : "POST",
        async : true,
        dataType : "json",
        headers : {
          sat : s.sat
        },
        data : $.extend({
          sortdatafield : '_id',
          sortorder : 'desc',
          pagenum : 0,
          pagesize : 100000
        }, params),
        success : success
      });
    }

    this.loadItems = function(bname, withVisibleItems) {
      var $this = this, d = $.Deferred();
      function items() {
        var dfd = $.Deferred();
        if ($this.items[bname] === undefined) {
          $.ajax({
            url : $this.server + "/contact/admin/businessItem/" + bname,
            type : "get",
            dataType : "json",
            headers : {
              sat : s.sat
            }
          }).then(function(data) {
            dfd.resolve(data);
          });
        } else {
          dfd.resolve();
        }
        return dfd.promise();
      }

      function visibleItems() {
        var dfd = $.Deferred();
        if (withVisibleItems && ($this.items[bname] === undefined || $this.items[bname]['withVisibleItems'] === undefined)) {
          $.ajax({
            url : $this.server + "/contact/crm/config/" + bname + ":grid:visibleItems",
            type : "get",
            dataType : "json",
            headers : {
              sat : s.sat
            }
          }).then(function(data) {
            dfd.resolve(data);
          });
        } else {
          dfd.resolve();
        }
        return dfd.promise();
      }

      $.when(items(), visibleItems()).then(function(res1, res2) {
        if (res1) {
          if (res1.status == 0) {
            var list = new UniqIndexedList('name');
            list.addAll(res1.result);
            $this.items[bname] = list;
          } else {
            $.ajaxError(res1);
          }
        }
        if (res2) {
          if (res2.status == 0) {
            $this._setGridVisibleItems(bname, res2.result);
            $this.items[bname]['withVisibleItems'] = withVisibleItems;
          } else {
            $.ajaxError(res1);
          }
        }
        d.resolve($this.items[bname]);
      });
      return d.promise();
    }
    this.getItems = function(bname) {
      return this.items[bname];
    }
    this.loadFilter = function(bname, id) {
      var $this = this, d = $.Deferred();
      $.ajax({
        url : $this.server + "/contact/crm/filter/" + id,
        type : "get",
        dataType : "json",
        headers : {
          sat : s.sat
        }
      }).then(function(data) {
        if (data.status == 0) {
          d.resolve(data);
        } else {
          $.ajaxError(data);
          d.reject();
        }
      });
      return d.promise();
    }
    this.loadFilters = function(bname) {
      var $this = this, d = $.Deferred();
      if ($this.filters[bname] === undefined) {
        $.ajax({
          url : $this.server + "/contact/crm/filter/list?business=" + bname,
          type : "get",
          dataType : "json",
          headers : {
            sat : s.sat
          }
        }).then(function(data) {
          if (data.status == 0) {
            $this.filters[bname] = $.merge($this.getSysFilters(bname), data.result);
            d.resolve($this.filters[bname]);
          } else {
            $.ajaxError(data);
            d.reject();
          }
        });
      }
      return d.promise();
    }
    this.getSysFilters = function(bname) {
      if (bname === 'customer') {
        return [ {
          conds : [],
          name : "所有公司",
          sys : true,
          id : '2'
        } ]
      }else if (bname === 'lead') {
        return [ {
          conds : [],
          name : "所有线索",
          sys : true,
          id : '2'
        } ]
      } else if (bname === 'contact') {
        return [ {
          conds : [],
          name : "所有联系人",
          sys : true,
          id : '2'
        } ]
      } else if (bname === 'opportunity') {
        return [ {
          conds : [],
          name : "所有机会",
          sys : true,
          id : '2'
        }, {
          conds : [ {
            item : "ownerId",
            type : 109,
            op : "IN",
            value : [ s.uid ]
          } ],
          name : "我负责的机会",
          sys : true,
          id : '1'
        } ]
      } else if (bname === 'contract') {
        return [ {
          conds : [],
          name : "所有合同",
          sys : true,
          id : '2'
        }, {
          conds : [ {
            item : "ownerId",
            type : 109,
            op : "IN",
            value : [ s.uid ]
          } ],
          name : "我负责的合同",
          sys : true,
          id : '1'
        } ]
      }
    }
    this.loadMembers = function() {
      var $this = this, d = $.Deferred();
      if ($this.members.length === 0) {
        $.ajax({
          url : $this.server + '/contact/crm/user/list',
          type : 'get',
          dataType : "json",
          headers : {
            sat : s.sat
          },
          data : {
            content : '',
            fields : [ 'userId', 'name' ]
          }
        }).then(function(data) {
          if (data.status == 0) {
            $.each(data.result, function(i, o) {
              $this.members.add({
                id : o.userId,
                name : o.name
              });
            });
            d.resolve($this.members);
          } else {
            $.ajaxError(data);
            d.reject();
          }
        });
      } else {
        d.resolve($this.members);
      }
      return d.promise();
    }
    this.loadForms = function() {
      var $this = this, d = $.Deferred();
      if ($this.formList.length === 0) {
        $.ajax({
          url : $this.server + '/contact/crm/contact/list/formList',
          type : 'get',
          dataType : "json",
          headers : {
            sat : s.sat
          },
          data : {
            fields : [ 'id', 'formName' ]
          }
        }).then(function(data) {
          if (data.status == 0) {
            $.each(data.result, function(i, o) {
              $this.formList.add({
                id : o.id,
                name : o.formName
              });
            });
            d.resolve($this.formList);
          } else {
            $.ajaxError(data);
            d.reject();
          }
        });
      } else {
        d.resolve($this.formList);
      }
      return d.promise();
    }
    this.loadData = function(path,fields) {
      var $this = this, d = $.Deferred();
      if ($this.dataList.length === 0) {
        $.ajax({
          url : $this.server + path,
          type : 'get',
          dataType : "json",
          headers : {
            sat : s.sat
          },
          data : {
          	content : '',
            fields : fields
          }
        }).then(function(data) {
          if (data.status == 0) {
            $.each(data.result, function(i, o) {
              $this.dataList.add({
                id : o.id,
                name : o.name
              });
            });
            d.resolve($this.dataList);
          } else {
            $.ajaxError(data);
            d.reject();
          }
        });
      } else {
        d.resolve($this.dataList);
      }
      return d.promise();
    }
    
    
    this.getMembers = function() {
      return this.members;
    }
    this.getDt = function(itemName, itemId, options) {
      var $this = this;
      $.ajax($.extend({
        url : $this.server + '/contact/blog/' + itemName + '/' + itemId,
        type : "get",
        async : true,
        dataType : "json",
        headers : {
          sat : s.sat
        },
        success : function(data) {}
      }, options));
    }
    this.saveDt = function(blog, options) {
      var $this = this;
      $.ajax($.extend({
        url : $this.server + '/contact/blog',
        data : JSON.stringify(blog),
      }, $this.saveOptions, options));
    }
    this.deleteFilter = function(bname, index, options) {
      var $this = this;
      $.ajax($.extend({
        url : $this.server + "/contact/crm/filter/" + $this.filters[bname][index].id,
        contentType : "application/json",
        processData : false,
        type : "delete",
        async : true,
        dataType : "json",
        headers : {
          sat : s.sat
        },
        success : function(data) {
          if (data !== 0) {
            $.ajaxError(data);
          } else {
            $.msg("删除成功！", true);
          }
        }
      }, options));
      $this.filters[bname].splice(index, 1);
    }
    this.saveFilter = function(bname, filter, index, options) {
      var $this = this;
      var i = parseInt(index);
      if (isNaN(i)) {
        if ($this.filters[bname] === undefined) {
          $this.filters[bname] = [];
        }
        filter.business = bname;
        $this.filters[bname].push(filter);
        $.ajax($.extend({
          url : $this.server + "/contact/crm/filter",
          contentType : "application/json",
          processData : false,
          type : "post",
          async : true,
          dataType : "json",
          data : JSON.stringify(filter),
          headers : {
            sat : s.sat
          },
          success : function(data) {
            if (data.status === 0) {
              filter.id = data.result.id;
              $.msg("保存成功！", true);
            } else {
              $.ajaxError(data);
            }
          }
        }, options));
      } else {
        $this.filters[bname][i].name = filter.name;
        $this.filters[bname][i].conds = filter.conds;
        $.ajax($.extend({
          url : $this.server + "/contact/crm/filter/" + $this.filters[bname][i].id,
          contentType : "application/json",
          processData : false,
          type : "put",
          async : true,
          dataType : "json",
          data : JSON.stringify($this.filters[bname][i]),
          headers : {
            sat : s.sat
          },
          success : function(data) {
            if (data.status === 0) {
              $.msg("保存成功！", true);
            } else {
              $.ajaxError(data);
            }
          }
        }, options));
      }
    }
    this._setGridVisibleItems = function(bname, visibleItems) {
      var set = {};
      $.each(visibleItems, function(index, item) {
        set[item] = index;
      })
      this.items[bname].each(function(index, item) {
        if (set[item.name] === undefined) {
          delete item.gridVisibleOrder;
        } else {
          item.gridVisibleOrder = set[item.name];
        }
      });
    }
    this.saveGridVisibleItems = function(bname, visibleItems, options) {
      var $this = this;
      $this._setGridVisibleItems(bname, visibleItems);
      $.ajax($.extend({
        url : $this.server + "/contact/crm/config/" + bname + ":grid:visibleItems",
        contentType : "application/json",
        processData : false,
        type : "put",
        async : true,
        dataType : "json",
        data : JSON.stringify(visibleItems),
        headers : {
          sat : s.sat
        },
        success : function(data) {
          if (data.status === 0) {
            $.msg("设置成功！", true);
          } else {
            $.ajaxError(data);
          }
        }
      }, options));
    }
    this.transfer = function(bname, ids, ownerId, newOwnerId, options) {
      var $this = this;
      var data = {
        ids : [],
        ownerId : ownerId,
        newOwnerId : newOwnerId
      }
      if ($.isArray(ids)) {
        $.merge(data.ids, ids);
      } else if (typeof ids === 'string') {
        data.ids.push(ids);
      } else {
        return;
      }
      $.ajax($.extend({
        url : $this.server + '/contact/crm/' + bname + '/list/transfer',
        data : JSON.stringify(data)
      }, $this.saveOptions, options));
    }

    this.getGroupById = function(id, options) {
      var $this = this, d = $.Deferred();
      $.ajax({
        url : $this.server + "/contact/crm/group/" + id,
        type : "get",
        async : true,
        dataType : "json",
        headers : {
          sat : s.sat
        }
      }).then(function(data) {
        if (data.status == 0) {
          d.resolve(data.result);
        } else {
          $.ajaxError(data);
          d.reject();
        }
      })
      return d.promise();
    }

    this.removeDataByGroup = function(groupType, groupId, objs, options) {
      var $this = this;
      var data = ($.isArray(objs) ? (JSON.stringify(objs)) : ('[' + JSON.stringify(objs) + ']'));
      $.ajax($.extend({
        url : $this.server + "/contact/crm/group/remove/" + groupType + "/" + groupId,
        contentType : "application/json",
        processData : false,
        type : "put",
        async : true,
        dataType : "json",
        data : data,
        headers : {
          sat : s.sat
        },
        success : function(data) {}
      }, options));
    }

    this.getGroupByType = function(groupType) {
      var $this = this;
      $.ajax({
        url : $this.server + "/contact/crm/group/type/t2?groupType=" + groupType,
        type : "get",
        async : false,
        dataType : "json",
        headers : {
          sat : s.sat
        },
        success : function(data) {
          if (data.status == 0) {
            $this.items.groupLists = data.result;
          } else {
            $.ajaxError(data);
          }
        }
      });
      return $this.items.groupLists;
    }

    this.dataToNewGroup = function(datas, groupType, options) {
      var $this = this;
      $.ajax($.extend({
        url : $this.server + "/contact/crm/group/togroup/" + groupType + "/" + id,
        contentType : "application/json",
        type : "put",
        processData : false,
        async : true,
        dataType : "json",
        data : JSON.stringify(datas),
        headers : {
          sat : s.sat
        },
        success : function(data) {}
      }, options));
    }

    this.getGroupType = function(groupType) {
      var $this = this;
      var groupList;
      $.ajax({
        url : $this.server + "/contact/crm/group/groupType/" + groupType,
        contentType : "application/json",
        type : "get",
        async : false,
        dataType : "json",
        headers : {
          sat : s.sat
        },
        success : function(data) {
          if (data.status === 0) {
            groupList = data.result;
          } else {
            $.ajaxError(data);
          }
        }
      });
      return groupList;
    }
  };
  $.extend(true, {
    yxb : {
      util : {
        getDar : function() {
          return $(document).getWithData('dar', function() {
            return new dar(window.dataapi);
          });
        },
        getS : function() {
          return s;
        }
      }
    }
  });
});
