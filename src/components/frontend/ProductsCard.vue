<template>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3">
    <div class="col" v-for="item in tempProducts" :key="item.id">
      <div class="card rounded-0 rounded-top h-100">
        <div class="cardImg" role="button">
          <img :src="item.imageUrl" class="card-img-top" :alt="item.title"
            @click.prevent="pushProduct(item.id)">
        </div>
        <div class="card-body p-2 p-md-3">
          <div class="d-flex justify-content-between align-items-center fs-4 mb-3">
            <h5 class="cardTitle mb-0" role="button"
              @click.prevent="pushProduct(item.id)">{{item.title}}
            </h5>
            <div @click="isFavorite(item.id, page)">
              <i class="bi text-persimmon" role="button"
              :class="item.favorite ? 'bi-suit-heart-fill' : 'bi-suit-heart'"></i>
            </div>
          </div>
          <p class="cardText text-secondary d-none d-sm-block">{{item.description}}</p>
          <div v-if="item.origin_price !== item.price"
            class="price d-flex justify-content-between align-items-center">
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
</template>

<script>
export default {
  props: {
    tempProducts: {
      type: Array,
      default() { return []; },
    },
    favoriteList: {
      type: Array,
      default() { return []; },
    },
    page: {
      type: String,
      default() { return ''; },
    },
  },
  data() {
    return {
      btnLoading: '',
      favoriteArray: this.favoriteList,
      tempProductsArray: this.tempProducts,
    };
  },
  inject: ['emitter'],
  methods: {
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
    isFavorite(id, page) {
      const localStorageIndex = this.favoriteArray.findIndex((item) => item === id);
      if (page === 'products') { // 可新增 & 刪除收藏
        // 取點選收藏的 Product index
        let isFavoriteIndex = 0;
        if (localStorageIndex === -1) { // 沒收藏過就新增到 localStorage
          this.favoriteArray.push(id);
          localStorage.setItem('favorite', JSON.stringify(this.favoriteArray));
        } else { // 有收藏過就刪除 localStorage
          this.favoriteArray.splice(localStorageIndex, 1);
          localStorage.setItem('favorite', JSON.stringify(this.favoriteArray));
        }

        // 修改 tempProducts 的 favorite 狀態
        isFavoriteIndex = this.tempProducts.findIndex((i) => i.id === id);
        const productItem = this.tempProducts[isFavoriteIndex];
        productItem.favorite = !productItem.favorite;

        this.emitter.emit('get-data');
      }

      if (page === 'favorite') { // 只能刪除收藏
        this.favoriteArray.splice(localStorageIndex, 1);
        this.tempProductsArray.splice(localStorageIndex, 1);
        localStorage.setItem('favorite', JSON.stringify(this.favoriteArray));
        this.emitter.emit('get-data');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card{
  transition: .5s;
  &:hover{
    box-shadow: 4px 4px 12px 0px #979797;
    .cardImg{
      .card-img-top{
        transform: scale(1.1);
      }
    }
  }
  .cardImg{
    overflow: hidden;
    .card-img-top{
      transition: .5s;
    }
  }
  .cardTitle{
    @include media-576() {
      font-size: 1rem;
      margin-right: 0.25rem;
    }
  }
  .cardText{
    @include multiLine(50px, 2);
  }
  .price{
    @include media-576() {
      flex-direction: column-reverse;
    }
  }
  .originPrice{
    font-size: 14px;
    @include media-768() {
      font-size: 12px;
    }
  }
}
</style>
