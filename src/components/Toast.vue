<template>
  <div class="toast align-items-center text-white border-0" :class="`bg-${msg.style}`"
  role="alert" aria-live="assertive" aria-atomic="true" ref="toast">
    <div class="d-flex">
      <div class="toast-body">
        {{msg.title}}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto"
      data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
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

<style lang="scss">
  .toast{
    width: 200px;
  }
</style>
