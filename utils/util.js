export default {
    /**
     * 创建临时 blob 流预览路径
     * @param file 文件对象
     * @param callback 回调
     */
    createFileBlobReadUrl:function(file, callback){
        if (file) {
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = (e) => callback && callback(e);
        }
    },
    /**
     * 任意长度的随机字符
     * @param length 指定长度（不传，默认任意长度）
     * @returns {string}
     */
    randomNumber:function(length){
        var str = '', range = length || Math.round(Math.random() * 100), arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        for (var i = 0; i < range; i++) {
            str += arr[Math.round(Math.random() * (arr.length - 1))];
        }
        return str;
    },
    /**
     * 对象属性复制
     * @param source 源对象
     * @param dest 目标对象
     * @returns {{}} 返回复制失败的属性新对象
     */
    objectCopy:function(source, dest){
        var obj = {};
        if (source && dest) {
            for (var key in dest) {
                if (key in source) {
                    dest[key] = source[key];
                } else {
                    obj[key] = source[key];
                }
            }
        }
        return obj;
    },
    /**
     * get参数处理
     * @param data
     * @returns {string}
     */
    handleGetParams:function(data){
        var searchWords = '', count = 0;
        if (data) {
            for (var key in data) {
                if (data[key] !== '' && data[key] !== null && data[key] !== 'undefined') {
                    searchWords += (count === 0 ? '?' : '&') + key + '=' + data[key];
                    count++;
                }
            }
        }
        return searchWords;
    },
    /**
     * 设置与获取缓存
     * @param key
     * @param val
     * @returns {string|any|void}
     */
    cache:function(key, val){
        if (val) return localStorage.setItem(key, JSON.stringify(val));
        var item = localStorage.getItem(key);
        if (item) return JSON.parse(item);
        return item;
    },
    /**
     * 移除缓存
     */
    cacheRemove:function(key){
        return localStorage.removeItem(key);
    },
    /**
     * 点击复制内容
     * @param dom dom节点 var dom=document.getElementById("linkText");
     * @param callback 回调
     * @param error 错误回调
     */
    clipboard:function(dom,callback,error){
        try {
            dom.focus();
            var selection;
            var rg;
            if(window.getSelection){
                selection=window.getSelection();
            }else{
                rg=document.selection.createRange();
            }
            if(rg){
                rg.moveToElementText(dom);
                rg.select();
            }else{
                selection.selectAllChildren(dom);
            }
            //第二个参数必须为false，不然firfox执行不成功。
            document.execCommand("copy", false);
            selection?selection.removeAllRanges():rg.collapse();
            dom.blur();
            setTimeout(function () {
                callback && callback(dom);
            });
        }catch (e) {
            console.log('%c ! clipboard catch', 'background:#000;color:#bada55',e);
            error && error(e);
        }
    },
    /**
     * 时间格式化
     * @param partten yyy
     * @param split
     * @returns {string|number}
     */
    formatDatetime:function (date,partten, split){
        if (date == '' || date == null || date == undefined)return;
        partten = partten || 'yyyy-MM-dd';
        split = split || '';
        var date = new Date(date),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hh = date.getHours(),
            mm = date.getMinutes(),
            ss = date.getSeconds();
            month = month > 9 ? month : ('0' + month);
            day = day > 9 ? day : ('0' + day);
            hh = hh > 9 ? hh : ('0' + hh);
            mm = mm > 9 ? mm : ('0' + mm);
            ss = ss > 9 ? ss : ('0' + ss);
        if (partten == 'yyyy') {
            return year;
        } else if (partten == ('yyyy' + split + 'MM')) {
            return year + split + month;
        } else if (partten == 'yyyy' + split + 'MM' + split + 'dd') {
            return year + split + month + split + day;
        } else if (partten == 'yyyy' + split + 'MM' + split + 'dd HH') {
            return year + split + month + split + day + ' ' + hh;
        } else if (partten == 'yyyy-MM-dd HH:mm') {
            return year + split + month + split + day + ' ' + hh + split + mm;
        } else if (partten == 'yyyy-MM-dd HH:mm:ss') {
            return year + split + month + split + day + ' ' + hh + split + mm + split + ss;
        }else {
            return year + split + month + split + day + hh + split + mm + split + ss;
        }
    },
    /**
     * excel流导出
     * @param axios     axios对象
     * @param fileName  文件名称
     * @param options   axios参数
     * @param isCustom  是否自定义导出
     * @returns {Promise<unknown>}
     */
    exportExcel:function(axios,fileName,options,isCustom){
        //options.responseType = "blob";// 表明返回服务器返回的数据类型
        options.headers && !options.headers.ContentType && (options.headers.ContentType = "application/json;charset=UTF-8");
        return new Promise((resolve,reject) => {
            axios(Object.assign({responseType:"blob"},options)).then((response) => {
                resolve(response.data);
                if (isCustom){
                    return;
                }
                var blob = new Blob([response.data],{type: "application/vnd.ms-excel",});
                fileName = fileName.toString().indexOf(".") > -1 ? fileName : fileName + ".xls";
                if (window.navigator.msSaveOrOpenBlob) {
                    navigator.msSaveBlob(blob, fileName);
                } else {
                    var link = document.createElement("a");
                    link.href = window.URL.createObjectURL(blob);
                    link.download = fileName;
                    link.click();
                    //释放内存
                    window.URL.revokeObjectURL(link.href);
                }
            }, (err) => {
                console.log('%c ! Export Error', 'background:#000;color:#bada55', err);
                reject(err);
            }).catch(err => {
                console.log('%c ! Export Catch', 'background:#000;color:#bada55', err);
                reject(err);
            });
        });
    }
}