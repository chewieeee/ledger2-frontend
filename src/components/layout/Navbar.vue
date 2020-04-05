<template>
<div>
   <v-card
      class="mx-auto"
      width="256"
      height="100%"
   >
<v-navigation-drawer permanent app>
      <v-list>
         <v-list-item link
            to="/"
         >
            <v-list-item-action>
               <v-icon>mdi-bank</v-icon>
            </v-list-item-action>
            <v-list-item-content>
               <v-list-item-title>Konten</v-list-item-title>
            </v-list-item-content>
         </v-list-item>
         <v-list-item link
            to="/reports"
         >
            <v-list-item-action>
               <v-icon>mdi-format-list-bulleted-type</v-icon>
            </v-list-item-action>
            <v-list-item-content>
               <v-list-item-title>Reports</v-list-item-title>
            </v-list-item-content>
         </v-list-item>
         <v-list-item link
            to="/settings"
         >
            <v-list-item-action>
               <v-icon>mdi-cog-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
               <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
         </v-list-item>
      </v-list>
   </v-navigation-drawer>
   </v-card>
<!-- 
    <v-app-bar
      app
      color="primary"
      dark
      dense
      class="d-flex justify-center"
      >
      <v-toolbar-title>
         {{ navbartitle }}
      </v-toolbar-title>
   </v-app-bar> -->

</div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue';

@Component
export default class NavBar extends Vue{
   get navbartitle() {
      return this.$route.name
   }
}
</script>