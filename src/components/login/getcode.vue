<template>
 <mt-button :type="start ? 'default' : 'primary'" size="small" v-bind="$attrs">{{time | change}}</mt-button>
</template>

 <script type="text/ecmascript-6">
 import axios from 'axios';
 import { Toast } from 'mint-ui';
 let flag = false;
 export default {
  data() {
      return {
        time: '获取验证码'
      };
  },
  props: {
      start: {
        type: Boolean
      },
      mb: {
        type: String
      }
  },
  watch: {
    start (value, oldValue) {
      if (value === true) {
        this.countDown();
      }
    }
  },
  methods: {
    countDown() {
      let tel = this.mb;
      this.time = 60;
      let time = setInterval(() => {
        this.time --;
        if (this.time === 0) {
          this.$emit('countDown');
          this.time = '获取验证码';
          flag = true;
          clearInterval(time);
        }
      }, 100);
       // axios.get('/r/VerifyCode_sendBindWxCode', {mobile: tel}).then((response) => {
       axios.get('/api/code', {mobile: tel}).then((response) => {
          console.log(response, response.status, response.data);
          if (response.status === 200) {
            Toast({
              message: response.data.data.msg,
              position: 'bottom',
              duration: 2000
            });
          } else {
            Toast({
              message: response.data.data.msg,
              position: 'bottom',
              duration: 2000
            });
          }
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  filters: {
      change(value) {
        if (!value) return '';
        if (!isNaN(value)) {
          if (flag === true) {
            return `重新发送${value}S`;
          }
          return `重新发送${value}S`;
        } else {
          return value;
        }
      }
    }
 };
</script>

