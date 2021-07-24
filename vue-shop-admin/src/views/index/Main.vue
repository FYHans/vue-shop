<template>
    <div class="main">
        <div class="dataMainShow clearfix">
            <div class="cardOuter col-lg-3 col-md-6 col-sm-8" v-for="(item, index) in dataMain" :key="index">
                <DataMainTab :icon="icon[index]" :dataMain="dataMain[index]" :class="'cardOuter' + index"></DataMainTab>
            </div>
        </div>
        <div class="showTabs">
            <div class="staticTab col-lg-8">
                <SaleMoney class="sales"></SaleMoney>
                <el-divider><i class="el-icon-loading"></i></el-divider>
                <!-- <Stock class="stock"></Stock> -->
                <Visitor class="visitor"></Visitor>
            </div>
            <div class="col-lg-4"><ScrollTab></ScrollTab></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .main {
        .dataMainShow {
            padding: 20px;
            margin-bottom: 30px;
            background-color: #fff;
            border-radius: 10px;
            .cardOuter0 {
                background: linear-gradient(90deg,#5171fd,#c97afd);
                box-shadow: 0 5px 10px #c97afd;
            }
            .cardOuter1 {
                background: linear-gradient(90deg,#3dadf6,#737bfc);
                box-shadow: 0 5px 10px #737bfc;
            }
            .cardOuter2 {
                background: linear-gradient(90deg,#ea677c,#ef9b5f);
                box-shadow: 0 5px 10px #ef9b5f;
            }
            .cardOuter3 {
                background: linear-gradient(90deg,#42d79b,#a6e25f);
                box-shadow: 0 5px 10px #a6e25f;
            }
            .cardOuter:hover {
                transform:scale(1.05)
            }
        }
        .showTabs {
            display: flex;
            background-color: #fff;
            padding: 20px 0;
            
        }
    }
</style>

<script>
import DataMainTab from '@/components/dataMainTab/DataMainTab';
import ScrollTab from '@/components/dataMainTab/ScrollTab';
import Visitor from '@/components/echarts/Visitor';
import SaleMoney from '@/components/echarts/SaleMoney';
// import Stock from '@/components/echarts/Stock';
export default {
    components: { DataMainTab, Visitor, ScrollTab, SaleMoney },
    data() {
        return {
            dataMain: [],
            icon: ['glyphicon glyphicon-yen', 'el-icon-view', 'el-icon-shopping-cart-2', 'el-icon-bank-card'],
        }
    },
    methods: {
        getData() {
            this.$http.get('/data/echarts/dataMain')
                .then(data => 
                    this.dataMain = data.data
                )
                .catch(() => this.$message.error('请求失败'))
        }
    },
    created() {
        this.getData();
    }
}
</script>