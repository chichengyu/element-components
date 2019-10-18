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
.img{
    position: relative;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    background: #fff;
    overflow: hidden;
}
.img:hover > span{
    opacity: 1;
}
.img > span{
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    background-color:rgba(0,0,0,.5);
    border-radius: 6px;
    color: #fff;
    cursor: pointer;
    transition: opacity .3s;
}
.img > span > i{
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -8px;
    margin-top: -8px;
}
</style>