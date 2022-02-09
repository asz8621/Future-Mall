<template>
  <nav class="navbar navbar-expand-lg navbar-light sticky-top bg-light border-bottom mb-3">
    <div class="container-fluid">
      <h1 class="navbar-brand m-0">Future Mall 後台</h1>
      <div class="d-flex w-100" id="navbarSupportedContent">
        <ul class="navbar-nav d-flex flex-row m-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/dashboard/products" class="nav-link">產品</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/order" class="nav-link">訂單</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/coupon" class="nav-link">優惠劵</router-link>
          </li>
        </ul>
        <div class="logout">
          <button type="button" class="btn btn-outline-secondary" @click.prevent="logout">
            登出
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_API}logout`;
      this.$http.post(api).then((res) => {
        if (res.data.success) {
          this.$router.push('/admin/login');
        }
      });
    },
  },
};
</script>

<style lang="scss">
  .nav-item{
    @include media-992() {
      padding: 0 1rem;
    }
    @include media-576() {
      padding: 0 0.5rem;
    }
  }
</style>
