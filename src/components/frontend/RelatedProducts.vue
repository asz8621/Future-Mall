<template>
  <swiper :breakpoints="swiper.rwd" :slidesPerGroup="1" :freeMode="true" :modules="swiper.modules"
    :pagination="swiper.pagination">
    <swiper-slide v-for="item in relatedProducts" :key="item.id">
      <div class="relatedProducts border">
        <div class="overflow-hidden">
          <router-link :to="`/product/${item.id}`" class="w-100"
          @click="$emit('change-product', item.id)">
            <img :src="item.imageUrl" alt="" class="relatedProductsImg img-fluid">
          </router-link>
        </div>
        <div class="p-3">
          <h3 class="fs-5" role="button">
            <router-link :to="`/product/${item.id}`" class="text-decoration-none"
             @click="$emit('change-product', item.id)">
              {{item.title}}
            </router-link>
          </h3>
          <p class="text-secondary fs-6 mb-4">{{item.description}}</p>
          <p class="text-persimmon fst-italic text-end fw-bold fs-5 mb-0">
            {{$filters.currency(item.price)}}
          </p>
        </div>
        <button type="button" class="focusNone btn btn-persimmon text-white rounded-0 fw-bold w-100"
          @click.prevent="addCart(item.id)">
          <div v-if="isAddcartLoading && addcartId === item.id"
            class="spinner-border spinner-border-sm me-1" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <i v-else class="bi bi-cart-plus me-1"></i>
          Add Cart
        </button>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue';
import SwiperCore, { Pagination, FreeMode } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';

SwiperCore.use([Pagination, FreeMode]);

export default {
  props: {
    relatedProducts: {
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
      isAddcartLoading: false,
      addcartId: '',
      swiper: {
        modules: [FreeMode, Pagination],
        pagination: {
          clickable: true,
        },
        rwd: {
          0: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          414: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          991: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        },
      },
    };
  },
  methods: {
    addCart(id) {
      this.isAddcartLoading = true;
      this.addcartId = id;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: id,
        qty: 1,
      };
      this.$http.post(api, { data: cart }).then(() => {
        this.isAddcartLoading = false;
        this.addcartId = '';
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
.swiper-wrapper{
  margin-bottom: 2.5rem;
}
.relatedProducts{
  .relatedProductsImg{
    transform: scale(1);
    transition: .5s;
  }
  &:hover{
    .relatedProductsImg{
      transform: scale(1.05);
    }
  }
}

</style>
