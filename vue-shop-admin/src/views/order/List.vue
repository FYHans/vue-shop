<template>
    <div class="order-list">
        <el-form ref="searchForm">
            <div class="title">
            <span class="el-icon-search">筛选搜索</span>
        </div>
        <CommonForm 
            ref="form"
            :formLabel="formLabel" 
            :form="form" 
            :isSearch="isSearch" 
            @resetForm="resetForm"
            @findForm="findForm">
        </CommonForm>
        </el-form>


        <div class="add">
            <span class="el-icon-tickets"> 数据列表</span>
        </div>

        <CommonTable 
            class="list"
            :tableLabel="tableLabel" 
            :tableData="dealtableData" 
            :pager="pager" 
            @pagination="pagination"
            @sizeChange="sizeChange"
            @orderInfo="orderInfo"
            @deleteOrder="deleteOrder"
            :bulkOperation="bulkOperation"
        >
            <template #bulkOperation>
                <el-select v-model="value" placeholder="批量操作" class="bulkOperation">
                    <el-option
                    v-for="item in bulkOperation"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                    @change="changeBulk"
                    >
                    </el-option>
                </el-select>
                <el-button class="bulkBtn" type="primary" size="samll" @click="handleOperation">确定</el-button>
            </template>
        </CommonTable>
    </div>
</template>

<style lang="scss">
    .order-list {
        background-color: #fff;
        position: relative;
        padding: 15px;
        margin-bottom: 20px;
        .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-right: 60px;
            span {
                font-size: 18px;
            }
        }
        .add {
            padding: 15px 10px;
            border: 1px solid #efefef;
            font-size: 18px;
            border-radius: 5px;
            margin-bottom: 15px;
        }
        .list {
            position: relative;
            .el-table th>.cell,
            .el-table .cell {
                text-align: center;     
            }
            .bulkOperation {
                position: absolute;
                left: 0;
                bottom: 0;
            }
            .bulkBtn {
                position: absolute;
                left: 240px;
                bottom: 0;
            }
        } 
    }
</style>

