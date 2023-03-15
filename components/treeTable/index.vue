<template>
    <div class="treeTable" style="width:100%;margin-top:5px">
        <el-table ref="treeTable" :stripe="data.stripe" :show-header="data.showHeader" :max-height="data.maxHeight" :size="data.size" style="width:100%"
            :border="data.border"
            v-loading="data.loading"
            :element-loading-text="data.loadingText||'Loading'"
            :element-loading-spinner="data.loadingIcon||'el-icon-loading'"
            :empty-text="data.table_msg_empty"
            :indent="data.indent||16"
            :row-key="data.rowKey"
            :expand-row-keys="data.rowKey?data.expandRowKeys:null"
            :default-expand-all="data.defaultExpandAll"
            :data="data.tableData"
            :default-sort="data.defaultSort"
            :tree-props="data.treeProps"
            @row-click="rowClick"
            @header-click="headerClick"
            @row-dblclick="rowDblclick"
            @expand-change="expandChange"
            @row-contextmenu="rowContextmenu"
            @header-contextmenu="headerContextmenu"
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
                <!--<div v-else-if="data.tree && col.hasChildren && scope.row[data.treeKey] && scope.row[data.treeKey].length > 0" style="display:inline-block;">
                <template v-if="col.render">
                  <span :style="col.render(scope,col)[1]">{{ col.render(scope,col)[0] }}</span>
                </template>
                <template v-else>
                    <span>{{ scope.row[col.prop] }}</span>
                </template>
                </div>-->
                <div v-if="col.tooltip" style="display:inline-block;">
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
                <div v-else style="display:inline-block;">
                    <div v-if="col.isPreview" :style="col.style&&col.style(scope,col)" @click.stop="handlePreview(scope.row[col.prop])">
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
             :fixed="data.tableOption.fixed||false"
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
                           @click.stop="item.click&&item.click(scope,item)"
                           :size="item.size||'mini'">
                          {{ item.title }}
                        </el-button>
                        <el-popover v-else
                            :ref="`popover${scope.$index}`"
                            :trigger="item.trigger||'click'"
                            placement="top-end"
                            width="120" style="margin-left: 10px">
                            <div style="text-align: center; margin: 0">
                              <h4 style="margin-top:.6rem;"><i class="el-icon-warning" style="margin-right:6px;color:#ff9900;"></i>{{ item.header||'你确定删除吗？'}}</h4>
                              <el-button type="text" size="mini" style="padding:4px 7px" @click.stop="handleCancel(item,scope)">取消</el-button>
                              <el-button type="primary" size="mini" style="padding:4px 7px" @click.stop="handleOk(item,scope)">确定</el-button>
                            </div>
                            <el-button :type="item.type" :plain="item.plain||false" :icon="item.icon||''" :style="item.style&&item.style(scope,item)" :size="item.size||'mini'" slot="reference">{{ item.title||'删除' }}</el-button>
                        </el-popover>
                    </template>
                </template>
            </template>
        </el-table-column>
      </el-table>
        <el-pagination v-if="data.page" :small="data.page.small||false" :align="data.page.align" @size-change="hanldeSizeChange" @current-change="data.page.currentChange" :page-sizes="data.page.pageSizes" :page-count="data.page.PageCount" :current-page="data.page.currentPage" :page-size="data.page.size||10" :layout="data.page.layout||'prev, pager, next'" :total="data.page.total" :background="data.page.background||true"></el-pagination>
        <el-dialog title="预览" :visible.sync="visibled" :close-on-click-modal="false" append-to-body><img :src="previewUrl" width="100%" height="100%" alt=""></el-dialog>
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
            handler:function(val){}
        }
    },
    created:function(){
        if (this.data.tree){
            !this.data.treeKey && (this.data.treeKey = 'children');
        }
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
        handleSelectionChange:function(params){this.data.selectionChange && this.data.selectionChange(params,this.$refs.treeTable);},
        handleSort:function(params){this.data.sortChange && this.data.sortChange(params,this.$refs.treeTable);},
        hanldeSizeChange:function(val){this.data.page.sizeChange && this.data.page.sizeChange(val);},
        handlePreview:function(src){
            this.previewUrl = src;
            this.visibled = true;
        },
        expandChange(row,expandedRows){
            this.data.expandChange && this.data.expandChange(this.$refs.treeTable,row,expandedRows);
        },
        headerClick(row,index,e){
            if (this.data.headerClick){
                this.data.headerClick(this.$refs.treeTable,row,index,e);
            }
        },
        rowClick(row,index,e){
            if (this.data.rowClick){
                this.data.rowClick(this.$refs.treeTable,row,index,e);
            }
            // this.$refs.treeTable.toggleRowExpansion(row);
        },
        rowDblclick(row,index,e){
            if (this.data.rowDblclick){
                this.data.rowDblclick(this.$refs.treeTable,row,index,e);
            }
        },
        rowContextmenu(row, column, event){
            this.data.rowContextmenu && this.data.rowContextmenu(this.$refs.treeTable,row, column, event);
        },
        headerContextmenu(row, column, event){
            this.data.headerContextmenu && this.data.headerContextmenu(this.$refs.treeTable,row, column, event);
        }
    },
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
.treeTable >>> .switchStyle .el-switch__label {
    position: absolute;
    display: none;
    color: #fff;
    width: 100%;
}
.treeTable >>> .switchStyle .el-switch__label--left {
    width: 100%;
    z-index: 1;
    left: 22px;
}
.treeTable >>> .switchStyle .el-switch__label--right {
    width: 100%;
    z-index: 1;
    margin-left: 8px;
}
.treeTable >>> .switchStyle .el-switch__label.is-active {
    display: block;
    width: 100%;
}
.treeTable >>> .switchStyle.el-switch .el-switch__core, .el-switch .el-switch__label {
    /*width: 50px !important;*/
    padding: 0 28px !important;
    height: 22px !important;
    border-radius: 12px;
}
.treeTable >>> .switchStyle.el-switch{
    height: 22px !important;
}
.treeTable >>> .el-switch__core:after{
    width: 18px;
    height: 18px;
}
.treeTable >>> .switchStyle.el-switch.is-checked .el-switch__core:after{
    margin-left: -19px !important;
}
</style>
