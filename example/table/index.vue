<template>
    <div class="table">
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
    </div>
</template>

<script>
export default {
    name:'Table',
    data() {
        return {
            visible:false,
            tableData: {
                loading:false,
                // 请求回来的数据
                tableData:[],
                // 列
                tableLabel:[],
                // 操作
                tableOption:{
                    label:'操作',
                    width:230,
                    slot:true,// 按钮操作扩展
                    buttons:[
                        {title:'查看',click:(params,currentBtn) => {
                            console.log(params);
                            console.log(currentBtn);
                            console.log('当前表格对象',params._self);
                        },render:(params,item)=>{
                                console.log(params);
                                return 123;
                            }
                        },
                        {title:'编辑',directives:[{name:'has',value:'edit'}],type:'primary',click:(params,currentBtn) => {
                            console.log(params);
                            console.log(currentBtn);
                            console.log('当前表格对象',params._self);
                        }},
                        {title:'删除',header:'确定要删除吗？',tooltip:true,directives:[{name:'has',value:'del'}],type:'danger',click:{
                            ok:(params,currentBtn) => {
                                console.log('确认删除',params);
                                console.log(currentBtn);
                                console.log('当前表格对象',params._self);
                            },
                            cancel:(params,currentBtn) => {
                                console.log('取消删除',params);
                                console.log(currentBtn);
                                console.log('当前表格对象',params._self);
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
                sortChange(obj,tableObject) {
                    console.log(10);
                    console.log(obj);
                    console.log('当前表格对象',tableObject);
                },
                // 表格实现多选时的 change 事件
                selectionChange(params,tableObject){
                    console.log('选择项改变时的值',params);
                    console.log('表格对象',tableObject);
                },
            }
        }
    },
    created(){
        // this.tableData.map(item => item.visible=false);
        this.labelInit();
        this.tableDataInit(this.tableData.page.currentPage,pageOffset);
    },
    methods: {
        // 列初始化
        labelInit(){
            this.tableData.tableLabel = [
            	{type:'selection',align:'center'},
                {type:'index',fixed:'left'},
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
                {prop:'status',title:'状态',isSwitch:true,style:(params,item)=>{return {display:'none'}},activeText:'正常',inactiveText:'禁用',activeValue:1,inactiveValue:2,change:(currentData) => {console.log('switch开关',currentData)}}
            ];
        },
        // 数据初始化
        tableDataInit(currentPage,pageOffset,keywords=''){
            /*this.tableData.loading = true;
            getTableData(currentPage,pageOffset,keywords).then(res => {
                if (res.data.code == 1){
                    this.tableData.tableData = res.data.data.data.data;
                    this.tableData.page.total = res.data.data.total;
                }else {
                    jumpUrl(res.data,this);
                }
                this.tableData.loading = false;
            });*/
            let data = [{id:1, date: '2016-05-02', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1518 弄', zip: 200333, status:0,img:'http://img1.2345.com/duoteimg/qqTxImg/2/5804bb86e3d62336.jpg%21200x200.jpg'},
                {id:2, date: '2016-05-04', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1517 弄', zip: 200333, status:1,img:'http://img1.2345.com/duoteimg/qqTxImg/2/5804bb86e3d62336.jpg%21200x200.jpg'},
                {id:3, date: '2016-05-01', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1519 弄', zip: 200333, status:0,img:'http://img1.2345.com/duoteimg/qqTxImg/2/5804bb86e3d62336.jpg%21200x200.jpg'},
                {id:4, date: '2016-05-03', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1516 弄', zip: 200333, status:0,img:'http://img1.2345.com/duoteimg/qqTxImg/2/5804bb86e3d62336.jpg%21200x200.jpg'},
                {id:5, date: '2016-05-01', name: '王小5', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1519 弄', zip: 200333, status:0,img:'http://img1.2345.com/duoteimg/qqTxImg/2/5804bb86e3d62336.jpg%21200x200.jpg'}];
            this.tableData.tableData = data;
        },
        handleClick(scope){
            console.log(scope);
        }
    },
}
</script>

<style lang="css" scoped>

</style>