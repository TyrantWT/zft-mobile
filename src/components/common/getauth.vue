<template>
    <div></div>
</template>

<script type="text/ecmascript-6">
 export default {
    created: function() {
      this.$ajax({
        url: 'http://zft.louxiaomei.com/r/Wx_getcode',
        method: 'POST'
      }).then((res) => {
         window.location.href = res.data.data;
      });
    }
 };
</script>
