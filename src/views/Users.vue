<template>
   <div>
      <h1>Benutzer</h1>
      <div id="mainObject">
         <v-card>
            <v-card-text>
               <v-list>
                  <v-list-item
                     v-for="user in users"
                     :key="user.id"
                  >
                     <v-row>
                        <v-col>
                           {{ user.user }}
                        </v-col>
                        <v-col class="text-right">
                           <v-btn
                              :disabled="checkSingleUser"
                              @click.native="deleteUser(user.id)"
                              text
                           >
                              <v-icon>
                                 mdi-delete-outline
                              </v-icon>
                           </v-btn>
                        </v-col>
                     </v-row>
                  </v-list-item>
               </v-list>
            </v-card-text>
         </v-card>
      </div>
      <LedgerFab
         icon="mdi-plus"
      />
   </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AddUser from '@/components/users/AddUser.vue';
import LedgerFab from '@/components/generic/form/Fab.vue';

@Component({
   components: {
      AddUser, LedgerFab
   }
})
export default class Users extends Vue{

   private users: User[] = []

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

   async deleteUser(id: number) {
      const res = await this.axios.delete(`/users/${id}`)
      if (res.status === 200) {
         this.users = this.users.filter((user: User) => { return user.id !== id})
      }
   }

}
</script>