
<template>
  <input type="hidden" id="oid" :value="openid">
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      openid: ''
    };
  },
  methods: {
    getUrl(name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      var r = window.location.search.substr(1).match(reg);
      if (r) {
        return unescape(r[2]);
      } else {
        return null;
      }
    }
  },
  created() {
    let code = this.getUrl('code');
    this.$ajax({
      url: 'http://zft.louxiaomei.com/r/Wx_oauth2',
      method: 'GET',
      params: { code: code }
    }).then((res) => {
      this.openid = res.data.data;
    });
  }
};
</script>

