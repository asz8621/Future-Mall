import { createApp } from 'vue';

// axios
import axios from 'axios';
import VueAxios from 'vue-axios';

// validate
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import {
  required, email, min, numeric,
} from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

// vue3-loading
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

// bootstrap-icons
import 'bootstrap-icons/font/bootstrap-icons.css';

// VueWriter
import VueWriter from 'vue-writer';

// AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

// vue 預設
import App from './App.vue';
import router from './router';

import { currency, date } from './methods/fifters';

// validate
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('numeric', numeric);
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true, // 輸入文字立即驗證
});
setLocale('zh_TW');

const app = createApp(App).use(router);

app.config.globalProperties.$filters = {
  currency,
  date,
};

// axios
app.use(VueAxios, axios);

// AOS
app.use(AOS.init());

// VueWriter
app.use(VueWriter, VueWriter);

// validate
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);

// vue3-loading
app.component('Loading', Loading);

app.mount('#app');
