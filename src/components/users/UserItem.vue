<template>
   <v-list-item>
      <v-list-item-content>
         <v-list-item-title> {{ user.user }}</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
         <v-btn
            icon
            :disabled="disableDeleteBtn"
            @click.native="deleteUser(user)"
         >
            <v-icon
               :color="'red'"
            >
               mdi-delete-outline
            </v-icon>
         </v-btn>
      </v-list-item-action>
   </v-list-item>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class UserItem extends Vue{

   @Prop()
   user!: User;

   @Prop({default: false})
   disableDeleteBtn!: boolean;

   private deleteUser(user: User) {
      this.$emit("deleteUser", user)
   }
}
</script>