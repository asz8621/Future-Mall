<template>
<Loading :active="isLoading"></Loading>
<div class="modal fade" id="compoundModal" tabindex="-1"
  aria-labelledby="compoundModalLabel" aria-hidden="true" ref="compoundModal">
  <div class="modal-dialog modal-xl ">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="compoundModalLabel" v-if="modalState === 'add'">新增訂單</h5>
        <h5 class="modal-title" id="compoundModalLabel" v-else>編輯訂單</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

        <!-- Nav tabs -->
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link" :class="{'active': tab === 1}" id="userinfo-tab"
             data-bs-toggle="tab" data-bs-target="#userinfo" type="button" role="tab"
             aria-controls="userinfo" aria-selected="true" @click="tab=1">訂購人資訊</button>
          </li>

          <li class="nav-item" role="presentation">
            <button class="nav-link" :class="{'active': tab === 2}" id="order-tab"
             data-bs-toggle="tab" data-bs-target="#order" type="button" role="tab"
             aria-controls="order" aria-selected="false" @click="tab=2">訂購商品</button>
          </li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content">
          <!-- 訂購人資訊 -->
          <div class="tab-pane" :class="{'active' : tab === 1}"
           id="userinfo" role="tabpanel" aria-labelledby="userinfo-tab">
            <table class="table" v-if="tempOrder.user">
              <tbody>
                <tr>
                  <th width="100">訂單編號</th>
                  <td>{{tempOrder.id}}</td>
                </tr>
                <tr>
                  <th width="100">姓名</th>
                  <td>{{tempOrder.user.name}}</td>
                </tr>
                <tr>
                  <th width="100">電話</th>
                  <td>{{tempOrder.user.tel}}</td>
                </tr>
                <tr>
                  <th width="100">信箱</th>
                  <td>{{tempOrder.user.email}}</td>
                </tr>
                <tr>
                  <th width="100">總金額</th>
                  <td>{{$filters.currency(tempOrder.total)}}</td>
                </tr>
                <tr>
                  <th width="100">是否付款</th>
                  <th>
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" id="CheckChecked"
                       :checked="tempOrder.is_paid"
                       v-model="tempOrder.is_paid">
                      <label v-if="tempOrder.is_paid"
                       class="form-check-label" for="CheckChecked">已付款</label>
                      <label v-else
                       class="form-check-label" for="CheckChecked">未付款</label>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th width="100">留言</th>
                  <td>{{tempOrder.message}}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 訂購商品 -->
          <div class="tab-pane" :class="{'active' : tab === 2}" id="order"
           role="tabpanel" aria-labelledby="order-tab">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">類別</th>
                  <th scope="col">商品名稱</th>
                  <th scope="col">數量</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in tempOrder.products" :key="item.id">
                  <th scope="row">{{item.product.category}}</th>
                  <td>{{item.product.title}}</td>
                  <td>{{item.qty}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary"
         data-bs-dismiss="modal" :disabled="isLoading">取消</button>
        <button type="button" class="btn btn-primary"
         @click="$emit('update-order', tempOrder)" :disabled="isLoading">確認</button>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: {
    order: {
      type: Object,
      default() { return {}; },
    },
    modalState: {
      type: String,
    },
  },
  data() {
    return {
      tempOrder: {},
      isLoading: false,
      tab: 1,
    };
  },
  watch: {
    order() {
      this.tempOrder = this.order;
    },
  },
  mixins: [modalMixin],
  emits: ['update-order'],
  methods: {

  },
};
</script>
