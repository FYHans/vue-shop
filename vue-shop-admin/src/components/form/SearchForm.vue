<template>
    <div class="searchForm">
        <el-form label-width="80px" :inline="true" :model="formInline" class="demo-form-inline" ref="orderListForm">
            <div class="title">
                <span class="el-icon-search">筛选搜索</span>
                <el-form-item>
                    <!-- <el-button size="mini" @click="resetForm('orderListForm')">重置</el-button>
                    <el-button type="primary" size="mini" @click="findForm('orderListForm')">查询</el-button> -->
                </el-form-item>
            </div>

            <div class="inp">
                <!-- <el-form-item :label="item.label" v-for="(item, index) in inpOption" :key="index" :prop="formInline.inpval[index]">
                    <el-input v-model="formInline.inpval[index]" :placeholder="item.placeholder"></el-input>
                </el-form-item> -->
                <el-form-item label="输入搜索" prop="inpOrderNum">
                    <el-input v-model="formInline.inpOrderNum" placeholder="请输入18位订单编号"></el-input>
                </el-form-item>
                <el-form-item label="收货人" prop="inpAccountTel">
                    <el-input v-model="formInline.inpAccountTel" placeholder="收货人姓名/手机号"></el-input>
                </el-form-item>

                <el-form-item label="提交时间">
                    <el-date-picker
                        v-model="formInline.date"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
            </div>

            <div class="select">
                <!-- <el-form-item :label="item.orderStatus" v-for="(item, index) in selectOption" :key="index"> -->
                    <!-- v-model="value"是所选中的 -->
                    <!-- <el-select v-model="formInline.selectval[index]" filterable :placeholder="item.placeholder">
                        <el-option
                            v-for="(childItem, index) in item.options"
                            :key="index"
                            :label="childItem.label"
                            :value="childItem.value">
                        </el-option>
                    </el-select>
                </el-form-item> -->
            </div>
        </el-form>
    </div>
</template>


<style lang="scss">
    .searchForm {
        padding: 0 20px;
        border: 1px solid #efefef;
        border-radius: 5px;
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
        .inp,
        .select {
            display: flex;
            justify-content: space-evenly;
            .el-input {
                width: 200px;
            }
            .el-form-item__label {
                font-size: 14px;
                font-weight: normal;
            }
        }
    }
</style>

<script>
import { validateOrderNum, validatePhone } from '@/tools/validator'
export default {
    data() {
        return {
            formInline: {
                // inpval: [
                //     { 'inpOrderNum': '' },
                //     { 'inpAccountTel': '' }
                // ],
                inpOrderNum: '',
                inpAccountTel: '',
                date: '',
                // region: '',
                // onlinestatus: '',
                // checkstatus: ''
                // selectval: [
                //     { 'region': '' },
                //     { 'onlinestatus': '' },
                //     { 'checkstatus': '' }
                // ]
            },
            rules: {
                // inpAccount: [{ required: true, trigger: 'blur', validator: validateUsername }],
                inpOrderNum: [{ trigger: 'blur', validator: validateOrderNum }],
                inpAccountTel: [{ trigger: 'blur', validator: validatePhone }],
            },
            selectOption: [
                {
                    orderStatus: '订单状态',
                    placeholder: '请选择',
                    options: [
                        {
                            value: '选项1',
                            label: '待付款'
                        },
                        {
                            value: '选项2',
                            label: '待发货'
                        }, 
                        {
                            value: '选项3',
                            label: '已发货'
                        }, 
                        {
                            value: '选项4',
                            label: '已完成'
                        }, 
                        {
                            value: '选项5',
                            label: '已关闭'
                        }
                    ],
                },
                {
                    orderStatus: '订单分类',
                    placeholder: '请选择',
                    options: [
                        {
                            value: '选项1',
                            label: '正常订单'
                        },
                        {
                            value: '选项2',
                            label: '秒杀订单'
                        }
                    ],
                },
                {
                    orderStatus: '订单来源',
                    placeholder: '请选择',
                    options: [
                        {
                            value: '选项1',
                            label: 'PC订单'
                        },
                        {
                            value: '选项2',
                            label: 'APP订单'
                        }
                    ],
                }
            ],
            inpOption: [
                {
                    label: '输入搜索',
                    placeholder: '订单编号'
                },
                {
                    label: '收货人',
                    placeholder: '收货人姓名/手机号码'
                }                
            ],
            // 选中的值
            value: '',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                    }
                }]
            },
        }
    },
    methods: {
       // 表单处理
        findForm(formName) {
                if (this.formInline.date) {
                    let d = new Date(this.formInline.date); 
                    d = d.getFullYear() + '-' + 
                        ((d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1)) + '-' + 
                        ((d.getDate() + 1) > 9 ? (d.getDate() + 1) : '0' + (d.getDate() + 1));
                    this.formInline.date = d;
                }
            this.$store.dispatch('findOrder', this.formInline)
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>