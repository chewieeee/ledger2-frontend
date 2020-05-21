<template>
   <div>
      <v-btn
         fab
         fixed
         :color="color"
         bottom
         right
         absolute
         id="fab"
      >
         <v-icon> {{ icon }}</v-icon>
      </v-btn>
   </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class LedgerFab extends Vue {

   @Prop({required: true})
   private icon!: string;
   @Prop({default: "primary"})
   private color!: string;

}
</script>

<style >
   @media only screen and (max-device-width : 959px) {
      #fab {
         margin-bottom: 100px;
      }
   }

   @media (min-width: 1024px) {
      #fab {
         margin-bottom: 50px;
      }
   }

</style>