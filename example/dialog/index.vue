<template>
    <div class="dialog">
        <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
        <!-- appendToBody 是否嵌套 默认 false ,嵌套的 Dialog 必须指定该属性并赋值为 true
		width：可以为 number 50,20..., string '500px' -->
        <component-dialog
           :title="'Dialog弹窗'"
           :width="50"
           :visible.sync="dialogVisible"
           :appendToBody='false'
           @handleCancel="handleCancel"
           @handleOk="handleOk">
            <div slot="dialog">
                <span>这是 Dialog 弹窗封装组件</span>
                <component-upload :action="'#'" :previewImages="url" :appendToBody="true"></component-upload>
            </div>
        </component-dialog>
    </div>
</template>

<script>
export default {
    name: "Dialog",
    data () {
        return {
            dialogVisible:false,
            url:'http://p1.meituan.net/wedding/b8a49d1f1b3eb3d4e9eefcddb67bd16b166188.jpg%40watermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
        }
    },
    methods:{
        handleCancel(){
            console.log('取消了');
        },
        handleOk(){
            console.log('确定了');
        }
    }
}
</script>

<style lang="css" scoped>

</style>