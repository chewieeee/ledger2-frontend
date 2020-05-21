<template>
   <div>
      <h1>
         Budgets
      </h1>
      <div id="mainObject">
         <v-card
            class="mb-2"
         >
            <v-card-title>
               <v-autocomplete
                  v-model="selectedAccount"
                  :items="accounts"
                  item-value="id"
                  item-text="title"
                  dense
                  flat
                  outlined
                  solo
                  placeholder="Konto auswählen"
               />
            </v-card-title>
            <v-card-text>
               <v-text-field
                  outlined
                  dense
                  placeholder="Budget anlegen"
                  label="neues Konto"
                  v-model="newBudget.title"
               />
            </v-card-text>
         </v-card>
         <v-expansion-panels
            accordion
            hover
         >
            <v-expansion-panel
               v-for="budget in budgets"
               :key="budget.id"
            >
               <v-expansion-panel-header>
                  {{ budget.title }}
               </v-expansion-panel-header>
               <v-expansion-panel-content>
                  <v-row>
                     <v-col>
                        {{
                           budget.type
                        }}
                     </v-col>
                     <v-col>
                        {{ budget.amount }}
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col>
                        {{ budget.validFrom}}
                     </v-col>
                     <v-col>
                        {{ budget.validTo }}
                     </v-col>
                  </v-row>
               </v-expansion-panel-content>
            </v-expansion-panel>
         </v-expansion-panels>
      </div>
   </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Budgets extends Vue{

   private accounts: BankAccount[] = []
   private budgets: Budget[] = [{
      id: 1,
      title: "test",
      type:  "Ausgaben",
      period: "ohne Zeitraum",
      amount: 1337.37,
      validFrom: new Date(),
      validTo: new Date()
   }]
   private selectedAccount = 0
   private unasignedCategories: Category[] = []

   async beforeMount() {
      await Promise.all([
         this.fetchAccounts(),
         this.fetchCategories
      ])
   }

   async fetchAccounts() {
      const res = await this.axios.get('/accounts')
      this.accounts = res.data as BankAccount[]
   }

   async fetchCategories() {
      const res = await this.axios.get(`/categories/${this.selectedAccount}`)
      this.unasignedCategories = res.data.filter((cat: Category) => { return cat.budget === null})
   }

   async createBudget() {
      const newBudget: Budget = {
         id: 0,
         title: "",
         period: "ohne Zeitraum",
         amount: 13.37,
         type: "Ausgaben",
         validFrom: new Date(),
         validTo: new Date()
      }

      const res = await this.axios.post('/budgets', newBudget)
      if (res.status === 201) {
         //
      }
   }

}
</script>

