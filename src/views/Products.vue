<template>
  <Loading :active="isLoading"></Loading>
  <div class="products mb-5">
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
          <div class="card-body mb-5">
            <h5 class="cardTitle" role="button"
            @click.prevent="pushProduct(item.id)">{{item.title}}</h5>
            <p class="cardText">{{item.description}}</p>
            <p class="d-flex justify-content-between" v-if="item.origin_price !== item.price">
              <span>{{$filters.currency(item.origin_price)}}</span>
              <span>{{$filters.currency(item.price)}}</span>
            </p>
            <p class="text-end" v-else>
              <span>{{$filters.currency(item.price)}}</span>
            </p>
            <div class="text-center">
              <button type="button" class="btn position-absolute bottom-0 end-0 w-100"
              @click.prevent="addCart(item.id)">
                <i class="bi bi-cart-plus"></i> Add Cart
              </button>
              <!-- <button type="button" class="btn btn-dark" @click.prevent="addCart(item.id)">
                <i class="bi bi-plus-lg"></i>
              </button> -->
            </div>
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

<style lang="scss" scoped>
.products{
  margin-top: 120px;
}
.stickyTopMenu{
  top: 90px
}
.topItem{
  border: 1px solid;
}
.cardText{
  height: 50px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
