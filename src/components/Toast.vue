<template>
  <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" ref="toast">
    <div class="toast-header text-white" :class="`bg-${msg.style}`">
      <strong class="me-auto">{{msg.title}}</strong>
      <button type="button" class="btn-close btn-close-white"
        data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">{{msg.content}}</div>
  </div>
</template>

<script>
import Toast from 'bootstrap/js/dist/toast';

export default {
  name: 'Toast',
  props: ['msg'],
  mounted() {
    const toastEl = this.$refs.toast;
    const toast = new Toast(toastEl, {
      delay: 5000,
    });
    toast.show();
  },
};
</script>
