<template>
  <div>
    <h1>
      Übersicht
    </h1>
    <AccountCard
      v-for="account in accounts"
      :key="account.id"
      sm="12"
      :account="account"
      id="mainObject"
      @click.native="openAccount(account.id)"
    />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src

import { Vue, Component } from 'vue-property-decorator'
import AccountCard from '@/components/bankaccounts/AccountCard.vue'

@Component({
  components: {
    AccountCard
  }
})
export default class Dashboard extends Vue{

  private accounts: Account[] = []

  async beforeMount() {
    await this.fetchAccounts()
  }

  async fetchAccounts() {
    const res = await this.axios.get('/accounts')
    this.accounts = res.data
  }

  openAccount(id: number) {
    this.$router.push(`/docs/${id}`)
  }
}
</script>

<style >
</style>
