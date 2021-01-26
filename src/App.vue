<template>
  <div id="app">
    <div id="di">
      <navbar></navbar>
      <main_ class="">
        <div v-if="!verified" class="d-flex justify-content-center">
          <div class="spinner-border text-light m-5" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <router-view v-else/>
      </main_>
    </div>
  </div>
</template>

<script>
import navbar from './components/navbar'
import main_ from './components/main_'
// import dotenv from 'dotenv'
import AuthService from '@/services/AuthService'

export default {
  name: 'App',
  components: {
    navbar,
    main_
  },
  data() {
    return {
      verified: true
    }
  },
  beforeCreate: function () {
    this.$store.state.env = process.env
    const token = localStorage.token
    console.log(token)
    if (token) {
      this.verified = false;
      AuthService.verify()
        .then((res) => {
          // console.log(res)
          this.$store.dispatch('login', {
            user: res.data.mesage,
            token: token
          })
          this.$router.push({ name: 'wallets' })
          this.verified = true;
        })
        .catch(() => {
          localStorage.removeItem('token')
          this.verified = true;
        })
    }else{
      console.log('here');
      this.verified = true;
    }
  },
}

</script>

<style>
  #di {
    background-color: rgb(33, 33, 39);
    /* height: 100vh; */
    padding-bottom: 2em;
    min-height: 100vh;
    z-index: -100;
  }
  .clickable {
    cursor: pointer;
  }
  .card {
    box-shadow: 0 2px 20px rgba(147, 32, 255, 0.103),0 3px 8px rgba(140, 0, 255, 0.055);
  }
</style>
