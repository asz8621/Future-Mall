<template>
  <div class="coupon d-flex flex-column justify-content-center">
    <h2 class="couponTitle position-relative text-center mb-5 p-2">
      <span class="fs-2">Coupon</span><br>
      <span class="fs-4">優惠劵</span>
    </h2>
    <div class="row row-cols-3 g-2 g-sm-3 g-lg-5 g-xl-max">
      <div class="col">
        <div class="drawCard bg-cover border d-flex justify-content-center align-items-center
         text-white fw-bold w-100" role="button"
         :class="{'animation' : isSelectId === 'card1'}"
         @click="drawCard(0)">
          {{card1}}
        </div>
      </div>
      <div class="col">
        <div class="drawCard bg-cover border d-flex justify-content-center align-items-center
         text-white fw-bold w-100" role="button"
         :class="{'animation' : isSelectId === 'card2'}"
         @click="drawCard(1)">
          {{card2}}
        </div>
      </div>
      <div class="col">
        <div class="drawCard bg-cover border d-flex justify-content-center align-items-center
         text-white fw-bold w-100" role="button"
         :class="{'animation' : isSelectId === 'card3'}"
         @click="drawCard(2)">
          {{card3}}
        </div>
      </div>
    </div>
    <div class="message text-center my-3"
     :class="[{'show' : animationOver}, winning ?'text-success':'text-persimmon']">
      {{message}}
      <button v-if="winning" type="button" class="btn btn-success ms-1" @click="copyCode">
        {{code}}
      </button>
    </div>
    <div class="text-center">
      <button type="button" class="restartBtn btn btn-primary fw-bold"
       @click="randomNum" :disabled="!animationOver">重新開始</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      luckyNumber: 0,
      isSelectId: '',
      winning: false,
      card1: '',
      card2: '',
      card3: '',
      message: '',
      animationOver: false,
      code: '2022FM',
    };
  },
  inject: ['emitter'],
  created() {
    this.randomNum();
  },
  methods: {
    copyCode() {
      this.$copyText(this.code).then(() => {
        this.emitter.emit('push-message', {
          style: 'success',
          title: '複製優惠劵成功',
        });
      });
    },
    randomNum() {
      this.luckyNumber = Math.floor(Math.random() * 3);
      this.isSelectId = '';
      this.winning = false;
      this.card1 = '請選擇卡片';
      this.card2 = '請選擇卡片';
      this.card3 = '請選擇卡片';
      this.message = '';
      this.animationOver = false;
    },
    drawCard(select) {
      const num = select + 1;
      if (this.isSelectId) return;
      this.isSelectId = `card${num}`;

      setTimeout(() => {
        this.animationOver = true;
        if (select !== this.luckyNumber) {
          switch (select) {
            case 0:
              this.card1 = '未中獎';
              break;
            case 1:
              this.card2 = '未中獎';
              break;
            case 2:
              this.card3 = '未中獎';
              break;
            default:
              break;
          }
          this.message = '未中獎，請點選重新開始';
        } else {
          switch (select) {
            case 0:
              this.card1 = '中獎';
              break;
            case 1:
              this.card2 = '中獎';
              break;
            case 2:
              this.card3 = '中獎';
              break;
            default:
              break;
          }
          this.winning = true;
          this.message = '恭喜中獎 ~ 點擊優惠劵即可複製';
        }
      }, 5100);
    },
  },
};
</script>
<style lang="scss" scoped>
  .coupon{
    margin-top: 120px;
    height: calc(100vh - 120px - 56px);
  }
  .couponTitle{
    &::after{
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      height: 2px;
      width: 100px;
      background: var(--bs-persimmon);
    }
  }
  .drawCard{
    font-size: 1.5rem;
    height: 400px;
    background-image: url('../assets/coupon_card.jpg');
    writing-mode: tb-rl;
    letter-spacing: 1rem;
    transform: scale(1);
    transition: .5s;
    &:hover{
      transform: scale(1.025);
    }
    &.animation{
      animation-name: rotateCard;
      animation-duration: 5s;
      animation-fill-mode: forwards;
    }
    @include media-992() {
      height: 350px;
    }
    @include media-768() {
      height: 250px;
    }
    @include media-414() {
      font-size: 1rem;
      height: 150px;
      letter-spacing: 0.25rem;
    }
  }
  @keyframes rotateCard {
    10%{
      transform: scale(1.05);
    }
    20%{
      transform: scale(1.05) rotateY(0deg);
    }
    100%{
      transform: scale(1) rotateY(360deg);
    }
  }
  .message{
    height: 50px;
    line-height: 50px;
    opacity: 0;
    transition: .5s;
    &.show{
      opacity: 1;
    }
  }
  .restartBtn{
    font-size: 1.5rem;
    width: 300px;
    @include media-576() {
      font-size: 1.25rem;
    }
    @include media-414() {
      width: 100%;
    }
  }
</style>
