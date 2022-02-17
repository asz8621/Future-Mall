<template>
  <Loading v-model:active="isLoading" :z-index="9999">
    <div class="rotationLoading">
      <img src="../assets/loading.png" alt="loading" class="img-fluid">
    </div>
  </Loading>
  <div class="products containerTop mb-5">
    <div class="stickyTopMenu sticky-top bg-white border-bottom text-center mb-3">
      <ul class="d-inline-flex justify-content-center align-items-center
       list-unstyled mt-3 mb-4">
        <li class="topItem mx-2" :class="{'active': item === category}"
        v-for="item in categoryArr" :key="item">
          <button type="button" class="topItemBtn focusNone btn fw-bold px-3 rounded-0"
          :class="[item === category ? 'btn-primary' : 'btn-outline-primary']"
          @click.prevent="changeCategory(item)">{{item}}</button>
        </li>
      </ul>
    </div>

    <ProductsCard :tempProducts="tempProducts" :favoriteList="favoriteList"
     page="products"></ProductsCard>

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
      categoryArr: ['全部', '想念', '知識', '預知', '便利', '其它'],
      category: '全部',
    };
  },
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
          });
          // 拷貝一份新的
          this.tempProducts = [...this.products];
        }
      });
    },
    changeCategory(type) {
      this.category = type;
      if (type === '全部') {
        this.tempProducts = [...this.products];
      } else {
        const temp = [...this.products];
        this.tempProducts = temp.filter((item) => item.category === type);
      }
    },
  },

};
</script>

<style lang="scss" scoped>
.products{
  .stickyTopMenu{
    top: 72px;
    @include media-576() {
      top: 58px;
      overflow-x: auto;
    }
  }
  .topItemBtn{
    white-space: nowrap;
  }
}
</style>
