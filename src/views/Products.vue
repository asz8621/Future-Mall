<template>
  <Loading :active="isLoading"></Loading>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
    <div class="col" v-for="item in products" :key="item.id">
      <div class="card">
        <img :src="item.imageUrl" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{item.title}}</h5>
          <p class="card-text">{{item.content}}</p>
          <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-primary" @click="gop(item.id)">查看更多</button>
            <button type="button" class="btn btn-primary">＋</button>
          </div>
        </div>
      </div>
    </div>
  </div>
<!--
category: "測試分類"
content: "測試的說明"
description: "測試的描述"
id: "-MrAis3t-sykiLnNzSWV"
imageUrl: "https://images.unsplash.com/photo-1516550135131-fe3dcb0bedc7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=621e8231a4e714c2e85f5acbbcc6a730&auto=format&fit=crop&w=1352&q=80"
imagesUrl: (5) ['https://images.unsplash.com/photo-1516627145497-ae…8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1924&q=80', 'https://images.unsplash.com/photo-1587300003388-59…8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80', 'https://images.unsplash.com/photo-1517331156700-3c…8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1948&q=80', 'https://images.unsplash.com/photo-1617093727343-37…8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80', 'https://images.unsplash.com/photo-1511914265872-c4…8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1867&q=80']
is_enabled: 1
num: 7
origin_price: 1000
price: 500
title: "測試的產品1"
unit: "單位"
-->
</template>
<script>
export default {
  data() {
    return {
      products: [],
      isLoading: false,
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      // /api/:api_path/products?page=:page
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        console.log(res.data);
        if (res.data.success) {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        }
      });
      console.log('getProducts');
    },
    gop(id) {
      this.$router.push(`/product/${id}`);
    },
  },
};
</script>

<style lang="">
  /* .sdf{
    justify-content: center;
  } */
</style>
