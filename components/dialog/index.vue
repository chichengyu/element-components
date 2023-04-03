<template>
    <el-dialog ref="dialog" :modal="modal"
        :title="title"
        :visible.sync="$attrs.visible"
        :width="'number'==typeof width?width+'%':width"
        :close-on-click-modal="closeOnClickModal"
        :append-to-body="appendToBody"
        :before-close="handleBeforeClose"
        :destroy-on-close="true">
        <div v-if="header" slot="title" class="dialog-header-title">
          <slot name="header"></slot>
        </div>
        <slot name="dialog"></slot>
        <div v-if="footer" slot="footer" class="dialog-footer">
            <el-button :size="footerBtnSize" @click="handleDialog('cancel',1)">取 消</el-button>
            <el-button :size="footerBtnSize" type="primary" @click="handleDialog('ok',2)">确 定</el-button>
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
        modal:{
            type:Boolean,
            default: true
        },
        header:{
            type:Boolean,
            default: false
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
            if (type==1){
                this.beforeCancel(this.$refs.dialog);
                this.$emit('cancel',this.$refs.dialog);
            }
            if (type==2){
                this.beforeOk(this.$refs.dialog);
                this.$emit('ok',this.$refs.dialog);
            }
            if(this.$parent.hasOwnProperty(key)){
                this.$parent[key](this.$refs.dialog);
            }
            this.$emit('update:visible',false);
        }
    }
};
</script>

<style lang="css" scoped>
.el-dialog__wrapper >>>.el-dialog__body{
    overflow: hidden;
}
</style>
