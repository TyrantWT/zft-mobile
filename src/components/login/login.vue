<template>
  <div>
    <div class="login">
      <div class="form">
        <p class="title">使用手机号登录</p>
        <mt-field label="用户名" placeholder="请输入用户名"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password"></mt-field>
        <mt-field label="验证码" placeholder="请输入验证码" >
          <mt-button type="primary" size="small" @click.native="doLogin">获取验证码</mt-button>
        </mt-field>
        <mt-button type="primary" size="large" @click.native="doLogin">提交</mt-button>
      </div>
      <div class="background">
        <div class="bg"></div>
      </div>
    </div>
  </div>
</template>

 <script type="text/ecmascript-6">
 import { Indicator } from 'mint-ui';
 export default {
  methods: {
    doLogin() {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fadeing-circle'
      });
      setTimeout(function() {
        Indicator.close();
      }, 3000);
    }
  }
 };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .login
    .form
      display: block
      height: 40%
      padding: 0 10px 10px
      .title
        display: block
        width: 100%
        height: 50px
        line-height: 50px
        margin: 0 10px
        font-size: 30px
        text-align: center
    .background
        height: 60%
      .bg
        width: 100%
        height: 100%
        background-image: url("lg-bg.jpg")    
        background-size: 100%
        
</style>