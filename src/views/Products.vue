<template>
  <Loading :active="isLoading"></Loading>
  <div class="stickyTopMenu sticky-top bg-white">
    <ul class="d-flex justify-content-center align-items-center list-unstyled py-3">
      <li class="topItem mx-2" :class="{'active': item === category}"
       v-for="item in categoryArr" :key="item">
        <button type="button" class="focusNone btn px-3"
         @click.prevent="changeCategory(item)">{{item}}</button>
      </li>
    </ul>
  </div>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
    <div class="col-12" v-for="item in tempProducts" :key="item.id">
      <div class="card">
        <img :src="item.imageUrl" class="card-img-top" alt="..." role="button"
         @click.prevent="pushProduct(item.id)">
        <div class="card-body">
          <h5 class="card-title" role="button"
           @click.prevent="pushProduct(item.id)">{{item.title}}</h5>
          <p class="card-text">{{item.description}}</p>
          <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-dark"
             @click.prevent="pushProduct(item.id)">查看更多</button>
            <button type="button" class="btn btn-dark" @click.prevent="addCart(item.id)">
              <i class="bi bi-plus-lg"></i>
            </button>
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
  inject: ['emitter'],
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
      this.category = type;
      if (type === '全部') {
        this.tempProducts = [...this.products];
      } else {
        const temp = [...this.products];
        this.tempProducts = temp.filter((item) => item.category === type);
      }
    },
    addCart(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: id,
        qty: 1,
      };
      this.$http.post(api, { data: cart }).then(() => {
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

<style>
  .stickyTopMenu{
    top: 90px
  }
  .topItem{
    border: 1px solid;
  }
</style>
