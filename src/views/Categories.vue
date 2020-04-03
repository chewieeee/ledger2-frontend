<template>
   <div style="margin: 10px;">
      <h1 >Kategorien</h1>
      <v-card>
         <v-card-title>
            <v-select 
               v-model="selectedAccount"
               :items="accounts"
               item-value="id"
               item-text="title"
               clearable
               placeholder="Konto auswählen"
               id="focus"
            />
         </v-card-title>
         <v-card-text
            v-if="selectedAccount > 0"
         >
            <v-text-field
               v-model="newCategoryTitle"
               placeholder="neue Kategorie"
               @keyup.enter="createCategory()"
            />

               <v-chip
                  primary
                  label
                  close
                  v-for="category in categorySelection"
                  :key="category.id" 
                  @click:close="deleteCategory(category.id)"
                  class="mx-1 my-1"
               >
                  {{ category.title }}
               </v-chip>
         </v-card-text>
      </v-card>
   </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Categories extends Vue{
   
   private accounts: BankAccount[] = []
   private categories: Category[] = []
   private selectedAccount = 0;
   private newCategoryTitle = ''

   async beforeMount() {
      Promise.all([
         this.fetchAccounts(),
         this.fetchCategories()
      ])  
   }

   async fetchAccounts() {
      const res = await this.axios.get(`/accounts`)
      this.accounts = res.data
   }

   async fetchCategories() {
      const res = await this.axios.get('/categories')
      const unsortedData = res.data.sort() as Category[]
      this.categories = unsortedData.sort((a, b) => { 
        return a.title.localeCompare(b.title)
       })
   }

   async createCategory() {
      const newCategory = {
         id: 0,
         title: this.newCategoryTitle,
         account: this.selectedAccount
      }
      const res = await this.axios.post('/categories', newCategory)
      if (res.status === 201) {
         console.log(res)
         newCategory.id = res.data.insertId
         this.categories.push(newCategory as Category)
         this.newCategoryTitle = ''
      }
   }

   async deleteCategory(id: number) {
      const res = await this.axios.delete(`/categories/${id}`)
      if (res.status === 202) {
         console.log(res)
         this.categories = this.categories.filter((cat: Category) => { return cat.id !== id})
      }
   }

   get categorySelection() {
      return this.categories.filter((cat: Category) => { return cat.account === this.selectedAccount})
   }

}
</script>

