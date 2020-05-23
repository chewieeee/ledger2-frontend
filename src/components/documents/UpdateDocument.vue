<template>
      <BaseDialog
         :dialog="dialog"
         :fullscreen="false"
         @clickedOutside="closeDialog"
      >
         <v-card
            rounded
            max-width="500"
         >
            <v-card-title
               class="name"
            >
               <h5>
                  {{ doc.name }}
               </h5>
               <v-spacer />
               <v-icon text
                  @click.native="closeDialog()"
               >
                  mdi-close
               </v-icon>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text
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
                  <v-col
                     class="py-0"
                  >
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
                        :allow-overflow=true
                        :autofocus=false
                        no-data-text="keine Kategorie gefunden"
                        @keyup.enter="setFocusToSave()"
                     />
                  </v-col>
               </v-row>
               <v-row>
                  <v-col
                     cols="12"
                     sm="12"
                     class="dialogButton"
                  >
                     <v-btn
                        block
                        bottom
                        outlined
                        color="primary"
                        @click.native="save()"
                        id="saveButton"
                     >
                        speichern
                     </v-btn>
                  </v-col>
                  <v-col
                     cols="12"
                     sm="12"
                     class="dialogButton"
                  >
                     <v-btn
                        block
                        bottom
                        outlined
                        color="deep-orange"
                        @click.native="closeDialog()"
                     >
                        abbrechen
                     </v-btn>
                  </v-col>
               </v-row>
            </v-card-text>
         </v-card>
      </BaseDialog>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import BaseDialog from '@/components/generic/dialogs/Dialog.vue'
import { numberFormat } from '../../shared/document';
import moment from 'moment';

@Component({
   components: {
      BaseDialog
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
      const el = document.getElementById("saveButton")!
      el.focus()
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

<style>

   @media only screen and (max-device-width : 500px) {
      .dialogButton {
         padding-top: 0px !important;
      }
   }
   @media only screen and (min-device-width : 501px) {
      .dialogButton {
         padding-top: 0px !important;
      }
   }

   .name {
      overflow-wrap: break-word;
      word-wrap: break-word;
      -webkit-hyphens: auto;
      -ms-hyphens: auto;
      hyphens: auto;
   }
</style>