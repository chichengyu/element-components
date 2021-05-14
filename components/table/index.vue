<template>
    <div class="table" style="width:100%;margin-top:5px">
        <el-table ref="table" :stripe="data.stripe" :show-header="data.showHeader" :max-height="data.maxHeight" :size="data.size" style="width:100%"
            :border="data.border"
            v-loading="data.loading"
            :element-loading-text="data.loadingText||'Loading'"
            :element-loading-spinner="data.loadingIcon||'el-icon-loading'"
            :empty-text="data.table_msg_empty"
            :data="data.tableData"
            :default-sort="data.defaultSort"
            @selection-change="handleSelectionChange"
            @sort-change="handleSort">
            <template v-for="(col,key) in data.tableLabel">
                <el-table-column v-if="col.type=='selection'" :key="key" type="selection" :fixed="col.fixed" :prop="col.prop" :label="col.title" :width="col.width" :min-width="col.minWidth" :sortable="col.sort" :formatter="col.formatter" :align="col.align||'left'"></el-table-column>
                <el-table-column v-else-if="col.type=='index'" :key="key" type="index" :fixed="col.fixed" :prop="col.prop" :label="col.title" :width="col.width" :min-width="col.minWidth" :sortable="col.sort" :formatter="col.formatter" :align="col.align||'left'"></el-table-column>
                <el-table-column v-else :key="key"
                     :type="col.type"
                     :fixed="col.fixed"
                     :prop="col.prop"
                     :label="col.title"
                     :width="col.width"
                     :min-width="col.minWidth"
                     :sortable="col.sort"
                     :formatter="col.formatter"
                     :align="col.align||'left'">
                    <template slot-scope="scope">
                        <el-switch class="switchStyle" v-if="col.isSwitch"
                           :style="col.style&&col.style(scope,col)"
                           :disabled="col.disabled"
                           v-model="scope.row[col.prop]"
                           active-color="#52BEA6"
                           inactive-color="#ccc"
                           :active-value="col.activeValue||1"
                           :inactive-value="col.inactiveValue||0"
                           :active-text="col.activeText||'正常'"
                           :inactive-text="col.inactiveText||'禁用'"
                           @change="col.change && col.change(scope)">
                        </el-switch>
                        <div v-else-if="data.tree && col.hasChildren && scope.row[data.treeKey] && scope.row[data.treeKey].length > 0" @click="treeClick(scope.row,scope.$index,data.treeKey)">
                            <template v-if="col.render">
                                <div :style="Object.assign({marginLeft:(scope.row._xgrade-0.3)+'em',cursor:'pointer'},col.render(scope,col)[1]||{})">
                                    <i class="el-icon-arrow-down" v-if="scope.row.open"></i>
                                    <i class="el-icon-arrow-right" v-else></i>
                                    <span>{{ col.render(scope,col)[0] }}</span>
                                </div>
                            </template>
                            <template v-else>
                                <div :style="{marginLeft:(scope.row._xgrade-0.3)+'em',cursor:'pointer'}">
                                    <i class="el-icon-arrow-down" v-if="scope.row.open"></i>
                                    <i class="el-icon-arrow-right" v-else></i>
                                    <span>{{ scope.row[col.prop] }}</span>
                                </div>
                            </template>
                            <!--<div :style="Object.assign({marginLeft:(scope.row.xgrade-0.3)+'em',cursor:'pointer'},col.style&&col.style(scope,col)||{})">
                                <i class="el-icon-arrow-down" v-if="scope.row.open"></i>
                                <i class="el-icon-arrow-right" v-else></i>
                                <span>{{ col.render?col.render(scope):scope.row[col.prop] }}</span>
                            </div>-->
                        </div>
                        <div v-else-if="col.tooltip">
                            <el-tooltip placement="top">
                                <template v-if="col.render">
                                    <div slot="content" :style="col.render(scope,col)[1]">{{ col.render(scope,col)[0] }}</div>
                                    <div :style="Object.assign({width: '100%',overflow: 'hidden','white-space':'nowrap','text-overflow':'ellipsis'},col.render(scope,col)[1]||{})">{{ col.render(scope,col)[0] }}</div>
                                </template>
                                <template v-else>
                                    <div slot="content">{{ scope.row[col.prop] }}</div>
                                    <div :style="{width: '100%',overflow: 'hidden','white-space':'nowrap','text-overflow':'ellipsis'}">{{ scope.row[col.prop] }}</div>
                                </template>
                            </el-tooltip>
                        </div>
                        <div v-else>
                            <div v-if="scope.row._xgrade>0&&col.hasChildren">
                                <div v-if="col.render" :style="Object.assign({marginLeft:(scope.row._xgrade+0.6)+'em'},col.render(scope)[1]||{})">{{ col.render(scope)[0] }}</div>
                                <div v-else :style="{marginLeft:(scope.row._xgrade+0.6)+'em'}">{{ scope.row[col.prop] }}</div>
                            </div>
                            <div v-else-if="col.isPreview" :style="col.style&&col.style(scope,col)" @click="handlePreview(scope.row[col.prop])">
                                <img :src="scope.row[col.prop]" width="100%" height="100%" style="cursor:pointer">
                            </div>
                            <div v-else-if="col.slot">
                                <slot :name="col.slot" v-bind:scope="scope"></slot>
                            </div>
                            <div v-else-if="col.render">
                                <div v-if="col.render(scope,col).length==2" :style="col.render(scope,col)[1]">{{ col.render(scope,col)[0] }}</div>
                                <div v-else>{{ col.render(scope,col)[0] }}</div>
                            </div>
                            <div v-else :style="col.style&&col.style(scope,col)">{{ scope.row[col.prop] }}</div>
                        </div>
                    </template>
                </el-table-column>
            </template>
            <el-table-column v-if="data.tableOption"
                fixed="right"
                :label="data.tableOption.label"
                :width="data.tableOption.width"
                :align="data.tableOption.align||'center'">
                <template slot-scope="scope">
                    <slot v-if="data.tableOption.slot" name="button" v-bind:scope="scope" />
                    <template v-else>
                        <template v-if="data.tableOption.buttons" v-for="(item,key) in data.tableOption.buttons">
                            <el-button :key="key" v-if="!item.tooltip"
                                :type="item.type"
                                :icon="item.icon||''"
                                :plain="item.plain||false"
                                :style="item.style&&item.style(scope,item)"
                                @click="item.click&&item.click(scope,item)"
                                :size="item.size||'mini'">
                                {{ item.title }}
                            </el-button>
                            <el-popover v-else
                                :ref="`popover${scope.$index}`"
                                placement="top-end"
                                width="120" style="margin-left: 10px">
                                <div style="text-align: center; margin: 0">
                                    <h4 style="margin-top:.6rem;"><i class="el-icon-warning" style="margin-right:6px;color:#ff9900;"></i>{{ item.header||'你确定删除吗？'}}</h4>
                                    <el-button type="text" size="mini" style="padding:4px 7px" @click="handleCancel(item,scope)">取消</el-button>
                                    <el-button type="primary" size="mini" style="padding:4px 7px" @click="handleOk(item,scope)">确定</el-button>
                                </div>
                                <el-button :type="item.type" :plain="item.plain||false" :icon="item.icon||''" :style="item.style&&item.style(scope,item)" :size="item.size||'mini'" slot="reference">{{ item.title||'删除' }}</el-button>
                            </el-popover>
                        </template>
                    </template>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-if="data.page" :small="data.page.small||false" :align="data.page.align" @size-change="hanldeSizeChange" @current-change="data.page.currentChange" :page-sizes="data.page.pageSizes" :page-count="data.page.PageCount" :current-page="data.page.currentPage" :page-size="data.page.size||10" :layout="data.page.layout||'prev, pager, next'" :total="data.page.total" :background="data.page.background||true"></el-pagination>
        <el-dialog title="预览" :visible.sync="visibled" :close-on-click-modal="false"><img :src="previewUrl" width="100%" height="100%" alt=""></el-dialog>
    </div>
