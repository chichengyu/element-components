import ElementUI from "element-ui";
export var message = function (msg) {
    ElementUI.Message({
        message: msg,
        center: true
    });
};
export var warning = function (msg) {
    ElementUI.Message({
        message: msg,
        type: 'warning',
        center: true
    });
};
export var success = function (msg) {
    ElementUI.Message({
        message: msg,
        type: 'success',
        center: true
    });
};
export var error = function (msg) {
    ElementUI.Message({
        message: msg,
        type: 'error',
        center: true
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