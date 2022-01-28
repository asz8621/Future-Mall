<template>
  <swiper :slidesPerView="1" :slidesPerGroup="1" :breakpoints="rwd" :pagination="pagination">
    <swiper-slide v-for="item in popular" :key="item.id" class="borderEffect">
      <div class="bestsellers d-flex border-0 bg-white">
        <router-link :to="`/product/${item.id}`" class="w-100">
          <img :src="item.imageUrl" alt="" class="bestsellersImg img-fluid">
        </router-link>
        <div class="d-flex flex-column w-100">
          <div class="d-flex flex-column aa p-3 h-100">
            <h4 class="bestsellersTitle">{{item.title}}</h4>
            <p class="bestsellersDesc text-secondary fs-6">{{item.description}}</p>
            <p class="bestsellersPrice text-persimmon text-end fw-bold mt-auto mb-0">
              {{$filters.currency(item.price)}}
            </p>
          </div>
          <button type="button" class="bestsellersAddBtn text-white bg-persimmon
           border border-persimmon fw-bold"
           @click.prevent="addCart(item.id)">
            <i class="bi bi-cart-plus me-1"></i> Add Cart
          </button>
          <div class="inner"></div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';

SwiperCore.use([Navigation, Pagination]);

export default {
  props: {
    popular: {
      type: Object,
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  inject: ['emitter'],
  data() {
    return {
      pagination: {
        clickable: true,
        renderBullet(index, className) {
          return `<span class="${className}">${index + 1}</span>`;
        },
      },
      rwd: {
        414: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        1025: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1400: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
      },
    };
  },
  methods: {
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

<style lang="scss">
  .swiper{
    @include media-992() {
      max-width: 85%;
    }
    @include media-768() {
      max-width: 100%;
    }
  }
  .swiper-pagination{
    position: static;
    text-align: end;
  }
  .swiper-pagination-bullet{
    width: 30px;
    height: 30px;
    border-radius: 0;
    text-align: center;
    color: #fff;
    padding: 2px;
    background: var(--bs-persimmon);
  }
  .swiper-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet,
  .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet{
    margin: 0;
  }
  .borderEffect {
    position: relative;
    border: 1px solid transparent;
    font-size: 1.5em;
    &:hover{
      &::before{
        transform: scaleY(1);
        transform-origin: left center;
      }
      &::after{
        transform: scaleY(1);
        transform-origin: right center;
      }
      .inner:before{
        transform: scaleY(1);
        transform-origin: bottom center;
      }
      .inner:after{
        transform: scaleY(1);
        transform-origin: top center;
      }
    }
    &::before{
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      display: block;
      background-color: var(--bs-persimmon);
      transform: scaleX(0);
      transition: transform 0.3s;
      transform-origin: right center;
      z-index: 2;
    }
    &::after{
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      display: block;
      background-color: var(--bs-persimmon);
      transform: scaleX(0);
      transition: transform 0.3s;
      transform-origin: left center;
      z-index: 2;
    }
    .inner{
      &:hover{
        &::before, &::after{
          transform: scaleY(1);
        }
      }
      &::before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 2px;
        height: 100%;
        display: block;
        background-color: var(--bs-persimmon);
        transform: scaleY(0);
        transition: transform 0.3s;
        transform-origin: top center;
      }
      &::after{
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 2px;
        height: 100%;
        display: block;
        background-color: var(--bs-persimmon);
        transform: scaleY(0);
        transition: transform 0.3s;
        transform-origin: bottom center;
      }
    }
  }
  .bestsellers{
    @include media-768() {
      flex-direction: column;
    }
  }
  .bestsellersImg{
    height: 100%;
    @include media-768() {
      height: auto;
    }
  }
  .bestsellersAddBtn{
    font-size: 1rem;
    padding: 0.5rem 0.75rem;
    margin-left: auto;
    border-radius: 10px 0 0 0;
    opacity: .75;
    transition: .5s;
    &:hover{
      opacity: 1;
    }
    @include media-768() {
      width: 100%;
      margin: 0;
      border-radius: 0;
      font-size: 1.25rem;
    }
  }
  .bestsellersTitle{
    font-size: 1.25rem;
  }
  .bestsellersDesc{
    margin: 0;
    @include multiLine(50px, 2);
    @include media-768() {
      margin-bottom: 1rem;
    }
  }
  .bestsellersPrice{
    font-size: 1.5rem;
    @include media-1600() {
      font-size: 1.25rem;
    }
  }
</style>
