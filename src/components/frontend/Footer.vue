<template>
  <footer class="footer text-center bg-dark text-white p-3">
    <div class="container">
      <div class="row">
        <div class="col-6 col-md-12">
          <div class="d-flex flex-column justify-content-center align-items-start
           align-items-md-center flex-md-row mb-3">
            <router-link class="footerLink text-white text-decoration-none" to="/">
              首頁
            </router-link>
            <router-link class="footerLink text-white text-decoration-none" to="/products">
              產品列表
            </router-link>
            <router-link class="footerLink text-white text-decoration-none" to="/getcoupon">
              優惠活動
            </router-link>
            <router-link class="footerLink text-white text-decoration-none" to="/favorite">
              收藏清單
            </router-link>
            <router-link class="footerLink text-white text-decoration-none" to="/returnProcess">
              退貨退款須知
            </router-link>
          </div>
        </div>
        <div class="col-12 col-md-6 order-3 order-md-2">
          <div class="d-flex justify-content-center align-items-center h-100">
            © 2022 Future Mall All rights reserved.
          </div>
        </div>
        <div class="col-6 col-md-6 order-2 order-md-3">
          <ul class="footerPageFollow d-flex justify-content-center list-unstyled mb-0 fs-5">
            <li class="mx-2 mx-md-3">
              <a href="javascript:;" class="text-white">
                <i class="bi bi-instagram"></i>
              </a>
            </li>
            <li class="mx-2 mx-md-3">
              <a href="javascript:;" class="text-white">
                <i class="bi bi-facebook"></i>
              </a>
            </li>
            <li class="mx-2 mx-md-3">
              <a href="https://github.com/asz8621/Future-Mall" class="text-white">
                <i class="bi bi-github"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {

};
</script>

<style lang="scss">
  .footer{
    @include media-576() {
      margin-bottom: 42px;
    }
    .footerLink{
      &::after{
        content: '|';
        margin: 0.5rem;
      }
      @include media-768() {
        margin-bottom: 0.5rem;
        &::after{
          content: '';
          margin: 0;
        }
      }
    }
    .footerLink:last-child{
      &::after{
        content: '';
      }
    }
  }
</style>
