<template>
   <v-card
      class="card"
   >
      <v-card-title
         class="cardHeader"
      >
         {{ account.title }}
      </v-card-title>
      <v-card-text>
         {{ account.iban }} - {{ account.id }}
      </v-card-text>
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