<template>
  <Loading :active="isLoading"></Loading>
  <div class="product">
    <div class="row g-0">
      <div class="col-12 col-md-6">
        <div class="position-relative">
          <button type="button"
           class="preBtn focusNone position-absolute top-50 start-0 translate-middle-y btn"
           v-if="product.num !== products.length" @click="preProduct(product.num,'pre')">
            <i class="bi bi-chevron-left"></i>
           </button>
          <img :src="product.imageUrl" alt="" class="img-fluid">
          <button type="button"
           class="nextBtn focusNone position-absolute top-50 end-0 translate-middle-y btn"
           v-if="product.num !== 1" @click="preProduct(product.num,'next')">
            <i class="bi bi-chevron-right"></i>
           </button>
        </div>
      </div>
      <div class="col-12 col-md-6 align-self-center">
        <div class="p-3">

          <div class="position-relative">
            <h1>{{product.title}}</h1>
            <small class="position-absolute bottom-0 end-0 text-black-50">
              {{product.category}}
            </small>
          </div>

          <div class="text-break mb-3" v-html="product.content"></div>

          <div class="operate d-flex mb-3">
            <button type="button"
             class="operateBtn focusNone btn btn-secondary rounded-0"
             @click="calculateNum('-')" :disabled="qty === 1">-</button>
            <input type="number" class="numInput outlineNone text-center w-100" min="1"
             v-model="qty" @change="checkNum">
            <button type="button"
             class="operateBtn focusNone btn btn-secondary rounded-0"
             @click="calculateNum('+')">+</button>
          </div>
          <button type="button" class="w-100 btn btn-dark" @click="addCart(product)">加入購物車</button>

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
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: item.id,
        qty: this.qty,
      };
      this.$http.post(api, { data: cart }).then(() => {
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
    border: 1px solid #dbdbdb;
    margin-top: 100px;
  }
  .preBtn{
    border: 1px solid transparent;
    transition: .5s;
    &:hover{
      border-color: var(--bs-persimmon);
    }
  }
  .nextBtn{
    border: 1px solid transparent;
    transition: .5s;
    &:hover{
      border-color: var(--bs-persimmon);
    }
  }
  .operate{
    .operateBtn{
    }
    .numInput{
      border: none;
      border-top: 1px solid #6c757d;
      border-bottom: 1px solid #6c757d;
    }
  }
</style>
