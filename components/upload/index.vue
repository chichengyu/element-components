<template>
    <div class="upload">
        <el-upload ref="upload" :name="name" class="avatar-uploader"
            :action="action"
            :disabled="disabled"
            :list-type="listType"
            :auto-upload="autoUpload"
            :multiple="multiple"
            :accept="accept"
            :headers="headers"
            :file-list="fileImageList"
            :data="data"
            :http-request="httpRequest"
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
                    <span v-if="del" class="el-upload-list__item-delete" style="margin-left:6px" @click="handleRemove(file,$event)">
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
        more:{
            type:Boolean,
            default: false
        },
        del:{
            type:Boolean,
            default: true
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
        httpRequest:{
            type:Function,
            default:function () {return function(){};}
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
        handleRemove:function(file,e) {
            var target = e.currentTarget.parentNode.parentNode.parentNode,index = null;
            target.parentNode.children && (index = Array.prototype.indexOf.call(target.parentNode.children,target));
            target.parentNode.removeChild(target);
            this.$emit('remove',file,this.$refs.upload,this.fileImageList,this.params,index);
        },
        handlePictureCardPreview:function(file) {
            this.dialogImageUrl = file.url;
            this.visible = true;
        },
        handleBefore:function(file){
            var parent = this.$refs.upload.$children[0].$el;
            !this.more && parent.childElementCount>0 && parent.removeChild(parent.children[0]);
            return this.$emit('before',file,this.$refs.upload,this.params);
        },
        handleSuccess:function(response, file, fileList){
            this.fileImageList = fileList;
            this.$emit('success',response,file,this.$refs.upload,fileList,this.params);
        },
        handleError:function(err, file, fileList){
            this.$emit('error',err, file,this.$refs.upload, fileList,this.params);
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