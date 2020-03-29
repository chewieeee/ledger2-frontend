<template>
   <v-row>
      <v-dialog
         :value="dialog"
         hide-overlay
         transition="dialog-bottom-transition"
         @click:outside="closeDialog"
         max-width="500"
      >
         <slot></slot>
      </v-dialog>
   </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Dialog extends Vue {

   @Prop()
   dialog = false;

   closeDialog() {
      this.$emit("clickedOutside", true)
   }
}
</script>

<style scoped>
 .fullDialog{
    padding-top: 100px;
    margin-top: 100px;
 }

</style>