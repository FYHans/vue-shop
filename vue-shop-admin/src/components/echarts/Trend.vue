<template>
        <Echarts :options="options" :onlyOption="onlyOption" :style="{ width: '100%', height: '500px' }"></Echarts>

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
                color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
                title: {
                    text: '▎商品销售趋势'
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
                                    name: 'Line 1',
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
                                            color: 'rgba(128, 255, 165)'
                                        }, {
                                            offset: 1,
                                            color: 'rgba(1, 191, 236)'
                                        }])
                                    },
                                    emphasis: {
                                        focus: 'series'
                                    }
                                },
                                {
                                    name: 'Line 2',
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
                                },
                                {
                                    name: 'Line 3',
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
                                            color: 'rgba(55, 162, 255)'
                                        }, {
                                            offset: 1,
                                            color: 'rgba(116, 21, 219)'
                                        }])
                                    },
                                    emphasis: {
                                        focus: 'series'
                                    }
                                },
                                {
                                    name: 'Line 4',
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
                                            color: 'rgba(255, 0, 135)'
                                        }, {
                                            offset: 1,
                                            color: 'rgba(135, 0, 157)'
                                        }])
                                    },
                                    emphasis: {
                                        focus: 'series'
                                    }
                                },
                                {
                                    name: 'Line 5',
                                    type: 'line',
                                    stack: '总量',
                                    smooth: true,
                                    lineStyle: {
                                        width: 0
                                    },
                                    showSymbol: false,
                                    label: {
                                        show: true,
                                        position: 'top'
                                    },
                                    areaStyle: {
                                        opacity: 0.8,
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: 'rgba(255, 191, 0)'
                                        }, {
                                            offset: 1,
                                            color: 'rgba(224, 62, 76)'
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
        this.$http.get('/data/echarts/trend')
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
        .catch(err => console.log('trend', err)) 
    }
}

</script>
