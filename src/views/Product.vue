<template>
  <Loading :active="isLoading"></Loading>
  <div class="product p-5">
    <div class="row align-items-center h-100">
      <div class="col-12 col-md-6">
        <img :src="product.imageUrl" alt="" class="img-fluid">
        <div class="operate mb-5">
          <button type="button" class="operateBtn btn btn-dark">-</button>
          <input type="number" class="numInput text-center px-3" min="1" max="99" value="1">
          <button type="button" class="operateBtn btn btn-dark">+</button>
        </div>
        <button type="button" class="w-100 btn btn-dark">加入購物車</button>
      </div>
      <div class="col-12 col-md-6">
        <div class="position-relative">
          <h1>{{product.title}}</h1>
          <small class="position-absolute bottom-0 end-0 text-black-50">{{product.category}}</small>
        </div>
        <div v-html="product.content"></div>
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
      isLoading: false,
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      this.id = this.$route.params.id;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.product = res.data.product;
          this.isLoading = false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
  .product{
    height: calc(100vh - 150px - 20px);
    border: 1px solid #dbdbdb;
    /* border-radius: 5px; */
  }
  .operate{
    .operateBtn{
      width: 10%;
    }
    .numInput{
      width: 80%;
      border: 0;
      outline: none;
    }
  }
</style>
