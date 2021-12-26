<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{'disabled':pages.has_next}">
        <a class="page-link" href="#" tabindex="-1" aria-disabled="true"
          @click.prevent="updatePage(pages.current_page - 1)">Previous</a>
      </li>
      <li class="page-item" :class="{'active': page === pages.current_page}"
        v-for="(page,key) in pages.total_pages" :key="key">
        <a class="page-link" href="#" @click.prevent="updatePage(page)">{{page}}</a>
      </li>
      <li class="page-item" :class="{'disabled':pages.has_pre}">
        <a class="page-link" href="#"
          @click.prevent="updatePage(pages.current_page + 1)">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    updatePage(page) {
      this.$emit('change-pages', page);
    },
  },
};
</script>
