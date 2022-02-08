<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top p-0" :class="{'bg-white': bgWhite}">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="../assets/logo.png" alt="" class="img-fluid" width="100">
      </a>
      <div class="menu" id="navbarScroll">
        <ul class="navbar-nav-scroll d-flex align-items-center list-unstyled
         ms-auto my-2 my-lg-0 p-3"
         style="--bs-scroll-height: 100px;">
          <li class="navText nav-item">
            <router-link to="/products" class="nav-link">產品</router-link>
          </li>
          <li class="navText nav-item">
            <router-link to="/getcoupon" class="nav-link">優惠劵</router-link>
          </li>
          <li class="nav-item px-3">
            <button type="button" class="navbartBtn focusNone btn position-relative fw-bold p-0"
             @click="$router.push('/favorite')">
              <i class="bi bi-suit-heart"></i>
              <span class="favoriteNum btn-primary rounded-circle position-absolute">
                {{favoriteList.length}}
              </span>
            </button>
          </li>
          <li class="nav-item px-3">
            <button type="button" class="navbartBtn focusNone btn position-relative fw-bold p-0"
             @click="openModal">
              <i class="bi bi-cart3"></i>
              <span class="cartNum btn-primary rounded-circle position-absolute">
                {{cart.length}}
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="mobileMenu row g-0 bg-white text-center">
    <div class="mobileMenuItem col">
      <router-link to="/products"
       class="mobileMenuItemLink btn btn-primary focusNone">產品</router-link>
    </div>
    <div class="mobileMenuItem col">
      <router-link to="/getcoupon"
       class="mobileMenuItemLink btn btn-primary focusNone">優惠劵</router-link>
    </div>
  </div>
  <CartModal ref="cartModal" :cart="cart" @get-cart="getCart"></CartModal>

</template>

<script>
import CartModal from '@/components/CartModal.vue';

export default {
  components: {
    CartModal,
  },
  data() {
    return {
      cart: [],
      favoriteList: [],
      bgWhite: false,
    };
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
    this.getCart();
    this.emitter.on('get-data', () => {
      this.getCart();
    });
  },
  inject: ['emitter'],
  methods: {
    handleScroll() {
      const height = document.documentElement.scrollTop;
      if (height > 0) {
        this.bgWhite = true;
      } else {
        this.bgWhite = false;
      }
    },
    getCart() {
      this.favoriteList = JSON.parse(localStorage.getItem('favorite')) || [];
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.cart = res.data.data.carts;
        }
      });
    },
    openModal(model) {
      let navbarComponent = this.$refs.favoriteModal;
      switch (model) {
        case 'favorite':
          navbarComponent.showModal();
          break;
        case 'cart':
          navbarComponent = this.$refs.cartModal;
          navbarComponent.showModal();
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar{
  background: rgba(255, 255, 255, 0.75);
  transition: all .5s;
}
.cartNum{
  top: -8px;
  right: -12px;
  width: 20px;
  height: 20px;
  font-size: 12px;
  line-height: 20px;
}
.favoriteNum{
  top: -8px;
  right: -12px;
  width: 20px;
  height: 20px;
  font-size: 12px;
  line-height: 20px;
}
.navbartBtn{
  font-size: 20px;
}
.navText{
  @include media-576() {
    display: none;
  }
}
.mobileMenu{
  display: none;
  @include media-576() {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    border-top: 1px solid #dee2e6;
    width: 100%;
    z-index: 10;
  }
  .mobileMenuItem{
    border-left: 1px solid #dee2e6;
    &:last-child{
      border-right: 1px solid #dee2e6;
    }
  }
  .mobileMenuItemLink{
    display: block;
    padding: 0.5rem 1rem;
    text-decoration: none;
    border-radius: 0;
  }
}
</style>
