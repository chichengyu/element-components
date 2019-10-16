import ElementUI from "element-ui";
export var message = function (msg,callback,duration) {
    if (!duration)duration=3000;
    ElementUI.Message({
        message: msg,
        center: true,
        duration:duration,
        onClose:function () {return callback && callback()}
    });
};
export var warning = function (msg,callback,duration) {
    if (!duration)duration=3000;
    ElementUI.Message({
        message: msg,
        type: 'warning',
        center: true,
        duration:duration,
        onClose:function () {return callback && callback()}
    });
};
export var success = function (msg,callback,duration) {
    if (!duration)duration=3000;
    ElementUI.Message({
        message: msg,
        type: 'success',
        center: true,
        duration:duration,
        onClose:function () {return callback && callback()}
    });
};
export var error = function (msg,callback,duration) {
    if (!duration)duration=3000;
    ElementUI.Message({
        message: msg,
        type: 'error',
        center: true,
        duration:duration,
        onClose:function () {return callback && callback()}
    });
};
export var confirm = function (title,success,error,options,content) {
    if (!options)options={};
    if (!content)content='';
    ElementUI.MessageBox.confirm(content, title, Object.assign({
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: 'center',
    },options)).then(function(){
        return success && success();
    }).catch(function(){
        return error && error();
    });
};