import ElementUI from "element-ui";
export const message = function (msg) {
    ElementUI.Message({
        message: msg,
        center: true
    });
};
export const warning = function (msg) {
    ElementUI.Message({
        message: msg,
        type: 'warning',
        center: true
    });
};
export const success = function (msg) {
    ElementUI.Message({
        message: msg,
        type: 'success',
        center: true
    });
};
export const error = function (msg) {
    ElementUI.Message({
        message: msg,
        type: 'error',
        center: true
    });
};
export const confirm = function (title,success,error,options={},content='') {
    ElementUI.MessageBox.confirm(content, title, Object.assign({
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: 'center',
    },options)).then(() => {
        return success && success();
    }).catch(() => {
        return error && error();
    });
};