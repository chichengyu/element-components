import ElementUI from "element-ui";
export var message = function (msg,callback,duration) {
    if (!duration)duration=3000;
    ElementUI.Message({
        message: msg,
        center: true,
        duration:duration,
        onClose:function (instance) {return callback && callback(instance)}
    });
};
export var warning = function (msg,callback,duration) {
    if (!duration)duration=3000;
    ElementUI.Message({
        message: msg,
        type: 'warning',
        center: true,
        duration:duration,
        onClose:function (instance) {return callback && callback(instance)}
    });
};
export var success = function (msg,callback,duration) {
    if (!duration)duration=3000;
    ElementUI.Message({
        message: msg,
        type: 'success',
        center: true,
        duration:duration,
        onClose:function (instance) {return callback && callback(instance)}
    });
};
export var error = function (msg,callback,duration) {
    if (!duration)duration=3000;
    ElementUI.Message({
        message: msg,
        type: 'error',
        center: true,
        duration:duration,
        onClose:function (instance) {return callback && callback(instance)}
    });
};
export var alert = function (title,success,error,options,content) {
    if (!options)options={};
    if (!content)content='';
    ElementUI.MessageBox.alert(content, title, Object.assign({
        confirmButtonText: '确定',
        type: 'warning',
        center: true,
    },options)).then(function(val){
        return success && success(val);
    }).catch(function(val){
        return error && error(val);
    });
};
export var prompt = function (title,success,error,options,content) {
    if (!options)options={};
    if (!content)content='';
    ElementUI.MessageBox.prompt(content, title, Object.assign({
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
    },options)).then(function(val){
        return success && success(val);
    }).catch(function(val){
        return error && error(val);
    });
};
export var confirm = function (title,success,error,options,content) {
    if (!options)options={};
    if (!content)content='';
    ElementUI.MessageBox.confirm(content, title, Object.assign({
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
    },options)).then(function(val){
        return success && success(val);
    }).catch(function(val){
        return error && error(val);
    });
};