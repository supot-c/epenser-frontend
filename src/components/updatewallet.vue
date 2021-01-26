<template>
    <main_ style="max-width:450px;">
      <h3 class="mb-2">Create new wallet</h3>
      <b-card class="card p-3">
        <b-form>
          <b-form-group
            label="Wallet name:"
            label-for="name"
          >
            <b-form-input
              id="name"
              v-model="form.name"
              required
              autofill = 'false'
              placeholder="Enter wallet name"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Description:"
            label-for="description"
          >
            <b-form-input
              id="description"
              v-model="form.description"
              required
              placeholder="Wallet detail"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Wallet type:"
            label-for="type"
          >
            <b-form-radio-group
            v-model="form.type"
            :options="options"
            name="radio-inline"
          ></b-form-radio-group>
          </b-form-group>

          <b-form-group
            label="Initial amount:"
            label-for="amount"
          >
            <b-input-group
            prepend="$"
            class="">
              <b-input id="amount" placeholder="amount" required v-model="form.amount"></b-input>
            </b-input-group>
          </b-form-group>
          <div class="d-flex justify-content-center mt-5">
            <b-button variant="normal" class="mr-1" @click="$router.push({ name: 'wallets' })">Cancle</b-button>
            <b-button variant="primary" @click="create">Create</b-button>
          </div>
       </b-form>
      </b-card>
      {{msg}}
    </main_>
</template>

<script>
import main_ from '@/components/main_'
import WalletService from '../services/WalletService.js'
import ReceiptService from '../services/ReceiptService.js'
import TransactionsService from '../services/TransactionsService.js'

export default {
  name: 'updatewallet',
  components: {
    main_
  },
  data () {
    return {
      form: {
        name: '',
        description: '',
        type: '',
        amount: ''
      },
      msg: '',
      options: [
        { text: 'Saving', value: 'saving' },
        { text: 'Debt', value: 'debt' },
        { text: 'other', value: 'other' }
      ],
      isPending: false
    }
  },
  methods: {
    async create () {
      try {
        if (!this.isPending) {
          this.isPending = true
          await WalletService.create({
            name: this.form.name,
            description: this.form.description,
            type: this.form.type,
            amount: this.form.amount,
            username: this.$store.state.user.username
          })
          this.$router.push({ name: 'wallets' })
        }
      } catch (err) {
        this.msg = 'Please try again.'
      }
    }
  },
  beforeMount: function () {
    if (!this.$store.state.isLogin) {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped>

</style>
