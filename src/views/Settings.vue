<template>
   <div class="py-1 px-1">
      <h1 style="margin: 10px;">
         Einstellungen
      </h1>
      <v-card
         class="card"
         to="/accounts"
      >
         <v-card-title>
            Konten
         </v-card-title>
         <v-card-text>
            Bankkonten sowie entsprechende Zugangsdaten anlegen
         </v-card-text>
      </v-card>

      <v-card
         class="card"
         to="/categories"
      >
         <v-card-title>
            Kategorien
         </v-card-title>
         <v-card-text>
            Kategorien zu Bankkonten anlegen
         </v-card-text>
      </v-card>

      <v-card
         class="card"
         to="/categories"
      >
         <v-card-title>
            Regeln
         </v-card-title>
         <v-card-text>
            Lege Regeln an, um Kategorien automatisiert zu zuweisen.
         </v-card-text>
      </v-card>

      <v-card
         class="card"
         to="/budgets"
      >
         <v-card-title>
            Budgets
         </v-card-title>
         <v-card-text>
            Budgets anlegen sowie Kategorien zu Budgets zuordnen
         </v-card-text>
      </v-card>
   </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component
export default class Settings extends Vue{
   private settings = [
      { id: "1", name: "Konten", path: "/accounts" },
      { id: "2", name: "Kategorien", path: "/categories" },
      { id: "3", name: "Budgets", path: "/budgets" }
   ]
}
</script>


<style>
   .card{
      margin: 15px;
   }
</style>