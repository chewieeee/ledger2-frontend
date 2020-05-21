<template>
   <v-card>
      <v-row>
         <v-col>
            <v-card-title class="py-0">{{ login.title }}</v-card-title>
            <v-card-text class="py-0">
               <v-row> 
                  <v-col class="py-0">
                     gültig von {{ validFrom }} bis {{ validTo }}
                  </v-col>
               </v-row>
               <v-row>
                  <v-col>
                     FinTS URL: 
                     {{ login.fintsUrl }}
                  </v-col>
               </v-row>
            </v-card-text>
            </v-col>
            <v-col
               class="justify-center"
               :cols=2
            >
               <v-btn
                  icon
               >
                  <v-icon> mdi-pencil </v-icon>
               </v-btn>
            </v-col>
         </v-row>
   </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import moment from 'moment'
import 'moment/locale/de'

@Component
export default class LoginCard extends Vue{

   private readonly unlimited = '-'

   @Prop()
   login!: FintsLogin

   get validFrom() {
      return (this.login.validFrom)
   }

   get validTo() {
      return (this.login.validTo) 
   }
}
</script>