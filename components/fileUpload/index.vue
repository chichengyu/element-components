<template>
    <div class="file-upload">
        <el-upload ref="fileUpload" :name="name" class="avatar-uploader"
            :action="action"
            :show-file-list="showFileList"
            :disabled="disabled"
            :auto-upload="autoUpload"
            :accept="accept"
            :headers="headers"
            :file-list="fileImageList"
            :data="data"
            :http-request="httpRequest"
            :before-upload="handleBefore"
            :on-success="handleSuccess"
            :on-error="handleError">
            <el-button :size="size" type="primary">{{ title }}</el-button>
        </el-upload>
    </div>
</template>

<script>
export default {
    name: "File-upload",
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
        accept:{
            type:String,
            default:'.xlsx'
        },
        data:{
            type:Object,
            default:function () {return {};}
        },
        httpRequest:{
            type:Function,
            default:function () {return function(){};}
        },
        autoUpload:{
            type:Boolean,
            default:true
        },
        showFileList:{
            type:Boolean,
            default:false
        },
        title:{
            type:String,
            default:'上传'
        },
        size:{
            type:String,
            default:'small'
        },
        headers:{
            type:Object,
            default:function () {return {};}
        },
        params:[String,Number,Object,Array]
    },
    data:function() {
        return {
            visible: false,
            fileImageList:[]
        };
    },
    methods: {
        handleBefore:function(file){
            return this.$emit('before',file,this.$refs.fileUpload,this.params);
        },
        handleSuccess:function(response, file, fileList){
            this.fileImageList = fileList;
            this.$emit('success',response, file,this.$refs.fileUpload, fileList,this.params);
        },
        handleError:function(err, file, fileList){
            this.$emit('error',err, file,this.$refs.fileUpload, fileList,this.params);
        }
    }
}
</script>

<style lang="css" scoped>

</style>