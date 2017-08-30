<template>
  <div>
    <div id="content" class="pie">
    </div>
  </div>
</template>

 <script type="text/ecmascript-6">
let echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
export default {
  data() {
    return {
      charts: '',
      option: ['已出租', '未出租']
    };
  },
  props: {
    chart: {
      type: Object
    }
  },
  methods: {
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id));
      console.log(this.chart);
      this.charts.setOption({
        series: [
          {
            name: '房屋出租情况',
            type: 'pie',
            radius: '100%',
            data: [
              { value: this.chart.sum_rent, name: '已租%' },
              { value: this.chart.sum_un_rent, name: '未租%' }
            ],
            label: {
              normal: {
                show: true,
                position: 'inside',
                color: '#e1e4e5',
                backgroundColor: 'rgba(0,0,0,0.2)'
              }
            },
            hoverAnimation: false
          }
        ]
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
        this.drawPie('content');
    });
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .pie
    width: 100px
    height: 100px
</style>