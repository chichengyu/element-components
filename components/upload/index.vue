<template>
    <div class="upload">
        <el-upload :name="name" class="avatar-uploader"
            :action="action"
            :disabled="disabled"
            :list-type="listType"
            :auto-upload="autoUpload"
            :multiple="multiple"
            :accept="accept"
            :headers="headers"
            :file-list="fileImageList"
            :data="data"
            :before-upload="handleBefore"
            :on-success="handleSuccess"
            :on-error="handleError">
            <i slot="default" class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" width="100%" height="100%">
                <span class="el-upload-list__item-actions" style="font-size: unset">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                        <i class="el-icon-zoom-in"></i>
                    </span>
                    <span class="el-upload-list__item-delete" style="margin-left: 6px" @click="handleRemove(file)">
                        <i class="el-icon-delete"></i>
                    </span>
                </span>
            </div>
        </el-upload>
        <el-dialog title="预览" :visible.sync="visible" :append-to-body="appendToBody">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "Upload",
    props:{
        name:{
            type:String,
            default:'file',
        },
        disabled:{
            type:Boolean,
            default: false
        },
        action:{
            type:String,
            requred:true
        },
        listType:{
            type:String,
            default:'picture-card'
        },
        multiple:{
            type:Boolean,
            default:false
        },
        accept:{
            type:String,
            default:'.jpg,.jpeg,.png'
        },
        data:{
            type:Object,
            default:function () {return {};}
        },
        headers:{
            type:Object,
            default:function () {return {};}
        },
        previewImages:[String,Array],
        autoUpload:{
            type:Boolean,
            default:true
        },
        appendToBody:{
            type:Boolean,
            default:false
        },
        params:[String,Number,Object,Array],
    },
    data:function() {
        return {
            dialogImageUrl: '',
            visible: false,
            fileImageList:[]
        };
    },
    watch:{
        previewImages:{
            immediate:true,
            handler:function(val){
                if (val){
                    var type = typeof val;
                    if (type == 'string'){
                        this.fileImageList = [{name:'01',url:val}];
                    }else if (type == 'object'){
                        var arr = [];
                        for (var key in val) {
                            arr.push({name:key,url:val[key]});
                        }
                        this.fileImageList = arr;
                    }
                }
            }
        },
    },
    methods: {
        handleRemove:function(file) {
            this.$emit('remove',file,this.fileImageList,this.params,function(){
                this.fileImageList.includes(file) && this.fileImageList.splice(this.fileImageList.indexOf(file),1)
            },function(delImageUrl,params,callBack,type,header){
                if (!type)type='post';
                if (!header)header={};
                if (delImageUrl && params) {
                    this.axios.request({
                        url:delImageUrl,
                        method:type,
                        headers:header,
                        data:params
                    }).then(function(res){
                        if (res.data.code == 1){
                            this.fileImageList.includes(file) && this.fileImageList.splice(this.fileImageList.indexOf(file),1);
                            this.success('删除成功！');
                        }else{
                            this.error('删除失败！');
                        }
                        return callBack && callBack(res);
                    }).catch(function(err){
                        return Promise.reject('删除失败！',err);
                    });
                }else{
                    throw new Error('两个参数：接口地址或与数据必须传递！');return;
                }
            });
        },
        handlePictureCardPreview:function(file) {
            this.dialogImageUrl = file.url;
            this.visible = true;
        },
        handleBefore:function(file){
            return this.$emit('before',file,this.params);
        },
        handleSuccess:function(response, file, fileList){
            this.fileImageList = fileList;
            this.$emit('success',response, file, fileList,this.params,function(success,error){
                if (response.code == 1){
                    this.success('上传成功！');
                    return success && success();
                }else{
                    this.error('上传失败！');
                    return error && error();
                }
            });
        },
        handleError:function(err, file, fileList){
            this.$emit('error',err, file, fileList,this.params);
        }
    }
}
</script>

<style lang="css" scoped>
.upload >>> .el-upload-list--picture-card .el-upload-list__item{
    width: 58px;
    height: 58px;
}
.upload >>> .el-upload-list--picture-card .el-upload-list__item > div{
    width: 100%;
    height: 100%;
}
.upload >>> .el-upload.el-upload--picture-card{
    width: 58px;
    height: 58px;
    line-height: 58px;
}
.avatar-uploader-icon{
    width: 100%;
    height: 100%;
}
.el-upload-list__item-thumbnail{
    width: 100% !important;
    height: 100% !important;
}
</style>