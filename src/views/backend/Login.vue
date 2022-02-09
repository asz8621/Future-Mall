<template>
<div class="login bg-cover container-fluid">
<form class="row justify-content-center align-items-center h-100" @submit.prevent="singIn">
  <div class="col-sm-6 col-lg-4 col-xl-3">
    <h1 class="h3 mb-3 font-weight-normal text-white">Future Mall 後台</h1>
    <div class="form-floating mb-3">
      <input type="email" class="form-control" id="inputEmail" placeholder="Email address"
       required autofocus v-model="user.username">
      <label for="inputEmail">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="inputPassword" placeholder="Password"
       required v-model="user.password">
      <label for="inputPassword">Password</label>
    </div>
    <div v-if="failedLogin" class="alert alert-danger py-1 text-center my-3" role="alert">
      {{message}}
    </div>
    <div class="text-end mt-4">
      <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
    </div>
  </div>
</form>
</div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      failedLogin: false,
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    singIn() {
      this.failedLogin = false;
      const api = `${process.env.VUE_APP_API}admin/signin`;
      this.$http.post(api, this.user).then((res) => {
        if (res.data.success) {
          const { token, expired } = res.data;
          document.cookie = `fsToken=${token}; expires=${new Date(expired)}`;
          this.$router.push('/dashboard/home');
        } else {
          this.failedLogin = true;
          this.message = res.data.message;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .login{
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-image: url('../../assets/login_bg.jpg');
  }
</style>
