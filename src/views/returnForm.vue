<template>
  <Loading v-model:active="isLoading" :z-index="9999">
    <div class="rotationLoading">
      <img src="../assets/loading.png" alt="loading" class="img-fluid">
    </div>
  </Loading>

  <div class="return containerTop g-1" data-aos="zoom-in">
    <h1 class="pageTitle position-relative text-center mb-5 p-2">
      <span class="fs-2">Return Request Form</span><br>
      <span class="fs-4">退貨申請表</span>
    </h1>

    <div class="returnContent">
      <transition name="zoom-in" mode="out-in">

        <template v-if="!isSuccess">
          <Form @submit="sendReturn" v-slot="{errors}" ref="returnForm">
            <div class="mb-3">
              <div class="row g-3">
                <div class="col-md-6 position-relative">
                  <router-link to="/checkingOrder" target="_blank"
                   class="position-absolute top-0 end-0 me-2">
                    <small class="link-secondary">查詢訂單編號</small>
                  </router-link>
                  <label for="orderId" class="form-label">訂單編號</label>
                  <Field id="orderId" name="orderId" type="text" class="form-control focusNone"
                  :class="{ 'is-invalid': errors['orderId'] }" placeholder="請輸入訂單編號"
                  :rules="checkOrderId" v-model.trim="form.orderId"></Field>
                  <error-message v-if="errors" name="orderId"
                  class="invalid-feedback errorText text-persimmon"></error-message>
                </div>
                <div class="col-md-6">
                  <label for="username" class="form-label">姓名</label>
                  <Field id="username" name="username" type="text" class="form-control focusNone"
                  :class="{ 'is-invalid': errors['username'] }" placeholder="請輸入姓名"
                  rules="required" v-model.trim="form.name"></Field>
                  <error-message v-if="errors" name="username"
                  class="invalid-feedback errorText text-persimmon"></error-message>
                </div>
                <div class="col-md-6">
                  <label for="phone" class="form-label">電話</label>
                  <Field id="phone" name="phone" type="tel" class="form-control focusNone"
                  :class="{ 'is-invalid': errors['phone'] }" placeholder="請輸入電話"
                  rules="numeric|required" v-model.trim="form.tel"></Field>
                  <error-message v-if="errors" name="phone"
                  class="invalid-feedback errorText text-persimmon"></error-message>
                </div>
                <div class="col-md-6">
                  <label for="email" class="form-label">信箱</label>
                  <Field id="email" name="email" type="email" class="form-control focusNone"
                  :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email"
                  rules="email|required" v-model.trim="form.email"></Field>
                  <error-message v-if="errors" name="email"
                  class="invalid-feedback errorText text-persimmon"></error-message>
                </div>
                <div class="col-12">
                  <label for="message" class="form-label">退貨原因</label>
                  <Field id="message" name="message" as="textarea" class="form-control focusNone"
                  :class="{ 'is-invalid': errors['message'] }" placeholder="請輸入退貨原因" rows="5"
                  rules="required" v-model.trim="form.message"></Field>
                  <error-message v-if="errors" name="message"
                  class="invalid-feedback errorText text-persimmon"></error-message>
                </div>
                <div class="col-6 mx-auto">
                  <button type="submit" class="btn btn-primary fw-bold fs-5 w-100 mt-3">
                    送出申請表
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </template>

        <template v-else>
          <p class="fs-4 p-3">
            退貨申請表已送出，請等待 1 ~ 3 個工作天(不含假日)會有專人聯絡您處理退貨退款相關事宜，
            感謝您對 Future Mall 的支持。
          </p>
        </template>

      </transition>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
      ordersId: [],
      isLoading: false,
      isSuccess: false,
      form: {
        orderId: '',
        name: '',
        email: '',
        tel: '',
        message: '',
      },
    };
  },
  computed: {

  },
  created() {
    this.getOrders();
  },
  methods: {
    sendReturn() {
      this.$refs.returnForm.validate().then((success) => {
        if (!success.valid) return;
        this.isSuccess = true;
        this.form = {
          orderId: '',
          name: '',
          email: '',
          tel: '',
          message: '',
        };
      });
    },
    checkOrderId() {
      const findId = this.ordersId.find((item) => item === this.form.orderId);
      if (!findId) {
        return '請確認您的訂單編號';
      }
      return true;
    },
    getOrders() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/orders`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.orders = res.data.orders;
          this.orders.forEach((item) => {
            this.ordersId.push(item.id);
          });
          this.isLoading = false;
          this.isSuccess = false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.returnContent{
  padding: 0 10rem;
  @include media-1200() {
    padding: 0 3rem;
  }
  @include media-768() {
    padding: 0;
  }
}
.zoom-in-enter-active, .zoom-in-leave-active {
  transition: opacity 0.5s ease;
}
.zoom-in-enter, .zoom-in-leave-to{
  opacity: 0;
}
</style>
