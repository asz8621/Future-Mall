<template>
  <nav class="navbar navbar-expand-lg navbar-light border-bottom fixed-top p-0"
   :class="{'bg-white': bgWhite}">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="../../assets/logo.png" alt="" class="logo img-fluid"
        :width="bgWhite ? '60' : '100'">
      </a>
      <div class="menu" id="navbarScroll">
        <ul class="navbar-nav-scroll d-flex align-items-center list-unstyled fw-bold
         p-2 pt-3 p-sm-3 m-0"
         style="--bs-scroll-height: 100px;">
          <li class="navText nav-item">
            <router-link to="/products" class="nav-link px-2 px-md-3">產品</router-link>
          </li>
          <li class="navText nav-item">
            <router-link to="/getcoupon" class="nav-link px-2 px-md-3">優惠活動</router-link>
          </li>
          <li class="navText nav-item">
            <router-link to="/checkingOrder" class="nav-link px-2 px-md-3">訂單查詢</router-link>
          </li>
          <li class="nav-item">
            <button type="button"
             class="navbartBtn focusNone btn position-relative fw-bold px-2 px-md-3"
             @click="$router.push('/admin/login')">
              <i class="bi bi-person"></i>
            </button>
          </li>
          <li class="nav-item">
            <button type="button"
             class="navbartBtn focusNone btn position-relative fw-bold px-2 px-md-3"
             @click="$router.push('/favorite')">
              <i class="bi bi-suit-heart"></i>
              <span class="navbarIconNum btn-primary rounded-circle position-absolute">
                {{favoriteList.length}}
              </span>
            </button>
          </li>
          <li class="nav-item">
            <button type="button"
             class="navbartBtn focusNone btn position-relative fw-bold px-2 px-md-3"
             @click="openModal">
              <i class="bi bi-cart3"></i>
              <span class="navbarIconNum btn-primary rounded-circle position-absolute">
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
       class="mobileMenuItemLink btn btn-primary focusNone fw-bold">產品</router-link>
    </div>
    <div class="mobileMenuItem col">
      <router-link to="/getcoupon"
       class="mobileMenuItemLink btn btn-primary focusNone fw-bold">優惠活動</router-link>
    </div>
    <div class="mobileMenuItem col">
      <router-link to="/checkingOrder"
       class="mobileMenuItemLink btn btn-primary focusNone fw-bold">訂單查詢</router-link>
    </div>
  </div>
  <CartModal ref="cartModal" :cart="cart" @get-cart="getCart"></CartModal>

</template>

<script>
import CartModal from '@/components/frontend/CartModal.vue';

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
    openModal() {
      const navbarComponent = this.$refs.cartModal;
      navbarComponent.showModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar{
  background: rgba(255, 255, 255, 0.75);
  transition: all .5s;
  .logo{
    transition: .5s;
  }
}
.navbarIconNum{
  top: -2px;
  right: 2px;
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
    @include media-414() {
      padding: 0.5rem 0.5rem;
    }
  }
}
</style>
