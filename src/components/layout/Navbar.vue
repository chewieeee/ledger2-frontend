<template>
<div>
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
   </v-app-bar>
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