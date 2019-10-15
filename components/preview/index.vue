<template>
    <el-dialog
        :title="title"
        :visible.sync="visibled"
        :width="width+'%'"
        :close-on-click-modal="false"
        :append-to-body="appendToBody"
        :before-close="handleClose">
        <img :src="src" width="100%" height="100%" alt="">
    </el-dialog>
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
            default:30
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
    data:function() {return {};},
    computed:{
        visibled:{
            get:function(){
                return this.$attrs.visible;
            },
            set:function(){}
        }
    },
    methods: {
        handleClose:function(done) {
            this.$emit('update:visible',false);
            done();
        }
    }
}
</script>

<style lang="css" scoped>

</style>