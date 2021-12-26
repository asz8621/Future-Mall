<template>
  <Loading :active="isLoading"></Loading>
  <div class="text-end">
    <button type="button" class="btn btn-primary"
    @click.prevent="openModal('add', tempCoupon)">新增優惠券</button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>優惠券名稱</th>
        <th width="120">折扣</th>
        <th width="200">到期時間</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in coupons" :key="item.id">
        <td>{{item.title}}</td>
        <td class="text-right">
          {{ $filters.currency(item.percent) }}
        </td>
        <td>{{$filters.date(item.due_date)}}</td>
        <td>
          <span class="text-success" v-if="item.is_enabled === 1">啟用</span>
          <span class="text-muted" v-else>不啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm"
              @click.prevent="openModal('edit', item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm"
              @click.prevent="openModal('del', item)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination :pages="pagination" @change-pages="getCoupon"></Pagination>
  <CouponModal ref="couponModal" :coupon="tempCoupon" :modalState="modalState"
   @update-coupon="updateCoupon"></CouponModal>
  <DelCouponModal ref="delModal" :coupon="tempCoupon" @get-coupon="getCoupon"></DelCouponModal>
</template>

<script>
import CouponModal from '@/components/backend/CouponModal.vue';
import DelCouponModal from '@/components/backend/DelCouponModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    CouponModal,
    DelCouponModal,
    Pagination,
  },
  data() {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {},
      modalState: '',
      isLoading: false,
    };
  },
  inject: ['emitter'],
  created() {
    this.getCoupon();
  },
  methods: {
    getCoupon(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons/?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        console.log(res.data);
        if (res.data.success) {
          this.coupons = res.data.coupons;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        }
      });
    },
    updateCoupon(item) {
      this.tempCoupon = item;
      this.tempCoupon.due_date = Date.parse(this.tempCoupon.due_date);
      const couponComponent = this.$refs.couponModal;
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
      let httpMethod = 'post';
      // 編輯
      if (this.modalState === 'edit') {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;
        httpMethod = 'put';
      }

      this.$http[httpMethod](api, { data: this.tempCoupon }).then((res) => {
        if (res.data.success) {
          this.emitter.emit('push-message', {
            style: 'success',
            title: '更新成功',
            content: '資料已更新完成',
          });
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '更新失敗',
            content: res.data.message.join('、'),
          });
          console.log(res.data);
        }

        couponComponent.hideModal();
        this.getCoupon();
        this.tempCoupon = {};
      });
    },
    openModal(state, item) {
      let couponComponent = this.$refs.couponModal;
      this.modalState = state;
      switch (state) {
        case 'add':
          this.tempCoupon = {
            is_enabled: 0,
          };
          couponComponent.showModal();
          break;
        case 'edit':
          this.tempCoupon = { ...item };
          this.tempCoupon.due_date = this.changeDate(this.tempCoupon.due_date);
          couponComponent.showModal();
          break;
        case 'del':
          this.tempCoupon = { ...item };
          couponComponent = this.$refs.delModal;
          couponComponent.showModal();
          break;
        default:
          break;
      }
    },
    changeDate(time) {
      const date = new Date(time);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    },
  },
};
</script>
