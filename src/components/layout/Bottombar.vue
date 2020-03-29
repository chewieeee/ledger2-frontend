<template>
   <v-bottom-navigation
      grow
      fixed 
   >
      <v-btn
         to="/"
      >
         <span>Konten</span>
         <v-icon>mdi-bank</v-icon>
      </v-btn> 
      <v-btn
         to="/report"
      >
      <span>Reports</span>
         <v-icon>mdi-format-list-bulleted-type</v-icon>
      </v-btn>
      <v-btn
         to="/settings"
      >
         <span>Einstellungen</span>
         <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
   </v-bottom-navigation>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";

@Component
export default class Bottombar extends Vue {

}
</script>