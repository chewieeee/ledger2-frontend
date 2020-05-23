<template>
   <div>
      <v-list-item>
         <v-list-item-content>
            <v-list-item-title>
               {{ bankaccount.title }}
            </v-list-item-title>
            <v-list-item-subtitle>
               {{ bankaccount.iban }}
            </v-list-item-subtitle>
         </v-list-item-content>
         <v-list-item-action>
            <v-btn
               icon
            >
               <v-icon
                  color="primary"
                  @click.native="editDialog(bankaccount)"
               >
                  mdi-pencil
               </v-icon>
            </v-btn>
            <v-btn
               icon
            >
               <v-icon
                  color="secondary"
                  @click="asignUser(bankaccount)"
               >
                  mdi-account-check-outline
               </v-icon>
            </v-btn>
         </v-list-item-action>
      </v-list-item>
      <v-divider 
         v-show="divider"
      />
   </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class BankaccountItem extends Vue{

   @Prop()
   bankaccount!: BankAccount
   
   @Prop()
   divider!: boolean;

   editDialog(bankaccount: BankAccount) {
      this.$emit("editBankaccount", this.bankaccount)
   }

   asignUser(bankaccount: BankAccount) {
      //
   }
   
}
</script>