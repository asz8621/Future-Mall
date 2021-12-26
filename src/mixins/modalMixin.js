import Modal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return {
      modal: {},
    };
  },
  mounted() {
    this.modal = new Modal(this.$refs.compoundModal);
  },
  methods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
};
