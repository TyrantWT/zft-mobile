<template>
  <div>
    <div class="login">
      <div class="form">
        <p class="title">使用手机号登录</p>
        <mt-field label="用户名" placeholder="请输入用户名" v-model="mobile"></mt-field>
        <mt-field label="验证码" placeholder="请输入验证码" :attr="{ maxlength: 6 }" v-model="chkCode">
          <get-code :mb='mobile' :start='start' @countDown ='start=false' @click.native='sendCode'></get-code>
        </mt-field>
        <mt-button type="primary" size="large" @click.native="doLogin">登录</mt-button>
      </div>
    </div>
  </div>
</template>

 <script type="text/ecmascript-6">
 import axios from 'axios';
 import { Indicator, Toast } from 'mint-ui';
 import getCode from './getcode.vue';
 const REG_CODE = /^\d{6}$/;
 const REG_TEL = /^\d{11}$/;
 export default {
  data() {
      return {
        start: false,
        mobile: '',
        chkCode: ''
      };
  },
  components: {
    getCode
  },
  methods: {
    doLogin() {
      let params = {};
      if (!REG_TEL.test(this.mobile)) {
        return Toast({
          message: '手机号格式有误',
          position: 'bottom',
          duration: 3000
        });
      } else if (!REG_CODE.test(this.chkCode)) {
       return Toast({
          message: '验证码格式错误',
          position: 'bottom',
          duration: 3000
        });
      }
      params = {
        mobile: this.mobile,
        mobile_code: this.chkCode
      };
        console.log(params);
      // axios.get('/api/login', params).then((res) => {
       axios.get('/r/VerifyCode_checkWxBindCode', params).then((res) => {
        console.log(res, params);
      });
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fadeing-circle'
      });
      // console.log(params);
      setTimeout(function() {
        Indicator.close();
      }, 1000);
    },
    sendCode(value) {
      if (!REG_TEL.test(this.mobile)) {
          return Toast({
              message: '手机号格式有误',
              position: 'bottom',
              duration: 2000
        });
      }
      this.start = true;
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
        height: 80px
        line-height: 80px
        margin: 0 10px
        font-size: 30px
        text-align: center
    .background
        height: 60%
</style>