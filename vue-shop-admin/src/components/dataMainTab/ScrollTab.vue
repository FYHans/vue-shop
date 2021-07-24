<template>
    <div class="scrollTab" style="">
        <div class="scrollTabTitle" style="margin-bottom: 20px">门店销售额排行榜T10</div>
        <el-scrollbar>
            <vue-seamless-scroll :data="rankData" :class-option="defaultOption" >
                <div class="shopItem flex" v-for="(item, index) in rankData" :key="index">
                    <div style="width:130px">
                        <span class="rankIndex inline-block">
                            <span :class="rankIndex[index + 1]" :size="30" v-if="index < 3"></span>
                            <span v-else>{{index + 1}}</span>
                        </span>
                        <span style="margin-left:10px">{{item.store}}</span>
                    </div>
                    <el-progress 
                        :percentage="percentage(item.sales)" 
                        :show-text="false"
                        status="exception"
                        color="#F56C6C"
                    ></el-progress>
                    <div style="margin-left:10px">{{item.sales}}</div>
                </div>
            </vue-seamless-scroll>
        </el-scrollbar>
    </div>
</template>

<style lang="scss" scoped>
    .scrollTab{
        width: 400px;
        height: 600px;
        overflow: hidden;
        .scrollTabTitle {
            font-size: 30px;
        }
        .shopItem {
            display: flex;
            margin-bottom: 16px;
            font-size: 2rem;
            .rankIndex {
                width: 30px;
                height: 30px;
                text-align: center;
                vertical-align: middle;
            }
            .el-progress {
                width: 200px;
                padding-top: 12px;
            }
        }
    }
</style>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
    name: 'shopRank',
    components: { vueSeamlessScroll },
    data() {
        return {
            rankData: [],
            rankIndex: {
                1: 'el-icon-medal-1',
                2: 'el-icon-medal',
                3: 'el-icon-medal'
            },
        }
    },
    // 监听属性 类似于data概念
    computed: {
        defaultOption () {
            return {
                step: 0.2, // 数值越大速度滚动越快
                limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
                hoverStop: true, // 是否开启鼠标悬停stop
                direction: 1, // 0向下 1向上 2向左 3向右
                openWatch: true, // 开启数据实时监控刷新dom
                singleHeight: 0.1, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
                singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
                waitTime: 10 // 单步运动停止的时间(默认值1000ms)
            }
        },
        max() {
            if (this.rankData.lenght === 0) return 0;
            return this.rankData[0].sales;
        }
    },
    methods: {
        percentage(val) {
            if (!val || this.max === 0) {
                return 0;
            }
            return parseInt((val / this.max) * 100);
        }
    },
    // 生命周期 - 挂载完成（可以访问DOM元素）
    // mounted() {
    //     for(let i = 0 ; i < 15 ; i++){
    //         let j = {
    //             title:'无缝滚动第几条啊啊啊-'+i,
    //             time: '2020-04-10'
    //         }
    //         this.rankData.push(j)
    //     }
    // },
    created() {
        this.$http.get('/data/tabledata/scroll')
        .then(({data}) => {
            this.rankData = data.sort((a, b) => b.sales - a.sales);
        })
        .catch(err => this.$message.error('请求失败')) 
    }
}
</script>