<template>
  <div class="wrapper d-flex flex-column">
    <Navbar v-if="$route.path !== '/order'"></Navbar>
    <div :class="$route.path === '/' ? 'container-fluid p-0':'container'">
      <ToastMessages></ToastMessages>
      <router-view></router-view>
    </div>
    <Footer class="mt-auto" v-if="$route.path !== '/order'"></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/frontend/Navbar.vue';
import Footer from '@/components/frontend/Footer.vue';
import emitter from '@/methods/emitter';
import ToastMessages from '@/components/ToastMessages.vue';

export default {
  components: {
    Navbar,
    Footer,
    ToastMessages,
  },
  provide() {
    return {
      emitter,
    };
  },
};
</script>

<style lang="scss">
  .wrapper{
    min-height: 100vh;
  }
</style>
