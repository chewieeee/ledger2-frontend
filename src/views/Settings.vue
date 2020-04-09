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
            :key="item.id"
            :to="item.path"
            class="card"
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
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component
export default class Settings extends Vue{
   private settings = [
      { id: "1", name: "Konten", text: "Konten anlegen und ändern", path: "/accounts" },
      { id: "2", name: "Kategorien", text: "Kategorien zu einem Konto anlegen", path: "/categories" },
      { id: "3", name: "Budgets", text: "Budgets anlegen und Kategorien zuordnen", path: "/budgets" },
      { id: "4", name: "Regeln", text: "Regeln anlegen, um Kategorien automatisch zu Buchungen zu zuordnen", path: "/rules" },
      { id: "5", name: "Zugänge", text: "Zugänge anlegen und ändern", path: "/users" }
   ]
}
</script>

<style>


</style>