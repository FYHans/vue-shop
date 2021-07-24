<template>
    <div class="common-table">
        <el-table :data="tableData" stripe  tooltip-effect="dark">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="编号" width="55">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ (pager.currentPage - 1) * pager.pageSize + scope.$index + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip :tableLabel="tableLabel" v-for="item in tableLabel" :key="item.prop" :label="item.label" :width="item.width ? item.width : ''">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
                </template>
            </el-table-column>



            <el-table-column prop="adddel" :label="tableOption.label" width="200">
                <template slot-scope="scope">
                    <!-- <el-button v-for="(item,index) in tableOption.options" :key="index" 
                        @click="handleButton(item.methods,scope.row)"
                        :type="item.type" 
                        size="mini"
                        >{{item.label}}</el-button> -->
                    <router-link tag="el-button" :to="'/order/listInfo/'+ scope.$index" type="primary" size="mini" @click="handleOrderInfo(scope.$index, scope.row)">查看订单</router-link>
                    <el-button type="danger" size="mini" @click="handleDeleteOrder(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination 
            :page-sizes="[5, 10, 15, 20]" 
            :total="pager.total" 
            style="text-align: right;"
            :current-page.sync="pager.currentPage"
            :page-size.sync="pager.pageSize"
            layout="total, prev, pager, next, sizes"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        >
        </el-pagination>
        <slot name="bulkOperation"></slot>
    </div>
</template>

<style lang="scss" scoped>
    .el-table {
        margin-bottom: 20px;
    }
    .bulkOperation {
        position: relative;
        .el-select {
            height: 25px;
            line-height: 25px;
            width: 200px;
        }
        .el-button {
            margin-left: 10px;
        }
    }
</style>

<script>
export default {
    props: {
        tableData:{  // 表格数据
            type:Array,
            default: () => {
                return []
            }
        },
        tableLabel:{   // label信息
            type:Array,
            default: () => {
                return []
            }
        },
        tableOption:{  // 操作数据
            type:Object,
            default: () => {
                return {}
            }
        },
        pager:{  // 分页信息
            type: Object,
            default: function(){
                return {
                    currentPage:1,
                    pageSize:5,
                    total:0
                }
            }
        },
        bulkOperation: { //批量处理
            type: Array
        },
        value: {
            value: ''
        }
    },
    data() {
        return {
            
        }
    },
    methods: {
        // 触发自定义按钮操作
        // handleButton(method, row){
        //   this.$emit('handleButton', method, row);
        // },
        // 获取所有的复选框选项
        getAllSelections(){
            return this.$refs.table.selection;
        },
        // size发生变化时，令currentPgae为1，并发送自定义事件
        handleSizeChange(newpagesize) {
            this.pager.currentPage = 1;
            this.$emit('sizeChange', newpagesize);
        },
        // currentPage发生变化时，发送自定义事件
        handleCurrentChange(newpage) {
            this.$emit('pagination', newpage);
        },
        handleOrderInfo($index, row) {
            this.$emit('orderInfo', $index, row)
        },
        handleDeleteOrder($index, row) {
            this.$emit('deleteOrder', $index, row)
        },
    }
}
</script>