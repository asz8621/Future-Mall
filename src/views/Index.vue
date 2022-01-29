<template>
  <div class="index">
    <div id="carouselExampleCaptions" class="carousel slide vh-100" data-bs-ride="carousel">
      <div class="carousel-inner h-100">
        <div class="carouselImg bg-cover carousel-item active h-100"></div>
        <div class="carouselText text-center fs-2">把握機會
          <VueWriter :array="typewriter" :typeSpeed="250" :eraseSpeed="250"
           :delay="3000" :start="1000" />
        </div>
        <div class="carouselBtn fs-1 text-white" @click="scrollDown" role="button">
          <i class="chevronDown bi bi-chevron-down"></i>
          <i class="chevronDown bi bi-chevron-down"></i>
          <i class="chevronDown bi bi-chevron-down"></i>
        </div>
      </div>
    </div>

    <div class="introduce text-white d-flex align-items-center">
      <div class="introduceBlock">
        <div class="p-3 p-lg-4">
          <p class="fs-4 m-0">
            FUTURE MALL 透過智能 AI 隨機從網路上找尋遇到困難需要幫助的人，
            請盡可能購買你所需要的商品，
            或許下次您會無法連線到此網站，
            本站商品都來自 2100 年，
            不論您是否相信本站商品，
            FUTURE MALL 會盡可能的幫助您。
          </p>
        </div>
      </div>
      <div class="introduceTitle">
        <div class="diagonalContainer diagonal">
          <h3 class="introduceTitleText text-center p-2 m-0">
            <span class="fs-2">About Us</span>
            <br>
            <span class="fs-4">關於我們</span>
          </h3>
        </div>
      </div>
    </div>

    <div class="introduce introduceBorderTop border-top border-white border-2
     d-flex align-items-center pb-5 pb-md-0">
      <div class="introduceBlock p-3 p-lg-4">
          <Popular :popular="popular"></Popular>
      </div>
      <div class="introduceTitle">
        <div class="diagonalContainer diagonalReverse">
          <h3 class="introduceTitleText text-center text-white p-2 m-0">
            <span class="fs-2">Bestsellers</span>
            <br>
            <span class="fs-4">暢銷商品</span>
          </h3>
        </div>
      </div>
    </div>

    <div class="subscription bg-cover d-flex justify-content-center align-items-center
     align-items-md-end flex-column p-3 p-md-5 vh-100">
      <div class="subscriptionBlock">
        <div class="text-white mb-3">
          <div>還在困擾什麼嗎 ?</div>
          <div>透過 AI 演算不定期推薦商品</div>
        </div>
        <Form @submit="sendEDM" v-slot="{errors}"
         class="d-flex position-relative">
          <Field type="email" name="email" class="subscriptionInput outlineNone fs-6 fs-md-5 p-2"
            placeholder="請輸入信箱" autocomplete="off" v-model.trim="email"
            :class="{'is-invalid': errors['email']}"
            rules="email|required" ref="test1">
          </Field>
          <error-message v-if="errors" name="email"
            class="invalid-feedback errorText text-persimmon"></error-message>
          <button  type="submit" class="subscriptionBtn btn btn-primary rounded-0"
           :disabled="email === '' || Object.keys(errors).length === 1">訂閱</button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>

import Popular from '@/components/Popular.vue';

