<template>
    <div class="preivew" style="display:inline-block;margin-right:6px;vertical-align:middle;">
        <template v-if="src">
            <div class="img" @click="visible=true">
                <span><i class="el-icon-zoom-in"></i></span>
                <img :src="src" :width="width" :height="height" :title="title" style="border-radius:6px;vertical-align:middle">
            </div>
            <el-dialog
                :title="title"
                :visible.sync="visible"
                :close-on-click-modal="false"
                :append-to-body="appendToBody">
                <img :src="src" width="100%" height="100%" alt="">
            </el-dialog>
        </template>
        <template v-else>
            <span>无</span>
        </template>
    </div>
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
            default:58
        },
        height:{
            type:Number,
            default:58
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
    data:function() {return {visible:false}}
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