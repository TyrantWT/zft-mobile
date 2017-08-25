<template>
  <div>
    <div class="content">
      <p class="title">绑定成功!</p>
      <mt-button class="btn-close" type="primary" size="large" @click.native="closePage">关闭页面</mt-button>
    </div>
  </div>
</template>

 <script type="text/ecmascript-6">
import wx from 'wx';
export default {
  methods: {
    closePage() {
      wx.WeixinJSBridge.call('closeWindow');
      console.log('aa');
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .content
    margin: 40% 0
    padding: 0 10px
    .title
      font-size: 25px
      text-align: center
      margin-bottom : 30px
</style>
