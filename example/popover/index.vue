<template>
    <div class="popover" style="display:inline-block;margin-right:6px;vertical-align:middle;">
        <component-popover :width="300"
               :text="'触发此内容将显示popover'"
               :size="'按钮样式'"
               :placement="'right-top'"
               :tag="'span'"
               :trigger="'hover'"
               :tagStyle="{color:'red'}"
               :params="'额外参数'"
               @ok="handleOk"
               @cancel="handleCancel">
        </component-popover>

        <hr />

        <!-- 扩展内容 -->
        <component-popover :isSlot="true" :tag="'span'" :trigger="'hover'" :tagStyle="{color:'red'}">
            <template slot="content">
                <span>aaaaaaaaaaa</span>
            </template>
        </component-popover>
    </div>
</template>

<script>
export default {
    name:'Popover',
    methods:{
        handleCancel:function () {
            console.log('额外参数',params);
        },
        handleOk:function () {
            console.log('额外参数',params);
        }
    }
}
</script>

<style lang="css" scoped>

</style>