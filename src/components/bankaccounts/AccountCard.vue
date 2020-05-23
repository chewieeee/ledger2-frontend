<template>
   <v-card
      class="card"
   >
      <v-row class="py-0">
         <v-col class="my-0">
            <v-card-title
               class="cardHeader"
            >
               {{ account.title }}
            </v-card-title>
            <v-card-text>
               {{ account.iban }}
            </v-card-text>
         </v-col>
         <v-col
            class="justify-end d-flex"
            :cols=2
         >
            <slot></slot>
         </v-col>
      </v-row>
   </v-card>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from 'vue'

@Component({
   props: {
      account: {
         type: Object,
         default: null
         }
   }
})
export default class AccountCard extends Vue {
}
</script>