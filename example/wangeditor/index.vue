<template>
    <div class="test">
        <h1>wangEditor</h1>
        <component-wang-editor :height="350" @change="change" style="width: 600px;"></component-wang-editor>
        <hr>
        <component-wang-editor :height="350" @fail="handleFail" @success="handleSuccess" @timeout="handleTimeout" @error="handleError" @change="change" style="width: 600px;"></component-wang-editor>
    </div>
</template>

<script>
export default {
    name: "index",
    methods:{
        change(val){
            console.log(val);
        },
        handleFail(xhr, editor, result){
            console.log(result);
        },
        handleSuccess(xhr, editor, result){
            console.log(result);
        },
        handleTimeout(xhr, editor){
            console.log(editor);
        },
        handleError(xhr, editor){
            console.log(editor);
        }
    }
}
</script>

<style scoped>

</style>