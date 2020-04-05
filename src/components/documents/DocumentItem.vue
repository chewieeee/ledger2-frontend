<template>
   <v-list-item
      class="docItem"
   >
      <v-list-item-content
         
      >
         <v-list-item-title>
            <v-row
               class="docHeader"
            >
               <v-col
                  class="py-1"
                  :cols="8"
               >
                  <div class="name">
                     {{ doc.name }}
                  </div>
                  <div>
                     <v-chip
                        x-small
                        label
                        v-show="doc.category !==  null"
                     >
                        {{ doc.category }}
                     </v-chip>

                  </div>
               </v-col>
               <v-col
                  class="text-right py-1"
                  :cols="4"
               >
                  {{
                     new Intl.NumberFormat("de-DE", format).format(doc.amount)
                  }}
               </v-col>
            </v-row>
         </v-list-item-title>
      </v-list-item-content>
   </v-list-item>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from 'vue';
import {Doc, numberFormat} from '../../shared/document';


@Component({
   props: {
      doc: {
         type: Object as () => Doc
      }
   }
})
export default class DocItem extends Vue{
   private format = numberFormat
}
</script>

<style scoped>
   .docItem:hover{
      background:whitesmoke;
   }

   .name{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
   }
</style>