</template>

<script>
export default {
    name:'Table',
    props:{
        data:{
            type:Object,
            required:true
        }
    },
    data:function(){return {count:0,visibled:false,previewUrl:''}},
    watch:{
        data:{
            immediate:true,
            deep:true,
            handler:function(val){(this.count === 1) && util.treeTableXcode(val.tableData);}
        }
    },
    created:function(){
        if (this.data.tree){
            !this.data.treeKey && (this.data.treeKey = 'children');
            util.treeTableXcode(this.data.tableData,null,null,this.data.treeKey);
            this.count = 1;
        }
        //!this.tree && util.treeTableXcode(this.data.tableData);
    },
    methods: {
        handleOk:function(currentBtn,scope){
            scope._self.$el.click();
            currentBtn.click.ok && currentBtn.click.ok(scope,currentBtn);
        },
        handleCancel:function(currentBtn,scope){
            scope._self.$el.click();
            currentBtn.click.cancel && currentBtn.click.cancel(scope,currentBtn);
        },
        treeClick:function(item,index,treeKey){
            if(item.open){
                this.collapse(item,index,treeKey);
            }else{
                this.expand(item,index,treeKey);
            }
        },
        expand:function(item,index,treeKey){
            if(!item[treeKey]){
                return index;
            }
            /*!item.xgrade && this.data.tableData.some((item,index) => {
                if (item.xcode.includes('-')) {
                    index = item.xcode.substr(0,1);
                    this.collapse(this.data.tableData[index],index);
                    return true;
                }
            });*/
            for(var i=0,leng=item[treeKey].length;i<leng;i++){
                var child = item[treeKey][i];
                this.data.tableData.splice(++index,0,child);
                if(child[treeKey] && child[treeKey].length > 0 && child.open){
                    index = this.expand(child,index,treeKey);
                }
            }
            item.open = true;
            return index;
        },
        collapse:function(item,index,treeKey){
            if(!item[treeKey])return index;
            item.open = false;
            this.data.tableData.splice(Number(index)+1,util.size(item[treeKey],treeKey));
        },
        handleSelectionChange:function(params){this.data.selectionChange && this.data.selectionChange(params,this.$refs.table);},
        handleSort:function(params){this.data.sortChange && this.data.sortChange(params,this.$refs.table);},
        hanldeSizeChange:function(val){this.data.page.sizeChange && this.data.page.sizeChange(val);},
        handlePreview:function(src){
            this.previewUrl = src;
            this.visibled = true;
        },
    },
}
var util = {};
util.treeTableXcode = function(data,xcode,xgrade,treeKey){
    xcode = xcode || "";
    xgrade = xgrade || 0;
    for(var i=0;i<data.length;i++){
        var item = data[i];
        if (item._xcode && !item._xcode.includes('-')){
            break;
        }else{
            item._xcode = xcode + i;
            item._xgrade = xgrade;
            if(item[treeKey] && item[treeKey].length > 0){
                util.treeTableXcode(item[treeKey],item._xcode+"-",xgrade+1,treeKey);
            }
        }
    }
};
util.size = function (data,treeKey) {
    var len = 0;
    if(data.length)len = data.length;
    for(var i=0;i<data.length;i++){
        if (data[i].open && data[i][treeKey]){
            len += util.size(data[i][treeKey],treeKey);
        }
    }
    return len;
}
</script>

