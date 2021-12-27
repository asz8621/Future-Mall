<template>
  <Loading :active="isLoading"></Loading>
  <div>
    product
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      product: {},
      isLoading: false,
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      this.id = this.$route.params.id;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.product = res.data.product;
          this.isLoading = false;
        }
      });
    },
  },
};
</script>
