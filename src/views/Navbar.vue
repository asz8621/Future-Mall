<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top p-0" :class="{'bg-white': bgWhite}">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="../assets/logo.png" alt="" class="img-fluid" width="100">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll p-3"
         style="--bs-scroll-height: 100px;">
          <li class="nav-item px-2">
            <router-link to="/products" class="nav-link">產品</router-link>
          </li>
          <li class="nav-item px-2">
            <router-link to="/about" class="nav-link">關於我們</router-link>
          </li>
          <li class="nav-item px-2">
            <button type="button" class="cartBtn focusNone btn position-relative p-0"
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
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.cart = res.data.data.carts;
        }
      });
    },
    openModal() {
      const cardComponent = this.$refs.cartModal;
      cardComponent.showModal();
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
.cartBtn{
  font-size: 20px;
}
</style>
