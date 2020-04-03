<template>
      <Dialog 
         :dialog="dialog"
         @clickedOutside="closeDialog"
      > 
         <v-card
            rounded
            max-width="500"
            class="py-0"
         >
         <v-card-title
            class="name"
         >
            <h5>
               {{ doc.name }}
            </h5>

         </v-card-title>
         <v-divider></v-divider>
         <v-card-text
            class="py-0"   
         >
            <v-row>
               <v-col
                  col="3"
               >
                  {{ formatedDate }}
               </v-col>
               <v-col
                  col="9"
                  class="text-right"
               >
                  {{ new Intl.NumberFormat("de-DE", format).format(doc.amount) }}
               </v-col>
            </v-row>
            <v-row v-if="doc.iban !== 'null'">
               <v-col col="12">
                   <strong>IBAN:</strong> {{ doc.iban }}
               </v-col>
            </v-row>
            <v-row>
               <v-col>
                  <strong>Verwendungszweck:</strong><br>
                  {{ doc.description }}
               </v-col>
            </v-row>
            <v-row>
               <v-autocomplete
                  v-model="asignedCategory"
                  :items="categories"
                  item-text="title"
                  item-value="id"
                  dense
                  flat
                  outlined
                  solo
                  label="Kategorie"
                  @keyup.enter="setFocusToSave()"
               />
            </v-row>
         </v-card-text>
         <v-card-actions
            class="py-0 px-0"
         >
            <v-btn 
               block
               bottom
               elevation="0"
               tile
               @click.native="save()"
               class="px-0 primary"
               id="saveButton"
            >speichern</v-btn>
         </v-card-actions>
         </v-card>
      </Dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import Dialog from '@/components/dialogs/Dialog.vue'
import { numberFormat } from '../../shared/document';
import moment from 'moment';

@Component({
   components: {
      Dialog
   }
})
export default class UpdateDocument extends Vue{
   private categories: Array<Category> = [];
   private asignedCategory = 0;
   private format = numberFormat;

   @Prop()
   doc!: Doc;
   @Prop()
   dialog!: boolean;

   @Watch('dialog')
   onDocumentChanged() {
      if (this.dialog === true) {
         const firstMatchedCategory = this.categories.find((category: Category) => {return category.title === this.doc!.category})
         if (firstMatchedCategory) {
            this.asignedCategory = firstMatchedCategory.id
         }
      }else{
         this.asignedCategory = 0
      }
   }

   async beforeMount() {
      await this.fetchCategories(this.selectAccount)
   }

      get selectAccount() {
      return Number(this.$route.params.account)
   }

   closeDialog() {
      this.$emit("dialogClosed")
   }

   async fetchCategories(account: number){
      const res = await this.axios.get(`/categories`)
      const unsortedData = res.data.filter((cat: Category) => cat.account === account)
      this.categories = unsortedData.sort((a: Category, b: Category) => { 
        return a.title.localeCompare(b.title)
       })
   }

   async save() {
      const result = await this.updateDB()
      if (result.status === 200) {
         this.$emit('updateGrid', true)
      }
      this.closeDialog()
   }

   private setFocusToSave() {
      if (document !== null) {
         // eslint-disable-next-line 
         document.getElementById('saveButton').focus()
      }
      
   }

   async updateDB() {
      const data = {
         id: this.doc!.id,
         category: this.asignedCategory
      }
      return await this.axios.patch(`/documents`, data)
   }

   get formatedDate() {
      return (this.doc) ? moment(this.doc.date).format("DD.MM.YYYY") : "" 
   }
}
</script>

<style  scoped>
   .name {
      overflow-wrap: break-word;
      word-wrap: break-word;
      -webkit-hyphens: auto;
      -ms-hyphens: auto;
      hyphens: auto;
   }
</style>