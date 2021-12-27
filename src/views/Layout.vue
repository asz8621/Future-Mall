<template>
  <Navbar></Navbar>
  <div class="container">
    <ToastMessages></ToastMessages>
    <router-view></router-view>
  </div>
  <Footer></Footer>
</template>

<script>
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
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
