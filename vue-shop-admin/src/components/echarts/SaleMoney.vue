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
                color: ['#F56FBC', '#00DDFF', '#37A2AA', '#FF0087', '#00BF77'],
                title: {
                    text: '▎昨日销售额'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                dataZoom:[{
                    type:"inside"    
                }],
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    type: 'value'
                },
            
                series: [
                    {
                        type: 'line',
                        stack: '总量',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(67, 35, 89)'
                            }, {
                                offset: 1,
                                color: 'rgba(12, 34, 56)'
                            }])
                        },
                        emphasis: {
                            focus: 'series'
                        }
                    },
                    {
                        type: 'line',
                        stack: '总量',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 221, 255)'
                            }, {
                                offset: 1,
                                color: 'rgba(77, 119, 255)'
                            }])
                        },
                        emphasis: {
                            focus: 'series'
                        }
                    }
                ]
            }
        }
    },
    created() {
        this.$http.get('/data/echarts/visitor')
        .then(({data}) => {
            this.xData = data.dayVisitor.hour;
            const arr = data.dayVisitor.data;
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
        .catch(err => console.log('visitor', err)) 
    }
}
</script>
