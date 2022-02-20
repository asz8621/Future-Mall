<template>
<div class="modal fade" id="compoundModal" tabindex="-1"
  aria-labelledby="compoundModalLabel" aria-hidden="true" ref="compoundModal">
  <div class="modal-dialog modal-lg">
    <div class="modal-content border-0">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title" id="compoundModalLabel">{{tempOrder.id}} 訂單明細</h5>
        <button type="button" class="btn-close btn-close-white"
         data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body p-0">
        <div v-for="item in tempOrder.products" :key="item.id"
         class="d-flex align-items-center border-bottom p-3">
          <div class="me-3">
            <img :src="item.product.imageUrl" :alt="item.product.title" width="100">
          </div>
          <div class="text">
            <div class="title mb-2">{{item.product.title}}</div>
            <div class="qty mb-2">數量：{{item.qty}}</div>
            <div class="text-persimmon fst-italic fw-bold">
              單品總計：{{$filters.currency(item.total)}}
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="text-persimmon fst-italic fs-5 fw-bold me-auto">
          總金額：{{$filters.currency(tempOrder.total)}}
        </div>
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
          關閉
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: {
    tempOrder: {
      type: Object,
    },
  },
  mixins: [modalMixin],
};
</script>
