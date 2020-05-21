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
                  @click.native="EditDialog(bankaccount)"
               >
                  mdi-pencil
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

   EditDialog(bankaccount: BankAccount) {
      this.$emit("editBankaccount", this.bankaccount)
   }
   
}
</script>