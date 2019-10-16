# element-ui component

#### 介绍

基于element-ui做的table表格，form表单，treeTable树形表格，upload上传图片，wangeditor富文本，file-upload文件上传，preview查看大图，方便使用,

*注：本人这里使用的是 element-ui@2.11.1，vue@2.6。



#### Getting started
```
npm install element-component -S
```

## Use
使用方法：可以查看下面的说明，也可以查看 example 下面的 demo，也可以[点此查看使用方法](https://www.kancloud.cn/qq875267425/element-ui/1333290)

```
# 所有组件
<component-form></component-form>
<component-table></component-table>
<component-dialog></component-dialog>
<component-preview></component-preview>
<component-upload></component-upload>
<component-file-upload></component-file-upload>
<component-wang-editor></component-wang-editor>
```
默认在vue的prototype原型上注册了一个 axios
```
console.log(this.axios);
```
#### validator
默认提供了一些验证需要的正则：用户名正则，4到16位（字母，数字，下划线，减号）、密碼8到16位（字母，数字，下划线，减号）任意组合、Email正则、手机号码正则、固定电话正则、身份证号（18位）正则、ipv4地址正则、包含中文正则、日期验证、URL正则、非零正整数，并且有对应的验证方法
```
console.log(this.validator);
# 正则
console.log(this.validator.regExpUsername);// 用户名
console.log(this.validator.regExpPassword);// 密码
console.log(this.validator.regExpEmail);// email
console.log(this.validator.regExpPhone);// 手机
console.log(this.validator.regExpTel);// 座机
console.log(this.validator.regExpIdCard);// 身份证号（18位）
console.log(this.validator.regExpIp);// ipv4地址
console.log(this.validator.regExpChinese);// 中文
console.log(this.validator.regExpDate);// 日期
console.log(this.validator.regExpUrl);// URL
console.log(this.validator.regExpInteger);// 非零正整数
# 方法
this.validator.isEmpty(val);// 判空
this.validator.isRegExpUsername(val);
this.validator.isRegExpPassword(val);
this.validator.isRegExpEmail(val);
this.validator.isRegExpPhone(val);
this.validator.isRegExpTel(val);
this.validator.isRegExpIdCard(val);
this.validator.isRegExpIp(val);
this.validator.isRegExpChinese(val);
this.validator.isRegExpDate(val);
this.validator.isRegExpUrl(val);
this.validator.isRegExpInteger(val);
```
#### message
提供了 message, warning, success, error, confirm 的居中
```
# message
this.message(msg,callback,duration)
# warning
this.warning(msg,callback,duration)
# success
this.success(msg,callback,duration)
# error
this.error(msg,callback,duration)
# alert
this.alert(title,() => {
	console.log('确定...');
},() => {
	console.log('取消...');
},options={},content='')
# prompt
this.prompt(title,() => {
	console.log('确定...');
},() => {
	console.log('取消...');
},options={},content='')
# confirm
this.confirm(title,() => {
	console.log('确定...');
},() => {
	console.log('取消...');
},options={},content='')
```
#### table
```
# 组件
<component-table v-if="tableData.tableData.length>0" :data="tableData">
	<!-- 列，abc，col 随意取的，需要在 tableLabel 中定义 slot:'abc'、slot:'col'，scope 为当前行参数 -->
	<!-- ***** 注意：slot的命名必须不能相同 ***** -->
	<template v-slot:abc="{scope}">
		<span>这是表格列扩展--作用域插槽1111--id：{{scope.row.id}}</span>
	</template>
	<template v-slot:col="{scope}">
		<span>这是表格列扩展--作用域插槽2222--省：{{scope.row.province}}</span>
	</template>

	<!-- 按钮扩展： 需要在 tableOption 里加上 slot:true --->
	<template v-slot:button="{scope}">
		<el-button v-if="scope.row.id>0" type="warning" size="mini" @click="handleClick(scope)">按钮 </el-button>
	</template>
</component-table>

# 数据结构
tableData: {
	loading:false,
	// 请求回来的数据
	tableData:[
		{id:1, date: '2016-05-02', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1518 弄', zip: 200333, status:0,img:'http://img1.2345.com/duoteimg/qqTxImg/2/5804bb86e3d62336.jpg%21200x200.jpg'},
		{id:2, date: '2016-05-04', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1517 弄', zip: 200333, status:1,img:'http://img1.2345.com/duoteimg/qqTxImg/2/5804bb86e3d62336.jpg%21200x200.jpg'},
		{id:3, date: '2016-05-01', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1519 弄', zip: 200333, status:0,img:'http://img1.2345.com/duoteimg/qqTxImg/2/5804bb86e3d62336.jpg%21200x200.jpg'},
		{id:4, date: '2016-05-03', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1516 弄', zip: 200333, status:0,img:'http://img1.2345.com/duoteimg/qqTxImg/2/5804bb86e3d62336.jpg%21200x200.jpg'},
		{id:5, date: '2016-05-01', name: '王小5', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1519 弄', zip: 200333, status:0,img:'http://img1.2345.com/duoteimg/qqTxImg/2/5804bb86e3d62336.jpg%21200x200.jpg'}
	],
	// 列
	tableLabel:[
		{prop:'id',title:'ID',type:'index',fixed:true,width:80,align:'center',style:(params,item)=>{return {color:'red'}}},
		{prop:'img',title:'缩略图',isPreview:true,width:100,style:(params,col) => {
			return {height:'50px'}
		}},
		{prop:'name',title:'名称',width:100,render:(params,col) => {
			return [params.row.name,{color:'blue'}];
		}},
		{prop:'date',title:'日期',minWidth:150,slot:'abc',/** 扩展列：slot:'col' **/},
		{prop:'province',title:'省份',slot:'col',minWidth:150,},
		{prop:'city',title:'城市'},
		{prop:'address',title:'地址',tooltip:true,width:150},
		{prop:'zip',title:'邮编',sort:'custom'},
		{prop:'status',title:'状态',isSwitch:true,style:(params,item)=>{return {display:'none'}},activeText:'正常',inactiveText:'禁用',change:(currentData) => {console.log('switch开关',currentData)}}
	],
	// 操作
	tableOption:{
		label:'操作',
		width:230,
		slot:true,// 按钮操作扩展，不扩展时去掉或改为false
		buttons:[
			{title:'查看',click:(params,currentBtn) => {
				console.log(params);
				console.log(currentBtn);
			},render:(params,item)=>{
					console.log(params);
					return 123;
				}
			},
			{title:'编辑',type:'primary',click:(params,currentBtn) => {
				console.log(params);
				console.log(currentBtn);
			}},
			{title:'删除',header:'确定要删除吗？',tooltip:true,type:'danger',click:{
				ok:(params,currentBtn) => {
					console.log('确认删除',params);
					console.log(currentBtn);
				},
				cancel:(params,currentBtn) => {
					console.log('取消删除',params);
					console.log(currentBtn);
				}
			}},
		]
	},
	// 分页
	page:{align:'right',total:1,currentPage:1,currentChange:(currentPage) => {
		console.log('当前页',currentPage);
		this.tableData.loading = true;
		setTimeout(() => {
			this.tableData.loading = false;
		},1500)
	}},
	// 排序
	sortChange(obj) {
		console.log(10);
		console.log(obj);
	},
}
```
#### treetable
树形表格比表格 table 多了一个列属性 ``` hasChildren:true ```
```
{prop:'name',title:'名称',width:100,hasChildren:true,align:'left',render:(params) => {return [params.row.name,{color:'red'}]}},
```
数据结构多了一个children,
```
let data = [
	{id:1, date: '2016-05-02', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1518 弄', zip: 200333, status:0,image:'http://img1.2345.com/duoteimg/qqTxImg/2/5804bb86e3d62336.jpg%21200x200.jpg'},
	{id:2, date: '2016-05-04', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1517 弄', zip: 200333, status:1,image:'http://img1.2345.com/duoteimg/qqTxImg/2/5804bb86e3d62336.jpg%21200x200.jpg'},
	{id:3, date: '2016-05-01', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1519 弄', zip: 200333, status:0,image:'http://img1.2345.com/duoteimg/qqTxImg/2/5804bb86e3d62336.jpg%21200x200.jpg'},
	{
		id:4,
		date: '2016-05-03',
		name: '王小虎',
		province: '上海',
		city: '普陀区',
		address: '上海市普陀区金沙江路 1516 弄',
		zip: 200333,
		status:0,
		image:'http://img1.2345.com/duoteimg/qqTxImg/2/5804bb86e3d62336.jpg%21200x200.jpg',
		children: [{
			id: 31,
			date: '2016-05-01',
			level: '2',
			name: '1111',
			province: '上海',
			city: '普陀区',
			address: '上海市普陀区金沙江路 1519 弄',
			status:0,
			zip: 200333,
			image:'http://img1.2345.com/duoteimg/qqTxImg/2/5804bb86e3d62336.jpg%21200x200.jpg'
		}, {
			id: 32,
			date: '2016-05-01',
			level: '2',
			name: '2222',
			province: '上海',
			city: '普陀区',
			address: '上海市普陀区金沙江路 1519 弄',
			status:0,
			zip: 200333,
			image:'http://img1.2345.com/duoteimg/qqTxImg/2/5804bb86e3d62336.jpg%21200x200.jpg'
		}]
	},
	{
		id:6,
		date: '2016-05-03',
		name: '王小虎',
		province: '上海',
		city: '普陀区',
		address: '上海市普陀区金沙江路 1516 弄',
		zip: 200333,
		status:0,
		image:'http://img1.2345.com/duoteimg/qqTxImg/2/5804bb86e3d62336.jpg%21200x200.jpg',
		children: [{
			id: 41,
			date: '2016-05-01',
			level: '2',
			name: '3333',
			province: '上海',
			city: '普陀区',
			address: '上海市普陀区金沙江路 1519 弄',
			status:0,
			zip: 200333,
			image:'http://img1.2345.com/duoteimg/qqTxImg/2/5804bb86e3d62336.jpg%21200x200.jpg'
		}, {
			id: 42,
			date: '2016-05-01',
			level: '2',
			name: '4444',
			province: '上海',
			city: '普陀区',
			address: '上海市普陀区金沙江路 1519 弄',
			status:0,
			zip: 200333,
			image:'http://img1.2345.com/duoteimg/qqTxImg/2/5804bb86e3d62336.jpg%21200x200.jpg'
		},{
			id: 43,
			date: '2016-05-01',
			level: '2',
			name: '5555',
			province: '上海',
			city: '普陀区',
			address: '上海市普陀区金沙江路 1519 弄',
			status:0,
			zip: 200333,
			image:'http://img1.2345.com/duoteimg/qqTxImg/2/5804bb86e3d62336.jpg%21200x200.jpg'}]
	}
];
```
#### form
```
# 组件
<component-form :width="80" :data="form">
	<!--========== 方式一 （推荐） ==========-->
	<!-- 无需再写 el-form-item,只需要将 formLabel种的 type 属性改为 slot并设置 slot名称，(如：slot:'formItem'),即可使用 -->
	<template slot="formItem">
		<el-input v-model="form.formFields.extend"></el-input>
		<span style="font-size: 12px;color: red">扩展表单提示</span>
	</template>
	<template slot="formItem1">
		<el-input v-model="form.formFields.extend1"></el-input>
	</template>
	<template slot="formItem2">
		<el-input v-model="form.formFields.extend2"></el-input>
	</template>

	<!--========== 方式二 ==========-->
	<!-- 添加到表单开始使用 formTop -->
	<template v-slot:formTop="{formTop}">
		<el-form-item label="自定义表单提交验证" prop="extend">
			<el-button @click="test(formTop)">表单顶部显示</el-button>
		</el-form-item>
	</template>
	<!-- form 默认追加到表单结尾，如添加到表单开始，可以使用 formTop -->
	<template slot="form">
		<el-form-item label="扩展表单1" prop="extend">
			<el-input v-model="form.formFields.extend"></el-input>
		</el-form-item>
		<el-form-item label="扩展表单2" prop="extend">
			<el-input v-model="form.formFields.extend"></el-input>
		</el-form-item>
	</template>
	<template v-slot="{form}">
		<el-form-item label="扩展表单自定义提交验证" prop="extend">
			<el-button @click="test(form)">自定义表单提交验证</el-button>
		</el-form-item>
	</template>
</component-form>

# 数据结构
form:{
	labelWidth:'200px',
	inline:true,
	labelPosition:'right',
	formFields:{
		id: '11111111',
		name: '',
		nameLine:'',
		number:1,
		password: '',
		text: '',
		select: '',
		selectGroup:2,
		cascader:'xiaolv',
		radio: '1',
		radiosButton: '1',
		checkbox: ['1','2'],
		date: '2019-09-07',
		switch:true,
		extend:'扩展表单',
		extend1:'扩展表单1',
		extend2:'扩展表单2',
	},
	formLabel:[
		{prop: 'id', title: '编号', type: 'text',tag:'span',style:{color:'red'},render:(val){return val}},
		{prop: 'name', title: '名称', type: 'input',disabled:false,prefixIcon:'el-icon-user',placeholder:'请输入姓名'},
		{prop: 'nameLine', title: '同行显示', type: 'input',formItemStyle:{width:'500px'},style:{display:'inline-block',width:'100px',transform:'translateX(27px)'}},
		{prop: 'number', title: '数字', type: 'inputNumber',change:(val)=>{console.log(val)}},
		{prop: 'password', title: '密码', type: 'input',password:true,msg:'密码为 8 - 16 位',msgStyle:{color:'red'}},
		{prop: 'password', title: '方式一扩展', type: 'slot',slot:'formItem'},
		{prop: 'password', title: '方式一扩展1', type: 'slot',slot:'formItem1'},
		{prop: 'password', title: '方式一扩展2', type: 'slot',slot:'formItem2'},
		{prop: 'text', title: '文本域', type: 'textarea',placeholder: '我是自定义内容'},
		{prop: 'select', title: '下拉选择',type: 'select',key:'label',value:'value',options:[
			{label:'北京',value:1,level:0},
			{label:'上海',value:2,level: 1},
			{label:'重庆',value:3}],
			change:(val) => {console.log(val);}
		},
		{prop: 'selectGroup', title: '分组下拉选择',type: 'selectGroup',key:'label',value:'value',right:true,header:'label',children:'children',options:[
				{
					label:'分组一',
					children:[
						{label:'北京',value:1},
						{label:'上海',value:2},
						{label:'重庆',value:3}
					]
				}, {
					label:'分组二',
					children:[
						{label:'成都',value:4},
						{label:'天津',value:5},
						{label:'绵阳',value:6}
					]
				}],
			change:(val) => {console.log(val);}
		},
		{prop: 'cascader', title: 'Cascader级选择器',type: 'cascader',props:{label:'name',value:'value',children:'children'},right:true,header:'label', options:[{
				value: 'zhinan',
				name: '指南',
				children: [{
					value: 'shejiyuanze',
					name: '设计原则',
					children: [{
						value: 'yizhi',
						name: '一致'
					}, {
						value: 'fankui',
						name: '反馈'
					}, {
						value: 'xiaolv',
						name: '效率'
					}, {
						value: 'kekong',
						name: '可控'
					}]
				}, {
					value: 'daohang',
					name: '导航',
					children: [{
						value: 'cexiangdaohang',
						name: '侧向导航'
					}, {
						value: 'dingbudaohang',
						name: '顶部导航'
					}]
				}]
			}],
			change:(val) => {console.log(val);}
		},
		{prop: 'radio', title: '单选',type: 'radio',options:[
			{label:'男',value:'1'},
			{label:'女',value:'2'}],
			change:(val) => {console.log(val);}
		},
		{prop: 'radiosButton', title: '单选按钮',type: 'radioButton',options:[
			{label:'男',value:'1'},
			{label:'女',value:'2'}],
			change:(val) => {console.log(val);}
		},
		{prop: 'checkbox', title: '复选框', type: 'checkbox',options:[
			{label:'上海',value:'1'},
			{label:'重庆',value:'2'},
			{label:'北京',value:'3'}],
			change:(val) => {console.log(val);}
		},
		{prop: 'date', title: '日期', type: 'date',format:'yyyy-MM-dd', change:(val) => {console.log(val)}},
		{prop: 'dater', title: '日期范围', type: 'daterange',format:'yyyy-MM-dd', change:(val) => {console.log(val)}},
		{prop: 'datetime', title: '日期时间', type: 'datetime',format:'yyyy-MM-dd HH:mm:ss', change:(val) => {console.log(val)}},
		{prop: 'dateti', title: '日期时间', type: 'datetimerange',width:'100px',size:'small', change:(val) => {console.log(val)}},
		{prop: 'switch', title: 'switch开关', type: 'switch',activeValue:1,inactiveValue:0,activeText:'正常',inactiveText:'禁用',change:(val) => {console.log(val)}},
	],
	buttons:{
		align:'left',
		style:{display:'block',width:'600px'},
		options:[
			{title:'提交',type:'primary',style:{width:'100px'},loading:false,click:(form,item) => {
					item.loading = true;
					console.log(form);
					console.log(form.validate);
					console.log(item);
					form.validate(valid => {
					if (valid){
						console.log('提交');
					}else{
						console.log('验证不通过');
					}
				});
			}},
			{title:'重置',click:(form) => {
				console.log('重置');
				form.resetFields();
			}},
		]
	},
	rules: {
		id: [
			{ required: true},
		],
		name: [
			{ required: true, message: '请输入活动名称', trigger: 'blur' },
			{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
		],
		number: [
			{ required: true, message: '请选择活动区域', trigger: 'change' }
		],
		password: [
			{ type: 'string', required: true, message: '请选择日期', trigger: 'change' }
		],
		text: [
			{ type: 'string', required: true, message: '请选择时间', trigger: 'change' }
		],
		select: [
			{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
		],
		radio: [
			{ required: true, message: '请选择活动资源', trigger: 'change' }
		],
		radiosButton: [
			{ required: true, message: '请填写活动形式', trigger: 'blur' }
		],
		extend: [
			{ required: true, message: '请填写表单扩展', trigger: 'blur' },
			{pattern:this.validator.regExpChinese,message: '表单扩展输入不正确', trigger: 'blur'}
		]
	}
},
```
#### dialog
```
<div class="dialog">
	<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
	<!-- appendToBody 是否嵌套 默认 false ,嵌套的 Dialog 必须指定该属性并赋值为 true-->
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
```
#### upload
```
<div style="">
	<!-- appendToBody 是否嵌套 默认 false ,嵌套的 Dialog 必须指定该属性并赋值为 true-->
	<!-- 单张 -->
	<component-upload :action="'#'" :previewImages="url" :params="{name:'小二'}" :appendToBody="false"
		@before="handleBefore"
		@success="handleSuccess"
		@remove="handleRemove">
	</component-upload>

	<hr>

	<!-- 多张 -->
	<component-upload :action="action" :previewImages="images" :multiple="true"
		@before="handleBefore"
		@success="handleSuccess"
		@remove="handleRemove" :autoUpload="true">
	</component-upload>

	<!-- 文件上传 -->
	<component-file-upload :action="actionFileUploadUrl" :size="'default'" :title="'导入'" @before="handleExcelBefore" @success="handleExcelbSuccess" @error="handleExcelError" :params="{name:'小二'}"></component-file-upload>

</div>
export default {
    name: "Upload",
    data () {
        return {
            url:'http://p1.meituan.net/wedding/b8a49d1f1b3eb3d4e9eefcddb67bd16b166188.jpg%40watermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
            images:[
                'http://p1.meituan.net/wedding/b8a49d1f1b3eb3d4e9eefcddb67bd16b166188.jpg%40watermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                'http://p1.meituan.net/wedding/b8a49d1f1b3eb3d4e9eefcddb67bd16b166188.jpg%40watermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                'http://p1.meituan.net/wedding/b8a49d1f1b3eb3d4e9eefcddb67bd16b166188.jpg%40watermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                'http://p1.meituan.net/wedding/b8a49d1f1b3eb3d4e9eefcddb67bd16b166188.jpg%40watermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                'http://p1.meituan.net/wedding/b8a49d1f1b3eb3d4e9eefcddb67bd16b166188.jpg%40watermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
            ],
            action:'',
            actionFile:'',
            actionFileUploadUrl:''
        }
    },
    methods:{
        handleBefore(file,params){
            console.log(file);
        },
        handleSuccess(response, file, fileList,params){
            console.log(response);
        },
        handleRemove(file,fileImageList,params){
            console.log('删除图片',file);
            console.log(fileImageList);
            console.log(params);
            // fileImageList 已显示的图片列表数组，可以执行如代码进行删除显示图片，fileImageList.includes(file) && fileImageList.splice(fileImageList.indexOf(file),1);
			fileImageList.includes(file) && fileImageList.splice(fileImageList.indexOf(file),1);
        },
        handleExcelBefore(file,params){
            console.log(params);
        },
        handleExcelbSuccess(response, file, fileList,params){
            console.log(params,params);
        },
        handleExcelError(response, file, fileList,params){
            tconsole.log(params);
        },
    }
}
```
#### preview
```
<div class="Preview">
	<component-preview :title="'查看原图'" :src="url" :width="100" :height="100" :appendToBody="true"></component-preview>
	<hr>
	<component-preview v-for="(item,index) in images" :key="index" :title="'查看原图'" :src="item" :appendToBody="true"></component-preview>

</div>

export default {
    name: "Preview",
    data () {
        return {
            abc:false,
            url:'http://p1.meituan.net/wedding/b8a49d1f1b3eb3d4e9eefcddb67bd16b166188.jpg%40watermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
            images:[
                'http://p1.meituan.net/wedding/b8a49d1f1b3eb3d4e9eefcddb67bd16b166188.jpg%40watermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                'http://p1.meituan.net/wedding/b8a49d1f1b3eb3d4e9eefcddb67bd16b166188.jpg%40watermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                'http://p1.meituan.net/wedding/b8a49d1f1b3eb3d4e9eefcddb67bd16b166188.jpg%40watermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                'http://p1.meituan.net/wedding/b8a49d1f1b3eb3d4e9eefcddb67bd16b166188.jpg%40watermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                'http://p1.meituan.net/wedding/b8a49d1f1b3eb3d4e9eefcddb67bd16b166188.jpg%40watermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
            ],
        }
    }
}
```
#### wang-editor
```
<div id="editor">
	<component-wang-editor :height="350"></component-wang-editor>
</div>

<div id="editor">
	<component-wang-editor :height="350"  :uploadUrl='url' :value='conten' :isClear='true' :isdisable='true' :headers='headers' :debug='true' @change='handleChange'></component-wang-editor>
</div>

export default {
    data () {
        uploadUrl:'上传图片地址',
        value:'富文本内容',
        isClear:'是否清空',
        isdisable:'是否禁用',
        headers:'请求头设置',
        debug:'开启debug模式'
    }，
    methods:{
        handleChange(val){
            console.log(val);
        }
    }
}
```
#### License
[MIT](https://opensource.org/licenses/MIT)