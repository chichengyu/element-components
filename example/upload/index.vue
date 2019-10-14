<template>
    <div style="">
        <!-- appendToBody 是否嵌套 默认 false ,嵌套的 Dialog 必须指定该属性并赋值为 true-->
        <!-- 单张 -->
        <component-upload :action="'#'" :previewImages="url" :params="{name:'小二'}" :appendToBody="false"
            @before="handleBefore"
            @success="handleSuccess"
            @remove="handleRemove">
        </component-upload>

        <hr>

        <!-- 多张 -->
        <component-upload :action="action" :previewImages="images" :multiple="true"
            @before="handleBefore"
            @success="handleSuccess"
            @remove="handleRemove" :autoUpload="true">
        </component-upload>

        <!-- 文件上传 -->
        <component-file-upload :action="actionFileUploadUrl" :size="'default'" :title="'导入'" @before="handleExcelBefore" @success="handleExcelbSuccess" @error="handleExcelError" :params="{name:'小二'}"></component-file-upload>

    </div>
</template>

<script>
export default {
    name: "Upload",
    data () {
        return {
            url:'http://p1.meituan.net/wedding/b8a49d1f1b3eb3d4e9eefcddb67bd16b166188.jpg%40watermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
            images:[
                'http://p1.meituan.net/wedding/b8a49d1f1b3eb3d4e9eefcddb67bd16b166188.jpg%40watermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                'http://p1.meituan.net/wedding/b8a49d1f1b3eb3d4e9eefcddb67bd16b166188.jpg%40watermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                'http://p1.meituan.net/wedding/b8a49d1f1b3eb3d4e9eefcddb67bd16b166188.jpg%40watermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                'http://p1.meituan.net/wedding/b8a49d1f1b3eb3d4e9eefcddb67bd16b166188.jpg%40watermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                'http://p1.meituan.net/wedding/b8a49d1f1b3eb3d4e9eefcddb67bd16b166188.jpg%40watermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
            ],
            action:'',
            actionFile:'',
            actionFileUploadUrl:''
        }
    },
    methods:{
        handleBefore(file,params){
            console.log(file);
        },
        handleSuccess(response, file, fileList,params,callback){
            console.log(response);
            /** callback 上传完成提示后的回调
             * 参数一：上传成功后的回调
             * 参数二：上传失败后的回调
             * callBack(() => {},() => {})
             */
            callback(() => {
                console.log('上传成功后的逻辑');
            },() => {
                console.log('上传失败后的逻辑');
            });
        },
        handleRemove(file,fileImageList,params,callBack,autoRequestCallBack){
            console.log('删除图片',file);
            console.log(fileImageList);
            console.log(params);
            // fileImageList 已显示的图片列表数组，可以执行如代码进行删除显示图片，fileImageList.includes(file) && fileImageList.splice(fileImageList.indexOf(file),1);
            // callBack 函数，执行后 删除界面上看到的图片列表
            /** autoRequestCallBack 函数，执行后自动请求服务器删除界面上看到的图片列表
             * post方式,接收辆个个参数
             * 参数一：为要删除的图片服务器接口
             * 参数二：为要传递的数据
             * 参数三：为要请求后，可能需要做的逻辑处理，默认 function
             * 参数四：为要请求接口的方式，默认post
             * 参数五：为要设置的请求头，默认 {}
             */
        },
        handleExcelBefore(file,params){
            console.log(params);
        },
        handleExcelbSuccess(response, file, fileList,params){
            console.log(params,params);
        },
        handleExcelError(response, file, fileList,params){
            tconsole.log(params);
        },
    }
}
</script>

<style lang="css" scoped>

</style>