<script>
import CommonForm from '@/components/form/CommonForm';
import CommonTable from '@/components/listTable/CommonTable';
import { validateOrderNum, validatePhone } from '@/tools/validator';
export default {
    components: { CommonTable, CommonForm },
    data() {
        return {
            // table数据
            tableLabel: [
            {
                prop: 'ordernum',
                label: '订单编号',
                width: 'auto'
            },
            {
                prop: 'date',
                label: '下单时间',
                width: '120'
            },
            {
                prop: 'account',
                label: '用户账号',
                width: '100'
            },
            {
                prop: 'money',
                label: '订单金额',
                width: '100'
            },
            {
                prop: 'pay',
                label: '支付方式',
                width: '100'
            },
            {
                prop: 'origin',
                label: '订单来源',
                width: '100'
            },
            {
                prop: 'status',
                label: '订单状态',
                width: '100'
            },
            // {
            //   prop: 'adddel',
            //   label: '操作',
            //   width: '200'
            // }
            ],
            tableData: [],
            dealtableData: [],
            // tableOption: {
            //     label: '操作',
            //     options: [
            //         { label: '编辑', methods: 'itemDetail', type: 'primary' },
            //         { label: '删除', methods: 'deleteItem', type: 'danger' }
            //     ]
            // },
            pager:{
                pageSize: 5,  // 每页数据量
                currentPage: 1, // 分页  当前页
                total:0,  //列表总数
                totalPage: [] //每一项是该页数据
            },
            // 批量处理数据
            bulkOperation: [
                {
                    value: '选项1',
                    label: '批量发货'
                }, 
                {
                    value: '选项2',
                    label: '关闭订单',
                    disabled: true
                }, 
                {
                    value: '选项3',
                    label: '删除订单'
                }
            ],
            value: '',
            // form数据
            isSearch: true,
            form: {},
            formLabel: [
                    {
                        model: 'ordernum',
                        label: '搜索订单号',
                        type: 'input'
                    },
                    {
                        model: 'account',
                        label: '收货人',
                        type: 'input'
                    },
                    {
                        model: 'data',
                        label: '下单日期',
                        type: 'date',
                    },
                    {
                        model: 'status',
                        label: '订单状态',
                        type: 'select',
                        opts: [
                            {
                                value: '待付款',
                                label: '待付款'
                            },
                            {
                                value: '待发货',
                                label: '待发货'
                            }, 
                            {
                                value: '已发货',
                                label: '已发货'
                            }, 
                            {
                                value: '已完成',
                                label: '已完成'
                            }, 
                            {
                                value: '已关闭',
                                label: '已关闭'
                            }
                        ]
                    },
                    {
                        model: 'orderType',
                        label: '订单类型',
                        type: 'select',
                        opts: [
                            {
                                value: '正常订单',
                                label: '正常订单'
                            },
                            {
                                value: '秒杀订单',
                                label: '秒杀订单'
                            }
                        ],
                    },
                    {
                        model: 'origin',
                        label: '订单来源',
                        type: 'select',
                        opts: [
                            {
                                value: 'PC订单',
                                label: 'PC订单'
                            },
                            {
                                value: 'APP订单',
                                label: 'APP订单'
                            }
                        ],
                    }
                ],
            rules: {
                // inpAccount: [{ required: true, trigger: 'blur', validator: validateUsername }],
                ordernum: [{ trigger: 'blur', validator: validateOrderNum }],
                // inpAccountTel: [{ trigger: 'blur', validator: validatePhone }],
            },
        }
    },
    methods: {
        changeBulk() {
            console.log(43, arguments);
        },
        handleOperation() {
            console.log(65, arguments);
        },
        getData() {
            this.$http.get('/admin/order/orderlist')
            .then(({data}) => {
                if (data.errno === 0) {
                    this.tableData = data.data;
                    this.dealPage(this.pager.currentPage);
                }
            })
            .catch(err => console.log('ListTable', err))
        },
        // 当前页发生变化时
        pagination(newpage) {
            this.dealPage(newpage);
        },
        // 每页数量变化时
        sizeChange(newpagesize) {
            this.dealPage(this.pager.currentPage);
        },
        dealPage(newpage) {
            this.pager.total = this.tableData.length;
            this.pager.pageNum = Math.ceil(this.tableData.length / this.pager.pageSize) || 1;
            for (let i = 0; i < this.pager.pageNum; i++) {
                this.pager.totalPage[i] = this.tableData.slice(this.pager.pageSize * i, this.pager.pageSize * (i + 1))
            }
            this.dealtableData = this.pager.totalPage[newpage - 1];
        },

        // tableBtnHandle(tabBtnMethods, itemInfo) {
                // 绑定一个事件包含多个事件
        //     // @handleButton="tableBtnHandle(arguments)"
        //     // console.log('handle', arguments);
        //     // this.tabBtnMethods();
        //     // fn[tabBtnMethods](itemInfo);
        // },
        orderInfo(index, row) {
            console.log(111, arguments);
        },
        deleteOrder(index, row) {
            this.$confirm('您确认删除该订单吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 发送请求
                this.$http.post('/admin/order/delete', { "ordernum": row.ordernum })
                .then(({data}) => {
                    if(data.errno === 0) {
                        this.$message({ type: 'success', message: '删除成功！' })
                    }
                })
                .catch(() => this.$message.error('删除失败'))
            }).catch(() => {
                this.$message({ type: 'info', message: '已取消删除' })
            })
        },
        // 表单处理
        findForm(formData) {
            console.log(222, formData);
            // this.$http.get('/admin/order/search', formData)
            //     .then(searchResult => {
            //         const arr = [];
            //         // for (let key in searchResult) {
            //         //     arr.push({})
            //         // }
            //         console.log(345,typeof searchResult);
            //         this.dealtableData = searchResult})
            //     .catch(err => this.$message.error('查询失败'))
            // const keyArr = Object.keys(formData);
            // const keyArr = Object.entries(formData);
            // console.log(keyArr);
            this.dealtableData = this.tableData.filter(item => {
                return JSON.stringify(Object.assign({}, item, formData)) === JSON.stringify(item)
            })
        },
        resetForm() {
            this.getData()
        }
    },
    created() {
      this.getData();
    },
}
</script>