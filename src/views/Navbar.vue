<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar scroll</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll"
         style="--bs-scroll-height: 100px;">
          <li class="nav-item">
            <router-link to="/products" class="nav-link">產品</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">關於我們</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">聯絡我們</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {

};
</script>
