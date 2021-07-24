<template>
        <!-- 样式: 1 placeholder  2  label   3 label-width -->
        <!-- 校验: 1 v-model  2 prop  3 model  4 rules  -->
        <!-- 提交: 1 ref  2 绑定事件 3 validate -->
    <el-form :inline="inline" :model="form" ref="form" label-width="200px" :rules="rules">
        <el-form-item v-for="item in formLabel" :key="item.model" :label="item.label" :prop="item.model">
            <el-input v-model="form[item.model]" :placeholder="'请输入' + item.label" v-if="item.type === 'input'" :prop="form[item.model]"></el-input>
            <!-- <el-input v-model="form[item.model]" :placeholder="'请输入' + item.label" :type="item.type ? item.type : 'input'"></el-input> -->
            <el-input v-model="form[item.model]" :placeholder="'请输入' + item.label" type="textarea" v-if="item.type === 'textarea'"></el-input>
            <el-select v-model="form[item.model]" placeholder="请选择" v-if="item.type === 'select'">
                <el-option v-for="item in item.opts" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-switch v-model="form[item.model]" v-if="item.type === 'switch'"></el-switch>
            <el-date-picker v-model="form[item.model]" type="date" placeholder="选择日期" v-if="item.type === 'date'" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item><slot></slot></el-form-item>
        <el-form-item v-if="isSearch">
            <el-button size="mini" @click="handleResetForm">重置</el-button>
            <el-button type="primary" size="mini" @click="handleFindForm">查询</el-button>
        </el-form-item>

    </el-form>
</template>

<script>
export default {
    props: {
        inline: {
            type: Boolean,
            default: true
        },
        form: Object,
        formLabel: Array,
        rules: Object,
        isSearch: Boolean
    },
    methods: {
        handleResetForm() {
            this.$refs.form.resetFields()
            this.$emit('resetForm')
        },
        handleFindForm() {
            this.$emit('findForm', this.form)
        },
    }
}
</script>