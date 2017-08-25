<template>
 <mt-button :type="start ? 'default' : 'primary'" size="small" v-bind="$attrs">{{time | change}}</mt-button>
</template>

 <script type="text/ecmascript-6">
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
      this.time = 120;
      let time = setInterval(() => {
        this.time --;
        if (this.time === 0) {
          this.$emit('countDown');
          this.time = '获取验证码';
          flag = true;
          clearInterval(time);
        }
      }, 1000);
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

