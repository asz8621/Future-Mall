<template>
  <Loading :active="isLoading"></Loading>
  <div class="text-end">
    <button type="button" class="btn btn-primary"
    @click.prevent="openModal('add')">新增產品</button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr align="center">
        <th width="150">分類</th>
        <th width="200">圖片</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否熱門</th>
        <th width="100">是否啟用</th>
        <th width="200">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id" align="center" class="align-middle">
        <td>{{item.category}}</td>
        <td>
          <img :src="item.imageUrl" alt="" width="150">
        </td>
        <td>{{item.title}}</td>
        <td class="text-right">
          {{ $filters.currency(item.origin_price) }}
        </td>
        <td class="text-right">
          {{ $filters.currency(item.price) }}
        </td>
        <td>{{item.unit === '1' ? '熱門' : '' }}</td>
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
  <Pagination :pages="pagination" @change-pages="getProducts"></Pagination>
  <ProductModal ref="productModal" :product="tempProduct" :modalState="modalState"
    @update-product="updateProduct"></ProductModal>
  <DelProductModal ref="delProductModal" :product="tempProduct"
    @get-product="getProducts"></DelProductModal>
</template>

<script>
import ProductModal from '@/components/backend/ProductModal.vue';
import DelProductModal from '@/components/backend/DelProductModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    ProductModal,
    DelProductModal,
    Pagination,
  },
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      modalState: '',
      isLoading: false,
    };
  },
  inject: ['emitter'],
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        }
      });
    },
    updateProduct(item) {
      this.tempProduct = item;
      const productComponent = this.$refs.productModal;
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      // 編輯
      if (this.modalState === 'edit') {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }

      this.$http[httpMethod](api, { data: this.tempProduct }).then((res) => {
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

        productComponent.hideModal();
        this.getProducts(this.pagination.current_page);
        this.tempProduct = {};
      });
    },
    openModal(state, item) {
      let productComponent = this.$refs.productModal;
      this.modalState = state;
      switch (state) {
        case 'add':
          this.tempProduct = {};
          productComponent.showModal();
          break;
        case 'edit':
          this.tempProduct = { ...item };
          productComponent.showModal();
          break;
        case 'del':
          this.tempProduct = { ...item };
          productComponent = this.$refs.delProductModal;
          productComponent.showModal();
          break;
        default:
          break;
      }
    },
  },
};
</script>
