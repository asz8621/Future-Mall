<template>

  <Loading v-model:active="isLoading" :z-index="9999">
    <div class="rotationLoading">
      <img src="../assets/loading.png" alt="loading" class="img-fluid">
    </div>
  </Loading>

  <!-- Navbar -->
  <div class="orderNavbar text-center my-3 mb-sm-5">
    <img src="../assets/logo.png" alt="" class="logo">
  </div>

  <!-- fixed-bottom -->
  <div class="fixed-bottom border-top bg-white py-3 w-100">
    <div class="container">

      <template v-if="!isFinish">
        <!--  coupon -->
        <div v-if="!isWriteData" class="coupon mb-4 ms-auto">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="輸入折扣碼"
             aria-label="Input group" aria-describedby="coupon" v-model="coupon.couponCode"
             :disabled="coupon.isCoupon || coupon.isClick || cart.length === 0">
            <button type="button" class="input-group-text btn btn-primary" id="coupon"
             :disabled="coupon.isCoupon || coupon.isClick || cart.length === 0"
             @click="confirmCoupon">
              <div v-if="coupon.isClick"
               class="spinner-border spinner-border-sm me-2" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <span>套用優惠劵</span>
            </button>
          </div>
          <span class="fs-7" :class="coupon.isCoupon ? 'text-success' : 'text-persimmon'">
            {{coupon.message}}
          </span>
        </div>

        <!-- 手機版總計 -->
        <div class="totalPrice text-end fw-bold d-block d-md-none pb-3 fs-5">
          <span class="me-1">總計</span>
          <span class="text-persimmon fst-italic">
            {{$filters.currency(total)}}
          </span>
        </div>

        <!-- 購物清單 & 填寫資料 -->
        <div class="d-flex justify-content-between align-items-center">
          <button v-if="!isWriteData" type="button" class="fixedBottomBtn btn fw-bold fs-5"
           :class="cart.length === 0 ? 'btn-primary' : 'btn-secondary'"
           @click="$router.push('products')">返回購物</button>
          <button v-if="isWriteData" type="button"
           class="fixedBottomBtn btn btn-secondary fw-bold fs-5"
           @click="backList">查看清單</button>
          <div class="totalPrice fw-bold d-none d-md-block fs-5">
            <span class="me-1">總計</span>
            <span class="text-persimmon fst-italic">
              {{$filters.currency(total)}}
            </span>
          </div>
          <button v-if="!isWriteData" type="button"
           class="fixedBottomBtn btn btn-primary fw-bold fs-5"
           @click="fillinData" :disabled="cart.length === 0">填寫資料</button>
          <button v-if="isWriteData" type="submit"
           class="fixedBottomBtn btn btn-primary fw-bold fs-5"
           @click="sendOrder">送出訂單</button>
        </div>
      </template>

      <!-- 完成訂單 -->
      <template v-else>
        <div class="d-flex justify-content-between align-items-center">
          <button type="button" class="fixedBottomBtn btn btn-primary fw-bold fs-5"
           @click="$router.push('/')">返回首頁</button>
          <button type="button" class="fixedBottomBtn btn btn-primary fw-bold fs-5"
           @click="$router.push('/products')">繼續購物</button>
        </div>
      </template>

    </div>
  </div>

  <div class="position-relative">

     <!-- 流程圖 -->
    <div class="line"
     :class="[{'isWrite': isWriteData}, {'isFinish': isWriteData && isFinish}]"></div>

    <ul class="list-unstyled d-flex justify-content-between align-items-center mb-5">
      <li class="orderItem position-relative">
        <div class="orderItemIcon d-flex justify-content-center align-items-center
         border border-2 border-primary rounded-pill bg-white mx-auto mb-3">
          <i class="fs-4 bi bi-cart-fill"></i>
        </div>
        <p class="fs-5 mb-0 fw-bold">購物清單</p>
      </li>
      <li class="orderItem position-relative"
       :class="{'text-light-grey border-light-grey': !isWriteData }">
        <div class="orderItemIcon d-flex justify-content-center align-items-center
         border border-2 rounded-pill bg-white mx-auto mb-3"
         :class="isWriteData ? 'border-primary' : 'border-light-grey'">
          <i class="fs-4 bi bi-pencil-square"></i>
        </div>
        <p class="fs-5 mb-0 fw-bold">填寫資料</p>
      </li>
      <li class="orderItem position-relative"
       :class="{'text-light-grey border-light-grey': !isFinish }">
        <div class="orderItemIcon d-flex justify-content-center align-items-center
         border border-2 rounded-pill bg-white mx-auto mb-3"
         :class="isFinish ? 'border-primary' : 'border-light-grey'">
          <i class="fs-4 bi bi-check-lg"></i>
        </div>
        <p class="fs-5 mb-0 fw-bold">完成訂單</p>
      </li>
    </ul>

    <!-- content -->
    <div class="cartList">

      <!-- 購物車沒商品 -->
      <transition v-if="cart.length === 0 && !isLoading" name="first" mode="out-in">
        <div class="notcart text-center">
          目前購物車沒有任何商品，請點下方 <span class="text-persimmon">返回購物</span> 選擇商品後結帳
        </div>
      </transition>

      <!-- 購物車有商品 -->
      <transition v-else
      :name="isFirst ? 'first' : !isBack ? 'toLeft' : 'toRight'" mode="out-in">

        <!-- 確認購物車 -->
        <div v-if="!isWriteData && !isFinish" class="step1">
          <table class="table">
            <thead>
              <tr class="text-center">
                <th scope="col" class="infoTitle">商品資訊</th>
                <th scope="col" class="priceTitle d-none d-md-table-cell">單價</th>
                <th scope="col" class="numTtitle">數量</th>
                <th scope="col" class="totalTitle d-none d-sm-table-cell">小計</th>
                <th scope="col" class="operateTitle d-none d-sm-table-cell">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart" :key="item.id" class="cartListItem position-relative">
                <td scope="row" valign="middle" align="center" class="infoContent">
                  <img :src="item.product.imageUrl" alt="" class="img-fluid">
                  <p class="m-0">{{item.product.title}}</p>
                </td>
                <td valign="middle" align="right" class="d-none d-md-table-cell">
                  {{$filters.currency(item.product.price)}}
                </td>
                <td valign="middle" align="center">
                  <div class="numContent d-flex">
                    <button type="button"
                    class="operateBtn focusNone btn btn-secondary rounded-0 p-0"
                    @click="calculateNum(item, '-')"
                    :disabled="item.qty === 1 || isEdit === item.id">-</button>
                    <div class="position-relative w-100">
                      <div v-if="isEdit === item.id && !isDel"
                       class="loading d-flex justify-content-center align-items-center w-100">
                        <div class="spinner-border spinner-border-sm" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </div>
                      <input v-else type="number" min="1"
                      class="numInput focusNone text-center form-control rounded-0 fs-7 p-0"
                      v-model.number="item.qty" :disabled="isEdit === item.id"
                      @change="checkNum(item.id, item.product_id, item.qty)">
                    </div>
                    <button type="button"
                    class="operateBtn focusNone btn btn-secondary rounded-0 p-0"
                    @click="calculateNum(item, '+')" :disabled="isEdit === item.id">+</button>
                  </div>
                </td>
                <td valign="middle" class="totalContent text-nowrap fw-bold">
                  <span class="d-inline-block d-sm-none me-1">小計</span>
                  {{$filters.currency(item.total)}}
                </td>
                <td valign="middle" align="center" class="operateContent">
                  <button type="button" class="delBtn btn btn-outline-secondary p-0"
                  :disabled="isEdit === item.id" @click="delCart(item.id)">
                    <div v-if="isEdit === item.id && isDel"
                    class="spinner-border spinner-border-sm" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    <i class="delIcon bi bi-trash" v-else></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 填寫資料與付款 -->
        <div class="step2" v-else-if="isWriteData && !isFinish">
          <Form @submit="sendOrder" v-slot="{errors}" ref="orderForm">

            <!-- 基本資料 -->
            <div class="mb-3">
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="username" class="form-label">姓名</label>
                  <Field id="username" name="username" type="text" class="form-control focusNone"
                  :class="{ 'is-invalid': errors['username'] }"
                  placeholder="請輸入姓名" rules="required"
                  v-model.trim="form.user.name"></Field>
                  <error-message v-if="errors" name="username"
                  class="invalid-feedback errorText text-persimmon"></error-message>
                </div>
                <div class="col-md-6">
                  <label for="phone" class="form-label">電話</label>
                  <Field id="phone" name="phone" type="tel" class="form-control focusNone"
                  :class="{ 'is-invalid': errors['phone'] }"
                  placeholder="請輸入電話" rules="numeric|required"
                  v-model.trim="form.user.tel"></Field>
                  <error-message v-if="errors" name="phone"
                  class="invalid-feedback errorText text-persimmon"></error-message>
                </div>
                <div class="col-12">
                  <label for="email" class="form-label">信箱</label>
                  <Field id="email" name="email" type="email" class="form-control focusNone"
                  :class="{ 'is-invalid': errors['email'] }"
                  placeholder="請輸入 Email" rules="email|required"
                  v-model.trim="form.user.email"></Field>
                  <error-message v-if="errors" name="email"
                  class="invalid-feedback errorText text-persimmon"></error-message>
                </div>
                <div class="col-12">
                  <label for="address" class="form-label">地址</label>
                  <Field id="address" name="address" type="text" class="form-control focusNone"
                  :class="{ 'is-invalid': errors['address'] }"
                  placeholder="請輸入地址" rules="required"
                  v-model.trim="form.user.address"></Field>
                  <error-message v-if="errors" name="address"
                  class="invalid-feedback errorText text-persimmon"></error-message>
                </div>
                <div class="col-12">
                  <label for="payMethod" class="form-label">付款方式</label>
                  <Field id="payMethod" name="payMethod" as="select" class="form-select focusNone"
                  :class="{ 'is-invalid': errors['payMethod'] }" rules="required" v-model="pay"
                  @change="paySelect(pay)">
                    <option value="" disabled selected>請選擇</option>
                    <option v-for="item in payMethods" :key="item" :value="item">{{item}}</option>
                    <error-message v-if="errors" name="payMethod"
                    class="invalid-feedback errorText text-persimmon"></error-message>
                  </Field>
                </div>
              </div>

              <!-- 付款方式 -->
              <div class="row">

                <div v-if="pay === 'WebATM'" id="WebATM" class="mt-3">
                  <div class="col">
                    <h5>銀行轉帳付款指示</h5>
                    <div class="border p-3">
                      <p>銀行：{{payData.WebATM.bank}}</p>
                      <p>銀行帳號：{{payData.WebATM.account}}</p>
                      <p class="text-persimmon fs-7">小提醒：<br>
                        <span>請於三天內進行匯款，否則系統會自動取消訂單，匯款成功後需等待 1 ~ 2 個工作天
                          (不含假日)，我們確認金額無誤後會傳簡訊及信件告知訂單成立。</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div v-if="pay === '信用卡'" id="creditCard" class="mt-3">
                  <div class="col">
                    <label for="credit-card-number">信用卡號</label>
                    <div class="d-flex align-items-center">

                      <Field id="creditCardNumber1" name="creditCardNumber1" type="tel"
                       maxlength="4" class="creditCardInput form-control focusNone text-center"
                       :class="{ 'is-invalid': errors['creditCardNumber1'] }"
                       placeholder="XXXX" rules="required|min:4|numeric"
                       v-model.trim="payData.creditCard.cardNumber1"></Field>

                      <span class="delimiter">-</span>

                      <Field id="creditCardNumber2" name="creditCardNumber2" type="tel"
                       maxlength="4" class="creditCardInput form-control focusNone text-center"
                       :class="{ 'is-invalid': errors['creditCardNumber2'] }"
                       placeholder="XXXX" rules="required|min:4|numeric"
                       v-model.trim="payData.creditCard.cardNumber2"></Field>

                      <span class="delimiter">-</span>

                      <Field id="creditCardNumber3" name="creditCardNumber3" type="tel"
                       maxlength="4" class="creditCardInput form-control focusNone text-center"
                       :class="{ 'is-invalid': errors['creditCardNumber3'] }"
                       placeholder="XXXX" rules="required|min:4|numeric"
                       v-model.trim="payData.creditCard.cardNumber3"></Field>

                      <span class="delimiter">-</span>

                      <Field id="creditCardNumber4" name="creditCardNumber4" type="tel"
                       maxlength="4" class="creditCardInput form-control focusNone text-center"
                       :class="{ 'is-invalid': errors['creditCardNumber4'] }"
                       placeholder="XXXX" rules="required|min:4|numeric"
                       v-model.trim="payData.creditCard.cardNumber4"></Field>

                    </div>
                  </div>
                  <div class="col">
                    <label for="month-Year">有效月年</label>
                    <div class="d-flex align-items-center">

                      <Field id="cardMonth" name="cardMonth" as="select"
                       class="cardMonth form-select focusNone"
                       :class="{ 'is-invalid': errors['cardMonth'] }"
                       rules="required" v-model="payData.creditCard.cardMonth">
                        <option value="" disabled selected>請選擇月份</option>
                        <option v-for="month in 12" :key="month" :value="month">
                          {{ month }}
                        </option>
                      </Field>

                      <span class="mx-2">／</span>

                      <Field id="cardYear" name="cardYear" as="select"
                       class="cardYear form-select focusNone"
                       :class="{ 'is-invalid': errors['cardYear'] }"
                       rules="required" v-model="payData.creditCard.cardYear">
                        <option value="" disabled selected>請選擇年份</option>
                        <option v-for="year in payData.creditCard.yearArr[0]"
                         :key="year" :value="year">{{ year }}</option>
                      </Field>

                    </div>
                  </div>
                  <div class="col-md-2">
                    <label for="threeCodes" class="form-label">背面末三碼</label>
                    <Field id="threeCodes" name="threeCodes" type="tel" maxlength="3"
                     class="threeCodes form-control focusNone"
                     :class="{ 'is-invalid': errors['threeCodes'] }"
                     placeholder="123" rules="required|min:3|numeric"
                     v-model.trim="payData.creditCard.cardThreeCodes"></Field>
                  </div>
                </div>

                <div v-if="pay === '虛擬幣支付'" id="virtualMoney" class="mt-3">
                  <div class="col">
                    <label for="currency" class="form-label">幣種</label>
                    <Field id="currency" name="currency" as="select"
                     class="form-select focusNone mb-3"
                     :class="{ 'is-invalid': errors['currency'] }" rules="required"
                     v-model="payData.virtualMoney.virtualMoneySelect"
                     @change="currencySelect(payData.virtualMoney.virtualMoneySelect)">
                      <option value="" disabled selected>請選擇</option>
                      <option v-for="item in payData.virtualMoney.virtualMoneyArray"
                       :key="item.currency" :value="item.currency">{{item.currency}}</option>
                      <error-message v-if="errors" name="currency"
                      class="invalid-feedback errorText text-persimmon"></error-message>
                    </Field>
                    <div v-if="payData.virtualMoney.virtualMoneySelect" class="border p-3">

                      <p>支付幣種：{{payData.virtualMoney.virtualMoneyTempArray.currency}}</p>

                      <p>轉入帳號：{{payData.virtualMoney.virtualMoneyTempArray.account}}</p>

                      <p v-if="payData.virtualMoney.virtualMoneySelect === 'BNB'">
                        MEMO：{{payData.virtualMoney.virtualMoneyTempArray.memo}}
                      </p>

                      <p>主網類型：{{payData.virtualMoney.virtualMoneyTempArray.type}}</p>

                      <p>目前幣價：{{payData.virtualMoney.virtualMoneyTempArray.price}} USDT</p>

                      <p>
                        <span>支付數量：{{calculatePrice}} 顆 </span>
                        <button type="button" class="refresh bg-white border p-1 ms-2"
                         role="button" @click="getQuote" :disabled="timer.refresh">
                          <i v-if="!timer.refresh" class="bi bi-arrow-clockwise"></i>
                          <span v-else>{{timer.time}}</span>
                        </button>
                      </p>

                      <p class="text-persimmon fs-7">小提醒：<br>
                        <span>
                          每間交易所報價不同，此報價是從 CryptoCompare 取得，如有造成不便請見諒。
                        </span>
                        <br>
                        <span>虛擬貨幣交易所轉出數量(包含手續費)必須大於支付數量，且請於三天內進行支付，
                          否則系統會自動取消訂單，支付成功後需等待 1 ~ 2 個工作天(不含假日)，
                          我們確認金額無誤後會傳簡訊及信件告知訂單成立。</span>
                      </p>

                    </div>
                  </div>
                </div>

              </div>

            </div>

            <div class="row">
              <div class="col-12">

                <label for="msgTextarea" class="form-label">留言</label>
                <textarea v-if="!payData.virtualMoney.virtualMoneySelect"
                id="msgTextarea" name="msgTextarea" as="textarea"
                class="form-control focusNone" placeholder="請輸入留言" rows="5"
                v-model.trim="form.message"></textarea>
                <template v-else>
                  <Field id="msgTextarea" name="msgTextarea" as="textarea"
                  class="form-control focusNone" :class="{ 'is-invalid': errors['msgTextarea'] }"
                  placeholder="請輸入留言，如使用虛擬幣支付請留下帳號" rows="5" rules="required"
                  v-model.trim="form.message"></Field>
                  <error-message v-if="errors" name="msgTextarea"
                  class="invalid-feedback errorText text-persimmon"></error-message>
                </template>

              </div>
            </div>

          </Form>
        </div>

        <!-- 完成訂單 -->
        <div v-else-if="isFinish" class="step3">
          <h3 class="text-center mb-5">完成訂單</h3>
          <p class="text-center fs-5">訂單已送出，我們確認金額無誤後會盡快送出商品，感謝您的光臨。</p>
        </div>

      </transition>

    </div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      isFirst: true,
      isLoading: false,
      isWriteData: false,
      isFinish: false,
      cart: [],
      isEdit: '',
      isDel: false,
      isBack: false,
      coupon: {
        couponCode: '',
        message: '',
        isCoupon: false,
        isClick: false,
      },
      TWD: 0,
      total: 0,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      pay: '',
      payMethods: ['WebATM', '信用卡', '虛擬幣支付'],
      payData: {
        WebATM: {
          bank: '999 未來銀行',
          account: '1234-5678-9108-88',
        },
        creditCard: {
          cardNumber1: '',
          cardNumber2: '',
          cardNumber3: '',
          cardNumber4: '',
          cardMonth: '',
          cardYear: '',
          cardThreeCodes: '',
          yearArr: [],
        },
        virtualMoney: {
          virtualMoneySelect: '',
          virtualMoneyTempArray: [],
          virtualMoneyArray: [
            {
              currency: 'BTC',
              account: '1LoA4q45oL5gFDXMZCgy4ieQbqmh6GusuR',
              type: 'BTC Bitcoin',
              price: 0,
              decimalPoint: 8,
            },
            {
              currency: 'ETC',
              account: '0xf89a8befbd3571231320938f666ba086cbe17913',
              type: 'ETH Ethereum (ERC20)',
              price: 0,
              decimalPoint: 8,
            },
            {
              currency: 'BNB',
              account: 'bnb199gy6lfw4zs5hg4n85vdtherd7hq5m4gtkgf50',
              memo: '191999999',
              type: 'BNB Binance Chain (BEP2)',
              price: 0,
              decimalPoint: 8,
            },
            {
              currency: 'USDT',
              account: 'Rhsdf418gr5sf9qDK5RgHA6A5sef5Ws15eR',
              type: 'TRX Tron (TRC20)',
              price: 0,
              decimalPoint: 5,
            },
          ],
        },
      },
      timer: {
        init: null,
        time: 5,
        refresh: false,
      },
    };
  },
  inject: ['emitter'],
  computed: {
    calculatePrice() {
      return (this.total / this.TWD / this.payData.virtualMoney.virtualMoneyTempArray.price
      ).toFixed(this.payData.virtualMoney.virtualMoneyTempArray.decimalPoint);
    },
  },
  created() {
    this.getCart();
    this.getQuote();
  },
  methods: {
    refreshQuote() { // 倒數計時
      if (this.timer.refresh) return;
      this.timer.init = setInterval(this.countdown, 1000);
      this.timer.refresh = true;
    },
    countdown() { // 計算倒數計時
      this.timer.time -= 1;
      if (this.timer.time === 0) {
        clearInterval(this.timer.init);
        this.timer.time = 5;
        this.timer.refresh = false;
      }
    },
    getCart(id) {
      if (!id) this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        if (res.data.success) {
          this.cart = res.data.data.carts;
          if (this.coupon.isCoupon) {
            this.total = res.data.data.final_total;
          } else {
            this.total = res.data.data.total;
          }
        }
      });
    },
    getQuote() { // 取得匯率與貨幣
      // 各國匯率
      const exchangeRateAPI = `https://openexchangerates.org/api/latest.json?app_id=${process.env.VUE_APP_OPENEXCHANGERATES}`;
      // cryptocompare 報價
      const cryptocompareAPI = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,BNB,USD&tsyms=USD';
      // 台幣匯率
      this.$http.get(exchangeRateAPI).then((res) => {
        this.TWD = res.data.rates.TWD;
      });
      // 幣種報價
      this.$http.get(cryptocompareAPI).then((res) => {
        if (res.statusText === 'OK') {
          const virtualMoney = Object.values(res.data);
          virtualMoney.forEach((item, index) => {
            this.payData.virtualMoney.virtualMoneyArray[index].price = item.USD;
          });
          this.currencySelect(this.payData.virtualMoney.virtualMoneySelect);
          this.refreshQuote();
        }
      });
    },
    calculateNum(item, symbol) {
      if (symbol === '-') {
        if (item.qty > 1) {
          this.checkNum(item.id, item.product_id, item.qty - 1);
        }
      } else {
        this.checkNum(item.id, item.product_id, item.qty + 1);
      }
    },
    checkNum(id, productId, qty) {
      let checkQty = qty;
      this.isEdit = id;

      if (qty < 1) checkQty = 1;

      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      const cart = {
        product_id: productId,
        qty: checkQty,
      };

      this.$http.put(api, { data: cart }).then(() => {
        this.isEdit = '';
        this.$emit('get-cart');
        this.emitter.emit('push-message', {
          title: '數量更新成功',
        });
        this.getCart(id);
      });
    },
    delCart(id) {
      this.isEdit = id;
      this.isDel = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http.delete(api, id).then(() => {
        this.isEdit = '';
        this.isDel = false;
        this.$emit('get-cart');
        this.emitter.emit('push-message', {
          title: '商品已從清單移除',
        });
        this.getCart(id);
      });
    },
    confirmCoupon() {
      this.coupon.isClick = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      const coupon = {
        code: this.coupon.couponCode,
      };
      this.$http.post(api, { data: coupon }).then((res) => {
        this.coupon.message = res.data.message;
        this.coupon.isClick = false;
        if (res.data.success) {
          this.coupon.isCoupon = true;
          this.getCart();
        }
      });
    },
    fillinData() { // 前往寫資料
      this.isWriteData = true;
      this.isBack = false;
      this.isFirst = false;
    },
    backList() { // 返回購物清單
      this.isBack = true;
      this.isWriteData = false;
    },
    sendOrder() {
      this.$refs.orderForm.validate().then((success) => {
        if (!success.valid) return;
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
        const order = this.form;
        this.$http.post(api, { data: order }).then(() => {
          this.isFinish = true;
        });
      });
    },
    selectYear() { // 信用卡年份的選項
      const arr = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
        '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27',
        '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42',
        '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57',
        '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72',
        '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87',
        '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'];
      const getDate = new Date();
      const year = getDate.getFullYear().toString().slice(2); // 2021 => 21
      arr.forEach((item, index) => {
        if (item === year) { // 取 arr 位置
          // 寫入 year ~ year + 15 的陣列到 yearArr
          this.payData.creditCard.yearArr.push(arr.slice(index, index + 15));
        }
      });
    },
    currencySelect(currency) {
      const data = this.payData.virtualMoney.virtualMoneyArray
        .find((item) => item.currency === currency);
      this.payData.virtualMoney.virtualMoneyTempArray = {};
      this.payData.virtualMoney.virtualMoneyTempArray = { ...data };
    },
    paySelect(pay) {
      const creditCardNULL = {
        cardNumber1: '',
        cardNumber2: '',
        cardNumber3: '',
        cardNumber4: '',
        cardMonth: '',
        cardYear: '',
        cardThreeCodes: '',
        yearArr: [],
      };
      switch (pay) {
        case 'WebATM':
          this.payData.creditCard = creditCardNULL;
          this.payData.virtualMoney.virtualMoneySelect = '';
          this.payData.virtualMoney.virtualMoneyTempArray = {};
          break;
        case '信用卡':
          this.payData.virtualMoney.virtualMoneySelect = '';
          this.payData.virtualMoney.virtualMoneyTempArray = {};
          this.selectYear();
          break;
        case '虛擬幣支付':
          this.payData.creditCard = creditCardNULL;
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  // navbar
  .orderNavbar{
    .logo{
      width: 150px;
      @include media-576() {
        width: 60px;
      }
    }
  }
  .fixedBottomBtn{
    width: 300px;
    transition: .5s;
    @include media-992() {
      width: 180px;
    }
    @include media-414() {
      width: 120px;
    }
  }
  .coupon{
    width: 50%;
    @include media-768() {
      width: 75%
    }
    @include media-576() {
      width: 100%
    }
  }
  // 流程圖
  .line{
    position: absolute;
    top: 25px;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 2px;
    background: var(--bs-gray-500);
    z-index: 1;
    &.isWrite{
      background: linear-gradient(to right, var(--bs-primary) 50%, var(--bs-gray-500) 0);
    }
    &.isFinish{
      background: linear-gradient(to right, var(--bs-primary) 100%, var(--bs-gray-500) 0);
    }
  }
  .orderItem{
    z-index: 2;
    .orderItemIcon{
      width: 50px;
      height: 50px;
    }
  }

  // 購物清單
  .infoTitle{
    width: 200px;
    @include media-768() {
      width: 150px;
    }
    @include media-576() {
      width: 125px;
      min-width: 125px;
    }
  }
  .priceTitle{
    width: 150px;
  }
  .numTtitle{
    @include media-992() {
      width: 250px;
    }
    @include media-576() {
      width: auto;
    }
  }
  .totalTitle{
    width: 200px;
    @include media-992() {
      width: 160px;
    }
  }
  .cartList{
    margin-bottom: 170px;
    overflow: hidden;
    @include media-576() {
      margin-bottom: 220px;
    }
  }
  .cartListItem{
    border-bottom-color: #dee2e6;
    .infoContent{
      @include media-576() {
        border-right: 1px solid #dee2e6;
      }
    }
    .numContent{
      width: 250px;
      position: relative;
      @include media-992() {
        width: 200px;
      }
      @include media-576() {
        width: auto;
      }
      .operateBtn{
        width: 36px;
        height: 36px;
        line-height: 18px;
        @include media-414() {
          width: 26px;
          height: 26px;
          line-height: 13px;
        }
      }
      .loading{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 100%;
        border: 1px solid #ced4da;
      }
      .numInput{
        width: 100%;
        height: 100%;
      }
    }
    .totalContent{
      text-align: right;
      @include media-576() {
        text-align: left;
        position: absolute;
        bottom: 0;
        left: 125px;
        width: calc(100% - 125px);
        border-top: 1px solid #dee2e6;
        border-bottom: none;
      }
      @include media-360() {
        font-size: 14px;
      }
    }
    .operateContent{
      @include media-414() {
        position: absolute;
        top: 0;
        right: 0;
        border-bottom: none;
      }
      .delBtn{
        width: 36px;
        height: 36px;
        @include media-414() {
          width: 26px;
          height: 26px;
        }
        .delIcon{
          font-size: 20px;
          @include media-414() {
            font-size: 16px;
          }
        }
      }
    }
  }

  // 信用卡
  .creditCardInput{
    width: 90px;
    @include media-576() {
      font-size: 14px;
      width: 60px;
      padding: 0.375rem;
    }
    @include media-414() {
      width: 55px;
    }
  }
  .delimiter{
    margin: 0 0.5rem;
    @include media-576() {
      margin: 0 0.25rem;
    }
  }
  .cardMonth, .cardYear{
    width: 160px;
    @include media-576() {
      font-size: 14px;
      width: 120px;
    }
  }
  .threeCodes{
    width: 90px;
    @include media-576() {
      font-size: 14px;
    }
  }

  // 虛擬幣
  .refresh{
    width: 30px;
    height: 30px;
    line-height: 15px;
  }

  // VUE Transition CSS
  .first-enter-active, .first-leave-active {
    transition: opacity .5s;
  }
  .first-enter, .first-leave-to{
    opacity: 0;
  }
  .toRight-leave-active,
  .toRight-enter-active,
  .toLeft-leave-active,
  .toLeft-enter-active {
    transition: all .5s;
  }
  .toRight-enter-from {
    transform: translateX(-100%);
  }
  .toRight-leave-to {
    transform: translateX(100%);
  }
  .toLeft-enter-from {
    transform: translateX(100%);
  }
  .toLeft-leave-to {
    transform: translateX(-100%);
  }
</style>