<style lang="css" scoped>
.el-pagination.is-background >>> .btn-next, .el-pagination.is-background >>> .btn-prev, .el-pagination.is-background >>> .el-pager li{
    background-color: #fff;
    font-weight: 400;
}
.el-pagination{
    margin-top: 10px;
    margin-bottom: 10px;
}
.table >>> .switchStyle .el-switch__label {
    position: absolute;
    display: none;
    color: #fff;
    width: 100%;
}
.table >>> .switchStyle .el-switch__label--left {
    width: 100%;
    z-index: 1;
    left: 22px;
}
.table >>> .switchStyle .el-switch__label--right {
    width: 100%;
    z-index: 1;
    margin-left: 8px;
}
.table >>> .switchStyle .el-switch__label.is-active {
    display: block;
    width: 100%;
}
.table >>> .switchStyle.el-switch .el-switch__core, .el-switch .el-switch__label {
    /*width: 50px !important;*/
    padding: 0 28px !important;
    height: 22px !important;
    border-radius: 12px;
}
.table >>> .switchStyle.el-switch{
    height: 22px !important;
}
.table >>> .el-switch__core:after{
    width: 18px;
    height: 18px;
}
.table >>> .switchStyle.el-switch.is-checked .el-switch__core:after{
    margin-left: -19px !important;
}
</style>