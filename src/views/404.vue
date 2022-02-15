<template>
  <div class="errorPage d-flex flex-column justify-content-center align-items-center bg-cover">
    <p class="errorPageTitle flicker">404</p>
    <p class="errorPageText flicker mb-5">PAGE NOT FOUND</p>
    <button type="button" class="btn btn-primary fs-4"
     @click="$router.push('/')">返回首頁</button>
  </div>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap');
  .errorPage{
    height: 100vh;
    position: relative;
    overflow: hidden;
    background-image:url('../assets/404.jpg');
    font-family: 'Black Ops One', cursive;
    .errorPageTitle{
      font-size: 10rem;
      letter-spacing: 2rem;
      margin-right: -2rem;
    }
    .errorPageText{
      font-size: 2.5rem;
    }
  }
  .flicker{
    animation:flicker 2s 1s linear infinite;
  }
  @keyframes flicker{
    0%{opacity:1;}
    10%{opacity:0.6;}
    20%{opacity:0.8;}
    30%{opacity:0.4;}
    50%{opacity:1;}
    75%{opacity:0.8;}
    100%{opacity:1;}
  }
</style>
