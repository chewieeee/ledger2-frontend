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
               <LedgerInput 
                  @changedValue="updateBankaccount.title = $event"
                  placeholder="Bezeichnung"
                  inputmode="text"
                  required="true"
                  :p_value="updateBankaccount.title"
               />
               <LedgerInput 
                  @changedValue="updateBankaccount.iban = $event"
                  placeholder="IBAN"
                  inputmode="text"
                  required="true"
                  :p_value="updateBankaccount.iban"
               />
            </v-card-text>
         </v-card>
      </BaseDialog>
   </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import BaseDialog from '@/components/generic/dialogs/Dialog.vue';
import LedgerInput from '@/components/generic/form/Input.vue';

@Component({
   components: {
      BaseDialog, LedgerInput
   }
})
export default class EditBankaccount extends Vue{

   @Prop({default: false})
   dialog!: boolean;

   @Prop()
   bankaccount!: BankAccount

   private updateBankaccount!: BankAccount

   closeDialog() {
      this.$emit("closeDialog")
   }

   @Watch("bankaccount")
   modifyUpdateBankaccounts() {
      this.updateBankaccount = this.bankaccount
   }

}
</script>