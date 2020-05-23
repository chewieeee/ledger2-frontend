<template>
   <div>
      <h1>
         Bankkonten
      </h1>
      <div id="mainObject">
         <AccountCard 
            v-for="account in accounts"
            :key="account.id"
            :account="account"
         >
            <v-btn
               icon
               color="primary"
               @click.native="editBankaccount(account)"
            >
               <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
               icon
               color="secondary"
            >
               <v-icon
                  @click="asignUser(bankaccount)"
               >
                  mdi-account-check-outline
               </v-icon>
            </v-btn>
         </AccountCard>
         <AddBankaccount 
            :dialog="addDialog"
            @newBankaccount="bankaccountCreated($event)"
            @closeDialog="toggleAddDialog()"
         />
         <EditBankaccount
            :dialog="editDialog"
            :bankaccount="selectedBankaccount"
            @closeDialog="toogleEditDialog()"
         />
         <LedgerFab 
            @click.native="toggleAddDialog()"
            icon="mdi-plus"
         />
      </div>
   </div>
</template>

<script lang="ts">
import { Vue, Component} from "vue-property-decorator";
import AccountCard from '@/components/bankaccounts/AccountCard.vue'
import EditBankaccount from '@/components/bankaccounts/EditBankaccount.vue'
import AddBankaccount from '@/components/bankaccounts/AddBankaccount.vue'
import LedgerFab from "@/components/generic/form/Fab.vue";

@Component({
   components: {
      AddBankaccount, EditBankaccount, AccountCard, LedgerFab
   }
})
export default class Bankaccounts extends Vue {
   private loading = true
   private accounts: BankAccount[] = []
   private selectedBankaccount: BankAccount = {} as BankAccount
   private addDialog = false
   private editDialog = false


   async mounted() {
      await this.fetchAccounts()
      this.loading = false
   }

   async fetchAccounts() {
      const res = await this.axios.get('/accounts')
      this.accounts = res.data as BankAccount[]
   }

   bankaccountCreated(newBankaccount: BankAccount) {
      this.accounts.push(newBankaccount)
   }

   toogleEditDialog() {
      this.editDialog = !this.editDialog
   }

   toggleAddDialog() {
      this.addDialog = !this.addDialog
   }

   editBankaccount(bankaccount: BankAccount) {
      this.selectedBankaccount = bankaccount
      this.toogleEditDialog()
   }
}
</script>