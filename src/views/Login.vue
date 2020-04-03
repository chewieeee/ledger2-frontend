<template>
   <div>
      <v-row d-flex align-center>
         <v-col>
            <v-card>
               <v-card-title>
                  <span class="login-header">Login</span>
               </v-card-title>
               <v-divider></v-divider>
               <v-card-text>
                  <v-text-field 
                     placeholder="Login"
                     inputmode="email"
                     v-model="user"
                  />
                  <v-text-field 
                     type="password"
                     placeholder="Passwort"
                     v-model="pass"
                  />
                  <v-btn
                     block
                     text
                     outlined
                     elevation="0"
                     @click.stop="login()"
                  >
                     anmelden
                  </v-btn>
               </v-card-text>
            </v-card>
         </v-col>
      </v-row>
   </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import moment from 'moment'

@Component
export default class Login extends Vue{
   
   private user = '';
   private pass = '';

   async login () {
      const credentials = {
         user: this.user,
         pass: this.pass
      }

      const fullPath = this.$route.query.redirect as string

      const res = await this.axios.post(`/login`, credentials)
      if (res.status === 201) {
         this.saveTokenAsCookie(res.data)
         this.$router.push('/')
      }else{
         console.log("nö"); 
      }
   }

   saveTokenAsCookie(data: Record<string, any>) {
      const key = "token"
      const value = data.token
      const expires = moment(data.token_valid_to).toDate()
      this.$cookies.set(key, value, {expires: expires})
   }
}
</script>

<style>

   .login-header{
      text-align: center;
   }
   input{
      text-align: center;
   }
</style>