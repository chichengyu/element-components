<template>
    <div class="file-upload">
        <el-upload :name="name" class="avatar-uploader"
            :action="action"
            :show-file-list="showFileList"
            :disabled="disabled"
            :auto-upload="autoUpload"
            :accept="accept"
            :headers="headers"
            :file-list="fileImageList"
            :data="data"
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
            default:() => {}
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
        params:[String,Number,Object,Array]
    },
    data() {
        return {
            visible: false,
            headers:{token:this.$store.getters.userInfo.token||'1231321'},
            fileImageList:[]
        };
    },
    methods: {
        handleBefore(file){
            this.$emit('before',file,this.params);
        },
        handleSuccess(response, file, fileList){
            this.fileImageList = fileList;
            this.$emit('success',response, file, fileList,this.params);
        },
        handleError(err, file, fileList){
            this.$emit('error',err, file, fileList,this.params);
        }
    }
}
</script>

<style lang="css" scoped>

</style>