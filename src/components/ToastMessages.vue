<template>
  <div class="maxZindex toast-container position-fixed p-3 bottom-0 start-0"
  id="toastPlacement" data-original-class="toast-container position-fixed p-3">
    <Toast v-for="(msg, key) in messages" :key="key" :msg="msg"></Toast>
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue';

export default {
  components: {
    Toast,
  },
  data() {
    return {
      messages: [],
    };
  },
  inject: ['emitter'],
  mounted() {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title } = message;
      this.messages.push({ style, title });
    });
  },
};
</script>

<style scoped>
.maxZindex{
  z-index: 9999;
}
</style>
