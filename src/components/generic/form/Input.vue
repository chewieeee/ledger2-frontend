<template>
   <v-text-field
      :placeholder="placeholder"
      :type="type"
      :inputmode="inputmode"
      :pattern="pattern"
      :required="required"
      :rules="rules"
      :label="label"
      outlined
      flat
      dense
      v-model="value"
      @keydown.enter="emitEnter"
   />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class LedgerInput extends Vue {

   @Prop()
   placeholder!: string;
   @Prop({default: "text"})
   inputmode!: string;
   @Prop({default: "text"})
   type!: string;
   @Prop()
   pattern!: string;
   @Prop({default: false})
   required!: boolean;
   @Prop()
   label!: string;
   @Prop()
   rules!: Array<Function>;
   @Prop()
   value!: string | number

   @Watch("value")
   newValue() {
      this.$emit("changedValue", this.value)
   }

}
</script>