<template>
<div class="modal fade" id="compoundModal" tabindex="-1"
  aria-labelledby="compoundModalLabel" aria-hidden="true" ref="compoundModal">
  <div class="modal-dialog modal-lg">
    <div class="modal-content border-0">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title" id="compoundModalLabel">刪除產品</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div>你確定要刪除 <span class="text-danger">{{ coupon.title }}</span>，確認後資料將無法復原。</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-outline-danger" @click.prevent="delCoupon">確認</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: {
    coupon: {
      type: Object,
      default() { return {}; },
    },
  },
  mixins: [modalMixin],
  methods: {
    delCoupon() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.coupon.id}`;
      this.$http.delete(api, this.coupon.id).then(() => {
        this.hideModal();
        this.$emit('get-coupon');
      });
    },
  },
};
</script>
