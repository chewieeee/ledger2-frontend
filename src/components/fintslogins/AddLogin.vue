<template>
   <BaseDialog
      :dialog="dialog"
      :fullscreen="true"
   >
      <v-card
         rounded
         max-width="500"
         class="py-0"
      >
         <v-card-title>
            FinTS-Zugang anlegen
            <v-spacer></v-spacer>
            <v-btn
               small
               text
               @click.native="closeDialog()"
            >
               <v-icon>
                  mdi-close
               </v-icon>
            </v-btn>
         </v-card-title>
         <v-divider />
         <v-card-text>
            <v-form
               ref="formCreateFinTS"
            >
               <v-row>
                  <v-col>
                     <v-text-field
                        v-model="title"
                        label="Bezeichnung"
                        inputmode="text"
                        required
                        outlined
                        dense
                     />
                     <v-text-field
                        v-model="login"
                        label="Login"
                        inputmode="text"
                        required
                        outlined
                        dense
                     />
                     <v-text-field
                        v-model="pin"
                        label="Pin"
                        type="password"
                        inputmode="password"
                        required
                        outlined
                        dense
                     />
                     <v-text-field
                        v-model="blz"
                        label="BLZ"
                        inputmode="numeric"
                        required
                        outlined
                        dense
                     />
                     <v-text-field
                        v-model="fintsUrl"
                        label="FinTS URL"
                        inputmode="url"
                        required
                        outlined
                        dense
                     />
                     <v-text-field
                        v-model="validFrom"
                        label="Gültig ab"
                        type="date"
                        required
                        outlined
                        dense
                     />
                     <v-text-field
                        v-model="validTo"
                        label="Gültig bis"
                        type="date"
                        required
                        outlined
                        dense
                     />
                     <v-btn
                        block
                        text
                        class="primary"
                        @click.native="createFintsLogins()"
                     >
                       <span class="white--text"> anlegen </span>
                     </v-btn>
                  </v-col>
               </v-row>
            </v-form>

         </v-card-text>
      </v-card>
   </BaseDialog>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop, Ref} from 'vue-property-decorator'
import BaseDialog from '@/components/generic/dialogs/Dialog.vue'
import LedgerInput from '@/components/generic/form/Input.vue'
import moment from 'moment'

@Component({
   components: {
      BaseDialog, LedgerInput
   }
})
export default class AddLogin extends Vue{

   private id = 0
   private title = "";
   private login = "";
   private pin = "";
   private fintsUrl = "";
   private blz = null;
   private validTo = "";
   private validFrom = "";

   @Ref()
   formCreateFinTS!: HTMLFormElement

   @Prop()
   dialog!: boolean;

   @Emit('clickedOutside')
   private clickedOutside() {
      this.closeDialog()
   }

   get newFintsLogin() {
      return {
         id: this.id,
         title: this.title,
         login: this.login,
         pin: this.pin,
         fintsUrl: this.fintsUrl,
         blz: this.blz,
         validTo: (this.validTo === '') ? null: this.validTo, 
         validFrom: this.validFrom
      } as FintsLogin
   }


   private closeDialog(){
      this.formCreateFinTS.reset()
      this.$emit("closeDialog", true)
   }

   private async createFintsLogins() {
      const data = this.newFintsLogin
      const res = await this.axios.post('/logins', data)
      if (res.status === 200) {
         this.id = res.data.insertId
         this.$emit("createdFinTS", this.newFintsLogin)
      }
   }

}
</script>