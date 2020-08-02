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
                  @click.native="manageUser(account)"
               >
                  mdi-account-check-outline
               </v-icon>
            </v-btn>
         </AccountCard>
         <AddBankaccount
            :dialog="dialog.add"
            @newBankaccount="bankaccountCreated($event)"
            @closeDialog="toggleDialog('add')"
         />
         <EditBankaccount
            :dialog="dialog.edit"
            :bankaccount="selectedBankaccount"
            @closeDialog="toggleDialog('edit')"
            @bankAccountUpdated="fetchAccounts"
         />
         <ManageUser
            :dialog="dialog.manage"
            :bankaccount="selectedBankaccount"
            @closeDialog="toggleDialog('manage')"
         />
         <LedgerFab
            @click.native="toggleDialog('add')"
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
import ManageUser from '@/components/bankaccounts/ManageUser.vue'
import LedgerFab from "@/components/generic/form/Fab.vue";

@Component({
   components: {
      AddBankaccount, EditBankaccount, AccountCard, LedgerFab, ManageUser
   }
})
export default class Bankaccounts extends Vue {
   private loading = true
   private accounts: BankAccount[] = []
   private selectedBankaccount: BankAccount = {} as BankAccount

   // dialog boolean object
   private dialog = {
      'add': false,
      'edit': false,
      'manage': false
   }

   private async mounted() {
      await this.fetchAccounts()
      this.loading = false
   }

   private async fetchAccounts() {
      const res = await this.axios.get('/accounts')
      this.accounts = res.data as BankAccount[]
   }

   private bankaccountCreated(newBankaccount: BankAccount) {
      this.accounts.push(newBankaccount)
   }

   private toggleDialog(prop: string) {
      this.dialog[prop] = !this.dialog[prop]
   }

   private editBankaccount(bankaccount: BankAccount) {
      this.selectedBankaccount = bankaccount
      this.toggleDialog('edit')
   }

   private manageUser(bankaccount: BankAccount) {
      this.selectedBankaccount = bankaccount
      this.toggleDialog('manage')
   }
}
</script>