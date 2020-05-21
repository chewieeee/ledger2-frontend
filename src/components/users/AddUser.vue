<template>
   <div>
      <v-form
         v-model="validNewUser"
         ref="formCreateUser"
      >
         <v-card
            class="mb-2"
         >
            <v-expansion-panels accordion>
               <v-expansion-panel >
                  <v-expansion-panel-header>neuen Zugang anlegen</v-expansion-panel-header>
                  <v-expansion-panel-content>
                     <v-row>
                        <v-col
                           cols="12"
                           sm="12"
                        >
                           <v-text-field
                              v-model="newUser.user"
                              placeholder="Benutzer-Login"
                              :rules="[inputRules.required, inputRules.length]"
                           />
                        </v-col>
                        <v-col
                           cols="12"
                           sm="12"
                        >
                           <v-text-field
                              v-model="newUser.pass"
                              placeholder="Passwort"
                              type="password"
                              :rules="[inputRules.required, inputRules.length]"
                           />
                        </v-col>
                     </v-row>
                     <v-row>
                        <v-col>
                           <v-btn
                              :disabled="!validNewUser"
                              block
                              @click.native="createUser()"
                           >
                              <v-icon style="margin-right: 2px;">
                                 mdi-account-plus-outline
                              </v-icon>
                              anlegen
                           </v-btn>
                        </v-col>
                     </v-row>
                  </v-expansion-panel-content>
               </v-expansion-panel>
            </v-expansion-panels>
         </v-card>
      </v-form>
   </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'

@Component
export default class AddUser extends Vue{

   @Ref()
   formCreateUser!: HTMLFormElement

   private newUser = {
      user: '',
      pass: ''
   }
   private validNewUser = false

   // Rules
   private inputRules = {
      required: (value: string) => !!value || "Login ist ein Pflichtfeld",
      length: (value: string) => value.length >= 8 || "Login muss mindestens 8 Zeichen lang sein"
   }

   async createUser() {
      const res = await this.axios.post('/users', this.newUser)
      if (res.status === 200) {
         const newUser: User = {
            id: res.data.insertId,
            user: this.newUser.user
         }
         this.$emit("userCreated", newUser)
         this.resetForm()
      }
   }

   resetForm() {
      this.formCreateUser.reset()
      this.newUser.user = ''
      this.newUser.pass = ''
   }


}
</script>