import Vue from 'vue';
import axios, {AxiosStatic} from 'axios';


const api = axios.create({
   baseURL: 'http://bp-mbp.local:5000',
   headers: { 
      "Content-Type": "application/json",
   }
})

Vue.use({
   install() {
      Vue.prototype.axios = api
   }
})

declare module 'vue/types/vue' {
   interface Vue {
       axios: AxiosStatic;
   }
}

export default api