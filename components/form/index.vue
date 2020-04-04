<template>
    <div class="form" :style="'width:'+width+'%;padding: 32px 32px 32px 0;background:#fff;'">
        <el-form ref="form" :inline="data.inline||false" :model="data.formFields" :rules="data.rules" :label-width="data.labelWidth||'100px'" :label-position="data.labelPosition||'right'" class="demo-ruleForm">
            <slot name="formTop" v-bind:formTop="$refs"/>
            <el-form-item v-for="(item,index) in data.formLabel" :key="index" :label="item.title" :prop="item.prop" :style="item.formItemStyle||''">
                <template v-if="item.type==='text'">
                    <span v-if="item.tag==='span'" :style="item.style">{{ item.render?item.render(data.formFields[item.prop]):data.formFields[item.prop] }}</span>
                    <div v-else :style="item.style">{{ item.render?item.render(data.formFields[item.prop]):data.formFields[item.prop] }}</div>
                </template>
                <el-input v-if="item.type==='input'" v-model="data.formFields[item.prop]" @change="item.change&&item.change(data.formFields[item.prop])" :show-password="item.password" :size="item.size" :disabled="item.disabled" :style="item.style||''" :prefix-icon="item.prefixIcon||''" :placeholder="item.placeholder"></el-input>
                <el-input-number v-if="item.type==='inputNumber'" v-model="data.formFields[item.prop]" @change="item.change&&item.change(data.formFields[item.prop])" :min="item.min" :max="item.max" :step="item.step" :size="item.size" :disabled="item.disabled" :style="item.style||''"></el-input-number>
                <el-input v-if="item.type==='textarea'" type="textarea" v-model="data.formFields[item.prop]" @change="item.change&&item.change(data.formFields[item.prop])" :rows="item.rows || 2" :disabled="item.disabled" :resize="item.resize||'none'" :style="item.style||''" :placeholder="item.placeholder||'请输入内容'"></el-input>
                <el-select v-if="item.type==='select'" v-model="data.formFields[item.prop]" @change="item.change&&item.change(data.formFields[item.prop])" :size="item.size" :disabled="item.disabled" :style="item.style||''" placeholder="请选择">
                    <el-option label="请选择" value="0"></el-option>
                    <!--<el-option v-for="(subItem,key) in item.options" :key="key" :label="subItem[item.key||'label']" :value="subItem[item.value||'value']" :disabled="data.formFields[item.prop||'value']!=subItem[item.value||'value']?false:true">-->
                    <el-option v-for="(subItem,key) in item.options" :key="key" :label="subItem[item.key||'label']" :value="subItem[item.value||'value']" :disabled="(item.parent?(data.formFields[item.prop||'value']!=subItem[item.value||'value'])&&(item.parent&&data.formFields[item.parent]!=subItem[item.value||'value']):data.formFields[item.prop||'value']!=subItem[item.value||'value'])?false:true">
                        <span style="float: left">{{'|-----'.repeat(subItem.level||0) + ' ' + subItem[item.key||'label']}}</span>
                    </el-option>
                </el-select>
                <el-select v-if="item.type==='selectGroup'" v-model="data.formFields[item.prop]" @change="item.change&&item.change(data.formFields[item.prop])" :size="item.size" :disabled="item.disabled" :style="item.style||''" placeholder="请选择">
                    <el-option label="请选择" value="0" style="color:#909399;font-size: 13px"></el-option>
                    <div v-for="(subItem,key) in item.options" :key="key">
                        <div style="padding:.6em;font-size:12px;color:#909399;user-select:none;cursor:no-drop">{{ subItem[item.header||'label'] }}</div>
                        <el-option v-if="subItem[item.children||'children']" v-for="(subItemChild,k) in subItem[item.children||'children']" :key="k" :label="subItemChild[item.key||'label']" :value="subItemChild[item.value||'value']" :disabled="data.formFields[item.prop]!=subItemChild[item.value||'value']?false:true">
                            <span style="float: left">{{ subItemChild[item.key||'label'] }}</span>
                            <span v-if="item.right" style="float: right; color: #8492a6; font-size: 13px">{{ subItem[item.header||'label'] }}</span>
                        </el-option>
                    </div>
                </el-select>
                <el-cascader v-if="item.type==='cascader'" v-model="data.formFields[item.prop]" :options="item.options" @change="(val)=>item.change&&item.change(val)" :props="item.props||{}" :size="item.size" :disabled="item.disabled||false" :popper-class="item.popperClass||''" :style="item.style||''" clearable></el-cascader>
                <el-radio-group v-if="item.type==='radio'" v-model="data.formFields[item.prop]" @change="item.change&&item.change(data.formFields[item.prop])" :size="item.size" :disabled="item.disabled">
                    <el-radio v-for="(subItem,key) in item.options" :key="key" :label="subItem.value">{{ subItem.label }}</el-radio>
                </el-radio-group>
                <el-radio-group v-if="item.type==='radioButton'" v-model="data.formFields[item.prop]" @change="item.change&&item.change(data.formFields[item.prop])" :size="item.size" :disabled="item.disabled">
                    <el-radio-button v-for="(subItem,key) in item.options" :key="key" :label="subItem.value">{{ subItem.label }}</el-radio-button>
                </el-radio-group>
                <el-checkbox-group v-if="item.type==='checkbox'" v-model="data.formFields[item.prop]" @change="item.change&&item.change(data.formFields[item.prop])" :size="item.size" :disabled="item.disabled" :text-color="item.textColor">
                    <el-checkbox v-for="(subItem,key) in item.options" :key="key" :label="subItem.value">{{ subItem.label }}</el-checkbox>
                </el-checkbox-group>
                <el-date-picker v-if="item.type==='date'" type="date" v-model="data.formFields[item.prop]" @change="item.change&&item.change(data.formFields[item.prop])" :value-format="item.format" :size="item.size" :disabled="item.disabled" :style="item.style||''" placeholder="选择日期"></el-date-picker>
                <el-date-picker v-if="item.type==='daterange'" type="daterange" v-model="data.formFields[item.prop]" @change="item.change&&item.change(data.formFields[item.prop])" :value-format="item.format" :size="item.size" :disabled="item.disabled" :style="item.style||''" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                <el-date-picker v-if="item.type==='datetime'" type="datetime" v-model="data.formFields[item.prop]" @change="item.change&&item.change(data.formFields[item.prop])" :value-format="item.format" :size="item.size" :disabled="item.disabled" :style="item.style||''" placeholder="选择日期"></el-date-picker>
                <el-date-picker v-if="item.type==='datetimerange'" type="datetimerange" v-model="data.formFields[item.prop]" @change="item.change&&item.change(data.formFields[item.prop])" :value-format="item.format" :size="item.size" :disabled="item.disabled" :style="item.style||''" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
                <el-switch v-if="item.type==='switch'" v-model="data.formFields[item.prop]" @change="item.change&&item.change(data.formFields[item.prop])" :disabled="item.disabled" :active-value="item.activeValue" :inactive-value="item.inactiveValue" active-color="#52BEA6" inactive-color="#ff4949" :active-text="item.activeText||''" :inactive-text="item.inactiveText||''" class="switchStyle"></el-switch>
                <div v-if="item.msg" :style="item.msgStyle">{{ item.msg }}</div>
                <slot v-if="item.type==='slot'&&item.slot" :name="item.slot"/>
            </el-form-item>
            <slot name="form"/>
            <slot v-bind:form="$refs"/>
            <el-form-item v-if="data.buttons&&data.buttons.options" :align="data.buttons.align||'left'" :style="data.buttons.style||''">
                <el-button v-for="(item,key) in data.buttons.options" :loading="item.loading||false" :type="item.type" :size="item.size" :key="key" :style="item.style||''" :disabled="item.disabled" @click="item.click && item.click($refs['form'],item)">{{ item.title }}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "Form",
    props:{
        width:{
            type:Number,
            default:100
        },
        data:{
            type:Object,
            required:true
        }
    },
    // data(){return { form:this.data }},
    // watch:{
    //     data:{
    //         immediate:true,
    //         deep:true,
    //         handler(val){ val && (this.form = val)}
    //     }
    // },
}
</script>

<style lang="css" scoped>
.form >>> .switchStyle .el-switch__label {
    position: absolute;
    display: none;
    color: #fff;
    width: 100%;
}
.form >>> .switchStyle .el-switch__label--left {
    width: 100%;
    z-index: 9;
    left: 22px;
}
.form >>> .switchStyle .el-switch__label--right {
    width: 100%;
    z-index: 9;
    margin-left: 8px;
}
.form >>> .switchStyle .el-switch__label.is-active {
    display: block;
    width: 100%;
}
.form >>> .switchStyle.el-switch .el-switch__core, .el-switch .el-switch__label {
    /*width: 50px !important;*/
    padding: 0 28px !important;
    height: 22px !important;
    border-radius: 12px;
}
.form >>> .switchStyle.el-switch{
    height: 22px !important;
}
.form >>> .el-switch__core:after{
    width: 18px;
    height: 18px;
}
.form >>> .switchStyle.el-switch.is-checked .el-switch__core:after{
    margin-left: -19px !important;
}
</style>