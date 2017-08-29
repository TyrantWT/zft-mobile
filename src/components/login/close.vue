<template>
  <div>
    <div class="cont">
      <p class="title"><i class="icon-pc-pay-the-rent icon-wancheng icon"></i></p>
      <p class="title">绑定成功!</p>
      <mt-button class="btn-close" type="primary" size="large" @click.native="closePage">关闭页面</mt-button>
    </div>
  </div>
</template>

 <script type="text/ecmascript-6">
import wx from 'weixin-js-sdk';
export default {
  methods: {
    closePage() {
      wx.closeWindow();
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cont
    margin: 40% 0
    padding: 0 10px
    .title
      font-size: 25px
      text-align: center
      margin-bottom : 30px
      .icon
        font-size: 50px
        color: #0797d9
</style>
