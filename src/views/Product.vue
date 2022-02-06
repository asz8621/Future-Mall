<template>
  <Loading v-model:active="isLoading" :z-index="9999">
    <div class="rotationLoading">
      <img src="../assets/loading.png" alt="loading" class="img-fluid">
    </div>
  </Loading>
  <div class="product border">
    <div class="row g-0">
      <div class="col-12 col-md-6">
        <div class="position-relative">
          <button type="button"
           class="preBtn btn btn-outline-primary focusNone position-absolute top-50 start-0
           translate-middle-y border-0 fs-2"
           v-if="product.num !== products.length" @click="preProduct(product.num,'pre')">
            <i class="bi bi-chevron-left"></i>
           </button>
          <img :src="product.imageUrl" :alt="product.title" class="img-fluid">
          <button type="button"
           class="nextBtn btn btn-outline-primary focusNone position-absolute top-50 end-0
           translate-middle-y border-0 fs-2"
           v-if="product.num !== 1" @click="preProduct(product.num,'next')">
            <i class="bi bi-chevron-right"></i>
           </button>
        </div>
      </div>
      <div class="col-12 col-md-6 align-self-center">
        <div class="p-3">

          <div class="position-relative">
            <h1>{{product.title}}</h1>
            <small class="position-absolute bottom-0 end-0 badge rounded-pill bg-secondary">
              {{product.category}}
            </small>
          </div>

          <p class="text-secondary">{{product.description}}</p>

          <div class="d-flex justify-content-between align-items-center mb-3">
            <p class="text-decoration-line-through text-secondary fst-italic m-0">
              {{$filters.currency(product.origin_price)}}
            </p>
            <p class="text-persimmon fst-italic fw-bold fs-5 m-0">
              {{$filters.currency(product.price)}}
            </p>
          </div>

          <div class="operate d-flex justify-content-between align-items-center
           flex-column flex-lg-row mb-5">
            <div class="operateNum d-flex mb-3 mb-lg-0">
              <button type="button"
               class="focusNone btn btn-secondary rounded-0"
               @click="calculateNum('-')"
               :disabled="qty === 1 || btnLoading === product.id">-</button>
              <input type="number" class="outlineNone border-0 border-top border-bottom
               border-secondary text-center w-100"
               min="1" v-model="qty" @change="checkNum" :disabled="btnLoading === product.id">
              <button type="button"
               class="focusNone btn btn-secondary rounded-0"
               @click="calculateNum('+')" :disabled="btnLoading === product.id">+</button>
            </div>
            <button type="button"
             class="operateAddBtn focusNone btn btn-persimmon text-white fw-bold"
             @click="addCart(product)" :disabled="btnLoading === product.id">
              <span v-if="btnLoading !== product.id">
                <i class="bi bi-cart-plus"></i> Add Cart
              </span>
              <div class="spinner-border spinner-border-sm" role="status" v-else>
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
          </div>

          <div class="text-break" v-html="product.content"></div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      product: {},
      products: [],
      isLoading: false,
      btnLoading: '',
      qty: 1,
    };
  },
  inject: ['emitter'],
  created() {
    this.getAllProduct();
    this.getProduct();
    console.log('999');
  },
  methods: {
    getAllProduct() {
      let data = [];
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          data = res.data.products;
          data.forEach((item) => {
            this.products.unshift({
              id: item.id,
              num: item.num,
            });
          });
        }
      });
    },
    getProduct(id) {
      if (id) {
        this.id = id;
      } else {
        this.id = this.$route.params.id;
      }
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.product = res.data.product;
          this.isLoading = false;
        }
      });
    },
    preProduct(num, state) {
      let newNum = num;
      if (state === 'next') {
        newNum -= 2;
        this.$router.push(`/product/${this.products[newNum].id}`);
        this.getProduct(this.products[newNum].id);
      } else {
        this.$router.push(`/product/${this.products[num].id}`);
        this.getProduct(this.products[num].id);
      }
    },
    checkNum() {
      if (this.qty < 1) this.qty = 1;
    },
    calculateNum(symbol) {
      if (symbol === '-') {
        if (this.qty > 1) {
          this.qty -= 1;
        } else {
          this.qty = 1;
        }
      }
      if (symbol === '+') this.qty += 1;
    },
    addCart(item) {
      this.btnLoading = item.id;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: item.id,
        qty: this.qty,
      };
      this.$http.post(api, { data: cart }).then(() => {
        this.btnLoading = '';
        this.qty = 1;
        this.emitter.emit('get-data');
        this.emitter.emit('push-message', {
          style: 'success',
          title: '成功加入購物車',
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .product{
    margin-top: 120px;
  }
  .preBtn, .nextBtn{
    transition: .5s;
  }
  .operate{
    .operateNum{
      @include media-992() {
        width: 100%;
      }
    }
    .operateAddBtn{
      width: 150px;
      @include media-992() {
        width: 100%;
      }
    }
  }
</style>
