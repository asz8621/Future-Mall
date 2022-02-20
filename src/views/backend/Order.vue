<template>
  <Loading :active="isLoading"></Loading>
  <table class="table mt-4">
    <thead>
      <tr class="text-center">
        <th width="250">訂單編號</th>
        <th>姓名</th>
        <th>電話</th>
        <th>信箱</th>
        <th width="150">金額</th>
        <th width="100">是否付款</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in orders" :key="item.id" class="text-center">
        <td>{{item.id}}</td>
        <td>{{item.user.name}}</td>
        <td>{{item.user.tel}}</td>
        <td>{{item.user.email}}</td>
        <td class="text-end">{{$filters.currency(item.total)}}</td>
        <td class="text-center">
          <span class="text-success" v-if="item.is_paid">已付款</span>
          <span class="text-muted" v-else>未付款</span>
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
  <Pagination :pages="pagination" @change-pages="getOrders"></Pagination>
  <OrderModal ref="orderModal" :order="tempOrder" :modalState="modalState"
   @update-order="updateOrder"></OrderModal>
  <DelModal ref="delModal" :item="tempOrder" @del-item="delOrder"></DelModal>
</template>

<script>
import OrderModal from '@/components/backend/OrderModal.vue';
import DelModal from '@/components/backend/DelModal.vue';
import Pagination from '@/components/backend/Pagination.vue';

export default {
  components: {
    OrderModal,
    DelModal,
    Pagination,
  },
  data() {
    return {
      orders: [],
      pagination: {},
      tempOrder: {},
      modalState: '',
      isLoading: false,
    };
  },
  inject: ['emitter'],
  created() {
    this.getOrders();
  },
  methods: {
    getOrders(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders/?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        }
      });
    },
    openModal(state, item) {
      let couponComponent = this.$refs.orderModal;
      this.modalState = state;
      switch (state) {
        case 'edit':
          this.tempOrder = { ...item };
          couponComponent.showModal();
          break;
        case 'del':
          this.tempOrder = { ...item };
          this.tempOrder.title = this.tempOrder.user.name;
          couponComponent = this.$refs.delModal;
          couponComponent.showModal();
          break;
        default:
          break;
      }
    },
    updateOrder(item) {
      this.tempOrder = item;
      const orderComponent = this.$refs.orderModal;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;

      this.$http.put(api, { data: this.tempOrder }).then((res) => {
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
        }

        orderComponent.hideModal();
        this.getOrders(this.pagination.current_page);
        this.tempOrder = {};
      });
    },
    delOrder() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`;
      this.isLoading = true;
      this.$http.delete(url).then(() => {
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.getOrders();
      });
    },
  },
};
</script>
