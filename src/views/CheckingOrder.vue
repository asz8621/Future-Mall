<template>
  <Loading v-model:active="isLoading" :z-index="9999">
    <div class="rotationLoading">
      <img src="../assets/loading.png" alt="loading" class="img-fluid">
    </div>
  </Loading>

  <div class="checkingOrder containerTop g-1" data-aos="zoom-in">
    <h1 class="pageTitle position-relative text-center mb-5 p-2">
      <span class="fs-2">Checking Order</span><br>
      <span class="fs-4">查詢訂單</span>
    </h1>
    <div class="row">
      <div class="col-md-4">
        <div class="border p-3 mb-3">
          <Form @submit="sendCheckingOrder" v-slot="{errors}" ref="checkingOrder">
            <div class="mb-3">
              <div class="row row-cols-1 g-3">
                <div class="col">
                  <label for="email" class="form-label">信箱</label>
                  <Field id="email" name="email" type="email" class="form-control focusNone"
                   :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email"
                   rules="email|required" v-model.trim="email"></Field>
                  <error-message v-if="errors" name="email"
                   class="invalid-feedback errorText text-persimmon"></error-message>
                </div>
                <div class="col mx-auto">
                  <button type="submit" class="btn btn-primary fw-bold fs-5 w-100 mt-3">
                    查詢訂單編號
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <div class="col-md-8">
        <div class="border p-3">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">訂購日期</th>
                <th scope="col">訂單編號</th>
                <th scope="col" class="d-none d-sm-table-cell">總金額</th>
                <th scope="col" width="50">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="foundOrders.length === 0">
                <th scope="row" colspan="4" class="text-center text-secondary p-3">{{msg}}</th>
              </tr>
              <template v-else>
                <tr v-for="item in foundOrders" :key="item.id">
                  <th scope="row" class="text-break">
                    {{$filters.date(item.create_at * 1000)}}
                  </th>
                  <td class="text-break" role="button" @click="copyId(item.id)">
                    {{item.id}}
                  </td>
                  <td class="d-none d-sm-table-cell">
                    {{$filters.currency(item.total)}}
                  </td>
                  <td class="text-center" role="button" @click="look(item.id)">
                    <i class="bi bi-eye-fill"></i>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <CheckingOrderModal ref="checkOrderModal" :tempOrder="tempOrder"></CheckingOrderModal>

</template>

<script>
import CheckingOrderModal from '@/components/frontend/CheckingOrderModal.vue';

export default {
  components: {
    CheckingOrderModal,
  },
  data() {
    return {
      orders: [],
      foundOrders: [],
      tempOrder: {},
      isLoading: false,
      email: '',
      msg: '請輸入信箱來查詢訂單',
    };
  },
  created() {
    this.getOrders();
  },
  inject: ['emitter'],
  methods: {
    sendCheckingOrder() {
      this.$refs.checkingOrder.validate().then((success) => {
        if (!success.valid) return;
        this.foundOrders = this.orders.filter((item) => item.user.email === this.email);
        if (this.foundOrders.length > 0) {
          this.msg = '';
        } else {
          this.msg = '沒有任何訂購紀錄';
        }
      });
    },
    getOrders() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/orders`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.orders = res.data.orders;
          this.isLoading = false;
        }
      });
    },
    copyId(id) {
      this.$copyText(id).then(() => {
        this.emitter.emit('push-message', {
          style: 'success',
          title: '複製產品編號成功',
        });
      });
    },
    look(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${id}`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.tempOrder = res.data.order;
          this.isLoading = false;
          const checkOrderComponent = this.$refs.checkOrderModal;
          checkOrderComponent.showModal();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
