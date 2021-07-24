<template>
    <Echarts :options="options" :onlyOption="onlyOption" :style="{ width: '100%', height: '300px' }"></Echarts>
</template>

<script>
import * as echarts from 'echarts';
import Echarts from '@/components/echarts/Echarts';
export default {
    components: { Echarts },
    data() {
        return {
            onlyOption: {},
            series: [],
            xData: [],
            legend: {},
            options: {
                title: {
                    text: '▎热销品类',
                    left: 20,
                    top: 20
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: '本月·',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '40',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            {value: 1048, name: '服装'},
                            {value: 735, name: '鞋子'},
                            {value: 580, name: '化妆品'},
                            {value: 484, name: '食品'},
                            {value: 300, name: '家居'}
                        ]
                    }
                ]        
            }

        }
    },
    created() {
        this.$http.get('/data/echarts/stock')
        .then(({data}) => {
            this.xData = data.common.month;

            const arr = data.commodity.data;

            
            this.series =  arr.map(item => { 
                return { data: item.data, name:item.name  }
            })
            const nameArr =  arr.map(item => item.name)
            this.legend = { data: nameArr }

            this.onlyOption = {
                xAxis: {
                    data: this.xData
                },
                series: this.series,
                legend: this.legend
            }
        })
        .catch(err => console.log('stock', err)) 
    }
}

</script>