export default {
  components: {
    Popular,
  },
  data() {
    return {
      typewriter: ['不要錯失良機', '改變自己人生', '讓我們來幫您'],
      products: [],
      popular: [],
      email: '',
    };
  },
  inject: ['emitter'],
  mounted() {
    this.getProducts();
  },
  methods: {
    scrollDown() {
      const height = window.innerHeight;
      window.scrollTo({
        top: height - 90,
        left: 0,
        behavior: 'smooth',
      });
    },
    scrollTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    },
    randomPopular(num, arr) {
      const newArray = [];
      let tempArray = [...arr];
      for (let i = 0; i < num; i += 1) {
        const n = Math.floor(Math.random() * tempArray.length);
        newArray.push(tempArray[n]);
        tempArray.splice(n, 1);
      }
      tempArray = [];
      return newArray;
    },
    getProducts() {
      // /api/:api_path/products?page=:page
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          let data = [];
          this.products = res.data.products;
          data = this.products.filter((item) => item.unit === '1');
          this.popular = this.randomPopular(5, data);
        }
      });
    },
    sendEDM() {
      this.emitter.emit('push-message', {
        style: 'success',
        title: '訂閱成功',
      });
      this.email = '';
      this.$refs.test1.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
// carousel
.carouselImg{
  background-image: url('https://images.unsplash.com/photo-1502476698613-931a9afd2488?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1960&q=80'), linear-gradient(0deg,#000,transparent);
  filter:grayscale(30%);
  &::before{
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 180px rgba(0, 0, 0, 0.8);
    z-index: 4;
    background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.14) 80%,
    rgba(0,0,0,0.8) 100%);
    background-repeat  : no-repeat;
    background-position: center center;
  }
}
.carouselText{
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -45%);
  background: rgba(255, 255, 255, .6);
  padding: 1rem;
  transition: .5s;
  @include media-768() {
    width: 340px;
  }
  @include media-576() {
    width: 320px;
  }
  @include media-414() {
    width: 95%;
    padding: 1rem 0.5rem;
  }
}
.carouselBtn{
  position: absolute;
  bottom: 4%;
  left: 50%;
  transform: translate(-50%, 0%);
  .chevronDown{
    animation: down 1.5s infinite;
    font-size: 3rem;
    opacity: 0;
  }
  i:nth-child(1){
    position: absolute;
    bottom: 40%;
  }
  i:nth-child(2){
    position: absolute;
    bottom: 20%;
    animation-delay: .2s;
  }
  i:nth-child(3){
    animation-delay: .4s;
  }
}
@keyframes down {
  20% {
    opacity: 1;
  }
  60% {
    opacity: 0;
  }
}

// 打字機
.is-typed {
  display: inline-block;
  margin-right: 0.5rem;
  :deep(.typed) {
    color: black;
  }
  :deep(.cursor) {
    display: inline-block;
    width: 2px;
    background-color: black;
    animation: blink 1s infinite;
    margin-left: 5px;
  }
  :deep(.cursor.typing) {
    animation: none;
  }
}
@keyframes blink {
  49% {
    background-color: black;
  }
  50% {
    background-color: transparent;
  }
  99% {
    background-color: transparent;
  }
}

// introduce
.introduce{
  background: #080807;
  @include media-768() {
    flex-direction: column-reverse;
  }
}
.introduceBlock{
  width: 80%;
  @include media-1400() {
    width: 75%;
  }
  @include media-1200() {
    width: 70%;
  }
  @include media-1024() {
    width: 60%;
  }
  @include media-992() {
    width: 65%;
  }
  @include media-768() {
    width: 100%;
  }
}
.introduceTitle{
  width: 20%;
  @include media-1400() {
    width: 25%;
  }
  @include media-1200() {
    width: 30%;
  }
  @include media-1024() {
    width: 40%;
  }
  @include media-992() {
    width: 35%;
  }
  @include media-768() {
    width: 100%;
    margin: 2rem 0;
  }
}
.introduceTitleText{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  background: #080807;
  z-index: 999;
  transition: .5s;
  @include media-768() {
    position: static;
    transform: translate(0, 0);
    background: transparent;
  }
}
.diagonalContainer {
  height: 0;
  padding-bottom: 100%;
  position: relative;
  overflow: hidden;
  &::before{
    content: '';
    border-top: 2px solid #fff;
    position: absolute;
    top: -1px;
    left: 0;
    right: -50%;
    transform: rotate(45deg);
    transform-origin: 0 0;
  }
  @include media-768() {
    height: auto;
    padding: 0;
    &::before{
      display: none;
    }
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
}
.diagonal{
  &::before{
    right: 0;
    left: -50%;
    transform: rotate(-45deg);
    transform-origin: 100% 0;
  }
}
.diagonalReverse{
  &::before{
    transform: rotate(45deg);
  }
}

// subscription
.subscription{
  background-image: url('../assets/index.png');
  background-attachment: fixed;
  translate: .5s;
  @include media-768() {
    background-position: left 10% center;
  }
}
.subscriptionBlock{
  font-size: calc(1.375rem + 1.5vw);
  @include media-414() {
    font-size: calc(1.275rem + 0.3vw);
  }
}
.subscriptionInput{
  letter-spacing: 3px;
  width: 85%;
  &::placeholder{
    letter-spacing: 0px;
  }
  @include media-768() {
    width: 75%;
  }
  @include media-414() {
    letter-spacing: 2px;
  }
}
.subscriptionBtn{
  width: 15%;
  @include media-768() {
    width: 25%;
  }
}
.errorText{
  position: absolute;
  bottom: -60%;
  left: 0;
  font-size: 1rem;
}
</style>
