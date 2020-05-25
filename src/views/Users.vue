<template>
   <div>
      <h1>Benutzer</h1>
      <div id="mainObject">
         <v-card>
            <v-list>
               <UserItem 
                  v-for="user in users"
                  :key="user.id"
                  :user="user"
                  :disableDeleteBtn="checkSingleUser"
                  @deleteUser="deleteUser($event)"
               />
            </v-list>
         </v-card>
      </div>
      <AddUser 
         :dialog="addDialog"
         @closeDialog="toggleDialog()"
      />
      <LedgerFab
         @click.native="toggleDialog()"
         icon="mdi-plus"
      />
   </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AddUser from '@/components/users/AddUser.vue';
import LedgerFab from '@/components/generic/form/Fab.vue';
import UserItem from "../components/users/UserItem.vue";

@Component({
   components: {
      AddUser, LedgerFab, UserItem
   }
})
export default class Users extends Vue{

   private users: User[] = []
   private addDialog = false

   private toggleDialog() {
      this.addDialog = !this.addDialog
   }

   get checkSingleUser() {
      return (this.users?.length > 1) ? false : true
   }

   async mounted() {
      await Promise.all([
         this.fetchUser()
      ])
   }

   async fetchUser() {
      const res = await this.axios.get('/users')
      if (res.status === 200) {
         this.users = res.data as User[]
      }
   }

   addUsertoGrid(newUser: User) {
      this.users.push(newUser as User)
   }

   async deleteUser(user: User) {
      const res = await this.axios.delete(`/users/${user.id}`)
      if (res.status === 200) {
         this.users = this.users.filter((_user: User) => { return _user.id !== user.id})
      }
   }

}
</script>