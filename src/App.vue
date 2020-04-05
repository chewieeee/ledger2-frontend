<template>
  <v-app>
   <div v-if="isLogin === false">
      <NavBar
        class="hidden-sm-and-down"
      />
   </div>
   <v-content
      id="content"
   >
      <v-container
         id="container"
      >
         <router-view></router-view>
      </v-container>
    </v-content>
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

@media only screen and (max-device-width : 959px) {
/* Styles */
#app {
   font-family: Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   color: #2c3e50;
   background-color: #e5e8eb25;
}
   #content {
      padding-top: 5px !important;
      padding-left: 0px !important;
      padding-right: 0px !important;
   }

   #container {
      padding: 0px;
   }
}

@media (min-width: 1024px) {
  #app {
      font-family: Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-color: #e5e8eb25;
      color: #2c3e50;
      margin-top: 48px;
    }

   #content {
      padding-top: 5px !important;
   }

   #container {
      margin: 0px !important;

      padding-left: 15px !important;
      padding-right: 15px !important;
   }
}

#mainObject {
   margin: 10px;
}
</style>
