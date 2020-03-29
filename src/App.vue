<template>
  <v-app>
    <div v-if="isLogin === false">
      <NavBar 
        class="hidden-sm-and-down"
      />
    </div>
    <router-view></router-view>
    <div v-if="isLogin === false">
      <Bottombar 
        class="hidden-md-and-up"
      />
    </div>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import NavBar from '@/components/layout/Navbar.vue'
import Bottombar from '@/components/layout/Bottombar.vue'

@Component({
  components: {
    NavBar, Bottombar
  }
})
export default class App extends Vue {

  get isLogin() {
    return (this.$route.path === '/login') ? true : false
  }

  get isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

  mounted() {
    this.setTokenInHeader()
 }
  
  setTokenInHeader() {
    const token = this.$cookies.get('token')
    if (token === null) {
      this.$router.replace('/login')
    }else{
      console.log(token);
      this.axios.defaults.headers.common['x-token'] = token
    }
  }
}
</script>

<style >

@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
/* Styles */
  #app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-bottom: 60px;
  }
}

@media (min-width: 1024px) {
  #app {
      font-family: Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #2c3e50;
      margin-top: 60px;
    }
}


  
</style>
