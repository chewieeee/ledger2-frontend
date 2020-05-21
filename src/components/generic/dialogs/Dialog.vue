<template>
   <v-row>
      <v-dialog
         :value="dialog"
         :fullscreen="screenSize"
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

   @Prop({default: false})
   dialog!: boolean;
   @Prop({default: false})
   fullscreen!: boolean;

   closeDialog() {
      this.$emit("clickedOutside", true)
   }

   get screenSize() {
      return (screen.width > 600) ? false : true;
   }

}
</script>

<style scoped>

</style>