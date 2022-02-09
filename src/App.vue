<template>
  <router-view/>
</template>

<script>
export default {
  data() {
    return {};
  },
  watch: {
    $route(to) {
      const nowTitle = to.meta.title || 'FUTURE MALL｜未來商城';
      document.title = nowTitle;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/all";
</style>
