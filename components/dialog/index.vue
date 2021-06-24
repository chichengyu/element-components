<template>
    <el-dialog ref="dialog"
        :title="title"
        :visible.sync="$attrs.visible"
        :width="'number'==typeof width?width+'%':width"
        :close-on-click-modal="closeOnClickModal"
        :append-to-body="appendToBody"
        :before-close="handleBeforeClose"
        :destroy-on-close="true">
        <slot name="dialog"></slot>
        <div v-if="footer" slot="footer" class="dialog-footer">
            <el-button :size="footerBtnSize" @click="handleDialog('handleCancel',1)">取 消</el-button>
            <el-button :size="footerBtnSize" type="primary" @click="handleDialog('handleOk',2)">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            required: true
        },
        width:{
            type:[Number,String],
            default:30
        },
        footer:{
            type:Boolean,
            default: true
        },
        footerBtnSize:{
            type:String,
            default: ""
        },
        closeOnClickModal:{
            type:Boolean,
            default: false
        },
        appendToBody:{
            type:Boolean,
            default: false
        },
        beforeClose:{
            type:Function,
            default:function () {return function () {}}
        },
        beforeCancel:{
            type:Function,
            default:function () {return function () {}}
        },
        beforeOk:{
            type:Function,
            default:function () {return function () {}}
        }
    },
    methods: {
        handleBeforeClose:function(done) {
            this.beforeClose(this.$refs.dialog,done);
            this.$emit('update:visible',false);
            done();
        },
        handleDialog:function(key,type){
            type==1 && this.beforeCancel(this.$refs.dialog);
            type==2 && this.beforeOk(this.$refs.dialog);
            this.$parent.hasOwnProperty(key) && this.$parent[key](this.$refs.dialog);
            this.$emit('update:visible',false);
        }
    }
};
</script>

<style lang="css" scoped>

</style>