import Vue from 'vue';
import axios, {AxiosStatic} from 'axios';
import router from '@/router';

const api = axios.create({
   baseURL: 'http://bp-mbp.local:5000',
   headers: { 
      "Content-Type": "application/json"
   }
})

api.interceptors.response.use( (response) => {
   return response;
}, function (error) {
   if (401 === error.response.status) {
      router.push('/login')
   } else {
       return Promise.reject(error);
   }
});

api.interceptors.request.use( (request) => {
   request.headers['x-token'] =  Vue.cookies.get('token')
   return request
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