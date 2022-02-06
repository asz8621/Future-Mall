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
        <td class="text-end">
          {{ item.percent }} %
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
  <DelModal ref="delModal" :item="tempCoupon" @del-item="delProduct"></DelModal>
</template>

<script>
import CouponModal from '@/components/backend/CouponModal.vue';
import DelModal from '@/components/backend/DelModal.vue';
import Pagination from '@/components/backend/Pagination.vue';

export default {
  components: {
    CouponModal,
    DelModal,
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
      this.tempCoupon.percent = Number(this.tempCoupon.percent);

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
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      if (month < 10) month = `0${month}`;
      if (day < 10) day = `0${day}`;
      if (hours < 10) hours = `0${hours}`;
      if (minutes < 10) minutes = `0${minutes}`;
      if (seconds < 10) seconds = `0${seconds}`;
      return `${date.getFullYear()}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    },
    delProduct() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.isLoading = true;
      this.$http.delete(url).then(() => {
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.getCoupon();
      });
    },
  },
};
</script>
