<template>
    <div class="Preview">
        <h2>点击查看大图</h2>
        <img :src="url" width="100" title="点击预览大图" @click="abc=true" style="cursor: pointer">
        <!-- appendToBody 是否嵌套 默认 false ,嵌套的 Dialog 必须指定该属性并赋值为 true-->
        <component-preview :title="'查看原图'" :visible.sync="abc" :src="url" :appendToBody="true"></component-preview>
    </div>
</template>

<script>
export default {
    name: "Preview",
    data () {
        return {
            abc:false,
            url:'http://p1.meituan.net/wedding/b8a49d1f1b3eb3d4e9eefcddb67bd16b166188.jpg%40watermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20'
        }
    }
}
</script>

<style scoped>

</style>