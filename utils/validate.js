import regexp from './regexp.js'
var validate = {
    isEmpty:function(obj){
        if(typeof obj == "undefined" || obj == null || obj == ""){
            return true;
        }
        return false;
    },
    extend:function (reg,val,callback,msg) {
        if (!msg)msg='';
        if(reg.test(val)){
            return callback();
        }
        return callback(new Error(msg));
    }
};
for (var key in regexp){
    validate['is'+key.replace(key[0],key[0].toUpperCase())] = function(val){
        if (val && regexp[key].test(val)) {
            return true;
        }
        return false;
    }
}
export default Object.assign(regexp,validate);
