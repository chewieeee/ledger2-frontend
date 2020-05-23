<template>
   <v-card>
      <v-card-title>
         {{ user.user }}
      </v-card-title>
      <v-card-text>
         <v-btn
            icon
            :disabled="disableDeleteBtn"
            @click.native="deleteUser(user)"
         >
            <v-icon>
               mdi-delete-outline
            </v-icon>
         </v-btn>
      </v-card-text>
   </v-card>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class UserCard extends Vue{

   @Prop()
   user!: User;

   @Prop({default: false})
   disableDeleteBtn!: boolean;

   private deleteUser(user: User) {
      this.$emit("deleteUser", user)
   }
}
</script>