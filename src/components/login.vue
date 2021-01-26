<template>
    <main_ style="max-width:450px;">
      <h3 class="mb-2">Login</h3>
      <b-card v-if="forget" class="card p-3 mt-3">
        <div v-if="!reset_sended">
          <img style="width:5em;float:left;margin-right:1.2em;" src="data:image/svg+xml;base64,
  PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDkwLjIgNDkwLjIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ5MC4yIDQ5MC4yOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiPjxnPjxnPgoJPHBhdGggZD0iTTQyMC45NSw2MS44QzM3Ni4yNSwyMC42LDMyMC42NSwwLDI1NC4yNSwwYy02OS44LDAtMTI5LjMsMjMuNC0xNzguNCw3MC4zcy03My43LDEwNS4yLTczLjcsMTc1ICAgYzAsNjYuOSwyMy40LDEyNC40LDcwLjEsMTcyLjZjNDYuOSw0OC4yLDEwOS45LDcyLjMsMTg5LjIsNzIuM2M0Ny44LDAsOTQuNy05LjgsMTQwLjctMjkuNWMxNS02LjQsMjIuMy0yMy42LDE2LjItMzguN2wwLDAgICBjLTYuMy0xNS42LTI0LjEtMjIuOC0zOS42LTE2LjJjLTQwLDE3LjItNzkuMiwyNS44LTExNy40LDI1LjhjLTYwLjgsMC0xMDcuOS0xOC41LTE0MS4zLTU1LjZjLTMzLjMtMzctNTAtODAuNS01MC0xMzAuNCAgIGMwLTU0LjIsMTcuOS05OS40LDUzLjYtMTM1LjdjMzUuNi0zNi4yLDc5LjUtNTQuNCwxMzEuNS01NC40YzQ3LjksMCw4OC40LDE0LjksMTIxLjQsNDQuN3M0OS41LDY3LjMsNDkuNSwxMTIuNSAgIGMwLDMwLjktNy42LDU2LjctMjIuNyw3Ny4yYy0xNS4xLDIwLjYtMzAuOCwzMC44LTQ3LjEsMzAuOGMtOC44LDAtMTMuMi00LjctMTMuMi0xNC4yYzAtNy43LDAuNi0xNi43LDEuNy0yNy4xbDE4LjYtMTUyLjFoLTY0ICAgbC00LjEsMTQuOWMtMTYuMy0xMy4zLTM0LjItMjAtNTMuNi0yMGMtMzAuOCwwLTU3LjIsMTIuMy03OS4xLDM2LjhjLTIyLDI0LjUtMzIuOSw1Ni4xLTMyLjksOTQuN2MwLDM3LjcsOS43LDY4LjIsMjkuMiw5MS4zICAgYzE5LjUsMjMuMiw0Mi45LDM0LjcsNzAuMywzNC43YzI0LjUsMCw0NS40LTEwLjMsNjIuOC0zMC44YzEzLjEsMTkuNywzMi40LDI5LjUsNTcuOSwyOS41YzM3LjUsMCw2OS45LTE2LjMsOTcuMi00OSAgIGMyNy4zLTMyLjYsNDEtNzIsNDEtMTE4LjFDNDg4LjA1LDE1Mi45LDQ2NS43NSwxMDMsNDIwLjk1LDYxLjh6IE0yNzMuNTUsMjkxLjljLTExLjMsMTUuMi0yNC44LDIyLjktNDAuNSwyMi45ICAgYy0xMC43LDAtMTkuMy01LjYtMjUuOC0xNi44Yy02LjYtMTEuMi05LjktMjUuMS05LjktNDEuOGMwLTIwLjYsNC42LTM3LjIsMTMuOC00OS44czIwLjYtMTksMzQuMi0xOWMxMS44LDAsMjIuMyw0LjcsMzEuNSwxNC4yICAgczEzLjgsMjIuMSwxMy44LDM3LjlDMjkwLjU1LDI1OS4yLDI4NC44NSwyNzYuNiwyNzMuNTUsMjkxLjl6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIGRhdGEtb2xkX2NvbG9yPSIjMDAwMDAwIiBzdHlsZT0iZmlsbDojMzMzMzMzIj48L3BhdGg+CjwvZz48L2c+IDwvc3ZnPg==" />
          <h6> Please enter your email address associated to your account so we can send your instructions to reset your password.</h6>
          <b-form data-netlify="true" netlify netlify-honeypot="bot-field" class="mt-4" @submit.prevent="reset_email">
            <b-input type="email" placeholder="Email address" required v-model="forget_address"></b-input>
            <b-button v-if="!reset_requested" variant="primary" class="btn-block mt-3" type="submit">Send</b-button>
            <b-button v-else variant="primary" disabled class="btn-block mt-3" type="submit">
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Send
            </b-button>
          </b-form>
        </div>
        <div v-else>
          <img style="width:1.5em;float:left;margin-right:1.2em;" src="data:image/svg+xml;base64,
          PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMiIgY2xhc3M9IiI+PGc+PHBhdGggZD0ibTM2OS4xNjQwNjIgMTc0Ljc2OTUzMWM3LjgxMjUgNy44MTI1IDcuODEyNSAyMC40NzY1NjMgMCAyOC4yODUxNTdsLTEzNC4xNzE4NzQgMTM0LjE3NTc4MWMtNy44MTI1IDcuODA4NTkzLTIwLjQ3MjY1NyA3LjgwODU5My0yOC4yODUxNTcgMGwtNjMuODcxMDkzLTYzLjg3NWMtNy44MTI1LTcuODA4NTk0LTcuODEyNS0yMC40NzI2NTcgMC0yOC4yODEyNSA3LjgwODU5My03LjgxMjUgMjAuNDcyNjU2LTcuODEyNSAyOC4yODEyNSAwbDQ5LjczMDQ2OCA0OS43MzA0NjkgMTIwLjAzMTI1LTEyMC4wMzUxNTdjNy44MTI1LTcuODA4NTkzIDIwLjQ3NjU2My03LjgwODU5MyAyOC4yODUxNTYgMHptMTQyLjgzNTkzOCA4MS4yMzA0NjljMCAxNDEuNTAzOTA2LTExNC41MTU2MjUgMjU2LTI1NiAyNTYtMTQxLjUwMzkwNiAwLTI1Ni0xMTQuNTE1NjI1LTI1Ni0yNTYgMC0xNDEuNTAzOTA2IDExNC41MTU2MjUtMjU2IDI1Ni0yNTYgMTQxLjUwMzkwNiAwIDI1NiAxMTQuNTE1NjI1IDI1NiAyNTZ6bS00MCAwYzAtMTE5LjM5NDUzMS05Ni42MjEwOTQtMjE2LTIxNi0yMTYtMTE5LjM5NDUzMSAwLTIxNiA5Ni42MjEwOTQtMjE2IDIxNiAwIDExOS4zOTQ1MzEgOTYuNjIxMDk0IDIxNiAyMTYgMjE2IDExOS4zOTQ1MzEgMCAyMTYtOTYuNjIxMDk0IDIxNi0yMTZ6bTAgMCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojNEQ0RDREIiBkYXRhLW9sZF9jb2xvcj0iIzAwMDAwMCI+PC9wYXRoPjwvZz4gPC9zdmc+" />
        <h6> Sent!, Please check your emails.</h6>
        </div>
      </b-card>
      <b-card v-else class="card p-3">
        <b-form name="Login" method="POST" netlify netlify-honeypot="bot-field" data-netlify="true" @submit.prevent="submit">
          <b-form-group
          label="Username:"
          label-for="username"
        >
          <b-input-group
          prepend="@"
          class="">
            <b-input id="username" placeholder="Username" required v-model="form.username"></b-input>
          </b-input-group>
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
      <p class="text-center" style="color:red;"> {{ msg }} </p>
      <div class="d-flex justify-content-center mt-5">
        <b-button variant="primary" class="btn-block" type="submit">Login</b-button>
      </div>
      <hr>
      <b-row>
        <b-col class="text-center text-secondary font-weight-light font-italic" @click="$router.push('register')">Sign Up</b-col>
        <b-col class="text-center text-secondary font-weight-light font-italic" @click="forget=true">Forget password?</b-col>
      </b-row>
       </b-form>
      </b-card>
    </main_>
</template>

<script>
import main_ from '@/components/main_'
import AuthService from '../services/AuthService.js'

export default {
  name: 'login',
  components: {
    main_
  },
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      msg: '',
      forget: false,
      forget_address: '',
      reset_requested:false,
      reset_sended: false,
    }
  },
  methods: {
    async reset_email(){
      this.reset_requested = true;
      await AuthService.forget({email: this.forget_address})
      .then(res => {
        this.reset_sended = true;
      })
      .catch(err => {
        console.log(err)
      })
    },
    async submit () {
      try {
        await AuthService.login({
          username: this.form.username,
          password: this.form.password
        })
        .then(response =>{
          this.$store.dispatch('login', response.data)
          this.$router.push({ name: 'wallets' })
        })
      } catch (err) {
        // this.msg = 'Cannot login at the moment. please try again after a few seconds.'
        this.msg = err.response.data.message
      }
    },
    enter (e) {
      console.log(e)
      if (e.which === 13) {
        this.submit()
      }
    }
  },
  mounted: function () {
    if (this.$store.state.isLogin) {
      console.log('loggedin.')
      this.$router.push({ name: 'wallets' })
    }
  }
}
</script>

<style scoped>

</style>
