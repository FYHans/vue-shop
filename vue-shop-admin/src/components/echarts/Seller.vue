<template>
        <Echarts :options="options" :onlyOption="onlyOption" :style="{ width: '100%', height: '500px' }"></Echarts>

</template>

<script>
import Echarts from '@/components/echarts/Echarts';
export default {
    components: { Echarts },
    data() {
        return {
            onlyOption: {},
            series: [],
            xData: [],
            options: {
                title: {
                    text: '▎商家销售统计',
                    left: 20,
                    top: 20
                },
                grid: {
                    top: '20%',
                    left: '3%',
                    right: '6%',
                    bottom: '3%',
                    containLabel: true // 距离是包含坐标轴上的文字
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    type: 'value'
                },
                tooltip: {
                    trigger: 'axis',
                    show: true,
                    axisPointer: {
                        type: 'line',
                        z: 0,
                        lineStyle: {
                        color: '#2D3443'
                        }
                    }
                },
                series: [
                {
                    type: 'bar',
                    label: {
                        show: true,
                        textStyle: {
                            color: 'white'
                        }
                    },
                    itemStyle: {
                        // 指明颜色渐变的方向
                        // 指明不同百分比之下颜色的值
                        color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            // 百分之0状态之下的颜色值
                            {
                            offset: 0,
                            color: '#5052EE'
                            },
                            // 百分之100状态之下的颜色值
                            {
                            offset: 1,
                            color: '#AB6EE5'
                            }
                        ])
                    }
                }
                ]
            }

        }
    },
    created() {
        this.$http.get('/data/echarts/seller')
        .then(({data}) => {
            this.xData = data.map(item =>item.name)
            this.yData = data.map(item => item.value)
            this.series = [
                {
                    data: this.yData
                }
            ]
            this.onlyOption = {
                xAxis: {
                    data: this.xData
                },
                series: this.series
            }
        })
        .catch(err => this.$message.error('请求失败')) 
    }
}

</script>
