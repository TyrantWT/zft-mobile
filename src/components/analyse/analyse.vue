<template>
  <div class="ana-content">
    <div class="ana-hr box">
      <p class="ana-title">持有房源<span class="total"> 22 </span>套</p>
      <div class="ana-hr-detail">
        <div class="ana-hr-pie"><charts></charts></div>
        <div class="ana-hr-count">
          <p class="count-title"><span class="hr-name">大厦名称</span> <span class="hr-count">房源套数</span> <span class="hr-rate">出租率</span></p>

          <p class="count-title"><span class="hr-name">金福大厦</span> <span class="hr-count"><span class="total">222</span></span> <span class="hr-rate"><span class="total">100%</span></span></p>
        </div>
      </div>
    </div>
    <div class="ana-income box">
        <p class="ana-title">已收金额： <span class="total">2342432532453</span>元</p>
    </div>
    <div class="ana-detail">
        <div class="box detail-flex">
          <p class="ana-title">金福大厦
            <span class="total-count">合计应收： <span class="count">1555555555 </span>元</span>
          </p>
            <mt-progress :value="66" :barHeight="20">
            <div slot="end">已收 66%</div>
          </mt-progress>
          <div class="count-detail">
            <span class="ana-title">
              <span class="detail-count">已收<span class="count"> 26 </span>户 <span class="count">143000</span> 元</span>
              <span class="detail-count">未收<span class="uncount"> 2 </span>户 <span class="uncount">234234</span> 元</span>
            </span>
          </div>
        </div>
        <div class="box detail-flex">
          <p class="ana-title">金福大厦
            <span class="total-count">合计应收： <span class="count">1555555555 </span>元</span>
          </p>
            <mt-progress :value="66" :barHeight="20">
            <div slot="end">已收 66%</div>
          </mt-progress>
          <div class="count-detail">
            <span class="ana-title">
              <span class="detail-count">已收<span class="count"> 26 </span>户 <span class="count">143000</span></span>
              <span class="detail-count">未收<span class="uncount"> 2 </span>户 <span class="uncount">234234</span> 元</span>
            </span>
          </div>
        </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
 import charts from './charts';
 import qs from 'qs';
export default {
  components: {
    charts
  },
  mounted() {
    this.$ajax({
      url: 'http://zft.louxiaomei.com/r/Statistics_houseStatistics',
      method: 'POST',
      data: qs.stringify({'openid': '23423432'})
    });
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl";
.ana-content
  .mt-progress-progress
    background-color: #1c9335
  .box
    padding: 15px
    background: #fff
    border-1px(rgba(7,17,27,0.1))
  .total
    color: #f07845
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
