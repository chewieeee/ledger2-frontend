<template>
   <div>
      <v-card-title class="py-1 mb-2">
            <v-row>
               <v-col
                  :cols="7" 
                  class="text-left pl-2 pr-0" 
               >
                  {{ account.title }}
               </v-col>
               <v-col 
                  :cols="5"
                  class="text-right px-0 pl-0"
               >
                  {{ 
                     new Intl.NumberFormat("de-DE", format).format(account.balance) 
                  }} 
               </v-col>
            </v-row>
         </v-card-title>
   </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import { numberFormat } from '../../shared/document'

@Component
export default class AccountSummary extends Vue {
   @Prop()
   account: Account | undefined

   private format = numberFormat
}
</script>