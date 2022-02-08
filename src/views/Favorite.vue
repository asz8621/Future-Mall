<template>
  <Loading v-model:active="isLoading" :z-index="9999">
    <div class="rotationLoading">
      <img src="../assets/loading.png" alt="loading" class="img-fluid">
    </div>
  </Loading>
  <div class="favorite mb-5">
    <h2 class="favoriteTitle position-relative text-center mb-5 p-2">
      <span class="fs-2">Favorites List</span><br>
      <span class="fs-4">收藏清單</span>
    </h2>
    <div v-if="favoriteList.length !== 0" class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
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
              <div @click="removeFavorite(item.id)">
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
              <p class="text-persimmon fst-italic fw-bold m-0">
                {{$filters.currency(item.price)}}
              </p>
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
    <div v-else class="notFavorite text-center">
      <p class="notFavoriteText fs-5">收藏清單並無任何商品，請點選下方按鈕收藏商品</p>
      <button type="button" class="notFavoriteBtn btn btn-primary fw-bold fs-5">前往收藏商品</button>
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
    pushProduct(id) {
      this.$router.push(`/product/${id}`);
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
    removeFavorite(id) {
      const localStorageIndex = this.favoriteList.findIndex((item) => item === id);
      this.favoriteList.splice(localStorageIndex, 1);
      this.tempProducts.splice(localStorageIndex, 1);
      localStorage.setItem('favorite', JSON.stringify(this.favoriteList));
      this.emitter.emit('get-data');
    },
  },

};
</script>

<style lang="scss" scoped>
.favorite{
  margin-top: 120px;
}
.favoriteTitle{
  &::after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 2px;
    width: 100px;
    background: var(--bs-persimmon);
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
.originPrice{
  font-size: 14px;
  @include media-768() {
    font-size: 12px;
  }
}
.notFavorite{
  .notFavoriteBtn{
    @include media-414() {
      width: 100%;
    }
  }
}
</style>
