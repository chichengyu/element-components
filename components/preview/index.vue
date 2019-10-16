<template>
    <div class="preivew" style="display:inline-block;margin-right:6px;vertical-align:middle;">
        <img :src="src" :width="width" :height="height" :title="title" @click="visible=true" style="cursor: pointer">
        <el-dialog
            :title="title"
            :visible.sync="visible"
            :close-on-click-modal="false"
            :append-to-body="appendToBody">
            <img :src="src" width="100%" height="100%" alt="">
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:'Preview',
    props:{
        src:{
            type:String,
            required:true
        },
        width:{
            type:Number,
            default:58
        },
        height:{
            type:Number,
            default:58
        },
        title:{
            type:String,
            default: '预览'
        },
        appendToBody:{
            type:Boolean,
            default: false
        }
    },
    data:function() {return {visible:false}}
}
</script>

<style lang="css" scoped>

</style>