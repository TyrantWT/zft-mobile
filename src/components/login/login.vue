<template>
  <div class="content">
    <div class="login">
      <div class="form">
        <p class="title">账号绑定</p>
        <mt-field label="用户名" placeholder="请输入用户名" v-model="mobile"></mt-field>
        <mt-field label="验证码" placeholder="请输入验证码" :attr="{ maxlength: 6 }" v-model="chkCode">
          <get-code :mb='mobile' :start='start' @countDown='start=false' @click.native='sendCode'></get-code>
        </mt-field>
        <mt-button class="btn-login" type="primary" size="large" @click.native="doLogin">登录</mt-button>
      </div>
    </div>
  </div>
</template>

 <script type="text/ecmascript-6">
import { Indicator, Toast } from 'mint-ui';
import getCode from './getcode.vue';
var qs = require('qs');
const REG_CODE = /^\d{6}$/;
const REG_TEL = /^\d{11}$/;
export default {
  data() {
    return {
      start: false,
      mobile: '',
      chkCode: '',
      openid: ''
    };
  },
  components: {
    getCode
  },
  mounted() {
    let code = this.getUrl('code');
    this.$ajax({
      url: 'http://zft.louxiaomei.com/r/Wx_oauth2',
      method: 'GET',
      params: { code: code }
    }).then((res) => {
      this.openid = res.data.data;
    });
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
        mobile_code: this.chkCode,
        openid: this.openid
      };
      this.$ajax({
        url: 'http://zft.louxiaomei.com/r/VerifyCode_checkWxBindCode',
        method: 'POST',
        data: qs.stringify(params)
      }).then((res) => {
        Indicator.open({
          text: '提交中...',
          spinnerType: 'fadeing-circle'
        });
        if (res.data.code === 200) {
          setTimeout(function() {
            Indicator.close();
          }, 1000);
          this.$router.push('/close');
        } else {
          setTimeout(function() {
            Indicator.close();
          }, 10);
          return Toast({
            message: res.data.msg,
            position: 'bottom',
            duration: 5000
          });
        }
      });
    },
    sendCode(value) {
      let tel = this.mobile;
      if (!REG_TEL.test(this.mobile)) {
        return Toast({
          message: '手机号格式有误',
          position: 'bottom',
          duration: 2000
        });
      }
      this.$ajax({
        url: 'http://zft.louxiaomei.com/r/VerifyCode_sendBindWxCode',
        method: 'POST',
        data: qs.stringify({ mobile: tel })
      }).then((response) => {
        // console.log(response, response.status, response.data);
        if (response.data.code === 200) {
          Toast({
            message: response.data.msg,
            position: 'bottom',
            duration: 2000
          });
          this.start = true;
        } else {
          return Toast({
            message: response.data.msg,
            position: 'bottom',
            duration: 2000
          });
        }
      }).catch((error) => {
        console.log(error);
        Toast({
          message: '请求出错，请稍候再试！',
          position: 'bottom',
          duration: 3000
        });
      });
    },
    getUrl(name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      var r = window.location.search.substr(1).match(reg);
      if (r) {
        return unescape(r[2]);
      } else {
        return null;
      }
    },
    toClose() {
      this.$router.push('/close');
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .content
    position: absolute
    min-height: 100%
    min-width: 100%
    left: 0
    top: 0
    z-index: -1
    background: url('./lg-bg.jpg') no-repeat
    background-size: cover
    overflow: hidden
    .login
      margin: 5% 0
      .form
        height: 40%
        padding: 0 10px
        .title
          height: 80px
          line-height: 80px
          margin: 0 10px
          font-size: 30px
          text-align: center
        .btn-login
          margin: 5% 0
</style>