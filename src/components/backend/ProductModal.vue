<template>
<div class="modal fade" id="compoundModal" tabindex="-1"
  aria-labelledby="compoundModalLabel" aria-hidden="true" ref="compoundModal">
  <div class="modal-dialog modal-xl ">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="compoundModalLabel" v-if="modalState === 'add'">新增產品</h5>
        <h5 class="modal-title" id="compoundModalLabel" v-else>編輯產品</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="mb-3">
              <label for="image" class="form-label">輸入圖片網址</label>
              <input type="text" class="form-control" id="image"
               placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
            </div>
            <div class="mb-3">
              <label for="customFile" class="form-label">或 上傳圖片
                <i class="fas fa-spinner fa-spin"></i>
              </label>
              <div class="d-flex align-items-center position-relative">
                <input type="file" id="customFile" class="form-control"
                  ref="fileInput" @change="uploadFile" :disabled="isLoading">
                <div class="spinner-border text-dark spinner-border-sm"
                  role="status" style="margin: -25px" v-if="isLoading">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
            <img class="img-fluid" alt="" :src="tempProduct.imageUrl">
            <!-- 延伸技巧，多圖 -->
            <!-- <div class="mt-5">
              <div class="mb-3 input-group" >
                <input type="url" class="form-control form-control"
                        placeholder="請輸入連結">
                <button type="button" class="btn btn-outline-danger">
                  移除
                </button>
              </div>
              <div>
                <button class="btn btn-outline-primary btn-sm d-block w-100">
                  新增圖片
                </button>
              </div>
            </div> -->
          </div>
          <div class="col-sm-8">
            <div class="mb-3">
              <label for="title" class="form-label">標題</label>
              <input type="text" class="form-control" id="title"
                placeholder="請輸入標題" v-model="tempProduct.title">
            </div>

            <div class="mb-3">
              <label for="category" class="form-label">分類</label>
              <select name="category" id="category" class="form-select"
                v-model="tempProduct.category">
                <option value="" disabled selected>請選擇</option>
                <option v-for="item in categorys" :key="item" :value="item">{{item}}</option>
              </select>
            </div>

            <div class="row gx-2">
              <div class="mb-3 col-md-6">
                <label for="origin_price" class="form-label">原價</label>
                <input type="number" class="form-control" id="origin_price"
                        placeholder="請輸入原價" v-model="tempProduct.origin_price">
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">售價</label>
                <input type="number" class="form-control" id="price"
                        placeholder="請輸入售價" v-model="tempProduct.price">
              </div>
            </div>
            <hr>

            <div class="mb-3">
              <label for="description" class="form-label">產品描述</label>
              <textarea type="text" class="form-control" id="description"
                        placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
            </div>
            <div class="mb-3">
              <label for="content" class="form-label">說明內容</label>
               <editor api-key="b5qc97z7gcmnao2l5uuwcmuvimzvgu7bfeb2173dg9evhjdh"
               v-model="tempProduct.content" :init="init"></editor>
            </div>
            <div class="d-flex mb-3">
              <div class="form-check me-5">
                <input class="form-check-input" type="checkbox"
                        :true-value="'1'"
                        :false-value="'0'"
                        v-model="tempProduct.unit"
                        id="unit">
                <label class="form-check-label" for="unit">
                  熱門商品
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                        :true-value="1"
                        :false-value="0"
                        v-model="tempProduct.is_enabled"
                        id="is_enabled">
                <label class="form-check-label" for="is_enabled">
                  啟用
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary"
         data-bs-dismiss="modal" :disabled="isLoading">取消</button>
        <button type="button" class="btn btn-primary"
         @click="$emit('update-product', tempProduct)" :disabled="isLoading">確認</button>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import editor from '@tinymce/tinymce-vue';
import modalMixin from '@/mixins/modalMixin';

export default {
  props: {
    product: {
      type: Object,
      default() { return {}; },
    },
    modalState: {
      type: String,
    },
  },
  components: {
    editor,
  },
  data() {
    return {
      categorys: ['想念', '知識', '預知', '便利', '其它'],
      tempProduct: {},
      isLoading: false,
      init: {
        selector: 'textarea',
        height: 300,
        plugins: 'preview code fullscreen image media codesample charmap imagetools help charmap emoticons',
        menubar: false,
        skin: 'oxide',
        content_css: false,
        toolbar: [
          'undo redo | code fullscreen  preview | formatselect',
          'fontselect fontsizeselect forecolor backcolor removeformat | bold italic underline strikethrough charmap emoticons',
          'alignleft aligncenter alignright alignjustify outdent indent numlist bullist | image media',
        ],
      },
    };
  },
  watch: {
    product() {
      this.tempProduct = this.product;
    },
  },
  mixins: [modalMixin],
  emits: ['update-product'],
  methods: {
    uploadFile() {
      const uploadFile = this.$refs.fileInput.files[0];
      const formData = new FormData();
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      formData.append('file-to-upload', uploadFile);
      this.isLoading = true;
      this.$http.post(api, formData).then((res) => {
        if (res.data.success) {
          this.isLoading = false;
          this.tempProduct.imageUrl = res.data.imageUrl;
        }
      });
    },
  },
};
</script>
