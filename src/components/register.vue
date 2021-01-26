<template>
    <main_ style="max-width:450px;">
      <h3 class="mb-2">Register</h3>
      <b-card class="card p-3">
        <b-form netlify netlify-honeypot="bot-field" @submit.prevent="register">
          <b-form-group
            label="Email address:"
            label-for="email"
          >
            <b-form-input
              id="email"
              v-model="form.email"
              type="email"
              required
              autofill = 'false'
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Full name:"
            label-for="name"
          >
            <b-form-input
              id="name"
              v-model="form.name"
              required
              placeholder="Enter name"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Password :"
            label-for="pass"
          >
            <b-form-input
              id="pass"
              v-model="form.password"
              required
              type='password'
              placeholder="Enter password"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Username:"
            label-for="username"
            description="username must contain a-z and number"
          >
            <b-input-group
            prepend="@"
            class="">
              <b-input id="username" placeholder="Username" required v-model="form.username"></b-input>
            </b-input-group>
          </b-form-group>
          <div class="d-flex justify-content-center mt-5">
            <b-button type="submit" class="btn-block" variant="primary">Regist</b-button>
          </div>
       </b-form>
      </b-card>
      {{msg}}
    </main_>
</template>

<script>
import main_ from '@/components/main_'
import AuthService from '../services/AuthService.js'

export default {
  name: 'register',
  components: {
    main_
  },
  data () {
    return {
      form: {
        email: '',
        username: '',
        name: '',
        password: ''
      },
      msg: ''
    }
  },
  methods: {
    async register () {
      try {
        await AuthService.register({
          email: this.form.email,
          username: this.form.username,
          password: this.form.password,
          name: this.form.name
        }).then(res => {
          try {
            AuthService.login({
              username: this.form.username,
              password: this.form.password
            }).then(resp => {
              this.$store.dispatch('login', resp.data)
              this.$router.push({ name: 'wallets' })
            })
          } catch (error) {
            this.$router.push({ name: 'root'})
          }

        })
        this.$router.push({ name: 'root' })
      } catch (err) {
        this.msg = 'Please try again.'
      }
    }
  },
  beforeMount: function () {
    if (this.$store.state.isLogin) {
      this.$store.dispatch('logout')
      this.$router.push({ name: 'root' })
    }
  }
}
</script>

<style scoped>

</style>
