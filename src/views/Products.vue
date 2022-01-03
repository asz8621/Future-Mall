<template>
  <Loading :active="isLoading"></Loading>
  <div class="stickyTopMenu sticky-top bg-white">
    <ul class="d-flex justify-content-center align-items-center list-unstyled">
      <li v-for="item in categoryArr" :key="item">
        <button type="button" class="btn px-3 mx-3"
         @click.prevent="changeCategory(item)">{{item}}</button>
      </li>
    </ul>
  </div>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
    <div class="col-12" v-for="item in tempProducts" :key="item.id">
      <div class="card">
        <img :src="item.imageUrl" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{item.title}}</h5>
          <p class="card-text">{{item.content}}</p>
          <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-dark" @click="pushProduct(item.id)">查看更多</button>
            <button type="button" class="btn btn-dark">＋</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: [],
      tempProducts: [],
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
      // /api/:api_path/products?page=:page
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.products = res.data.products;
          this.tempProducts = res.data.products;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        }
      });
    },
    pushProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    changeCategory(type) {
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

<style>
  .stickyTopMenu{
    top: 90px
  }
</style>
