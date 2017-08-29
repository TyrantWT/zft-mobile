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
  methods: {
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        series: [
          {
            name: '房屋出租情况',
            type: 'pie',
            radius: '100%',
            data: [
              { value: 10, name: '已租33%' },
              { value: 90, name: '未租67%' }
            ],
            label: {
              normal: {
                show: true,
                position: 'inside',
                color: '#e1e4e5',
                backgroundColor: 'rgba(0,0,0,0.2)'
              }
            }
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
