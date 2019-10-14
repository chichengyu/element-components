<template>
    <el-dialog
        :title="title"
        :visible.sync="$attrs.visible"
        :width="width+'%'"
        :close-on-click-modal="close"
        :append-to-body="appendToBody"
        :before-close="handleClose"
        :destroy-on-close="true">
        <slot name="dialog"></slot>
        <div v-if="footer" slot="footer" class="dialog-footer">
            <el-button @click="handleDialog('handleCancel')">取 消</el-button>
            <el-button type="primary" @click="handleDialog('handleOk')">确 定</el-button>
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
            type:Number,
            default:30
        },
        footer:{
            type:Boolean,
            default: true
        },
        close:{
            type:Boolean,
            default: false
        },
        appendToBody:{
            type:Boolean,
            default: false
        }
    },
    methods: {
        handleClose(done) {
            this.$emit('update:visible',false);
            done();
        },
        handleDialog(key){
            this.$parent.hasOwnProperty(key) && this.$parent[key]();
            this.$emit('update:visible',false);
        }
    }
};
</script>

<style lang="css" scoped>

</style>