<template>
   <BaseDialog
      :dialog="dialog"
   >
      <v-card>
         <v-card-title>
            User zuordnen
            <v-spacer></v-spacer>
            <v-btn
               icon
               @click="closeDialog()"
            >
               <v-icon>
                  mdi-close
               </v-icon>
            </v-btn>
         </v-card-title>
         <v-card-text>

         </v-card-text>
      </v-card>
   </BaseDialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import BaseDialog from '@/components/generic/dialogs/Dialog.vue';

@Component({
   components: {
      BaseDialog
   }
})
export default class ManageUser extends Vue {

   @Prop({default: false})
   dialog!: boolean;

   @Prop()
   bankaccount!: BankAccount

   private users: User[] = []

   async mounted() {
      await this.fetchUser()
   }

   private async fetchUser() {
      const res = await this.axios.get('/users')
      if (res.status === 200) {
         this.users = res.data as User[]
      }
   }

   private closeDialog() {
      this.$emit("closeDialog")
   }

}
</script>