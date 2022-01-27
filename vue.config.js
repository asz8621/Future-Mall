module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: "@import '@/assets/myVariables.scss';",
      },
    },
  },
};
