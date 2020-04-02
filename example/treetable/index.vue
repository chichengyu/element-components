<template>
    <div class="table">
        <component-table v-if="tableData.tableData.length>0" :data="tableData">

            <!-- 列，abc，col 随意取的，需要在 tableLabel 中定义 slot:'abc'、slot:'col'，scope为当前行参数 -->
            <!-- ***** 注意：slot的命名必须不能相同 ***** -->
            <template v-slot:abc="{scope}">
                <span>这是表格列扩展--作用域插槽1111--id：{{scope.row.id}}</span>
            </template>
            <template v-slot:col="{scope}">
                <span>这是表格列扩展--作用域插槽2222--省：{{scope.row.province}}</span>
            </template>

            <!-- 按钮扩展： 需要在 tableOption 里加上 slot:true --->
            <template v-slot:button="{scope}">
                <el-button type="warning" size="mini" @click="handleClick(scope)">按钮 </el-button>
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
                tree:true,// true 为树形表格
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
                        {prop:'detail',title:'查看',click:(params,currentBtn) => {
                            console.log(params);
                            console.log(currentBtn);
                        }},
                        {prop:'edit',title:'编辑',type:'primary',click:(params,currentBtn) => {
                            console.log(params);
                            console.log(currentBtn);
                        }},
                        {prop:'del',title:'删除',tooltip:true,type:'danger',click:{
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
                page:{align:'right',total:50,currentPage:1,currentChange:(currentPage) => {
                    console.log('当前页',currentPage);
                    this.tableData.loading = true;
                    setTimeout(() => {
                        this.tableData.loading = false;
                    },1500)
                }},
                // 排序
                sortChange(obj) {
                    console.log(obj);
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
                {prop:'id',title:'ID',type:'index',fixed:true,width:80},
                {prop:'image',title:'缩略图',isPreview:true,width:100,style:(params,col)=>{return {height:'50px'}}},
                {prop:'name',title:'名称',width:100,hasChildren:true,align:'left',render:(params) => {
                    return [params.row.name,{color:'red'}];
                }},
                {prop:'date',title:'日期',render:(params) => {
                    // console.log(params);
                    return [params.row.date];
                }},
                {prop:'province',title:'省份',slot:'abc'},
                {prop:'city',title:'城市',slot:'col'},
                {prop:'address',title:'地址',tooltip:true},
                {prop:'zip',title:'邮编',sort:'custom'},
                {prop:'status',title:'状态',isSwitch:true,activeText:'正常',inactiveText:'禁用',change:(currentData) => {console.log('switch开关',currentData)}}
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
            let data = [{id:1, date: '2016-05-02', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1518 弄', zip: 200333, status:0,image:'http://img1.2345.com/duoteimg/qqTxImg/2/5804bb86e3d62336.jpg%21200x200.jpg'},
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
                    }]},
                {id:5, date: '2016-05-01', name: '王小5', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1519 弄', zip: 200333, status:0,image:'http://img1.2345.com/duoteimg/qqTxImg/2/5804bb86e3d62336.jpg%21200x200.jpg'},
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
                        image:'http://img1.2345.com/duoteimg/qqTxImg/2/5804bb86e3d62336.jpg%21200x200.jpg'}]}];
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