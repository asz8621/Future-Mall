<template>
  <Loading v-model:active="isLoading" :z-index="9999">
    <div class="rotationLoading">
      <img src="../assets/loading.png" alt="loading" class="img-fluid">
    </div>
  </Loading>
  <div class="favorite containerTop mb-5" data-aos="zoom-in">
    <h1 class="pageTitle position-relative text-center mb-5 p-2">
      <span class="fs-2">Favorites List</span><br>
      <span class="fs-4">收藏清單</span>
    </h1>

    <ProductsCard v-if="favoriteList.length !== 0" :tempProducts="tempProducts"
     :favoriteList="favoriteList" page="favorite"></ProductsCard>

    <div v-else class="notFavorite text-center">
      <p class="notFavoriteText fs-5">收藏清單並無任何商品，請點選下方按鈕收藏商品</p>
      <button type="button" class="notFavoriteBtn btn btn-primary fw-bold fs-5"
       @click="this.$router.push('/products')">前往收藏商品</button>
    </div>
  </div>
</template>
<script>
import ProductsCard from '@/components/frontend/ProductsCard.vue';

export default {
  components: {
    ProductsCard,
  },
  data() {
    return {
      products: [],
      tempProducts: [],
      favoriteList: [],
      isLoading: false,
      btnLoading: '',
    };
  },
  inject: ['emitter'],
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      // 取 localStorage 資料
      this.favoriteList = JSON.parse(localStorage.getItem('favorite')) || [];
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.products = res.data.products;
          this.isLoading = false;
          // 處理收藏狀態
          this.favoriteList.forEach((id) => {
            const productIndex = this.products.findIndex((item) => item.id === id);
            this.products[productIndex].favorite = true;
            this.tempProducts.push(this.products[productIndex]);
          });
        }
      });
    },
  },

};
</script>

<style lang="scss" scoped>

</style>
