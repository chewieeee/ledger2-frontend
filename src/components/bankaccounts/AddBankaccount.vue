<template>
   <div>
      <Dialog
         :dialog="dialog"
      >
         <v-card>
            <v-card-title>
               Bankkonto anlegen
               <v-spacer />
               <v-btn
                  icon
                  @click.native="closeDialog()"
               >
                  <v-icon>
                     mdi-close
                  </v-icon>
               </v-btn>
            </v-card-title>
            <v-card-text>
               <LedgerInput 
                  @changedValue="newBankaccount.title = $event"
                  placeholder="Bezeichnung"
                  inputmode="text"
                  required="true"
               />
               <LedgerInput 
                  @changedValue="newBankaccount.iban = $event"
                  placeholder="IBAN"
                  inputmode="text"
                  required="true"
               />
               <v-btn
                  block
                  outlined
                  @click.native="createBankaccount()"
               >
                  <v-icon>mdi-plus</v-icon>
                  anlegen
               </v-btn>
            </v-card-text>
         </v-card>
      </Dialog>
   </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Dialog from '@/components/generic/dialogs/Dialog.vue'
import LedgerInput from '@/components/generic/form/Input.vue'


@Component({
   components: {
      Dialog, LedgerInput
   }
})
export default class AddBankaccount extends Vue{

   private newBankaccount: BankAccount = {} as BankAccount

   @Prop({default: false})
   dialog!: boolean;

   closeDialog() {
      this.$emit("closeDialog")
   }

   async createBankaccount() {
      const res = await this.axios.post('/accounts', this.newBankaccount)
      if (res.status === 200) {
         this.newBankaccount.id = res.data.insertId
         this.$emit("newBankaccount", this.newBankaccount)
         this.closeDialog()
      }
   }
}
</script>