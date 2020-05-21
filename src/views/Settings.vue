<template>
   <div>
      <h1>
         Einstellungen
      </h1>
      <div
         id="mainObject"
      >
         <v-card
            v-for="item in settings"
            :key="item.path"
            :to="item.path"
            class="card"
            height="100px"
         >
            <v-card-title
               class="cardHeader"
            >
               {{ item.name }}
            </v-card-title>
            <v-card-text>
               {{ item.text }}
            </v-card-text>
         </v-card>
      </div>
   </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Settings extends Vue{
   private settings = [
      { name: "Benutzer", text: "Benutzer anlegen und ändern", path: "/users" },
      { name: "Fints Zugangsdaten", text: "Zugangsdaten für die Fints-/HBCI-Schnittstellen hinterlegen", path: "/fints"},
      { name: "Konten", text: "Konten anlegen und ändern", path: "/accounts" },
      { name: "Kategorien", text: "Kategorien zu einem Konto anlegen", path: "/categories" },
      { name: "Budgets", text: "Budgets anlegen und Kategorien zuordnen", path: "/budgets" },
      { name: "Regeln", text: "Regeln anlegen, um Kategorien automatisch zu Buchungen zu zuordnen", path: "/rules" },
   ]
}
</script>

<style>


</style>