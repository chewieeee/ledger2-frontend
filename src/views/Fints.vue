<template>
   <div>
      <h1>
         Fints Zugangsdaten
      </h1>
      <div id="mainObject">
         <LoginCard
            v-for="login in logins"
            :key="login.id"
            :login="login"
            class="my-1"
         />
         <AddLogin
            :dialog="dialog"
            @createdFinTS="updateLogins($event)"
            @closeDialog="closeDialog()"
         />
      </div>
      <LedgerFab
         icon="mdi-plus"
         @click.native="toggleDialog()"
      />
   </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import LoginCard from '@/components/fintslogins/LoginCard.vue';
import AddLogin from '@/components/fintslogins/AddLogin.vue';
import LedgerFab from '@/components/generic/form/Fab.vue';

@Component({
   components: {
      LoginCard, AddLogin, LedgerFab
   }
})
export default class Fints extends Vue {

   private dialog = false
   private logins: FintsLogin[] = []

   async mounted() {
      await Promise.all([
         this.fetchLogins()
      ])
   }

   private toggleDialog() {
      this.dialog = !this.dialog
   }

   async fetchLogins () {
      const res = await this.axios.get('/logins')
      this.logins = res.data
   }

   private updateLogins(newLogin: FintsLogin) {
      this.logins.push(newLogin)
      this.closeDialog()
   }

   private closeDialog() {
      this.toggleDialog()
   }

}
</script>