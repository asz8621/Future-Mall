<template>
  <div class="maxZindex toast-container position-fixed p-3 bottom-0 end-0"
  id="toastPlacement" data-original-class="toast-container position-fixed p-3">
    <Toast v-for="(msg, key) in messages" :key="key" :msg="msg"></Toast>
  </div>
</template>

<script>
import Toast from '@/components/backend/Toast.vue';

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
      const { style = 'success', title, content } = message;
      this.messages.push({ style, title, content });
    });
  },
};
</script>

<style scoped>
.maxZindex{
  z-index: 9999;
}
</style>
