<template>
  <div class="ana-content">
    <div class="ana-hr box">
      <p class="ana-title">持有房源
        <span class="total"> {{chart.sum_total}} </span>套</p>
      <div class="ana-hr-detail">
        <div class="ana-hr-pie">
          <div id="content" class="pie"></div>
        </div>
        <div class="ana-hr-count">
          <p class="count-title">
            <span class="hr-name">大厦名称</span>
            <span class="hr-count">房源套数</span>
            <span class="hr-rate">出租率</span>
          </p>
          <div v-for=" (item, index) in chart.rent">
            <p class="count-title">
              <span class="hr-name">{{item.name}}</span>
              <span class="hr-count">
                <span class="total sm">{{chart.total[index].sum}}</span>
              </span>
              <span class="hr-rate">
                <span class="total sm" v-if="chart.total[index].sum !== 0">{{((item.sum / chart.total[index].sum).toFixed(2)) * 100}} %</span>
                <span class="total sm" v-else>0%</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="ana-income box">
      <p class="ana-title">已收金额：
        <span class="total">{{amount.sum}}</span> 元</p>
    </div>
    <div class="ana-detail" v-for="(item, index) in amount.list">
      <div class="box detail-flex">
        <p class="ana-title">{{item.name}}
          <span class="total-count">合计应收：
            <span class="count">{{item.pay_money + item.un_pay_money}} </span>元</span>
        </p>
        <mt-progress :value="((item.pay_money / (item.pay_money + item.un_pay_money)).toFixed(2)) * 100" :barHeight="20">
          <div slot="end" v-if="(item.pay_money + item.un_pay_money) > 0">已收 {{((item.pay_money / (item.pay_money + item.un_pay_money)).toFixed(2)) * 100}}%</div>
          <div slot="end" v-else>已收 0%</div>
        </mt-progress>
        <div class="count-detail">
          <span class="ana-title">
            <span class="detail-count">已收
              <span class="count"> {{item.pay_count}} </span>户
              <span class="count">{{item.pay_money}}</span> 元</span>
            <span class="detail-count">未收
              <span class="uncount"> {{item.un_pay_count}} </span>户
              <span class="uncount">{{item.un_pay_money}}</span> 元</span>
          </span>
        </div>
      </div>
    <openid></openid>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import qs from 'qs';
import openid from '../common/setOpenid';
let echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
export default {
  data() {
    return {
      chart: {},
      charts: '',
      amount: {}
    };
  },
  components: {
    openid
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
              { value: this.chart.sum_rent, name: '已租' + (this.chart.sum_rent / (this.chart.sum_rent + this.chart.sum_un_rent)).toFixed(2) * 100 + '%' },
              { value: this.chart.sum_un_rent, name: '未租' + (100 - parseInt((this.chart.sum_rent / (this.chart.sum_rent + this.chart.sum_un_rent)).toFixed(2) * 100)) + '%' }
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
  created() {
   /*  this.$ajax('http://zft.louxiaomei.com/r/Wx_getcode').then((res) => {
      console.log(1);
    }); */
    console.log(this.$route.query.openid, this.$route);
    this.$ajax({
      url: '/r/Statistics_houseStatistics',
      method: 'POST',
      data: qs.stringify({ 'openid': 'o2-PovnAE_kYfb_Xiobw4lhgM7k4' })
    }).then((res) => {
      if (res.data.code === 200) {
        this.chart = res.data.data;
        this.chart.sum_total = this.chart.sum_rent + this.chart.sum_un_rent;
        this.drawPie('content');
      }
    });
    this.$ajax({
      url: '/r/Statistics_moneyStatistics',
      method: 'POST',
      data: qs.stringify({ 'openid': 'o2-PovnAE_kYfb_Xiobw4lhgM7k4' })
    }).then((res) => {
      if (res.data.code === 200) {
        this.amount = res.data.data;
        // console.log(this.amount, this.amount.sum);
      }
    });
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl";
.ana-content
  .pie
    width: 100px
    height: 100px
  .mt-progress-progress
    background-color: #1c9335
  .box
    padding: 15px
    background: #fff
    border-1px(rgba(7,17,27,0.1))
  .total
    color: #f07845
    font-size: 14px
  .total.sm
    font-size: 12px
  .count
    color: #1d5fcd
    font-size: 14px
  .uncount
    color: #e40f11
    font-size: 14px
  .ana-hr
    margin: 10px 0
    .ana-hr-detail
      display: flex
      justify-content: space-between
      .ana-hr-pie
        margin: 5px 0
      .ana-hr-count
        justify-content: center
        .count-title
          margin: 5px 0
          display: flex
          justify-content: flex-start
        .hr-name, .hr-count, .hr-rate
          margin: 0 5px
          flex:  1
          min-width: 50px
          text-align: center 
          font-size: 12px
  .ana-income, .ana-detail
    font-size: 12px
  .ana-detail
    .ana-title
      display: flex
      justify-content: space-between
    .detail-count
      flex: 1
</style>
