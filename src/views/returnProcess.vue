<template>

  <Loading v-model:active="isLoading" :z-index="9999">
    <div class="rotationLoading">
      <img src="../assets/loading.png" alt="loading" class="img-fluid">
    </div>
  </Loading>
  <div class="returnProcess containerTop g-1">
    <h1 class="pageTitle position-relative text-center mb-5 p-2">
      <span class="fs-2">Return & Refund Notice</span><br>
      <span class="fs-4">退貨退款須知</span>
    </h1>
    <div class="row row-cols-3 row-cols-md-6 mb-5">
      <div class="col">
        <div class="process step1 position-relative rounded text-center text-white
         fw-bold p-3 my-5">
          <div class="processIcon mb-1 mb-sm-3">
            <i class="bi bi-gift"></i>
          </div>
          <div class="processText">宅配到家</div>
        </div>
      </div>
      <div class="col">
        <div class="process step2 position-relative rounded text-center text-white
         fw-bold p-3 my-5">
          <div class="processIcon mb-1 mb-sm-3">
            <i class="bi bi-file-text"></i>
          </div>
          <div class="processText">提出申請</div>
        </div>
      </div>
      <div class="col">
        <div class="process step3 position-relative rounded text-center text-white
         fw-bold p-3 my-5">
          <div class="processIcon mb-1 mb-sm-3">
            <i class="bi bi-send-check-fill"></i>
          </div>
          <div class="processText">審核申請</div>
        </div>
      </div>
      <div class="col">
        <div class="process step4 position-relative rounded text-center text-white
         fw-bold p-3 my-5">
          <div class="processIcon mb-1 mb-sm-3">
            <i class="bi bi-box-seam"></i>
          </div>
          <div class="processText">宅配取貨</div>
        </div>
      </div>
      <div class="col">
        <div class="process step5 position-relative rounded text-center text-white
         fw-bold p-3 my-5">
          <div class="processIcon mb-1 mb-sm-3">
            <i class="bi bi-search"></i>
          </div>
          <div class="processText">審核退貨</div>
        </div>
      </div>
      <div class="col">
        <div class="process step6 position-relative rounded text-center text-white
         fw-bold p-3 my-5">
          <div class="processIcon mb-1 mb-sm-3">
            <i class="bi bi-cash-coin"></i>
          </div>
          <div class="processText">退還款項</div>
        </div>
      </div>
    </div>

    <div class="mb-5">
      <h3>退貨申請說明</h3>
      <ul class="mb-5">
        <li>請填妥退貨申請表之
          <span class="text-danger">姓名、Email、手機號碼、訂單編號及退貨原因</span>等，
          若使用信用卡以外的方式付款，則需填寫匯款帳號。收到您的退貨申請後，
          我們立即與您確認退貨相關事宜。
        </li>
        <li>不接受部分退貨，並請依原包裝寄回。</li>
        <li>
          <span class="text-danger">已使用之優惠券於完成結帳後即不再有效</span>，
          退貨申請成立後也無法取回優惠券，敬請見諒。
        </li>
        <li>
          當您的退貨需求通過審核，我們會請宅配人員至您填寫的收件地址取回商品，
          將由我們負擔此次物流費用。
        </li>
      </ul>

      <h3>無法退貨情況</h3>
      <ul class="mb-5">
        <li>
          <span class="text-danger">超過七天鑑賞期。</span>
        </li>
        <li>商品本身及包裝破損，標籤毀損等（請務必退回所有包裝配件）。</li>
        <li>商品有明顯使用或洗過痕跡、損壞或人為造成髒污、沾染、毀損，恕不接受退貨。</li>
        <li>收到錯誤商品未即時反應且已經使用過。</li>
        <li>
          <span class="text-danger">
            如因非商品瑕疵而退換貨的紀錄次數過多，造成作業上之困擾，本公司將視乎情況採取拒絕交易，
            或是取消會員資格，敬請見諒!
          </span>
        </li>
      </ul>

      <h3>退款說明</h3>
      <ul class="mb-5">
        <li>
          若您使用信用卡付款，退貨商品收回並經工作人員確認商品數量無誤後，會進行線上刷退；
          退款實際入帳日期，依各發卡銀行入帳日不同有所差異，請您洽詢發卡銀行確認實際入帳日。
        </li>
        <li>
          若您使用<span class="text-danger">非信用卡方式付款</span>，
          必須請您提供正確的匯款帳號，以利完成退款手續。
        </li>
        <li>
          確認符合我們的退款標準，且資料確認無誤及商品全新完整後，我們在
          <span class="text-danger"> 7 - 10 個工作天內會再將款項退到您的帳戶。</span>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  computed: {

  },
  created() {

  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
.process{
  background: var(--bs-orange);
  .processText{
    font-size: 1.25rem;
  }
  .processIcon{
    font-size: 1.75rem;
  }
}

@for $i from 1 through 5 {
  .step#{$i} {
    @if $i == 1 {
      &::after{
        content: '7 天內';
      }
    } @else if $i == 5 {
      &::after{
        content: '10 天內';
      }
    } @else {
      &::after{
        content: '1 ~3 天';
      }
    }
    @if $i % 2 != 0 {
      &::before{
        content: '';
        position: absolute;
        left: 50%;
        bottom: -2rem;
        width: calc(100% + 24px);
        padding-bottom: 2rem;
        border: 2px solid var(--bs-orange);
        border-top: 2px solid transparent;
        border-radius: 0 0 1rem 1rem;
      }
      &::after{
        position: absolute;
        left: calc(100% + 12px);
        bottom: calc(-2rem - 15px);
        width: 75px;
        color: var(--bs-orange);
        background: white;
        transform: translate(-50%, 0);
        text-align: center;
        font-weight: 900;
        font-size: 1.25rem;
      }
    } @else {
      &::before{
        content: '';
        position: absolute;
        left: 50%;
        top: -2rem;
        width: calc(100% + 24px);
        padding-top: 2rem;
        border: 2px solid var(--bs-orange);
        border-bottom: 2px solid transparent;
        border-radius: 1rem 1rem 0 0;
      }
      &::after{
        position: absolute;
        left: calc(100% + 12px);
        top: calc(-2rem - 15px);
        transform: translate(-100%, -2rem);
        width: 75px;
        color: var(--bs-orange);
        background: white;
        transform: translate(-50%, 0);
        text-align: center;
        font-weight: 900;
        font-size: 1.25rem;
      }
    }
  }
}
.process.step3{
  @include media-768() {
    &::before{
      width: auto;
      top: calc(100% - 2px);
      padding: 0;
      border: 2px solid transparent;
      border-left: 2px solid var(--bs-orange);
      height: calc(6rem + 4px);
    }
    &::after{
      left: 50%;
      bottom: -60%;
      width: 100%;
    }
  }
  @include media-414() {
    &::after{
      bottom: -45%;
    }
  }
}
</style>
