<template>
    <div class="page-home">
        <el-container class="page-container">
            <el-aside width="200px">
                <el-menu
                    :router="true"
                    class="el-menu-vertical-demo"
                    :class="[ closeSide ? 'closeSide' : '' ]"
                    :collapse="isCollapse"
                    text-color="#fff"
                    background-color="#545c64"
                    active-text-color="#ffd04b"
                    :default-active="activePath"
                    :unique-opened="true"
                >
                    <el-menu-item index="/main" class="welcome">
                        <i class="el-icon-magic-stick"></i>
                        <span slot="title">WELCOME</span>
                    </el-menu-item>
                    <el-menu-item index="/main" >
                        <i class="el-icon-s-home"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu  v-for="(item, index) in menu" :key="index" :index="String(index)" @click="saveNavStatus()">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{item.title}}</span>
                        </template>
                        <el-menu-item v-for="childItem in item.children" :key="childItem.link" :index="childItem.link" @click="saveNavStatus(childItem.link, childItem.text)">{{childItem.text}}</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container class="headermain">
                <el-header>
                    <div class="header-title">
                        <div :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold', 'isfold']" @click="handleFold"></div>
                        <h1>后台管理系统</h1>
                        <div class="status">
                            <router-link to="/information/infor"><el-badge  :value="12" class="el-icon-bell"></el-badge></router-link>
                            <el-menu :router="true" default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                                <el-submenu index="1">
                                    <template slot="title">
                                        <el-avatar size="medium" :src="circleUrl"></el-avatar>
                                        {{window.sessionStorage.username}}
                                    </template>
                                    <el-menu-item index="/manager/managerinfo">个人中心</el-menu-item>
                                    <el-menu-item index="/manager/managerset">个人设置</el-menu-item>
                                    <el-menu-item index="/login" @click="handleLogout">退出登录</el-menu-item>
                                </el-submenu>
                            </el-menu>
                        </div>
                    </div>
                    <div id="navTags">
                        <router-link tag="el-tag" to="/main" effect="dark">首页</router-link>
                        <el-tag
                        v-for="tag in tags"
                        :key="tag.text"
                        closable
                        :effect="effect"
                        @close="handleTag()"
                    >
                        {{tag.text}}
                    </el-tag>
                    </div>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style lang="scss" scoped>
    .page-home {
        height: 100%;
        .page-container {
            height: 100%;
            .el-aside {
                height: 100%;
                width: auto!important;
                .welcome {
                    font-size: 22px;
                    height: 80px;
                    line-height: 80px;
                    text-align: center;
                }
                .el-menu {
                    height: 100%;
                }
            }
            .headermain {
                background-color: #efefef;
                .el-header {
                    height: 100px!important;
                    background-color: #fff;
                    .header-title {
                        padding-left: 20px;
                        height: 55px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .isfold {
                            font-size: 24px;
                            line-height: 60px;
                            width: 30px;
                        }
                        h1 {
                            flex: 1;
                            padding-left: 20px;
                        }
                        .status {
                            display: flex;
                            align-items: center;
                            background: #fff;
                            .el-badge {
                                font-size: 20px;
                                cursor: pointer;
                                &:hover {
                                    background-color: #efefef;
                                }
                            }
                            .el-menu {
                                width: 120px;
                                background-color: #fff;
                                .el-submenu {
                                    background-color: #fff;
                                }
                            }
                        }
                    }
                    #navTags {
                        margin-bottom: 5px;
                        margin-top: 5px;
                    }
                }
                .el-main {
                    padding: 15px;
                }
            }
        }
    }
  
</style>

<script>
export default {
    data() {
        return {
            circleUrl: require('@/assets/user.jpg'),
            isCollapse: false,
            closeSide: false,
            menu: [
                {
                    title: '商品管理',
                    children: [
                        { text: '创建商品', link: '/product/create' },
                        { text: '商品列表', link: '/product/list/:page' },
                    ],
                    icon: 'el-icon-menu'
                },
                {
                    title: '订单管理',
                    children: [
                        { text: '订单列表', link: '/order/list/:page' },
                        { text: '订单设置', link: '/order/setting' },
                    ],
                    icon: 'el-icon-s-order'
                },
                {
                    title: '用户模块',
                    children: [
                        { text: '用户列表', link: '/user/list/:page' },
                    ],
                    icon: 'el-icon-s-custom'
                },
                {
                    title: '数据统计',
                    children: [
                        { text: '订单数据', link: '/analysis/order' },
                        { text: '资金数据', link: '/analysis/money' },
                    ],
                    icon: 'el-icon-s-data'
                },
                {
                    title: '个人设置',
                    children: [
                        { text: '个人中心', link: '/manager/managerinfo' },
                        { text: '修改信息', link: '/manager/managerset' },
                    ],
                    icon: 'el-icon-setting'
                }
            ],
            activePath: '/main',
            tags: [
            ],
        }
    },
    computed: {
        effect() {
            console.log(this.$route);
            // console.log(this.window.sessionStorage.getItem('activePath'));
            // console.log(this.$router);
            return this.window.sessionStorage.getItem('activePath') === this.$router.path ? 'dark' : 'plain'
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            // console.log(key, keyPath);
        },
        // 退出登录时清空
        handleLogout() {
            this.window.sessionStorage.clear();
            this.$router.go(0);
        },
        handleFold() {
            this.isCollapse = !this.isCollapse;
            this.closeSide = !this.closeSide;
        },
        // 保存激活状态
        saveNavStatus(activePath, activeText) {
            // console.log(activePath, activeText);
            this.window.sessionStorage.setItem('activePath', activePath);
            this.activePath = activePath.path;
            const newTag = { text: activeText, link: activePath }
            this.tags.push(newTag);
        },
        handleTag() {
            this.tags.splice(this.tags.length-1, 1);
            this.$router.back()
        },
    },
    watch: {
        tags() {
            this.tags.forEach(item => {
            const contain = document.getElementById('navTags')
            const dom = document.createElement('el-tag');
            contain.appendChild(dom);
            })
        }
    }
}
</script>