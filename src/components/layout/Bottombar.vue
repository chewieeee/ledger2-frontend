<template>
   <div>
      <v-bottom-navigation
         grow
         app
         id="bottombar"
      >
         <v-btn
            to="/"
            class="navButton"
         >
            <span>Konten</span>
            <v-icon>mdi-bank</v-icon>
         </v-btn>
         <v-btn
            to="/report"
            class="navButton"
         >
         <span>Reports</span>
            <v-icon>mdi-format-list-bulleted-type</v-icon>
         </v-btn>
         <v-btn
            to="/settings"
            class="navButton"
         >
            <span>Einstellungen</span>
            <v-icon>mdi-cog-outline</v-icon>
         </v-btn>
      </v-bottom-navigation>
   </div>

</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";

@Component
export default class Bottombar extends Vue {

}
</script>

<style>
   #bottombar {
      align-items: center !important;
   }

   .navButton {
      height: 100% !important;
   }
</style>