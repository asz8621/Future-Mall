<template>
<Loading :active="isLoading"></Loading>
<div class="modal fade" id="compoundModal" tabindex="-1"
  aria-labelledby="compoundModalLabel" aria-hidden="true" ref="compoundModal">
  <div class="modal-dialog modal-xl ">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="compoundModalLabel" v-if="modalState === 'add'">新增優惠券</h5>
        <h5 class="modal-title" id="compoundModalLabel" v-else>編輯優惠券</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-12">
            <div class="mb-3">
              <label for="title" class="form-label">標題</label>
              <input type="text" class="form-control" id="title"
                placeholder="請輸入標題" v-model="tempCoupon.title">
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="code" class="form-label">序號</label>
              <input type="text" class="form-control" id="code"
                laceholder="請輸入折扣" v-model="tempCoupon.code">
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="percent" class="form-label">折扣</label>
              <input type="number" class="form-control" id="percent"
                laceholder="請輸入折扣" v-model="tempCoupon.percent">
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label for="due_date" class="form-label">到期日期</label>
              <input type="datetime-local" step="1" class="form-control" id="due_date"
                laceholder="請輸入到期時間" v-model="tempCoupon.due_date">
            </div>
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox"
                      :true-value="1"
                      :false-value="0"
                      v-model="tempCoupon.is_enabled"
                      id="is_enabled">
              <label class="form-check-label" for="is_enabled">
                是否啟用
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary"
                data-bs-dismiss="modal" :disabled="isLoading">取消
        </button>
        <button type="button" class="btn btn-primary"
        @click="$emit('update-coupon', tempCoupon)" :disabled="isLoading">確認</button>
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
    modalState: {
      type: String,
    },
  },
  data() {
    return {
      tempCoupon: {},
      isLoading: false,
      due_time: '',
    };
  },
  watch: {
    coupon() {
      this.tempCoupon = this.coupon;
    },
  },
  mixins: [modalMixin],
  emits: ['update-coupon'],
  methods: {

  },
};
</script>
