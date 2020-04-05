<template>
   <div>
      <h1 style="margin-left: 10px;" class="font-weight-thin">
         Einstellungen
      </h1>
      <div
         id="mainObject"
      >
         <v-card
            class="card"
            to="/accounts"
         >
            <v-card-title
               class="cardHeader"
            >
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
            <v-card-title
               class="cardHeader"
            >
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
            <v-card-title
               class="cardHeader"
            >
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
            <v-card-title
               class="cardHeader"
            >
               Budgets
            </v-card-title>
            <v-card-text>
               Budgets anlegen sowie Kategorien zu Budgets zuordnen
            </v-card-text>
         </v-card>
      </div>

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


</style>