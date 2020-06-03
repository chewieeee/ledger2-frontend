<template>
   <BaseDialog :dialog="dialog" :fullscreen="false" @clickedOutside="closeDialog()">
      <v-card rounded max-width="500">
         <v-card-title>
            Benutzer anlegen
         <v-spacer></v-spacer>
         <v-btn small text @click.native="closeDialog()">
            <v-icon>mdi-close</v-icon>
         </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text>
         <v-row>
            <v-col>
               <v-form v-model="validNewUser" ref="formCreateUser">
                  <v-text-field
                     v-model="newUser.user"
                     label="Benutzer-Login"
                     outlined
                     dense
                     :rules="loginRules"
                  />
                  <v-text-field
                     v-model="newUser.pass"
                     label="Passwort"
                     type="password"
                     outlined
                     dense
                     :rules="pwdRules"
                  />
                  <v-btn
                     :disabled="!validNewUser"
                     block
                     outlined
                     color="primary"
                     @click.native="createUser()"
                   >
                     <v-icon style="margin-right: 2px;">mdi-account-plus-outline</v-icon>anlegen
                  </v-btn>
                  <v-btn
                     block
                     outlined
                     color="red"
                     @click.native="closeDialog()"
                     class="mt-2"
                  >
                     <v-icon style="margin-right: 2px;">mdi-close</v-icon>abbrechen
                  </v-btn>
               </v-form>
            </v-col>
         </v-row>
         </v-card-text>
      </v-card>
   </BaseDialog>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from "vue-property-decorator";
import BaseDialog from "../generic/dialogs/Dialog.vue";
import { InputValidation } from '../generic/form/inputRules'

@Component({
  components: {
    BaseDialog
  }
})
export default class AddUser extends Vue {
  @Prop({ default: false })
  dialog!: boolean;

  @Ref()
  formCreateUser!: HTMLFormElement;

  private newUser = {
    user: "",
    pass: ""
  };
  private validNewUser = false;

  private closeDialog() {
    this.$emit("closeDialog");
    this.resetForm()
  }

   private loginRules = new InputValidation({fieldName: "Login", minLength: 8, type: "login"}).validate()
   private pwdRules = new InputValidation({fieldName: "Passwort", minLength: 8, type: "password"}).validate()

  async createUser() {
    const res = await this.axios.post("/users", this.newUser);
    if (res.status === 200) {
      const newUser: User = {
        id: res.data.insertId,
        user: this.newUser.user
      };
      this.$emit("userCreated", newUser);
      this.resetForm();""
    }
  }

  resetForm() {
    this.formCreateUser.reset();
    this.newUser.user = "";
    this.newUser.pass = "";
  }
}
</script>