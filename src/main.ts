import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueCookies from "vue-cookies-ts"
import './plugins/api'

Vue.config.productionTip = false;
Vue.use(VueCookies)

  new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
