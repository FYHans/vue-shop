<template>
    <div class="eCharts" :style="echartStyle" ref="echart">

    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  props: {
    options: {
      type: Object
    },
    xData: {
      type: Array
    },
    series: {
      type: Array
    },
    onlyOption: {
      type: Object
    },
    echartStyle: {
      type: Object
    }
    // height: {
    //   type: String,
    //   default: '300px'
    // }
  },
  mounted() {
    // echarts初始化可能捕捉不到高度
    this.$nextTick(() => {
      this.initEcharts(this.options);
    })
  },
  beforeDestroy() {
    // 组件销毁时主动释放echarts内存空间
    const echartInstance = echarts.init(this.$refs.echart);
    echartInstance && echartInstance.dispose();
    window.onresize = null;
  },
  watch: {
    options: {
      handler: function() {
        this.initEcharts();
      },
      deep: true
    },
    onlyOption() {
      this.initEcharts();
    }
  },
  methods: {
    initEcharts() {
      if (!this.$refs.echart) {
        return;
      }
      const echartInstance = echarts.init(this.$refs.echart);
      echartInstance.setOption(this.options);

      const dataOption = this.onlyOption;
      echartInstance.setOption(dataOption);

      window.onresize = function() {
        echartInstance.resize();
      }
    }
  }


  // props: {
  //   chartData: {
  //     type: Object,
  //     default() {
  //       return {
  //         xData: [],
  //         series: []
  //       }
  //     }
  //   },
  //   isAxisChart: {
  //     type: Boolean,
  //     default: true
  //   }
  // },
  //  computed: {
  //   options() {
  //     return this.isAxisChart ? this.axisOption : this.normalOption;
  //   }
  // },
  // watch: {
  //   chartData: {
  //     handler: function() { 
  //       lon
  //       // 此处注意，handler函数不能为箭头函数，this会取上下文，而不是组件里的this,此外，深度监听，必须为handler函数名，否则会无效果
  //            this.initChart();
  //            //可以做些相应的处理
  //       },
  //       deep: true
  //   }
  // },
  // data() {
  //   return {
  //     echart: null,
  //     axisOption: {
  //       xAxis: 
  //         {
  //           type: 'category',
  //           data: []
  //         }
  //       ,
  //       yAxis: 
  //         {
  //           type: 'value'
  //         }
  //       ,
  //       series: [
  //       ]
  //     },
  //     normalOption: {
  //       series: []
  //     }
  //   }
  // },
  // methods: {
  //   initChart() {
  //     console.log(111, chartData);
  //     this.initChartData();
  //     if (this.echart) {
  //       this.echart.setOption(this.options);
  //     } else {
  //       this.echart = echarts.init(this.$refs.echart);
  //       this.echart.setOption(this.options);
  //     }
  //   },
  //   initChartData() {
  //     this.axisOption.xAxis.data = chartData.xData;
  //     if (isAxisChart) {
  //       this.axisOption.series = chartData.series;
  //     }
  //     this.normalOption.series = chartData.series;
  //   }
  // }
}
</script>