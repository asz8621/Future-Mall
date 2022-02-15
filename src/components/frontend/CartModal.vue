<template>
  <div class="cardModal modal right fade" id="compoundModal" tabindex="-1"
    aria-labelledby="compoundModalLabel" aria-hidden="true" ref="compoundModal">
    <div class="modal-dialog h-100">
      <div class="modal-content h-100">
        <div class="modal-header">
          <h5 class="modal-title" id="compoundModalLabel">
            <span class="pe-1">購物清單</span>
            <span class="bg-secondary text-white rounded px-1">{{cart.length}}</span>
          </h5>
          <button type="button" class="btn-close"
           data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div v-if="cart.length === 0"
           class="noCart d-flex justify-content-center align-items-center h-100">
            <div class="text-center p-3">
              <div class="mb-3">購物車並無商品，請點選下方按鈕選擇商品</div>
              <button type="button" class="btn btn-primary fw-bold"
               @click="goShopping">前往購物</button>
            </div>
          </div>
          <template v-else>
            <div class="card position-relative mb-3" v-for="item in cart" :key="item.id">
              <div class="row g-0">
                <div class="col-4">
                  <img :src="item.product.imageUrl" alt="" class="img-fluid">
                </div>
                <div class="col-8">
                  <div class="card-body d-flex flex-column justify-content-between py-2 h-100">
                    <h3 class="fs-7 text-muted text-truncate m-0">{{item.product.title}}</h3>
                    <div class="fw-bold fs-7">{{$filters.currency(item.product.price)}}</div>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="d-flex">
                        <button type="button"
                        class="operateBtn focusNone btn btn-secondary rounded-0 p-0"
                        @click="calculateNum(item, '-')" :disabled="item.qty === 1">-</button>
                        <input type="number" min="1"
                        class="numInput focusNone text-center form-control rounded-0 fs-7 py-0"
                        v-model.number="item.qty"
                        @change="checkNum(item.id, item.product_id, item.qty)">
                        <button type="button"
                        class="operateBtn focusNone btn btn-secondary rounded-0 p-0"
                        @click="calculateNum(item, '+')">+</button>
                      </div>
                      <div class="right border border-secondary">
                        <button type="button" class="operateBtn focusNone btn text-secondary p-0"
                        @click="delCart(item.id)"><i class="bi bi-trash"></i></button>
                      </div>
                    </div>
                    <div class="itemTotal justify-content-between">
                      <span>單品總計</span>
                      <span class="text-persimmon fst-italic fw-bold">
                        {{$filters.currency(item.total)}}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cardLoading position-absolute top-0 start-0 w-100 h-100
              d-flex justify-content-center align-items-center" v-if="isCardId === item.id">
                <div class="spinner-border text-secondary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="modal-footer">
          <div class="fw-bold" v-if="cart">
            <span class="me-1">總計</span>
            <span class="text-persimmon fst-italic">{{$filters.currency(totalPrice)}}</span>
          </div>
          <button type="button" class="btn btn-primary w-100 fw-bold"
           :disabled="isCardId !== '' || cart.length === 0" @click="checkOut">結帳</button>
          <!-- <button type="button" class="btn btn-danger w-100 fw-bold"
          @click="delAllCart">清除購物車</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: {
    cart: {
      type: Array,
    },
  },
  mixins: [modalMixin],
  inject: ['emitter'],
  data() {
    return {
      isCardId: '',
    };
  },
  computed: {
    totalPrice() {
      return this.cart.map((item) => item.total).reduce((a, b) => a + b, 0);
    },
  },
  methods: {
    calculateNum(item, symbol) {
      if (symbol === '-') {
        if (item.qty > 1) {
          this.checkNum(item.id, item.product_id, item.qty - 1);
        }
      } else {
        this.checkNum(item.id, item.product_id, item.qty + 1);
      }
    },
    checkNum(id, productId, qty) {
      let checkQty = qty;
      this.isCardId = id;

      if (qty < 1) checkQty = 1;

      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      const cart = {
        product_id: productId,
        qty: checkQty,
      };

      this.$http.put(api, { data: cart }).then(() => {
        this.isCardId = '';
        this.$emit('get-cart');
        this.emitter.emit('push-message', {
          title: '數量更新成功',
        });
      });
    },
    delCart(id) {
      this.isCardId = id;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http.delete(api, id).then(() => {
        this.isCardId = '';
        this.$emit('get-cart');
        this.emitter.emit('push-message', {
          title: '商品已從購物車移除',
        });
      });
    },
    delAllCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
      this.$http.delete(api).then(() => {
        this.$emit('get-cart');
      });
    },
    goShopping() {
      if (this.$route.path === '/products') {
        this.hideModal();
      } else {
        this.$router.push('/products');
        this.hideModal();
      }
    },
    checkOut() {
      this.hideModal();
      this.$router.push('/order');
    },
  },
};
</script>

<style lang="scss" scope>
  .modal.right .modal-dialog {
    position: fixed;
    margin: 0 0 0 auto;
    width: 400px;
    transform: translate3d(0%, 0, 0);
    @include media-414() {
      width: 100%;
    }
  }

  .modal.right .modal-content {
    overflow-y: auto;
  }

  .modal.right .modal-body {
    padding: 15px 15px;
    overflow-y: auto;
  }

  .modal.right.fade .modal-dialog {
    right: -400px;
    transition: opacity 0.3s linear, right 0.3s ease-out;
    @include media-414() {
      right: -100%;
    }
  }

  .modal.right.fade.show .modal-dialog {
    right: 0;
  }

  .modal-content {
    border-radius: 0;
    border: none;
  }

  .modal-header {
    border-bottom-color: #EEEEEE;
    background-color: #FAFAFA;
  }
  .cardModal{
    .numInput{
      width: 60px;
      border: none;
      border-top: 1px solid #6c757d;
      border-bottom: 1px solid #6c757d;
    }
    .numInput:focus{
      border-color:#212529;
    }
    .cardContent{
      z-index: 1;
    }
    .cardLoading{
      background: rgba(255, 255 ,255 ,0.5);
      z-index: 2;
    }
    .operateBtn{
      width: 25px;
      height: 25px;
      line-height: 12.5px;
    }
    .itemTotal{
      display: flex;
      @include media-360() {
        display: none;
      }
    }
  }
</style>
