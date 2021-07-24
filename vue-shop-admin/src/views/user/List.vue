<template>
    <div class="user-list">
        <el-card>

            <el-form ref="userSearch" :model="queryInfo">
                <el-form-item :gutter="20" prop="query">
                    <el-col :span="8">
                        <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
                            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button style="margin-left: 40px" type="primary" @click="addDialogVisible = true">添加用户</el-button>
                    </el-col>
                </el-form-item>
            </el-form>

            <el-table :data="userlist" border stripe >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column type="index"></el-table-column>
                    <el-table-column label="姓名" prop="username"></el-table-column>
                    <el-table-column label="电话" prop="telphone"></el-table-column>
                    <el-table-column label="邮箱" prop="email"></el-table-column>
                    <el-table-column label="权限" prop="permission"></el-table-column>
                    <el-table-column label="状态" prop="status">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.status" @change="userStatusChange(scope.row)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180px">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editDialog(scope.row.id)"></el-button>
                            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteDialog(scope.row.id)"></el-button>
                            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                                <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
            <!-- <el-button type="primary" size="mini" @click="handleFindForm">查询</el-button> -->
            </el-table>

            <el-pagination 
                :page-sizes="[5, 10, 15, 20]" 
                :total="pagetotal" 
                style="text-align: right;"
                :current-page.sync="queryInfo.pagenum"
                :page-size.sync="queryInfo.pagesize"
                layout="total, prev, pager, next, sizes"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            >
            </el-pagination>
            
        </el-card>

        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClose">
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="telphone">
                    <el-input v-model="addForm.telphone"></el-input>
                </el-form-item>
                <el-form-item label="email" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <span>
                    <el-button @click="addDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="addUser">确定</el-button>
                </span>
            </el-form>
        </el-dialog>

        <el-dialog title="编辑信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClose">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="telphone">
                    <el-input v-model="editForm.telphone"></el-input>
                </el-form-item>
                <el-form-item label="email" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
                <span>
                    <el-button @click="editDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="editUser">确定</el-button>
                </span>
            </el-form>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
    .el-table {
        margin-top: 20px;
    }
    .el-dialog {
        .el-form {
            span {
                display: flex;
                justify-content: space-evenly;
            }
        }
    }
</style>

<script>
import { validateUsername, validateTelphone, validatePassword, validateEmail } from '@/tools/validator'
export default {
    data() {
        return {
            // 搜索信息
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 5
            },
            userlist: [],
            pagetotal: 0,
            // 添加用户对话框显示与隐藏
            addDialogVisible: false,
            addForm: {
                username: '',
                password: '',
                telphone: '',
                email: ''
            },
            addFormRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername, message: '请输入2-10位用户名'}],
                password: [{ required: true, trigger: 'blur', validator: validatePassword, message: '请输入4-10位密码'}],
                telphone: [{ required: true, trigger: 'blur', validator: validateTelphone, message: '请输入合法手机号'}],
                email: [{ required: true, trigger: 'blur', validator: validateEmail, message: '请输入合法邮箱'}],
            },
            // 修改用户
            editDialogVisible: false,
            editForm: {},
            editFormRules: {
                telphone: [{ required: true, trigger: 'blur', validator: validateTelphone, message: '请输入合法手机号'}],
                email: [{ required: true, trigger: 'blur', validator: validateEmail, message: '请输入合法邮箱'}],
            }
            
        }
    },
    methods: {
        async getUserList() {
            // 根据搜索信息获取数据
            const {data} = await this.$http.get('/admin/user/userList', {params: this.queryInfo})
            if (data.errno !== 0) {
                return this.$message.error('获取用户列表失败')
            }
            this.userlist = data.data;
            this.pagetotal = data.length;
        },
        handleSizeChange(newpagesize) {
            this.queryInfo.pagesize = newpagesize;
            this.getUserList();
        },
        handleCurrentChange(newpagenum) {
            this.queryInfo.pagenum = newpagenum;
            this.getUserList();
        },
        // 修改用户状态
        async userStatusChange(userinfo) {
            // put请求通常是修改请求
            const {data} = await this.$http.put('/admin/user/statusChange',{ id: userinfo.id, status: userinfo.status },)
            if (data.errno !== 0) {
                userinfo.status = !userinfo.status
                return this.$message.error('修改用户状态失败')
            }
                this.$message.success('修改用户状态成功')
        },
        addDialogClose() {
            this.$refs.addFormRef.resetFields();
        },
        addUser() {
            this.$refs.addFormRef.validate(async valid => {
                if (valid) {
                    const {data} = await this.$http.post('/admin/user/create', this.addForm)
                    if (data.errno !== 0) {
                        return this.$message.error('用户创建失败')
                    }
                    this.$message.success('创建用户成功');
                    this.addDialogVisible = false;
                    this.getUserList();
                }
            })
        },
        // 根据用户id请求用户信息，回显，再修改用户信息
        async editDialog(id) {
            const {data} = await this.$http.get('/admin/user/userInfo?id='+id)
            if (data.errno !== 0) {
                return this.$message.error('获取该用户信息失败')
            }
            this.editForm = data.data;
            this.editDialogVisible = true;
        },
        editUser() {
            this.$refs.editFormRef.validate(async valid => {
                if (valid) {
                    const res = await this.$http.put('/admin/user/update', this.editForm)
                    // console.log('editUser', res);
                    if (res.data.errno !== 0) {
                        return this.$message.error('修改用户信息失败')
                    }
                    this.$message.success('修改用户信息成功');
                    this.editDialogVisible = false;
                    this.getUserList();
                }
            })
        },
        editDialogClose() {
            this.$refs.editFormRef.resetFields();
        },
        // 删除用户
        deleteDialog(id) {
            this.$confirm('您确认删除该用户吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                // 发送请求
                const res = await this.$http.delete('/admin/user/delete?id=' + id) 
                if (res.data.errno !== 0) {
                    return this.$message.error('删除失败')
                }
                this.$message.success('删除成功');
                this.editDialogVisible = false;
                this.getUserList();
            }).catch(() => {
                this.$message({ type: 'info', message: '已取消删除' })
            })
        }       
    },
    created() {
        this.getUserList();
    }
}
</script>