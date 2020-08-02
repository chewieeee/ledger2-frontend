<template>
   <div>
      <BaseDialog
         :dialog="dialog"
      >
         <v-card>
            <v-card-title>
               Bankkonto ändern
               <v-spacer />
               <v-btn
                  icon
               >
                  <v-icon
                     @click.native="closeDialog()"
                  >
                     mdi-close
                  </v-icon>
               </v-btn>
            </v-card-title>
            <v-card-text>
               <v-text-field
                  v-model="bankaccount.title"
                  placeholder="Bezeichnung"
                  inputmode="test"
                  required="true"
                  outlined
                  dense
               />
               <v-text-field
                  v-model="bankaccount.iban"
                  placeholder="IBAN"
                  inputmode="test"
                  required="true"
                  outlined
                  dense
               />

               <v-btn
                  block
                  text
                  class="primary"
                  @click.native="updateBankAccount()"
               >
                  <span class="white--text"> aktualisieren </span>
               </v-btn>
            </v-card-text>
         </v-card>
      </BaseDialog>
   </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import BaseDialog from '@/components/generic/dialogs/Dialog.vue';

@Component({
   components: {
      BaseDialog
   }
})
export default class EditBankaccount extends Vue{

   @Prop({default: false})
   dialog!: boolean;

   @Prop()
   bankaccount!: BankAccount

   private closeDialog() {
      this.$emit("closeDialog")
   }

   private async updateBankAccount() {
      const res = await this.axios.patch("/accounts", this.bankaccount)
      if (res.status === 200) {
         this.$emit("bankAccountUpdated")
         this.closeDialog()
      }
   }

}
</script>