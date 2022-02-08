<template>
  <Loading v-model:active="isLoading" :z-index="9999">
    <div class="rotationLoading">
      <img src="../assets/loading.png" alt="loading" class="img-fluid">
    </div>
  </Loading>
  <div class="products mb-5">
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
    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
      <div class="col-12" v-for="item in tempProducts" :key="item.id">
        <div class="card rounded-0 rounded-top">
          <div class="cardImg" role="button">
            <img :src="item.imageUrl" class="card-img-top" :alt="item.title"
             @click.prevent="pushProduct(item.id)">
          </div>
          <div class="card-body">

            <div class="d-flex justify-content-between align-items-center fs-4 mb-3">
              <h5 class="cardTitle m-0" role="button"
                @click.prevent="pushProduct(item.id)">{{item.title}}
              </h5>
              <div @click="addFavorite(item.id)">
                <i class="bi text-persimmon" role="button"
                :class="item.favorite ? 'bi-suit-heart-fill' : 'bi-suit-heart'"></i>
              </div>
            </div>
            <p class="cardText text-secondary">{{item.description}}</p>
            <div v-if="item.origin_price !== item.price"
             class="d-flex justify-content-between align-items-center">
              <p class="originPrice text-decoration-line-through text-secondary fst-italic m-0">
                {{$filters.currency(item.origin_price)}}
              </p>
              <p class="text-persimmon fst-italic fw-bold m-0">{{$filters.currency(item.price)}}</p>
            </div>
            <div v-else class="text-persimmon text-end">
              <p class="fw-bold fst-italic m-0">{{$filters.currency(item.price)}}</p>
            </div>
          </div>
          <div class="card-footer border-top-0 p-0">
            <button type="button" class="btn btn-persimmon text-white fw-bold focusNone
             w-100 rounded-0"
             @click.prevent="addCart(item.id)">
              <span v-if="btnLoading !== item.id">
                <i class="bi bi-cart-plus"></i> Add Cart
              </span>
              <div v-else class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
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
      favoriteList: [],
      isLoading: false,
      btnLoading: '',
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
      this.btnLoading = id;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: id,
        qty: 1,
      };
      this.$http.post(api, { data: cart }).then(() => {
        this.btnLoading = '';
        this.emitter.emit('get-data');
        this.emitter.emit('push-message', {
          style: 'success',
          title: '成功加入購物車',
        });
      });
    },
    addFavorite(id) {
      // 取點選收藏的 Product index
      let isFavoriteIndex = 0;

      if (this.favoriteList.indexOf(id) === -1) { // 沒收藏過就新增到 localStorage
        this.favoriteList.push(id);
        localStorage.setItem('favorite', JSON.stringify(this.favoriteList));
      } else { // 有收藏過就刪除 localStorage
        const localStorageIndex = this.favoriteList.findIndex((item) => item === id);
        this.favoriteList.splice(localStorageIndex, 1);
        localStorage.setItem('favorite', JSON.stringify(this.favoriteList));
      }

      // 修改 tempProducts 的 favorite 狀態
      isFavoriteIndex = this.tempProducts.findIndex((i) => i.id === id);
      const productItem = this.tempProducts[isFavoriteIndex];
      productItem.favorite = !productItem.favorite;

      this.emitter.emit('get-data');
    },
  },

};
</script>

<style lang="scss" scoped>
.products{
  margin-top: 120px;
}
.stickyTopMenu{
  top: 90px;
  @include media-576() {
    overflow-x: auto;
  }
}
.cardText{
  @include multiLine(50px, 2);
}
.card{
  transition: .5s;
  .cardImg{
    overflow: hidden;
    .card-img-top{
      transition: .5s;
    }
  }
  &:hover{
    box-shadow: 4px 4px 12px 0px #979797;
    .cardImg{
      .card-img-top{
        transform: scale(1.1);
      }
    }
  }
}
.topItemBtn{
  white-space: nowrap;
}
.originPrice{
  font-size: 14px;
  @include media-768() {
    font-size: 12px;
  }
}
</style>
