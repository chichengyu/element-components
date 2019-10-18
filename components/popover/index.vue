<template>
    <div class="popover" style="display:inline-block;margin-right:6px;vertical-align:middle;">
        <el-popover :trigger="trigger" :placement="placement" :width="width" style="margin-left:10px">
            <template v-if="isSlot">
                <slot name="content" />
                <el-button v-if="tag==='button'" type="danger" :size="size" slot="reference">{{ text }}</el-button>
                <span v-if="tag==='span'" slot="reference" :style="tagStyle">{{ text }}</span>
                <div v-if="tag==='div'" slot="reference" :style="tagStyle">{{ text }}</div>
            </template>
            <template v-else>
                <div style="text-align:center;margin:0">
                    <h4 style="margin-top:.6rem;"><i class="el-icon-warning" style="margin-right:6px;color:#ff9900;"></i>'你确定删除吗？</h4>
                    <el-button type="text" size="mini" style="padding:4px 7px" @click="handleCancel">取消</el-button>
                    <el-button type="primary" size="mini" style="padding:4px 7px" @click="handleOk">确定</el-button>
                </div>
                <el-button v-if="tag==='button'" type="danger" :size="size" slot="reference">{{ text }}</el-button>
                <span v-if="tag==='span'" slot="reference" :style="tagStyle">{{ text }}</span>
                <div v-if="tag==='div'" slot="reference" :style="tagStyle">{{ text }}</div>
            </template>
        </el-popover>
    </div>
</template>

<script>
export default {
    name:'Popover',
    props:{
        isSlot:{
            type:Boolean,
            default:false
        },
        text:{
            type:String,
            default:'删除'
        },
        tagStyle:{
           type:Object,
           default:function () {return {}}
        },
        trigger:{
            type:String,
            default:'click'
        },
        width:{
            type:Number,
            default:120
        },
        tag:{
            type:String,
            default:'button'
        },
        size:{
            type:String,
            default:'mini'
        },
        placement:{
            type:String,
            default:'top-end'
        },
        params:{
            type:[Object,Array,String,Boolean,Number],
            default: null
        }
    },
    methods:{
        handleCancel:function () {
            document.body.click();
            this.$emit('cancel',this.params);
        },
        handleOk:function () {
            document.body.click();
            this.$emit('ok',this.params);
        }
    }
}
</script>

<style lang="css" scoped>

</style>