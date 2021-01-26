<template>
    <main_ style="max-width:450px;">
      <h3 class="mb-2">Reset password</h3>
      <b-card v-if="expired" class="card p-3 mt-3">
        <img style="width:1.5em;float:left;margin-right:1.2em;" src="data:image/svg+xml;base64,
        PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDc1LjIgNDc1LjIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ3NS4yIDQ3NS4yOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIGNsYXNzPSIiPjxnPjxnPgoJPGc+CgkJPHBhdGggZD0iTTQwNS42LDY5LjZDMzYwLjcsMjQuNywzMDEuMSwwLDIzNy42LDBzLTEyMy4xLDI0LjctMTY4LDY5LjZTMCwxNzQuMSwwLDIzNy42czI0LjcsMTIzLjEsNjkuNiwxNjhzMTA0LjUsNjkuNiwxNjgsNjkuNiAgICBzMTIzLjEtMjQuNywxNjgtNjkuNnM2OS42LTEwNC41LDY5LjYtMTY4UzQ1MC41LDExNC41LDQwNS42LDY5LjZ6IE0zODYuNSwzODYuNWMtMzkuOCwzOS44LTkyLjcsNjEuNy0xNDguOSw2MS43ICAgIHMtMTA5LjEtMjEuOS0xNDguOS02MS43Yy04Mi4xLTgyLjEtODIuMS0yMTUuNywwLTI5Ny44QzEyOC41LDQ4LjksMTgxLjQsMjcsMjM3LjYsMjdzMTA5LjEsMjEuOSwxNDguOSw2MS43ICAgIEM0NjguNiwxNzAuOCw0NjguNiwzMDQuNCwzODYuNSwzODYuNXoiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6IzQ3NDc0NyIgZGF0YS1vbGRfY29sb3I9IiMwMDAwMDAiPjwvcGF0aD4KCQk8cGF0aCBkPSJNMzQyLjMsMTMyLjljLTUuMy01LjMtMTMuOC01LjMtMTkuMSwwbC04NS42LDg1LjZMMTUyLDEzMi45Yy01LjMtNS4zLTEzLjgtNS4zLTE5LjEsMGMtNS4zLDUuMy01LjMsMTMuOCwwLDE5LjEgICAgbDg1LjYsODUuNmwtODUuNiw4NS42Yy01LjMsNS4zLTUuMywxMy44LDAsMTkuMWMyLjYsMi42LDYuMSw0LDkuNSw0czYuOS0xLjMsOS41LTRsODUuNi04NS42bDg1LjYsODUuNmMyLjYsMi42LDYuMSw0LDkuNSw0ICAgIGMzLjUsMCw2LjktMS4zLDkuNS00YzUuMy01LjMsNS4zLTEzLjgsMC0xOS4xbC04NS40LTg1LjZsODUuNi04NS42QzM0Ny42LDE0Ni43LDM0Ny42LDEzOC4yLDM0Mi4zLDEzMi45eiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojNDc0NzQ3IiBkYXRhLW9sZF9jb2xvcj0iIzAwMDAwMCI+PC9wYXRoPgoJPC9nPgo8L2c+PC9nPiA8L3N2Zz4=" />
        <h6 class="text-center">Link is already expired.</h6>
      </b-card>
      <b-card v-else-if="complete" class="card p-3 mt-3">
        <img style="width:1.5em;float:left;margin-right:1.2em;" src="data:image/svg+xml;base64,
        PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMiIgY2xhc3M9IiI+PGc+PHBhdGggZD0ibTM2OS4xNjQwNjIgMTc0Ljc2OTUzMWM3LjgxMjUgNy44MTI1IDcuODEyNSAyMC40NzY1NjMgMCAyOC4yODUxNTdsLTEzNC4xNzE4NzQgMTM0LjE3NTc4MWMtNy44MTI1IDcuODA4NTkzLTIwLjQ3MjY1NyA3LjgwODU5My0yOC4yODUxNTcgMGwtNjMuODcxMDkzLTYzLjg3NWMtNy44MTI1LTcuODA4NTk0LTcuODEyNS0yMC40NzI2NTcgMC0yOC4yODEyNSA3LjgwODU5My03LjgxMjUgMjAuNDcyNjU2LTcuODEyNSAyOC4yODEyNSAwbDQ5LjczMDQ2OCA0OS43MzA0NjkgMTIwLjAzMTI1LTEyMC4wMzUxNTdjNy44MTI1LTcuODA4NTkzIDIwLjQ3NjU2My03LjgwODU5MyAyOC4yODUxNTYgMHptMTQyLjgzNTkzOCA4MS4yMzA0NjljMCAxNDEuNTAzOTA2LTExNC41MTU2MjUgMjU2LTI1NiAyNTYtMTQxLjUwMzkwNiAwLTI1Ni0xMTQuNTE1NjI1LTI1Ni0yNTYgMC0xNDEuNTAzOTA2IDExNC41MTU2MjUtMjU2IDI1Ni0yNTYgMTQxLjUwMzkwNiAwIDI1NiAxMTQuNTE1NjI1IDI1NiAyNTZ6bS00MCAwYzAtMTE5LjM5NDUzMS05Ni42MjEwOTQtMjE2LTIxNi0yMTYtMTE5LjM5NDUzMSAwLTIxNiA5Ni42MjEwOTQtMjE2IDIxNiAwIDExOS4zOTQ1MzEgOTYuNjIxMDk0IDIxNiAyMTYgMjE2IDExOS4zOTQ1MzEgMCAyMTYtOTYuNjIxMDk0IDIxNi0yMTZ6bTAgMCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojNEQ0RDREIiBkYXRhLW9sZF9jb2xvcj0iIzAwMDAwMCI+PC9wYXRoPjwvZz4gPC9zdmc+" />
        <h6> Password is reset.</h6>
        <b-button variant="secondary" class="btn-block mt-4" @click="$router.push({name: 'login'})">Log in</b-button>
      </b-card>
      <b-card v-else-if="error" class="card p-3 mt-3">
        <img style="width:1.5em;float:left;margin-right:1.2em;" src="data:image/svg+xml;base64,
        PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDc1LjIgNDc1LjIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ3NS4yIDQ3NS4yOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIGNsYXNzPSIiPjxnPjxnPgoJPGc+CgkJPHBhdGggZD0iTTQwNS42LDY5LjZDMzYwLjcsMjQuNywzMDEuMSwwLDIzNy42LDBzLTEyMy4xLDI0LjctMTY4LDY5LjZTMCwxNzQuMSwwLDIzNy42czI0LjcsMTIzLjEsNjkuNiwxNjhzMTA0LjUsNjkuNiwxNjgsNjkuNiAgICBzMTIzLjEtMjQuNywxNjgtNjkuNnM2OS42LTEwNC41LDY5LjYtMTY4UzQ1MC41LDExNC41LDQwNS42LDY5LjZ6IE0zODYuNSwzODYuNWMtMzkuOCwzOS44LTkyLjcsNjEuNy0xNDguOSw2MS43ICAgIHMtMTA5LjEtMjEuOS0xNDguOS02MS43Yy04Mi4xLTgyLjEtODIuMS0yMTUuNywwLTI5Ny44QzEyOC41LDQ4LjksMTgxLjQsMjcsMjM3LjYsMjdzMTA5LjEsMjEuOSwxNDguOSw2MS43ICAgIEM0NjguNiwxNzAuOCw0NjguNiwzMDQuNCwzODYuNSwzODYuNXoiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6IzQ3NDc0NyIgZGF0YS1vbGRfY29sb3I9IiMwMDAwMDAiPjwvcGF0aD4KCQk8cGF0aCBkPSJNMzQyLjMsMTMyLjljLTUuMy01LjMtMTMuOC01LjMtMTkuMSwwbC04NS42LDg1LjZMMTUyLDEzMi45Yy01LjMtNS4zLTEzLjgtNS4zLTE5LjEsMGMtNS4zLDUuMy01LjMsMTMuOCwwLDE5LjEgICAgbDg1LjYsODUuNmwtODUuNiw4NS42Yy01LjMsNS4zLTUuMywxMy44LDAsMTkuMWMyLjYsMi42LDYuMSw0LDkuNSw0czYuOS0xLjMsOS41LTRsODUuNi04NS42bDg1LjYsODUuNmMyLjYsMi42LDYuMSw0LDkuNSw0ICAgIGMzLjUsMCw2LjktMS4zLDkuNS00YzUuMy01LjMsNS4zLTEzLjgsMC0xOS4xbC04NS40LTg1LjZsODUuNi04NS42QzM0Ny42LDE0Ni43LDM0Ny42LDEzOC4yLDM0Mi4zLDEzMi45eiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojNDc0NzQ3IiBkYXRhLW9sZF9jb2xvcj0iIzAwMDAwMCI+PC9wYXRoPgoJPC9nPgo8L2c+PC9nPiA8L3N2Zz4=" />
        <h6 class="text-center">Oops an error occur please try again in a short while.</h6>
        <div class="text-center"><small><i>{{ msg }}</i></small></div>
      </b-card>
      <b-card v-else>
        <div v-if="!username" class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <b-form v-else @submit.prevent="change">
          <h6 class="mt-3">Create new password for account named "{{ username }}".</h6>
          <b-form-group
            label="New password"
            label-for="pass"
            class="mt-4"
          >
            <b-form-input
              id="pass"
              v-model="form.password"
              required
              :disabled='pending'
              type='password'
              placeholder="Password"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Re-enter password"
            label-for="repass"
          >
            <b-form-input
              id="repass"
              v-model="form.repassword"
              required
              :disabled='pending'
              type='password'
              placeholder="Enter password again"
            ></b-form-input>
          </b-form-group>
            <b style="color:orange;">
              {{msg}}
            </b>
            <b-button v-if="!pending" variant="primary" class="btn-block mt-4" type="submit">Reset</b-button>
            <b-button v-else variant="primary" disabled class="btn-block mt-4" type="submit">
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Reset
            </b-button>
        </b-form>
      </b-card>
    </main_>
</template>

<script>
import main_ from '@/components/main_'
import AuthService from '../services/AuthService.js'

export default {
  name: 'reset',
  components: {
    main_
  },
  data () {
    return {
      form: {
        password: '',
        repassword: '',
      },
      msg: '',
      email: null,
      username: null,
      expired: false,
      token: null,
      complete: false,
      pending: false,
      error: false,
    }
  },
  methods: {
    async change () {
      if(this.form.password != this.form.repassword){
        this.msg = 'Passwords does not match.'
      }else{
        this.msg = ''
        this.pending = true
        await AuthService.reset({password: this.form.password ,username: this.username, token:this.token}).then(res => {
          this.complete = true;
        }).catch(err =>{
          this.error = true
        })
      }
    }
  },
  beforeMount: async function () {
    if(this.$route.query.token){
      this.token = this.$route.query.token
      await AuthService.verify_reset({token: this.$route.query.token}).then(res =>{

        this.email = res.data.email
        this.username = res.data.username
      }).catch(err =>{
        this.expired = true
      })
    } else{
      this.expired = true
    }
  }
}
</script>

<style scoped>

</style>
